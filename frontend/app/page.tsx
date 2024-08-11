'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import baseApiURL from '@/baseUrl';
import '../public/assets/index.css'
import logo from "../public/public/home/image-18@2x.png";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

function Home() {
  const [stockData, setStockData] = useState<any[]>([]);
  const [planData, setPlanData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [filteredStockData, setFilteredStockData] = useState<any[]>([]);
  const [openFAQs, setOpenFAQs] = useState<{ [key: number]: boolean }>({});
  const searchParams = useSearchParams();
  const mobile = searchParams.get('mobile');
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

  const toggleFAQ = (index: number) => {
    setOpenFAQs(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleClick = () => {
    router.push(`/insights?mobile=${mobile}`);
  };

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'All') {
      setFilteredStockData(stockData);
    } else {
      const filtered = stockData.filter(stock => stock.sc_type === tab);
      setFilteredStockData(filtered);
    }
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`${baseApiURL()}/stocks`);
        const data = response.data.slice(0, 30);
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
        const response = await axios.get<any[]>(`${baseApiURL()}/allPlans`);
        const filteredPlans = response.data.filter(plan => ![1].includes(plan.id));
        setPlanData(filteredPlans);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plan data:', error);
        setLoading(false);
      }
    };

    fetchPlanData();
  }, []);

  const fetchUserDetails = async (userId: string) => {
    try {
      const response = await axios.post(`${baseApiURL()}/user/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  const handleStartNowClick = async (planId: string) => {
    if (!razorpayLoaded) {
      console.error('Razorpay script not loaded');
      return;
    }

    const token = sessionStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in sessionStorage');
      return;
    }

    try {
      const response = await axios.post(`${baseApiURL()}/createPayment`, {
        plan_id: planId,
        token: token,
      });

      const { transaction_id, payment_order_id, user_id, plan_id, amount, status } = response.data;

      if (status === 'pending') {

        const userDetails = await fetchUserDetails(user_id);

        if (!userDetails) {
          console.error('Failed to fetch user details');
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
            alert(`Payment ID: ${response.razorpay_payment_id}`);
            alert(`Order ID: ${response.razorpay_order_id}`);
            alert(`Signature: ${response.razorpay_signature}`);
            // Optionally, redirect or update the UI after successful payment
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
    }
  };

  const handleStartTrialClick = async () => {
    if (!razorpayLoaded) {
      console.error('Razorpay script not loaded');
      return;
    }

    const token = sessionStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in sessionStorage');
      return;
    }

    try {
      const response = await axios.post(`${baseApiURL()}/createPayment`, {
        plan_id: '1',
        token: token,
      });

      const { transaction_id, payment_order_id, user_id, plan_id, amount, status } = response.data;

      if (status === 'pending') {

        const userDetails = await fetchUserDetails(user_id);

        if (!userDetails) {
          console.error('Failed to fetch user details');
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
            alert(`Payment ID: ${response.razorpay_payment_id}`);
            alert(`Order ID: ${response.razorpay_order_id}`);
            alert(`Signature: ${response.razorpay_signature}`);
            // Optionally, redirect or update the UI after successful payment
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
    }
  };

  return (
    <div>
      <div className="homepage">
        <div className="homepage-child" />
        <section className="rectangle-parent">
          <div className="frame-child" />
          <div className="add-to-your-watchlist-parent">
            <h3 className="add-to-your">Add to your watchlist</h3>
            <div className="select-your-stocks">
              Select your stocks to get Latest news now.
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
            src="./public/home/group-1000001008.svg"
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
                    src="./public/home/image-18@2x.png"
                  />
                  <div className="sign-in-button-wrapper">
                    <div className="sign-in-button-wrapper">
                      <a className="onemetric" href='/'>OneMetric</a>
                    </div>
                  </div>
                  <button className="sign-in-wrapper" id="frameButton">
                    <a className="sign-in" href='/login'>Sign In</a>
                  </button>
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
                <div className="whats-app-promo">
                  <div className="whats-app-promo-child" />
                  <div className="promo-content">
                    <div className="promo-columns">
                      <div className="promo-column-one">
                        <div className="get-lighting-container">
                          <p className="get-lighting-">Get Lighting - Fast</p>
                          <p className="stock-news-on">
                            <span>
                              <span className="stock-news">Stock news</span>
                              <span className="on"> on</span>
                            </span>
                          </p>
                          <p className="get-lighting-">
                            <span>
                              <b className="whats-app1">Whats App</b>
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
                                <span>600+</span>
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
                                <span>1200+</span>
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
                    <button className="trial-content" id="trialContent" onClick={handleStartTrialClick}>
                      <div className="trial-days">
                        <img
                          className="trial-icon"
                          alt=""
                          src="./public/home/trial-icon.svg"
                        />
                      </div>
                      <div className="started-30-days">
                        Start 14 Days Free Trial
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
                          <div className="adani-group">
                            {loading ? 'Loading...' : filteredStockData.map(stock => (
                              <div key={stock.isin_code}>
                                {stock.stock_long_name}
                                <br /><br />
                              </div>
                            ))}
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
                              Enter your WhatsApp number
                            </div>
                            <div className="enter-your-whatsapp1">
                              Enter Your WhatsApp, receive a code via WhatsApp/SMS for
                              verification.
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
                          <div className="enter-your-whatsapp">
                            Add stocks to watchlist
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
                  src="./public/home/group-1000000965.svg"
                />
              </div>
              <div className="trial-days">
                <div className="one-metric-title">
                  <div className="onemetric1">OneMetric</div>
                  <div className="onemetricai">@OneMetricAi</div>
                </div>
              </div>
            </div>
            <div className="vivamus-posuere-orci-container">
              <span>Vivamus </span>
              <span className="posuere">#posuere</span>
              <span>
                orci a leo sodales, sed aliquet arcu consequat. Ut molestie porttitor
              </span>
              <span className="posuere">#sapien</span>
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
          <button className="trial-button-container" onClick={handleStartTrialClick}>
            <div className="started-30-days">Start 14 Days Free Trial</div>
          </button>
        </section>
        <section className="simply-grow-content-wrapper">
          <div className="simply-grow-content">
            <h3 className="why-simply-grow">Why One Metric?</h3>
            <div className="simply-grow-features">
              <div className="feature-containers">
                <div className="feature-items">
                  <div className="icon-background-parent">
                    <div className="icon-background" />
                    <img
                      className="feature-checkmark-icon"
                      loading="lazy"
                      alt=""
                      src="./public/home/vector-1.svg"
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
                <div className="effortless-tracking-seamless">
                  Your Language, Your Choice
                </div>
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
                  <div className="coming-soon-wrapper">
                    <i className="coming-soon">Coming soon</i>
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
                  <div className="sub-feature-descriptions">
                    <div className="effortless-tracking-seamless">
                      Family Portfolio Tracking
                    </div>
                  </div>
                  <div className="coming-soon-wrapper">
                    <i className="upgrade-available">Upgrade Available</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="affordable-plans">
          <div className="plan-options">
            <h3 className="why-simply-grow">Affordable plans!</h3>
            {loading ? 'Loading...' : planData.map((plan, index) => (
              <div key={plan.id} className="diamond-plan">
                <div className="diamond-details">
                  <div className="diamond-name-container">
                    <a className={index % 2 === 0 ? "diamond" : "gold"}>{index % 2 === 0 ? "Diamond" : "Gold"}</a>
                    <button className={index % 2 === 0 ? "diamond-billing" : "plan-duration"}>
                      <div className={index % 2 === 0 ? "yearly" : "monthly"}>{index % 2 === 0 ? "Yearly" : "Monthly"}</div>
                    </button>
                  </div>
                  <div className="diamond-price">
                    <h1 className="h1" style={{color: index % 2 === 0 ? "#7994ff" : "#bdc25d"}}>₹</h1>
                    <b className="diamond-value">
                      <span className="diamond-value-txt-container">
                        <span>{plan.amount_in_rs}</span>
                        <span className="span">.00 + 18% GST</span>
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
                        />
                      </div>
                    </div>
                    <div className="diamond-feature-descriptions">
                      <div className="track-up-to">Track up to 50 stocks</div>
                      <div className="ideal-for-beginners">
                        Ideal for beginners and casual investors
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
                      <div className="languages">12 Languages</div>
                      <div className="ideal-for-beginners">
                        Enjoy news and charts in English or Hindi
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
                </div>
                <button className="start-now-wrapper" onClick={() => handleStartNowClick(plan.id)}>
                  <div className="start-now">Start Now</div>
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="f-a-q-container-wrapper">
          <div className="plan-options">
            <h3 className="faq">FAQ</h3>
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
                <span>Refer and get a </span>
                <span className="free-month">
                  <span className="free-month1">FREE month</span>
                </span>
                <span>
                  <span className="free-month"> </span>
                  <span>of Diamond Plan worth</span>
                  <span className="span3"> </span>
                </span>
                <span className="free-month">
                  <b className="b">₹</b>
                  <span className="span5"> </span>
                  <span className="free-month1">1799</span>
                </span>
              </div>
              <button className="referral-button">
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
              src="./public/home/image-18-1@2x.png"
            />
            <div className="footer-branding">
              <div className="sign-in-button-wrapper">
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
                />
              </div>
              <img
                className="second-icon"
                loading="lazy"
                alt=""
                src="./public/home/vector-4.svg"
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
                  <a href='#' style={{ textDecoration: "none", color: "inherit" }} className="contact-us">Contact Us</a>
                  <a href='/refund' style={{ textDecoration: "none", color: "inherit" }} className="refund-policy">Refund Policy</a>
                </div>
                <div className="link-columns1">
                  <a href='#' style={{ textDecoration: "none", color: "inherit" }} className="terms-conditions">Terms &amp; conditions</a>
                  <a href='/referral' style={{ textDecoration: "none", color: "inherit" }} className="referral-policy">Referral Policy</a>
                  <a href='#' style={{ textDecoration: "none", color: "inherit" }} className="faqs">FAQs</a>
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
  )
}

export default Home
