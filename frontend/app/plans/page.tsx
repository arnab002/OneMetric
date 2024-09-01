'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseApiURL from '@/baseUrl';
import '../../public/assets/plans.css'
import { User } from 'react-feather';
import { BarLoader, PulseLoader } from 'react-spinners'; // Import multiple loaders
import logo from "../../public/public/home/image-18@2x.png";
import PlanMobileView from '@/middlewares/plan/PlanMobileView';

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface Plan {
  id: number;
}

function Home() {
  const [planData, setPlanData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);
  const [contentReady, setContentReady] = useState<boolean>(false);

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

  const handleHomeClick = () => {
    window.location.href = '/'
  };

  const handleTwitterRedirect = () => {
    window.open('https://x.com/Onemetric_in', '_blank');
  };

  const handleWhatsAppRedirect = () => {
    window.open('https://api.whatsapp.com/send?phone=917204946777&text=Hi', '_blank');
  };

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

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleUserAccountClick = () => {
    window.location.href = '/userAccount'
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await axios.get<{ data: Plan[] }>(`${baseApiURL()}/plans`);
        const filteredPlans = response.data.data.filter((plan: Plan) => ![1].includes(plan.id));
        setPlanData(filteredPlans);
        setLoading(false);
        setTimeout(() => setContentReady(true), 1000);
      } catch (error) {
        console.error('Error fetching plan data:', error);
        setLoading(false);
        setContentReady(true);
      }
    };

    fetchPlanData();
  }, []);

  const fetchUserDetails = async (userId: string) => {
    try {
      const token = localStorage.getItem('authToken');
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
    if (!token) {
      console.error('No token found in localStorage');
      setProcessingPlanId(null);
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

      const { transaction_id, payment_order_id, user_id, plan_id, amount, status } = response.data;

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
    } finally {
      setProcessingPlanId(null);
    }
  };

  if (loading || !contentReady) {
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
    <PlanMobileView>
      <div>
        <div className="homepage">
          <div className="homepage-child" />
          <section className="content">
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
                        <User onClick={handleUserAccountClick} style={{ cursor: 'pointer' }} />
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
                </div>
              </div>
            </div>
          </section>
          <section className="affordable-plans">
            <div className="plan-options">
              <h3 className="why-simply-grow">Affordable Plans</h3>
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
                          Get instant alerts and insights <br /> without any delay.
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
                    <a href='/insights' style={{ textDecoration: "none", color: "inherit" }} className="refund-policy">News Feed</a>
                    <a href='/plans' className="refund-policy" style={{ textDecoration: "none", color: "inherit" }}>Pricing</a>
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
    </PlanMobileView>
  )
}

export default Home
