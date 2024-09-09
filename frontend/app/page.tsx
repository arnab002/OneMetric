'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import baseApiURL from '@/baseUrl';
import '../public/assets/index.css'
import logo from "../public/public/home/image-18@2x.png";
import { Edit3, Plus, Trash, Check } from 'react-feather';
import { User } from 'react-feather';
import { BarLoader, PulseLoader } from 'react-spinners'; // Import multiple loaders
import statsData from '../public/json/stats.json';
import HomeMobileView from '@/middlewares/home/HomeMobileView';
import CustomSidebar from './sidebar';

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface Plan {
  id: number;
}

type Stock = {
  scrip_cd: string;
  stock_long_name: string;
};


type ButtonState = 'plus' | 'check' | 'edit' | 'trash';

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contentReady, setContentReady] = useState<boolean>(false);
  const [stats, setStats] = useState(statsData);
  const [stockData, setStockData] = useState<any[]>([]);
  const [bankniftyData, setBankNiftyData] = useState<any[]>([]);
  const [niftyData, setNiftyData] = useState<any[]>([]);
  const [planData, setPlanData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingPlanValidity, setLoadingPlanValidity] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [buttonStates, setButtonStates] = useState<{ [key: string]: ButtonState }>({});
  const [showWatchlistButton, setShowWatchlistButton] = useState(false);
  const [filteredStockData, setFilteredStockData] = useState<any[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);
  const [openFAQs, setOpenFAQs] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true); // Set state when script is loaded
    script.onerror = () => console.error('Failed to load Razorpay script');
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const checkPlanValidity = async () => {
      const token = localStorage.getItem('authToken');
      if (token && isTokenExpired(token)) {
        handleLogout();
        return null;
      }

      if (token) {
        try {
          const response = await axios.post(`${baseApiURL()}/check-plan-validity`,
            undefined,
            {
              headers: {
                Authorization: `${token}`,
              },
            });

          // Check if the response is successful and the status is 'active', 'expired', or 'newuser'
          if (response.data.success &&
            (response.data.status === 'active' || response.data.status === 'expired' || response.data.status === 'newuser')) {
            window.location.href = '/insights';
            return;
          }
        } catch (error) {
          console.error('Error checking plan validity:', error);
          setTimeout(() => setContentReady(true), 1000);
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            handleLogout(); // Logout if unauthorized
          }
        }
      }
      setContentReady(true);
      setLoadingPlanValidity(false);
    };

    checkPlanValidity();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown && !(event.target as Element).closest('.user-icon-wrapper')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Function to check if the token is expired
  const isTokenExpired = (token: string): boolean => {
    if (!token) return true;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  // Function to check token expiration and handle logout
  const checkTokenExpiration = () => {
    const token = localStorage.getItem('authToken');
    if (token && isTokenExpired(token)) {
      handleLogout();
    }
  };

  useEffect(() => {
    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(intervalId);
  }, []);

  // Modify the existing useEffect for token checking
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      if (token) {
        handleLogout(); // Auto-logout if token exists but is expired
      }
    }
  }, []);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`${baseApiURL()}/stocks-lite`);
        const data = (response.data.data as { stock_long_name: string }[])
          .filter(stock => {
            // Remove entries with patterns like "182D050924" or other unwanted formats
            const regexPattern = /^[\dA-Z]+$/; // Match any string that consists only of digits and uppercase letters
            return !regexPattern.test(stock.stock_long_name);
          })
          .slice(0, 10)
          .sort((a, b) => a.stock_long_name.localeCompare(b.stock_long_name));

        setStockData(data);
        setFilteredStockData(data); // Set initial filtered data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await axios.get<{ data: Plan[] }>(`${baseApiURL()}/plans`);
        const filteredPlans = response.data.data.filter((plan: Plan) => ![0, 1].includes(plan.id));
        setPlanData(filteredPlans);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plan data:', error);
        setLoading(false);
      }
    };

    fetchPlanData();
  }, []);

  // Load selected stocks from session storage on component mount
  useEffect(() => {
    const storedStocks = localStorage.getItem('selectedStocks');
    if (storedStocks) {
      const parsedStocks = JSON.parse(storedStocks);
      setSelectedStocks(parsedStocks);
      setShowWatchlistButton(parsedStocks.length > 0);

      // Set initial button states for stored stocks
      const initialButtonStates: { [key: string]: ButtonState } = {};
      parsedStocks.forEach((scrip_cd: string) => {
        initialButtonStates[scrip_cd] = 'edit';
      });
      setButtonStates(initialButtonStates);
    }
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQs(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleClick = () => {
    window.location.href = '/insights';
  };

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
    setLoading(true);

    switch (tab) {
      case 'All':
        setFilteredStockData(stockData);
        setLoading(false);
        break;
      case 'Bank Nifty':
        if (bankniftyData.length === 0) {
          fetchBankNiftyStocks();
        } else {
          setFilteredStockData(bankniftyData);
          setLoading(false);
        }
        break;
      case 'Nifty 50':
        if (niftyData.length === 0) {
          fetchNifty50Stocks();
        } else {
          setFilteredStockData(niftyData);
          setLoading(false);
        }
        break;
    }
  };

  const fetchBankNiftyStocks = async () => {
    try {
      const response = await axios.get(`${baseApiURL()}/banknifty`);
      const data = (response.data.data as { stock_long_name: string }[])
        .filter(stock => {
          // Remove entries with patterns like "182D050924" or other unwanted formats
          const regexPattern = /^[\dA-Z]+$/; // Match any string that consists only of digits and uppercase letters
          return !regexPattern.test(stock.stock_long_name);
        })
        .slice(0, 10)
        .sort((a, b) => a.stock_long_name.localeCompare(b.stock_long_name));;
      setBankNiftyData(data);
      setFilteredStockData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Bank Nifty stock data:', error);
      setLoading(false);
    }
  };

  const fetchNifty50Stocks = async () => {
    try {
      const response = await axios.get(`${baseApiURL()}/nifty50`);
      const data = (response.data.data as { stock_long_name: string }[])
        .filter(stock => {
          // Remove entries with patterns like "182D050924" or other unwanted formats
          const regexPattern = /^[\dA-Z]+$/; // Match any string that consists only of digits and uppercase letters
          return !regexPattern.test(stock.stock_long_name);
        })
        .slice(0, 10)
        .sort((a, b) => a.stock_long_name.localeCompare(b.stock_long_name));;
      setNiftyData(data);
      setFilteredStockData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Nifty 50 stock data:', error);
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (token && isTokenExpired(token)) {
        handleLogout();
        return null;
      }
      const response = await axios.get(
        `${baseApiURL()}/fetchUserData`,
        {
          headers: {
            Authorization: `${token}`, // Passing the token in the Authorization header
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        handleLogout(); // Logout if unauthorized
      }
      return null;
    }
  };


  const handleStartNowClick = async (planId: string) => {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }
    setProcessingPlanId(planId);

    if (!razorpayLoaded) {
      console.error('Razorpay script not loaded');
      setProcessingPlanId(null);
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token || isTokenExpired(token)) {
      console.error('No token found in localStorage');
      setProcessingPlanId(null);
      handleLogout();
      return;
    }

    try {
      const response = await axios.post(`${baseApiURL()}/payment`, {
        plan_id: planId,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Passing the token in the Authorization header
          },
        }
      );

      const { transaction_id, payment_order_id, user_id, plan_id, amount, status } = response.data.data;

      if (status === 'pending') {

        const userDetails = await fetchUserDetails(user_id);

        if (!userDetails) {
          console.error('Failed to fetch user details');
          setProcessingPlanId(null);
          return;
        }
        // Redirect to Razorpay payment page
        const options = {
          key: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay key ID
          amount: amount * 100, // Amount in paisa (multiply by 100 to convert INR to paisa)
          currency: 'INR',
          name: 'OneMetric',
          description: `Payment for ${plan_id}`,
          image: logo,
          order_id: payment_order_id,
          handler: function (response: RazorpayResponse) {
            const successUrl = `/successPayment?order_id=${response.razorpay_order_id}&payment_id=${response.razorpay_payment_id}&transaction_id=${transaction_id}`;
            window.location.href = successUrl;
          },
          prefill: {
            name: userDetails.name,
            email: userDetails.email,
            contact: userDetails.mobile,
          },
          notes: {
            transaction_id: transaction_id,
            user_id: user_id,
          },
          theme: {
            color: '#F37254',
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        console.error('Payment status is not created');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        handleLogout(); // Logout if unauthorized
      }
    } finally {
      setProcessingPlanId(null);
    }
  };

  const handlePlusClick = (scrip_cd: string) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [scrip_cd]: 'check',
    }));
    setShowWatchlistButton(true);
    setSelectedStocks((prevSelected) => [...prevSelected, scrip_cd]);

    // Store selected stocks in session storage
    localStorage.setItem('selectedStocks', JSON.stringify([...selectedStocks, scrip_cd]));

    setTimeout(() => {
      setButtonStates((prevState) => ({
        ...prevState,
        [scrip_cd]: 'edit',
      }));
    }, 2000);
  };

  const handleAddToWatchlist = async () => {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }

    const token = localStorage.getItem('authToken');
    if (token && isTokenExpired(token)) {
      handleLogout();
      return null;
    }

    setIsProcessing(true); // Start processing

    try {
      // Initiate payment for free plan
      const paymentResponse = await axios.post(`${baseApiURL()}/payment`, {
        plan_id: '1',
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const { transaction_id } = paymentResponse.data.data;

      // Check payment status
      const checkStatusResponse = await axios.post(`${baseApiURL()}/check-payment-status`, {
        transaction_id: transaction_id,
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (checkStatusResponse.data.success) {
        // Payment successful, now add stocks to watchlist
        const selectedStocks = JSON.parse(localStorage.getItem('selectedStocks') || '[]');

        for (const scrip_cd of selectedStocks) {
          try {
            await axios.post(`${baseApiURL()}/add-stock-to-watchlist`, {
              scrip_cd: scrip_cd,
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } catch (error) {
            console.error(`Failed to add stock ${scrip_cd} to watchlist:`, error);
          }
        }

        window.location.href = '/insights'
        // Clear selected stocks from session storage
        localStorage.removeItem('selectedStocks');
        setSelectedStocks([]);
        setShowWatchlistButton(false);

      } else {
        alert('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Error processing payment or adding stocks:', error);
      alert('An error occurred. Please try again.');
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        handleLogout(); // Logout if unauthorized
      }
    } finally {
      setIsProcessing(false); // Stop processing
    }
  };

  const handleEditClick = (scrip_cd: string) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [scrip_cd]: 'trash',
    }));
  };

  const handleRemoveClick = (scrip_cd: string) => {
    // Reset the state back to 'plus'
    setButtonStates((prevState) => ({
      ...prevState,
      [scrip_cd]: 'plus',
    }));

    // Remove the stock from selectedStocks
    setSelectedStocks((prevSelected) => prevSelected.filter((stock) => stock !== scrip_cd));

    // Update session storage
    const updatedStocks = selectedStocks.filter((stock) => stock !== scrip_cd);
    localStorage.setItem('selectedStocks', JSON.stringify(updatedStocks));

    // If no stocks are selected, hide the watchlist button
    if (updatedStocks.length === 0) {
      setShowWatchlistButton(false);
    }
  };

  const handleTrialClick = () => {
    window.location.href = '/login'
  };

  const handleReferClick = () => {
    window.location.href = '/refer'
  };

  const handleHomeClick = () => {
    window.location.href = '/'
  };

  const handleTwitterRedirect = () => {
    window.open('https://x.com/Onemetric_in', '_blank');
  };

  const handleWhatsAppRedirect = () => {
    window.open('https://api.whatsapp.com/send?phone=917204946777&text=Hi', '_blank');
  };

  if (loadingPlanValidity && loading || !contentReady) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0B0C18',
        fontFamily: 'Arial, sans-serif'
      }}>
        <img src={logo.src} alt="OneMetric Logo" style={{ width: '150px', marginBottom: '20px' }} />
        <BarLoader
          color={'#F37254'}
          loading={true}
          height={4}
          width={150}
        />
        <p style={{ marginTop: '20px', color: '#fff' }}>
          {loading ? 'Loading...' : 'Preparing your experience...'}
        </p>
        <div style={{ marginTop: '10px' }}>
          <PulseLoader
            color={'#F37254'}
            loading={true}
            size={10}
            speedMultiplier={0.7}
          />
        </div>
      </div>
    );
  }


  return (
    <HomeMobileView>
      <div>
        <div className="homepage">
          <div className="homepage-child" />
          <section className="rectangle-parent">
            <div className="frame-child" />
            <div className="add-to-your-watchlist-parent">
              <h3 className="add-to-your">Add to your watchlist</h3>
              <div className="select-your-stocks">
                Select your stocks now to get the latest news
              </div>
            </div>
            <div className="nifty-trio-parent">
              <div
                className={`nifty-trio ${activeTab === 'All' ? 'active' : ''}`}
                onClick={() => handleTabSwitch('All')}
              >
                <b className="all">All</b>
              </div>
              <div
                className={`nifty-trio ${activeTab === 'Bank Nifty' ? 'active' : ''}`}
                onClick={() => handleTabSwitch('Bank Nifty')}
              >
                <div className="all-nifty-50">Bank Nifty</div>
              </div>
              <div
                className={`nifty-trio ${activeTab === 'Nifty 50' ? 'active' : ''}`}
                onClick={() => handleTabSwitch('Nifty 50')}
              >
                <div className="bank-nifty">Nifty 50</div>
              </div>
            </div>
          </section>
          <img className="image-13-icon" alt="" src="./public/home/image-13@2x.png" />
          <img className="vector-icon" alt="" src="./public/home/vector.svg" />
          <section className="content">
            <img
              className="content-child"
              loading="lazy"
              alt=""
              src="./public/whatsapp.png"
            />
            <img className="chart-icon" alt="" src="./public/home/chart.svg" />
            <div className="hero-container-parent">
              <div className="hero-container">
                <div className="hero-inner">
                  <header className="image-18-parent">
                    <img
                      className="image-18-icon"
                      loading="lazy"
                      alt=""
                      src="./public/home/OneMetric_Transparent.png"
                      onClick={handleHomeClick} style={{ cursor: 'pointer' }}
                    />
                    <div className="sign-in-button-wrapper">
                      <div className="sign-in-button-wrapper" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                        <a className="onemetric">OneMetric</a>
                      </div>
                    </div>
                    {isLoggedIn ? (
                      <div className="user-icon-wrapper" style={{ position: 'relative' }}>
                        <User onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
                      </div>
                    ) : (
                      <button className="sign-in-wrapper" id="frameButton">
                        <a className="sign-in" href='/login'>Sign In</a>
                      </button>
                    )}
                    <div className="frame-parent">
                      <img
                        className="frame-item"
                        alt=""
                        src="./public/home/group-1000000964.svg"
                      />
                      <img
                        className="frame-inner"
                        alt=""
                        src="./public/home/group-1000000966.svg"
                      />
                    </div>
                  </header>
                  <CustomSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                  <div className="whats-app-promo">
                    <div className="whats-app-promo-child" />
                    <div className="promo-content">
                      <div className="promo-columns">
                        <div className="promo-column-one">
                          <div className="get-lighting-container">
                            <p className="get-lighting-">Get Lightning - Fast</p>
                            <p className="stock-news-on">
                              <span>
                                <span className="stock-news">Stock news</span>
                                <span className="on"> on</span>
                              </span>
                            </p>
                            <p className="get-lighting-">
                              <span>
                                <b className="whats-app1">WhatsApp</b>
                              </span>
                            </p>
                          </div>
                          <div className="promo-icons-one">
                            <img
                              className="promo-icon-one"
                              alt=""
                              src="./public/home/promo-icon-one.svg"
                            />
                            <img
                              className="promo-icons-one-child"
                              loading="lazy"
                              alt=""
                              src="./public/home/group-1000001013@2x.png"
                            />
                          </div>
                        </div>
                        <div className="promo-icons-two">
                          <img
                            className="promo-icon-two"
                            alt=""
                            src="./public/home/promo-icon-two.svg"
                          />
                          <img
                            className="promo-icons-two-child"
                            loading="lazy"
                            alt=""
                            src="./public/home/group-1000001014@2x.png"
                          />
                        </div>
                      </div>
                      <div className="promo-status">
                        <div className="sent-subscribed">
                          <div className="status-items">
                            <div className="news-sent">
                              <p className="get-lighting-">
                                <b>
                                  <span>{stats.newsSent}+</span>
                                </b>
                              </p>
                              <p className="news-sent1">
                                <span>
                                  <span>News Sent</span>
                                </span>
                              </p>
                            </div>
                            <img
                              className="status-icons"
                              alt=""
                              src="./public/home/status-icons.svg"
                            />
                          </div>
                          <div className="status-items">
                            <div className="news-sent">
                              <p className="get-lighting-">
                                <b>
                                  <span>{stats.subscribedUsers}+</span>
                                </b>
                              </p>
                              <p className="news-sent1">
                                <span>
                                  <span>Subscribed</span>
                                </span>
                              </p>
                            </div>
                            <img
                              className="status-items-child"
                              loading="lazy"
                              alt=""
                              src="./public/home/group-1000001015@2x.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="trial-banner">
                      <button className="trial-content" id="trialContent" onClick={handleTrialClick}>
                        <div className="trial-days">
                          <img
                            className="trial-icon"
                            alt=""
                            src="./public/home/trial-icon.svg"
                          />
                        </div>
                        <div className="started-30-days">
                          Start Free Trial
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="home-content-wrapper">
                  <div className="home-content">
                    <div className="home-grid">
                      <div className="select-stocks-home">
                        <div className="select-stocks-home-inner">
                          <div className="vector-wrapper">
                            <img className="frame-child1" alt="" />
                          </div>
                        </div>
                        <div className="header-columns">
                          <div className="header-items">
                            <div className="adani-group" style={{ position: 'relative' }}>
                              {loading ? (
                                'Loading...'
                              ) : (
                                filteredStockData.map((stock) => (
                                  <div
                                    key={stock.scrip_cd}
                                    style={{
                                      backgroundColor: selectedStocks.includes(stock.scrip_cd) ? '#1E2128' : '#171923',
                                      padding: '10px',
                                      marginBottom: '10px',
                                      borderRadius: '8px',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      transition: 'background-color 0.3s',
                                    }}
                                  >
                                    <span>{stock.stock_long_name}</span>

                                    {buttonStates[stock.scrip_cd] === 'plus' || !buttonStates[stock.scrip_cd] ? (
                                      <Plus
                                        onClick={() => handlePlusClick(stock.scrip_cd)}
                                        style={{ cursor: 'pointer' }}
                                      />
                                    ) : null}

                                    {buttonStates[stock.scrip_cd] === 'check' && (
                                      <Check
                                        style={{
                                          transition: 'opacity 2s',
                                          opacity: 1,
                                          backgroundColor: '#00A87E',
                                          color: 'white',
                                          borderRadius: '50%',
                                          padding: '1%'
                                        }}
                                      />
                                    )}

                                    {buttonStates[stock.scrip_cd] === 'edit' && (
                                      <Edit3
                                        onClick={() => handleEditClick(stock.scrip_cd)}
                                        style={{
                                          transition: 'opacity 2s',
                                          opacity: 1,
                                          cursor: 'pointer',
                                        }}
                                      />
                                    )}

                                    {buttonStates[stock.scrip_cd] === 'trash' && (
                                      <div
                                        onClick={() => handleRemoveClick(stock.scrip_cd)}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          backgroundColor: 'red',
                                          padding: '10px',
                                          transition: 'opacity 2s',
                                          opacity: 1,
                                          cursor: 'pointer',
                                        }}
                                      >
                                        <Trash style={{ color: 'white' }} />
                                        <span style={{ marginLeft: '4px', marginTop: '4px' }}>Remove</span>
                                      </div>
                                    )}
                                    {showWatchlistButton && (
                                      <div
                                        style={{
                                          position: 'fixed',
                                          bottom: '10px',
                                          left: '50%',
                                          transform: 'translateX(-50%)',
                                          backgroundColor: '#00A87E',
                                          color: 'white',
                                          padding: '10px 20px',
                                          borderRadius: '5px',
                                          cursor: 'pointer',
                                          zIndex: 9999, // Ensure the button has the highest stacking context
                                          transition: 'opacity 0.3s',
                                          opacity: 1,
                                          width: '80%',
                                          textAlign: 'center',
                                          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                                        }}
                                        onClick={!isProcessing ? handleAddToWatchlist : undefined}
                                      >
                                        {isProcessing ? 'Processing...' : `Add to Watchlist (${selectedStocks.length})`}
                                      </div>
                                    )}
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="stocks-header">
                      <div className="header-inner">
                        <div onClick={handleClick} className="stocks">+4600 Stocks</div>
                        <div className="stocks-icon-wrapper">
                          <img
                            className="stocks-icon"
                            alt=""
                            src="./public/home/stocks-icon.svg"
                          />
                        </div>
                      </div>
                      <h3 className="how-it-works">How it works?</h3>
                    </div>
                  </div>
                </div>
                <div className="number-content-wrapper">
                  <div className="number-content">
                    <div className="number-steps">
                      <div className="steps-container">
                        <div className="step-items">
                          <div className="step-dividers">01</div>
                        </div>
                        <div className="step-items1">
                          <div className="step-items-child" />
                        </div>
                        <div className="step-items2">
                          <div className="div">02</div>
                        </div>
                        <div className="step-items3">
                          <div className="step-items-child" />
                        </div>
                      </div>
                      <div className="input-fields">
                        <div className="number-input">
                          <div className="input-container">
                            <div className="number-fields">
                              <div className="enter-your-whatsapp">
                                Get OTP on Whatsapp for verification
                              </div>
                              <div className="enter-your-whatsapp1">
                                Enter OTP received on WhatsApp to signup
                              </div>
                            </div>
                            <div className="input-components">
                              <div className="rectangle-group">
                                <div className="rectangle-div" />
                                <div className="rectangle-container">
                                  <div className="frame-child11" />
                                  <div className="number-labels">
                                    <div className="whatsapp-number">
                                      WhatsApp Number
                                    </div>
                                  </div>
                                  <div className="input-boxes">
                                    <div className="input-content">
                                      <div className="xx">+ XX</div>
                                      <div className="whatsapp-number">XXXXX XXXXX</div>
                                    </div>
                                    <div className="verification" />
                                  </div>
                                  <div className="verification-icon">
                                    <div className="verification-tick">
                                      <img
                                        className="verification-check-icon"
                                        loading="lazy"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="input-dots">
                                  <div className="ovals" />
                                </div>
                              </div>
                              <div className="rectangle-parent1">
                                <div className="rectangle-div" />
                                <div className="rectangle-parent2">
                                  <div className="frame-child13" />
                                  <div className="otp-verification-wrapper">
                                    <div className="whatsapp-number">
                                      OTP Verification
                                    </div>
                                  </div>
                                  <div className="otp-placeholder-parent">
                                    <div className="otp-placeholder">
                                      <div className="div1">*</div>
                                    </div>
                                    <div className="frame-parent8">
                                      <div className="frame-parent9">
                                        <div className="wrapper">
                                          <div className="div1">*</div>
                                        </div>
                                        <div className="wrapper">
                                          <div className="div1">*</div>
                                        </div>
                                      </div>
                                      <div className="frame-wrapper">
                                        <div className="otp-icon-wrapper">
                                          <img
                                            className="otp-icon"
                                            alt=""
                                            src="./public/home/otp-icon.svg"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="otp-placeholder">
                                      <div className="div1">*</div>
                                    </div>
                                  </div>
                                  <img
                                    className="union-icon"
                                    loading="lazy"
                                    alt=""
                                    src="./public/home/union.svg"
                                  />
                                </div>
                                <div className="input-dots">
                                  <div className="ovals" />
                                </div>
                              </div>
                              <img
                                className="input-components-child"
                                loading="lazy"
                                alt=""
                                src="./public/home/group-1000000975@2x.png"
                              />
                            </div>
                          </div>
                          <div className="add-stocks-to-watchlist-parent">
                            <div className="add-stocks1">
                              Add stocks to watchlist
                            </div>
                            <div className="select-stocks-subscribe">
                              Select stocks that you follow or subscribe to our list
                            </div>
                            <div className="watchlist-input">
                              <div className="search-bar">
                                <div className="rectangle-parent3">
                                  <div className="frame-child14" />
                                  <div className="search-box" />
                                  <div className="frame-parent10">
                                    <div className="frame-wrapper1">
                                      <img
                                        className="group-icon"
                                        loading="lazy"
                                        alt=""
                                      />
                                    </div>
                                    <div className="search-stock">Search Stock</div>
                                  </div>
                                </div>
                                <div className="stock-categories">
                                  <div className="category-list">
                                    <div className="category-items">
                                      <b className="all1">All</b>
                                    </div>
                                    <div className="category-items1">
                                      <div className="all-nifty-501">All Nifty 50</div>
                                    </div>
                                    <div className="category-items2">
                                      <div className="bank-nifty1">Bank Nifty</div>
                                    </div>
                                  </div>
                                  <div className="stock-list">
                                    <div className="stock-items">
                                      <div className="stock-details">
                                        <img
                                          className="stock-details-child"
                                          alt=""
                                          src="./public/home/vector-199.svg"
                                        />
                                      </div>
                                      <div className="abb-india-limited">
                                        ABB India Limited (Abb)
                                      </div>
                                      <img
                                        className="fire-icon"
                                        alt=""
                                        src="./public/home/fire.svg"
                                      />
                                    </div>
                                    <div className="stock-items1">
                                      <div className="stock-items-inner">
                                        <img
                                          className="stock-details-child"
                                          alt=""
                                          src="./public/home/vector-199.svg"
                                        />
                                      </div>
                                      <div className="adani-energy-solutions">
                                        Adani Energy Solutions (Adanisolen)
                                      </div>
                                    </div>
                                    <div className="stock-items2">
                                      <div className="stock-tick-wrapper">
                                        <img
                                          className="stock-tick-icon"
                                          alt=""
                                          src="./public/home/vector-199-11.svg"
                                        />
                                      </div>
                                      <div className="adani-energy-solutions">
                                        Adani Enterprises Ltd (Adanigreen)
                                      </div>
                                      <img
                                        className="fire-icon"
                                        alt=""
                                        src="./public/home/fire-1.svg"
                                      />
                                    </div>
                                    <div className="stock-items3">
                                      <div className="stock-items-inner">
                                        <img
                                          className="stock-details-child"
                                          alt=""
                                          src="./public/home/vector-199.svg"
                                        />
                                      </div>
                                      <div className="abb-india-limited">
                                        Indusland bank
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="instant-insights-parent">
                      <div className="instant-insights">
                        <div className="div">03</div>
                      </div>
                      <div className="input-fields">
                        <div className="enter-your-whatsapp">
                          Get instant WhatsApp insights
                        </div>
                        <div className="get-insights-whatsapp">
                          We deliver 99% news in less that 60 seconds
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="one-metric-content-wrapper">
            <div className="one-metric-content">
              <div className="one-metric-description">
                <div className="one-metric-logo-container">
                  <img
                    className="one-metric-logo-container-child"
                    loading="lazy"
                    alt=""
                    src="./public/home/image-18-1@2x.png"
                  />
                </div>
                <div className="trial-days">
                  <div className="one-metric-title">
                    <div className="onemetric1">OneMetric</div>
                    <div className="onemetricai">@OneMetric.in</div>
                  </div>
                </div>
              </div>
              <div className="vivamus-posuere-orci-container">
                <span>Infibeam Avenues AI arm </span>
                <span className="posuere">http://Phronetic.AI</span>
                <span>
                  ,secured two major contracts for its Theia Vision AI product, AI Facility Manager. The contracts, worth USD 1 million annually, are with five leading hospitals in India and a UAE-based gas station chain, for a five-year period
                </span>
              </div>
              <div className="frame-parent11">
                <div className="rectangle-parent4">
                  <div className="frame-child14" />
                  <div className="post-box" />
                  <div className="post-button">
                    <div className="post-icon-container">
                      <img
                        className="post-icon"
                        loading="lazy"
                        alt=""
                        src="./public/home/group-1000000977.svg"
                      />
                    </div>
                    <div className="post">Post</div>
                  </div>
                </div>
                <div className="rectangle-parent5">
                  <div className="frame-child18" />
                  <div className="line-div" />
                  <div className="frame-child19" />
                  <div className="frame-child20" />
                  <div className="frame-child21" />
                  <div className="frame-child22" />
                  <div className="metric-containers-parent">
                    <div className="metric-containers">
                      <div className="metric-separators" />
                      <div className="metric-boxes" />
                      <div className="metric-separators" />
                    </div>
                    <div className="metric-containers1">
                      <div className="metric-separators" />
                      <div className="metric-containers-inner" />
                      <div className="metric-separators" />
                    </div>
                    <div className="metric-containers2">
                      <div className="metric-containers-child2" />
                      <div className="metric-containers-child3" />
                      <div className="metric-containers-child2" />
                    </div>
                    <div className="metric-containers3">
                      <div className="metric-containers-child5" />
                      <div className="metric-containers-child2" />
                    </div>
                    <div className="metric-containers4">
                      <div className="metric-containers-child2" />
                      <div className="metric-containers-child3" />
                      <div className="metric-containers-child2" />
                    </div>
                    <div className="metric-containers5">
                      <div className="metric-containers-child2" />
                      <div className="metric-containers-child11" />
                      <div className="metric-containers-child2" />
                    </div>
                    <div className="metric-containers6">
                      <div className="metric-containers-child2" />
                      <div className="metric-containers-child14" />
                      <div className="metric-containers-child2" />
                    </div>
                    <div className="metric-containers7">
                      <div className="metric-containers-child2" />
                      <div className="metric-containers-child14" />
                      <div className="metric-containers-child2" />
                    </div>
                    <div className="metric-containers8">
                      <div className="metric-containers-child2" />
                      <div className="metric-containers-child20" />
                      <div className="metric-containers-child21" />
                    </div>
                    <div className="metric-containers9">
                      <div className="metric-containers-child2" />
                      <div className="metric-containers-child23" />
                      <div className="metric-containers-child21" />
                    </div>
                    <div className="metric-containers10">
                      <div className="metric-containers-child25" />
                      <div className="metric-containers-child26" />
                      <div className="metric-separators" />
                    </div>
                    <div className="metric-containers11">
                      <div className="metric-containers-child25" />
                      <div className="metric-containers-child26" />
                      <div className="metric-separators" />
                    </div>
                  </div>
                  <img
                    className="frame-child23"
                    loading="lazy"
                    alt=""
                    src="./public/home/vector-211.svg"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="free-trial-button">
            <button className="trial-button-container" onClick={handleTrialClick}>
              <div className="start-30-days">Start Free Trial</div>
            </button>
          </section>
          <section className="simply-grow-content-wrapper">
            <div className="simply-grow-content">
              <h3 className="why-simply-grow">Why Onemetric?</h3>
              <div className="simply-grow-features">
                <div className="feature-containers">
                  <div className="feature-items">
                    <div className="icon-background-parent">
                      <div className="icon-background" />
                      <img
                        className="feature-checkmark-icon"
                        loading="lazy"
                        alt=""
                        src="./public/whatsapp.png"
                      />
                    </div>
                  </div>
                  <div className="effortless-tracking-seamless">
                    Effortless Tracking, Seamless WhatsApp Integration
                  </div>
                </div>
                <div className="feature-containers1">
                  <div className="vector-wrapper8">
                    <img
                      className="vector-icon1"
                      loading="lazy"
                      alt=""
                      src="./public/home/vector-2.svg"
                    />
                  </div>
                  <div className="effortless-tracking-seamless">
                    Lightning-Fast Stock News curated for you
                  </div>
                </div>
                <div className="feature-containers2">
                  <div className="feature-containers-inner">
                    <img
                      className="frame-child24"
                      loading="lazy"
                      alt=""
                      src="./public/home/vector-21.svg"
                    />
                  </div>
                  <div className="effortless-tracking-seamless-1">
                    Your Language, Your Choice
                  </div>
                  {/* <div className="coming-soon-wrapper3">
                    <i className="coming-soon1">Coming soon</i>
                  </div> */}
                </div>
                <div className="feature-containers3">
                  <div className="group-wrapper">
                    <img
                      className="group-icon1"
                      loading="lazy"
                      alt=""
                      src="./public/home/group.svg"
                    />
                  </div>
                  <div className="sub-feature-descriptions-parent">
                    <div className="sub-feature-descriptions">
                      <div className="effortless-tracking-seamless">
                        Daily Impact Reports &amp; Market Insights
                      </div>
                    </div>
                    <div className="coming-soon-wrapper1">
                      <i className="coming-soon1">Coming soon</i>
                    </div>
                  </div>
                </div>
                <div className="feature-containers4">
                  <div className="feature-containers-child">
                    <img
                      className="frame-child25"
                      loading="lazy"
                      alt=""
                      src="./public/home/group1.svg"
                    />
                  </div>
                  <div className="sub-feature-descriptions-parent">
                    <div className="sub-feature-descriptions-1">
                      <div className="effortless-tracking-seamless">
                        Family Portfolio Tracking
                      </div>
                    </div>
                    <div className="coming-soon-wrapper2">
                      <i className="upgrade-available">Coming Soon</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <h3 className="why-simply-grow2">Affordable plans</h3>
          <section className="affordable-plans">
            <div className="plan-options">
              <h3 className="why-simply-grow1">Affordable plans</h3>
              {loading ? 'Loading...' : planData.map((plan, index) => (
                <div key={plan.id} className="diamond-plan">
                  <div className="diamond-details">
                    <div className="diamond-name-container">
                      <a className={index % 2 === 0 ? "gold" : "diamond"}>{index % 2 === 0 ? "Gold" : "Diamond"}</a>
                      <button className={index % 2 === 0 ? "plan-duration" : "diamond-billing"}>
                        <div className={index % 2 === 0 ? "monthly" : "yearly"}>{index % 2 === 0 ? "Monthly" : "Yearly"}</div>
                      </button>
                    </div>
                    <div className="diamond-price">
                      <h1 className="h1" style={{ color: index % 2 === 0 ? "#bdc25d" : "#7994ff" }}>₹</h1>
                      <b className="diamond-value">
                        <span className="diamond-value-txt-container">
                          <span>{index % 2 === 0 ? <s style={{ color: '#0FF74D' }}>799</s> : <s style={{ color: '#0FF74D' }}>7999</s>} {plan.amount_in_rs}</span>
                          <span className="span">+ GST</span>
                        </span>
                      </b>
                    </div>
                  </div>
                  <div className="diamond-features">
                    <div className="diamond-feature-containers">
                      <div className="diamond-feature-items">
                        <div className="diamond-feature-icons">
                          <img
                            className="diamond-feature-checkmarks"
                            loading="lazy"
                            alt=""
                            src="./public/home/vector-207-2.svg"
                          />
                        </div>
                      </div>
                      <div className="diamond-feature-descriptions">
                        <div className="track-up-to">Track up to 500 stocks</div>
                        <div className="ideal-for-beginners">
                          {index % 2 === 0 ? "Ideal for beginners and casual investors" : "Ideal for Traders and Fund Managers"}
                        </div>
                      </div>
                    </div>
                    <div className="diamond-feature-containers">
                      <div className="diamond-feature-items">
                        <div className="diamond-feature-icons">
                          <img
                            className="diamond-feature-checkmarks"
                            loading="lazy"
                            alt=""
                            src="./public/home/vector-207-2.svg"
                          />
                        </div>
                      </div>
                      <div className="diamond-feature-descriptions">
                        <div className="track-up-to">Real-time updates</div>
                        <div className="ideal-for-beginners">
                          Get instant alerts and insights without any delay.
                        </div>
                      </div>
                    </div>
                    <div className="diamond-feature-containers">
                      <div className="diamond-feature-items">
                        <div className="diamond-feature-icons">
                          <img
                            className="diamond-feature-checkmarks"
                            loading="lazy"
                            alt=""
                            src="./public/home/vector-207-2.svg"
                          />
                        </div>
                      </div>
                      <div className="diamond-feature-descriptions">
                        <div className="days-free-trial">{plan.duration_in_months} {plan.duration_in_months === 1 ? "Month" : "Months"}</div>
                      </div>
                    </div>
                    <div className="diamond-feature-containers">
                      <div className="coming-soon-wrapper">
                        <i className="coming-soon">Coming soon</i>
                      </div>
                      <div className="diamond-feature-items">
                        <div className="diamond-feature-icons">
                          <img
                            className="diamond-feature-checkmarks"
                            loading="lazy"
                            alt=""
                            src="./public/home/vector-207-2.svg"
                          />
                        </div>
                      </div>
                      <div className="diamond-feature-descriptions">
                        <div className="languages">Multilingual</div>
                        <div className="ideal-for-beginners">
                          Available in 9 languages
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="start-now-wrapper" onClick={() => handleStartNowClick(plan.id)} disabled={processingPlanId === plan.id}>
                    <div className="start-now">{processingPlanId === plan.id ? "Processing...." : "Subscribe Now"}</div>
                  </button>
                </div>
              ))}
            </div>
          </section>
          <section className="f-a-q-container-wrapper">
            <div className="plan-options1">
              <h3 className="faq">FAQs</h3>
              <div className="questions">
                {[
                  {
                    question: "What is OneMetric and what does it do?",
                    answer: "OneMetric is a platform that delivers personalized stock news, insights, and charts directly to your WhatsApp."
                  },
                  {
                    question: "Is OneMetric an app or does it work on WhatsApp?",
                    answer: "OneMetric works directly through WhatsApp, so there's no need to download a separate app."
                  },
                  {
                    question: "How much does OneMetric cost?",
                    answer: "OneMetric offers two plans: Gold and Diamond. Please check our pricing section for current rates and features."
                  }
                ].map((faq, index) => (
                  <div key={index} className="what-is-container-wrapper">
                    <div className="what-is-container" onClick={() => toggleFAQ(index)}>
                      <div className="diamond-feature-descriptions">
                        <div className="what-is-simplygrow">
                          {faq.question}
                        </div>
                        {openFAQs[index] && (
                          <div className="simplygrow-is-a">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                      <div className="what-is-container-inner">
                        <img
                          className="frame-child32"
                          loading="lazy"
                          alt=""
                          src={openFAQs[index] ? "./public/home/vector-212.svg" : "./public/home/vector-212-1.svg"}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className="referral-container-wrapper">
            <div className="referral-container">
              <div className="referral">
                <div className="refer-and-get-container">
                  <span className="free-month">
                    <span className="free-month1">Refer Now</span>
                  </span>&nbsp;
                  <span>to</span>&nbsp;
                  <span className="free-month">
                    <span className="free-month1">Unlock Rewards,</span>
                  </span>&nbsp;
                  <span>build your</span>&nbsp;
                  <span className="free-month">
                    <span className="free-month1">#OneMStreak</span>
                  </span>
                </div>
                <button className="referral-button" onClick={handleReferClick}>
                  <div className="refer-now">Refer Now</div>
                </button>
              </div>
              <div className="referral-container-child" />
              <img
                className="empty-icon"
                loading="lazy"
                alt=""
                src="./public/home/8731674-1.svg"
              />
            </div>
          </div>
          <section className="footer">
            <div className="footer-container">
              <div className="frame-parent">
                <img
                  className="frame-item"
                  alt=""
                  src="./public/home/group-1000000964.svg"
                />
                <img
                  className="frame-inner"
                  alt=""
                  src="./public/home/group-1000000966.svg"
                />
              </div>
              <div className="frame-parent15">
                <img
                  className="frame-child37"
                  alt=""
                  src="./public/home/group-1000001000.svg"
                />
                <div className="add-stocks">Add Stocks</div>
              </div>
              <img
                className="image-18-icon1"
                loading="lazy"
                alt=""
                src="./public/home/OneMetric_Transparent.png"
                onClick={handleHomeClick} style={{ cursor: 'pointer' }}
              />
              <div className="footer-branding">
                <div className="sign-in-button-wrapper" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                  <b className="onemetric2">OneMetric</b>
                </div>
              </div>
              <div className="social-icons">
                <div className="icon-background-group">
                  <div className="icon-background1" />
                  <img
                    className="icon-image"
                    loading="lazy"
                    alt=""
                    src="./public/home/vector-3.svg"
                    onClick={handleWhatsAppRedirect} style={{ cursor: 'pointer' }}
                  />
                </div>
                <img
                  className="second-icon"
                  loading="lazy"
                  alt=""
                  src="./public/home/vector-4.svg"
                  onClick={handleTwitterRedirect} style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
            <div className="footer-links">
              <div className="links-container">
                <img
                  className="social-media-icons"
                  alt=""
                  src="./public/home/social-media-icons.svg"
                />
                <div className="link-columns-parent">
                  <div className="link-columns">
                    <a href='/about' style={{ textDecoration: "none", color: "inherit" }} className="about-us">About Us</a>
                    <a href='/disclaimer' style={{ textDecoration: "none", color: "inherit" }} className="contact-us">Disclaimer</a>
                    <a href='/refund' style={{ textDecoration: "none", color: "inherit" }} className="refund-policy">Refund Policy</a>
                    <a href='/newsfeed' style={{ textDecoration: "none", color: "inherit" }} className="refund-policy">News Feed</a>
                    <a href='/plans' style={{ textDecoration: "none", color: "inherit" }} className="refund-policy">Pricing</a>
                  </div>
                  <div className="link-columns1">
                    <a href='/privacy' style={{ textDecoration: "none", color: "inherit" }} className="terms-conditions">Privacy Policy</a>
                    <a href='/terms' style={{ textDecoration: "none", color: "inherit" }} className="terms-conditions">Terms &amp; conditions</a>
                    <a href='/referral' style={{ textDecoration: "none", color: "inherit" }} className="referral-policy">Referral Policy</a>
                    <a href='/contact' style={{ textDecoration: "none", color: "inherit" }} className="referral-policy">Contact Us</a>
                  </div>
                </div>
                <img
                  className="social-media-icons1"
                  alt=""
                  src="./public/home/social-media-icons.svg"
                />
              </div>
            </div>
          </section>
          <div className="homepage-item" />
          <img className="subtract-icon" alt="" src="./public/home/subtract.svg" />
          <div className="copyright">
            <div className="copyright-container">
              <div className="simply-grow-all">
                OneMetric, All Right reserved © 2024
              </div>
              <div className="social-media">
                <div className="social-icon">
                  <img
                    className="social-image-icon"
                    loading="lazy"
                    alt=""
                    src="./public/home/vector-5.svg"
                  />
                  <img
                    className="social-icon-child"
                    loading="lazy"
                    alt=""
                    src="./public/home/group-219911503.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeMobileView>
  )
}

export default Home