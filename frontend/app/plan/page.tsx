'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseApiURL from '@/baseUrl';
import logo from "../../public/public/home/image-18@2x.png";
import '../../public/assets/plan-global.css';
import '../../public/assets/plan-desktop.css';
import { User, LogOut } from 'react-feather';
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
    const [planData, setPlanData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);

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
        const token = sessionStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setShowDropdown(false);
        window.location.href = '/';
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
            } catch (error) {
                console.error('Error fetching plan data:', error);
                setLoading(false);
            }
        };

        fetchPlanData();
    }, []);

    const fetchUserDetails = async (userId: string) => {
        try {
            const token = sessionStorage.getItem('authToken');
            const response = await axios.post(
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
        }
    };

    if (loading) {
        return;
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
                            src="./public/home-desktop/image-18-1@2x.png"
                        />
                        <div className="one-metric-sign-in-container">
                            <div className="one-metric-sign-in-logo-contai">
                                <a className="onemetric1">OneMetric</a>
                            </div>
                        </div>
                        {isLoggedIn ? (
                            <div className="user-icon-wrapper" style={{ position: 'relative' }}>
                                <User onClick={toggleDropdown} style={{ cursor: 'pointer' }} />
                                {showDropdown && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            right: 0,
                                            backgroundColor: '#fff',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            padding: '0px',
                                            zIndex: 1000,
                                        }}
                                    >
                                        <button
                                            onClick={handleLogout}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <LogOut size={16} style={{ marginRight: '5px' }} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className="sign-in-button-container">
                                <a className="sign-in" href='/login'>Sign In</a>
                            </button>
                        )}
                        <div className="frame-parent8">
                            <img
                                className="frame-child43"
                                alt=""
                                src="./public/home-desktop/group-1000000964.svg"
                            />
                            <img
                                className="frame-child44"
                                alt=""
                                src="./public/home-desktop/group-1000000966-1.svg"
                            />
                        </div>
                    </header>
                    <div className="homepage-inner2">
                        <div className="frame-parent47">
                            <div className="affordable-plans-wrapper">
                                <h1 className="affordable-plans">Affordable plans!</h1>
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
                                                            Ideal for beginners and casual investors
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
                                                        <div className="languages">Multilingual</div>
                                                        <div className="ideal-for-beginners">
                                                            Enjoy news and charts in English
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
                                            </div>
                                            <button className={index % 2 === 0 ? "start-now-wrapper" : "continue"} onClick={() => handleStartNowClick(plan.id)}>
                                                <div className="start-now">Start Now</div>
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
                                <div className="frame-parent8">
                                    <img
                                        className="frame-child43"
                                        alt=""
                                        src="./public/home-desktop/group-1000000964.svg"
                                    />
                                    <img
                                        className="frame-child44"
                                        alt=""
                                        src="./public/home-desktop/group-1000000966-1.svg"
                                    />
                                </div>
                                <div className="frame-parent57">
                                    <img
                                        className="frame-child112"
                                        alt=""
                                        src="./public/home-desktop/group-1000001000.svg"
                                    />
                                    <div className="your-language-your">Add Stocks</div>
                                </div>
                                <img
                                    className="image-18-icon1"
                                    alt=""
                                    src="./public/home-desktop/image-18-1@2x.png"
                                />
                                <div className="one-metric-footer">
                                    <div className="one-metric-title-container">
                                        <b className="onemetric3">OneMetric</b>
                                    </div>
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
                                            <a href='/contact' className="contact-us" style={{ textDecoration: "none", color: "inherit" }}>Contact Us</a>
                                            <a href='/refund' className="refund-policy" style={{ textDecoration: "none", color: "inherit" }}>Refund Policy</a>
                                            <a href='/plan' className="refund-policy" style={{ textDecoration: "none", color: "inherit" }}>Pricing</a>
                                        </div>
                                        <div className="terms-links">
                                            <a href='/privacy' className="terms-conditions" style={{ textDecoration: "none", color: "inherit" }}>Privacy &amp; Policy</a>
                                            <a href='/terms' className="terms-conditions" style={{ textDecoration: "none", color: "inherit" }}>Terms &amp; conditions</a>
                                            <a href='/referral' className="referral-policy" style={{ textDecoration: "none", color: "inherit" }}>Referral Policy</a>
                                            <div className="social-icons">
                                                <div className="icon-background-parent">
                                                    <div className="icon-background1" />
                                                    <img
                                                        className="social-icon"
                                                        loading="lazy"
                                                        alt=""
                                                        src="./public/home-desktop/vector.svg"
                                                    />
                                                </div>
                                                <img
                                                    className="social-icon1"
                                                    loading="lazy"
                                                    alt=""
                                                    src="./public/home-desktop/vector-1.svg"
                                                />
                                            </div>
                                            <div className="faqs">FAQs</div>
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
        </PlanDesktopView>
    )
}

export default PlanDesktop
