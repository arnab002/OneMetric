'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseApiURL from '@/baseUrl';
import logo from "../../public/public/home/OneMetric_Transparent.png";
import '../../public/assets/plan-global.css';
import '../../public/assets/plan-desktop.css';
import CustomSidebar from '../sidebar';
import { BarLoader, PulseLoader } from 'react-spinners'; // Import multiple loaders
import { User } from 'react-feather';
import PlanDesktopView from '@/middlewares/plan/PlanDesktopView';

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface Plan {
    id: number;
}

function PlanDesktop() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
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

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
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
        const fetchPlanData = async () => {
            try {
                const response = await axios.get<{ data: Plan[] }>(`${baseApiURL()}/plans`);
                const filteredPlans = response.data.data.filter((plan: Plan) => ![0,1].includes(plan.id));
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
                        Authorization: `${token}`, // Passing the token in the Authorization header
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
        <PlanDesktopView>
            <div>
                <div className="homepage">
                    <header className="image-18-parent">
                        <img
                            className="image-18-icon"
                            loading="lazy"
                            alt=""
                            src="./public/home-desktop/OneMetric_Transparent.png"
                            onClick={handleHomeClick} style={{ cursor: 'pointer' }}
                        />
                        <div className="one-metric-sign-in-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="one-metric-sign-in-logo-contai">
                                <a className="onemetric1">OneMetric</a>
                            </div>
                        </div>
                        {isLoggedIn ? (
                            <div className="user-icon-wrapper" style={{ position: 'relative' }}>
                                <User onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
                            </div>
                        ) : (
                            <button className="sign-in-button-container">
                                <a className="sign-in" href='/login'>Sign In</a>
                            </button>
                        )}
                    </header>
                    <div className="homepage-inner2">
                        <div className="frame-parent47">
                            <div className="affordable-plans-wrapper">
                                <h1 className="affordable-plans">Affordable Plans</h1>
                            </div>
                            {loading ? 'Loading...' : (
                                <div className="plans-container">
                                    {planData.map((plan, index) => (
                                        <div key={plan.id} className="plan-card">
                                            <div className="chat-bubble1">
                                                <div className={index % 2 === 0 ? "gold-plan" : "frame-parent48"}>
                                                    <div className="plan-type">
                                                        <h1 className={index % 2 === 0 ? "gold" : "diamond"} style={{ color: index % 2 === 0 ? '#bdc25d' : '#7994ff' }}>{index % 2 === 0 ? "Gold" : "Diamond"}</h1>
                                                        <button className={index % 2 === 0 ? "monthly-plan" : "yearly-plan"}>
                                                            <div className={index % 2 === 0 ? "monthly" : "yearly"}>{index % 2 === 0 ? "Monthly" : "Yearly"}</div>
                                                        </button>
                                                    </div>
                                                    <div className="amet-minim-mollit-non-deserunt">
                                                        <h1 className="h1" style={{ color: index % 2 === 0 ? "#bdc25d" : "#7994ff" }}>₹</h1>
                                                        <b className="price">
                                                            <span className="sad-face-txt-container">
                                                                <span>{index % 2 === 0 ? <s style={{ color: '#0FF74D' }}>799</s> : <s style={{ color: '#0FF74D' }}>7999</s>} {plan.amount_in_rs}</span>
                                                                <span className="span">+ GST</span>
                                                            </span>
                                                        </b>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="div2">
                                                <div className="diamond-plan-details">
                                                    <div className="marvin-mckinney">
                                                        <div className="mins-ago-edited">
                                                            <img
                                                                className="edit-profile-icon"
                                                                loading="lazy"
                                                                alt=""
                                                                src="./public/home-desktop/vector-207.svg"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="comments">
                                                        <div className="track-up-to">Track up to 500 stocks</div>
                                                        <div className="ideal-for-beginners">
                                                            {index % 2 === 0 ? "Ideal for beginners and casual investors" : "Ideal for Traders and Fund Managers"}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="diamond-plan-details">
                                                    <div className="marvin-mckinney">
                                                        <div className="mins-ago-edited">
                                                            <img
                                                                className="edit-profile-icon"
                                                                loading="lazy"
                                                                alt=""
                                                                src="./public/home-desktop/vector-207.svg"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="comments">
                                                        <div className="track-up-to">Real-time updates</div>
                                                        <div className="ideal-for-beginners">
                                                            Get instant alerts and insights without any delay.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="diamond-plan-details">
                                                    <div className="marvin-mckinney">
                                                        <div className="mins-ago-edited">
                                                            <img
                                                                className="edit-profile-icon"
                                                                loading="lazy"
                                                                alt=""
                                                                src="./public/home-desktop/vector-207.svg"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="comments">
                                                        <div className="days-free-trial">{plan.duration_in_months} {plan.duration_in_months === 1 ? "Month" : "Months"}</div>
                                                    </div>
                                                </div>
                                                <div className="diamond-plan-details">
                                                    <div className="coming-soon-container">
                                                        <i className="coming-soon">Coming soon</i>
                                                    </div>
                                                    <div className="marvin-mckinney">
                                                        <div className="mins-ago-edited">
                                                            <img
                                                                className="edit-profile-icon"
                                                                loading="lazy"
                                                                alt=""
                                                                src="./public/home-desktop/vector-207.svg"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="comments">
                                                        <div className="languages">Multilingual</div>
                                                        <div className="ideal-for-beginners">
                                                            Available in 9 languages
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className={index % 2 === 0 ? "start-now-wrapper" : "continue"} onClick={() => handleStartNowClick(plan.id)} disabled={processingPlanId === plan.id}>
                                                <div className="start-now">{processingPlanId === plan.id ? "Processing...." : "Subscribe Now"}</div>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="footer-parent">
                        <footer className="footer">
                            <div className="frame-parent55">
                                <img
                                    className="image-18-icon1"
                                    alt=""
                                    src="./public/home-desktop/image-18-1@2x.png"
                                    onClick={handleHomeClick} style={{ cursor: 'pointer' }}
                                />
                                <div className="one-metric-footer">
                                    <div className="one-metric-title-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                                        <b className="onemetric3">OneMetric</b>
                                    </div>
                                </div>
                                <div className="social-icons">
                                    <div className="icon-background-parent">
                                        <div className="icon-background1" />
                                        <img
                                            className="social-icon"
                                            loading="lazy"
                                            alt=""
                                            src="./public/home-desktop/vector.svg"
                                            onClick={handleWhatsAppRedirect} style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                    <img
                                        className="social-icon1"
                                        loading="lazy"
                                        alt=""
                                        src="./public/home-desktop/vector-1.svg"
                                        onClick={handleTwitterRedirect} style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                            <div className="links-wrapper">
                                <div className="links">
                                    <img
                                        className="links-child"
                                        loading="lazy"
                                        alt=""
                                        src="./public/home-desktop/vector-172.svg"
                                    />
                                    <div className="link-containers">
                                        <div className="policy-links">
                                            <a href='/about' className="about-us" style={{ textDecoration: "none", color: "inherit" }}>About Us</a>
                                            <a href='/disclaimer' className="contact-us" style={{ textDecoration: "none", color: "inherit" }}>Disclaimer</a>
                                            <a href='/refund' className="refund-policy" style={{ textDecoration: "none", color: "inherit" }}>Refund Policy</a>
                                            <a href='/newsfeed' className="refund-policy" style={{ textDecoration: "none", color: "inherit" }}>News Feed</a>
                                            <a href='/plan' className="refund-policy" style={{ textDecoration: "none", color: "inherit" }}>Pricing</a>
                                        </div>
                                        <div className="terms-links">
                                            <a href='/privacy' className="terms-conditions" style={{ textDecoration: "none", color: "inherit" }}>Privacy Policy</a>
                                            <a href='/terms' className="terms-conditions" style={{ textDecoration: "none", color: "inherit" }}>Terms &amp; conditions</a>
                                            <a href='/referral' className="referral-policy" style={{ textDecoration: "none", color: "inherit" }}>Referral Policy</a>
                                            <a href='/contact' className="referral-policy" style={{ textDecoration: "none", color: "inherit" }}>Contact Us</a>
                                        </div>
                                    </div>
                                    <img className="links-item" alt="" src="./public/home-desktop/vector-172.svg" />
                                </div>
                            </div>
                        </footer>
                        <div className="frame-wrapper31">
                            <div className="simply-grow-all-right-reserve-parent">
                                <div className="simply-grow-all">
                                    OneMetric, All Right reserved © 2024
                                </div>
                                <div className="frame-wrapper32">
                                    <div className="copyright-icon-parent">
                                        <img
                                            className="copyright-icon"
                                            loading="lazy"
                                            alt=""
                                            src="./public/home-desktop/vector-2.svg"
                                        />
                                        <img
                                            className="frame-child113"
                                            loading="lazy"
                                            alt=""
                                            src="./public/home-desktop/group-219911503.svg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
        </PlanDesktopView>
    )
}

export default PlanDesktop
