'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit3, Plus, Trash, Check } from 'react-feather';
import baseApiURL from '@/baseUrl';
import logo from "../../public/public/home/image-18@2x.png";
import '../../public/assets/home-global.css';
import '../../public/assets/home-desktop.css';
import { User, LogOut } from 'react-feather';
import statsData from '../../public/json/stats.json';
import HomeDesktopView from '@/middlewares/home/HomeDesktopView';

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface Plan {
    id: number;
}

type ButtonState = 'plus' | 'check' | 'edit' | 'trash';

function HomeDesktop() {
    const [activeTab, setActiveTab] = useState<string>('All');
    const [planData, setPlanData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingPlanValidity, setLoadingPlanValidity] = useState<boolean>(true);
    const [stockData, setStockData] = useState<any[]>([]);
    const [bankniftyData, setBankNiftyData] = useState<any[]>([]);
    const [niftyData, setNiftyData] = useState<any[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);
    const [buttonStates, setButtonStates] = useState<{ [key: string]: ButtonState }>({});
    const [showWatchlistButton, setShowWatchlistButton] = useState(false);
    const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
    const [filteredStockData, setFilteredStockData] = useState<any[]>([]);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [faqData, setFaqData] = useState([
        {
            question: "What is OneMetric and what does it do?",
            answer: "OneMetric is a platform that delivers personalized stock news, insights, and charts directly to your WhatsApp.",
            isOpen: true
        },
        {
            question: "Is OneMetric an app or does it work on WhatsApp?",
            answer: "OneMetric works directly on WhatsApp, so you don't need to download any additional app.",
            isOpen: false
        },
        {
            question: "How much does OneMetric cost? OneMetric offers two plans:",
            answer: "OneMetric offers a Gold plan and a Diamond plan. Please check our pricing section for detailed information.",
            isOpen: false
        }
    ]);

    const toggleFAQ = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

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

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get(`${baseApiURL()}/stocks`);
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
                .sort((a, b) => a.stock_long_name.localeCompare(b.stock_long_name));
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
                .sort((a, b) => a.stock_long_name.localeCompare(b.stock_long_name));
            setNiftyData(data);
            setFilteredStockData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Nifty 50 stock data:', error);
            setLoading(false);
        }
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

    useEffect(() => {
        const storedStocks = sessionStorage.getItem('selectedStocks');
        if (storedStocks) {
            const parsedStocks = JSON.parse(storedStocks);
            setSelectedStocks(parsedStocks);
            setShowWatchlistButton(parsedStocks.length > 0);

            const initialButtonStates: { [key: string]: ButtonState } = {};
            parsedStocks.forEach((scrip_cd: string) => {
                initialButtonStates[scrip_cd] = 'edit';
            });
            setButtonStates(initialButtonStates);
        }
    }, []);

    useEffect(() => {
        const checkPlanValidity = async () => {
            const token = sessionStorage.getItem('authToken');

            if (token) {
                try {
                    const response = await axios.post(`${baseApiURL()}/check-plan-validity`,
                        undefined,
                        {
                            headers: {
                                Authorization: `${token}`,
                            },
                        });

                    if (response.data.success && response.data.status === 'active') {
                        window.location.href = '/insights';
                        return;
                    }
                } catch (error) {
                    console.error('Error checking plan validity:', error);
                }
            }

            setLoadingPlanValidity(false);
        };

        checkPlanValidity();
    }, []);

    const handlePlusClick = (scrip_cd: string) => {
        setButtonStates((prevState) => ({
            ...prevState,
            [scrip_cd]: 'check',
        }));
        setSelectedStocks((prevSelected) => {
            const updatedStocks = [...prevSelected, scrip_cd];
            setShowWatchlistButton(updatedStocks.length > 0);
            // Store selected stocks in session storage
            sessionStorage.setItem('selectedStocks', JSON.stringify(updatedStocks));
            return updatedStocks;
        });

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

        const token = sessionStorage.getItem('authToken');
        if (!token) {
            console.error('No token found in sessionStorage');
            return;
        }

        setIsProcessing(true);

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
                const selectedStocks = JSON.parse(sessionStorage.getItem('selectedStocks') || '[]');

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

                alert('Stocks added to watchlist successfully!');
                window.location.href = '/insights'
                // Clear selected stocks from session storage
                sessionStorage.removeItem('selectedStocks');
                setSelectedStocks([]);
                setShowWatchlistButton(false);

            } else {
                alert('Payment verification failed. Please contact support.');
            }
        } catch (error) {
            console.error('Error processing payment or adding stocks:', error);
            alert('An error occurred. Please try again.');
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
        setButtonStates((prevState) => ({
            ...prevState,
            [scrip_cd]: 'plus',
        }));

        setSelectedStocks((prevSelected) => {
            const updatedStocks = prevSelected.filter((stock) => stock !== scrip_cd);
            sessionStorage.setItem('selectedStocks', JSON.stringify(updatedStocks));
            setShowWatchlistButton(updatedStocks.length > 0);
            return updatedStocks;
        });
    };

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

    const handleInsightsRedirect = () => {
        window.location.href = '/insights'
    };

    if (loadingPlanValidity) {
        return null;
    }

    return (
        <HomeDesktopView>
            <div>
                <div className="homepage">
                    <div className="trial-button-parent">
                        <button className="trial-button">
                            <div className="button-icon-wrapper">
                                <img className="button-icon" alt="" src="./public/home-desktop/vector-3.svg" />
                            </div>
                            <a className="started-30-days" href='/login' style={{ textDecoration: 'none' }}>Started 14 Days Free Trial</a>
                        </button>
                        <div className="frame-parent">
                            <img className="frame-child" alt="" src="./public/home-desktop/group-1000001019.svg" />
                            <div className="news-sent-wrapper">
                                <div className="news-sent">
                                    <p className="p">
                                        <b>
                                            <span>{statsData.newsSent}+</span>
                                        </b>
                                    </p>
                                    <p className="news-sent1">
                                        <span>
                                            <span>News Sent</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="frame-wrapper">
                                <div className="rectangle-parent">
                                    <div className="frame-item" />
                                    <div className="frame-group">
                                        <div className="frame-container">
                                            <div className="vector-wrapper">
                                                <img
                                                    className="frame-inner"
                                                    alt=""
                                                    src="./public/home-desktop/vector-210.svg"
                                                />
                                            </div>
                                            <div className="stocks-news">Stocks News</div>
                                        </div>
                                        <div className="rectangle-div" />
                                        <div className="content">
                                            <div className="frame-div">
                                                <div className="frame-wrapper1">
                                                    <img
                                                        className="group-icon"
                                                        loading="lazy"
                                                        alt=""
                                                        src="./public/home-desktop/group-1000000965.svg"
                                                    />
                                                </div>
                                                <div className="frame-wrapper2">
                                                    <div className="onemetric-parent">
                                                        <div className="onemetric">OneMetric</div>
                                                        <div className="onemetricai">@OneMetricAi</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="vivamus-posuere-orci-container">
                                                <span>Vivamus </span>
                                                <span className="posuere">#posuere</span>
                                                <span>
                                                    orci a leo sodales, sed aliquet arcu consequat. Ut molestie
                                                    porttitor
                                                </span>
                                                <span className="posuere">#sapien</span>
                                            </div>
                                            <div className="rectangle-group">
                                                <div className="frame-child1" />
                                                <div className="frame-wrapper3">
                                                    <div className="line-parent">
                                                        <div className="line-div" />
                                                        <div className="frame-child2" />
                                                        <div className="line-div" />
                                                    </div>
                                                </div>
                                                <div className="line-parent">
                                                    <div className="frame-child4" />
                                                    <div className="frame-child5" />
                                                    <div className="frame-child6" />
                                                </div>
                                                <div className="line-container">
                                                    <div className="frame-child7" />
                                                    <div className="frame-parent1">
                                                        <div className="frame-parent2">
                                                            <div className="line-parent1">
                                                                <div className="frame-child4" />
                                                                <div className="frame-child9" />
                                                                <div className="frame-child6" />
                                                                <div className="frame-parent3">
                                                                    <div className="frame-parent4">
                                                                        <div className="line-parent">
                                                                            <div className="frame-child4" />
                                                                            <div className="frame-child12" />
                                                                            <div className="frame-child4" />
                                                                        </div>
                                                                        <div className="frame-wrapper4">
                                                                            <div className="line-parent">
                                                                                <div className="frame-child4" />
                                                                                <div className="frame-child15" />
                                                                                <div className="frame-child4" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="frame-wrapper5">
                                                                            <div className="line-parent">
                                                                                <div className="frame-child17" />
                                                                                <div className="frame-child18" />
                                                                                <div className="line-div" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="frame-wrapper6">
                                                                        <div className="line-parent">
                                                                            <div className="frame-child4" />
                                                                            <div className="frame-child12" />
                                                                            <div className="frame-child4" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="frame-wrapper7">
                                                                        <div className="frame-parent5">
                                                                            <div className="frame-wrapper8">
                                                                                <div className="rectangle-container">
                                                                                    <div className="frame-child23" />
                                                                                    <div className="frame-child4" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="frame-wrapper9">
                                                                                <div className="line-parent">
                                                                                    <div className="frame-child4" />
                                                                                    <div className="frame-child15" />
                                                                                    <div className="frame-child4" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="line-parent">
                                                                                <div className="frame-child17" />
                                                                                <div className="frame-child18" />
                                                                                <div className="frame-child30" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <img
                                                                        className="vector-icon"
                                                                        alt=""
                                                                        src="./public/home-desktop/vector-211.svg"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="frame-wrapper10">
                                                                <div className="frame-parent6">
                                                                    <div className="frame-wrapper11">
                                                                        <div className="line-parent8">
                                                                            <div className="frame-child4" />
                                                                            <div className="frame-child32" />
                                                                            <div className="frame-child4" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="line-parent9">
                                                                        <div className="frame-child34" />
                                                                        <div className="frame-child35" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="frame-parent7">
                                                            <div className="line-parent8">
                                                                <div className="line-div" />
                                                                <div className="frame-child37" />
                                                                <div className="line-div" />
                                                            </div>
                                                            <div className="line-parent11">
                                                                <div className="frame-child39" />
                                                                <div className="frame-child35" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rectangle-parent1">
                                        <div className="frame-child41" />
                                        <img
                                            className="frame-child42"
                                            loading="lazy"
                                            alt=""
                                            src="./public/home-desktop/group-1171284348.svg"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="subscribed-wrapper">
                                <div className="subscribed">
                                    <p className="p">
                                        <b>
                                            <span>{statsData.subscribedUsers}+</span>
                                        </b>
                                    </p>
                                    <p className="news-sent1">
                                        <span>
                                            <span>Subscribed</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="get-lighting-container">
                            <p className="p">Get Lighting - Fast</p>
                            <p className="stock-news-on">
                                <span>
                                    <span className="stock-news">Stock news</span>
                                    <span className="on"> on</span>
                                </span>
                            </p>
                            <p className="p">
                                <b className="whats-app1">Whats App</b>
                            </p>
                        </div>
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
                    </div>
                    <div className="homepage-inner">
                        <div className="frame-parent9">
                            <div className="frame-wrapper12">
                                <div className="frame-parent10">
                                    <div className="add-to-your-watchlist-wrapper">
                                        <h1 className="add-to-your">Add to your watchlist</h1>
                                    </div>
                                    <div className="select-your-stocks">
                                        Select your stocks to get Latest news now.
                                    </div>
                                </div>
                            </div>
                            <div className="how-are-you-feeling-today-parent">
                                <div className={`how-are-you-feeling-today ${activeTab === 'All' ? 'active' : ''}`}
                                    onClick={() => handleTabSwitch('All')} style={{cursor: 'pointer'}}>
                                    <b className="all">All</b>
                                </div>
                                <div className={`bank-nifty-wrapper ${activeTab === 'Bank Nifty' ? 'active' : ''}`}
                                    onClick={() => handleTabSwitch('Bank Nifty')} style={{cursor: 'pointer'}}>
                                    <div className="bank-nifty">Bank Nifty</div>
                                </div>
                                <div className={`circle ${activeTab === 'Nifty 50' ? 'active' : ''}`}
                                    onClick={() => handleTabSwitch('Nifty 50')} style={{cursor: 'pointer'}}>
                                    <div className="all-nifty-50">Nifty 50</div>
                                </div>
                            </div>
                            <div className="chat-bubble">
                                <div className="desktop-select-stocks-home">
                                    <div className="desktop-select-stocks-home-inner">
                                        <div className="vector-container">
                                            <img className="frame-child45" alt="" />
                                        </div>
                                    </div>
                                    <div className="desktop-stocks">
                                        <div className="adani-group" style={{ position: 'relative', paddingBottom: '20px' }}>
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
                                                    </div>
                                                ))
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
                                                        zIndex: 1000,
                                                        transition: 'opacity 0.3s',
                                                        opacity: 1,
                                                        width: '40%', // Adjust this value to change the button width
                                                        textAlign: 'center',
                                                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                                                    }}
                                                    onClick={!isProcessing ? handleAddToWatchlist : undefined}
                                                >
                                                    {isProcessing ? 'Processing...' : `Add to Watchlist (${selectedStocks.length})`}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="theresa-webb-wrapper">
                                <div className="theresa-webb">
                                    <div className="stocks" onClick={handleInsightsRedirect} style={{ cursor: 'pointer' }}>+4600 Stocks</div>
                                    <div className="profile-pic-wrapper">
                                        <img
                                            className="profile-pic-icon"
                                            alt=""
                                            src="./public/home-desktop/profile-pic.svg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="homepage-child">
                        <div className="frame-parent20">
                            <div className="how-it-works-wrapper">
                                <h1 className="how-it-works">How it works?</h1>
                            </div>
                            <div className="frame-parent21">
                                <div className="frame-parent22">
                                    <div className="empty-state-parent">
                                        <div className="empty-content-wrapper">
                                            <div className="empty-content">01</div>
                                        </div>
                                        <div className="line-wrapper">
                                            <div className="frame-child55" />
                                        </div>
                                    </div>
                                    <div className="enter-your-whatsapp-number-parent">
                                        <div className="enter-your-whatsapp">
                                            Enter your WhatsApp number
                                        </div>
                                        <div className="enter-your-whatsapp-receive-a-parent">
                                            <div className="enter-your-whatsapp1">
                                                Enter Your WhatsApp, receive a code via WhatsApp/SMS for
                                                verification.
                                            </div>
                                            <div className="frame-wrapper13">
                                                <div className="frame-parent24">
                                                    <div className="rectangle-parent2">
                                                        <div className="frame-child56" />
                                                        <div className="input-backgrounds-parent">
                                                            <div className="input-backgrounds" />
                                                            <div className="whatsapp-number-wrapper">
                                                                <div className="whatsapp-number">WhatsApp Number</div>
                                                            </div>
                                                            <div className="frame-parent25">
                                                                <div className="xx-parent">
                                                                    <div className="xx">+ XX</div>
                                                                    <div className="xxxxx-xxxxx">XXXXX XXXXX</div>
                                                                </div>
                                                                <div className="frame-child57" />
                                                            </div>
                                                            <div className="input-icons-wrapper">
                                                                <div className="input-icons">
                                                                    <img
                                                                        className="first-icon"
                                                                        alt=""
                                                                        src="./public/home-desktop/vector-207-8.svg"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="ellipse-wrapper">
                                                            <div className="ellipse-div" />
                                                        </div>
                                                        <img
                                                            className="verification-icon"
                                                            alt=""
                                                            src="./public/home-desktop/vector-199-10.svg"
                                                        />
                                                    </div>
                                                    <div className="rectangle-parent3">
                                                        <div className="frame-child58" />
                                                        <div className="rectangle-parent4">
                                                            <div className="frame-child59" />
                                                            <div className="otp-verification-wrapper">
                                                                <div className="otp-verification">OTP Verification</div>
                                                            </div>
                                                            <div className="frame-parent26">
                                                                <div className="empty-label-wrapper">
                                                                    <div className="empty-label">*</div>
                                                                </div>
                                                                <div className="frame-parent27">
                                                                    <div className="frame-parent28">
                                                                        <div className="empty-label-wrapper">
                                                                            <div className="empty-label">*</div>
                                                                        </div>
                                                                        <div className="empty-label-wrapper">
                                                                            <div className="empty-label">*</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="frame-wrapper14">
                                                                        <div className="vector-wrapper9">
                                                                            <img
                                                                                className="frame-child60"
                                                                                alt=""
                                                                                src="./public/home-desktop/vector-206.svg"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="empty-label-wrapper">
                                                                    <div className="empty-label">*</div>
                                                                </div>
                                                            </div>
                                                            <img
                                                                className="union-icon"
                                                                loading="lazy"
                                                                alt=""
                                                                src="./public/home-desktop/union.svg"
                                                            />
                                                        </div>
                                                        <div className="ellipse-wrapper">
                                                            <div className="ellipse-div" />
                                                        </div>
                                                    </div>
                                                    <img
                                                        className="frame-child62"
                                                        loading="lazy"
                                                        alt=""
                                                        src="./public/home-desktop/group-1000000975@2x.png"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="frame-parent29">
                                    <div className="frame-wrapper15">
                                        <div className="frame-parent30">
                                            <div className="frame-wrapper16">
                                                <div className="frame-parent31">
                                                    <div className="container-content-wrapper">
                                                        <div className="container-content">02</div>
                                                    </div>
                                                    <div className="add-stocks-to-watchlist-wrapper">
                                                        <div className="add-stocks-to">Add stocks to watchlist</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="line-parent12">
                                                <div className="frame-child55" />
                                                <div className="search-bar">
                                                    <div className="search-background" />
                                                    <div className="search-icon-background-parent">
                                                        <div className="search-icon-background" />
                                                        <div className="search-input">
                                                            <div className="search-icon-wrapper">
                                                                <img
                                                                    className="search-icon"
                                                                    alt=""
                                                                    src="./public/home-desktop/search-icon.svg"
                                                                />
                                                            </div>
                                                            <div className="search-stock">Search Stock</div>
                                                        </div>
                                                    </div>
                                                    <div className="stock-list-wrapper">
                                                        <div className="stock-list">
                                                            <div className="stock-categories">
                                                                <div className="category-items">
                                                                    <b className="all1">All</b>
                                                                </div>
                                                                <div className="category-items1">
                                                                    <div className="all-nifty-501">All Nifty 50</div>
                                                                </div>
                                                                <div className="category-items1">
                                                                    <div className="bank-nifty1">Bank Nifty</div>
                                                                </div>
                                                                <div className="category-items1">
                                                                    <div className="all-banks1">All Banks</div>
                                                                </div>
                                                                <div className="category-items4">
                                                                    <div className="psus1">PSUs</div>
                                                                </div>
                                                            </div>
                                                            <div className="stocks-container">
                                                                <div className="stock-item-parent">
                                                                    <div className="stock-item">
                                                                        <img
                                                                            className="stock-item-child"
                                                                            alt=""
                                                                            src="./public/home-desktop/vector-199.svg"
                                                                        />
                                                                    </div>
                                                                    <div className="abb-india-limited">
                                                                        ABB India Limited (Abb)
                                                                    </div>
                                                                    <img
                                                                        className="fire-icon"
                                                                        alt=""
                                                                        src="./public/home-desktop/fire.svg"
                                                                    />
                                                                </div>
                                                                <div className="frame-parent32">
                                                                    <div className="vector-wrapper10">
                                                                        <img
                                                                            className="stock-item-child"
                                                                            alt=""
                                                                            src="./public/home-desktop/vector-199.svg"
                                                                        />
                                                                    </div>
                                                                    <div className="adani-energy-solutions">
                                                                        Adani Energy Solutions (Adanisolen)
                                                                    </div>
                                                                </div>
                                                                <div className="frame-parent33">
                                                                    <div className="stock-icon-wrapper">
                                                                        <img
                                                                            className="stock-icon"
                                                                            alt=""
                                                                            src="./public/home-desktop/vector-199-11.svg"
                                                                        />
                                                                    </div>
                                                                    <div className="adani-enterprises-ltd">
                                                                        Adani Enterprises Ltd (Adanigreen)
                                                                    </div>
                                                                    <img
                                                                        className="fire-icon"
                                                                        alt=""
                                                                        src="./public/home-desktop/fire-1.svg"
                                                                    />
                                                                </div>
                                                                <div className="frame-parent32">
                                                                    <div className="vector-wrapper10">
                                                                        <img
                                                                            className="stock-item-child"
                                                                            alt=""
                                                                            src="./public/home-desktop/vector-199.svg"
                                                                        />
                                                                    </div>
                                                                    <div className="indusland-bank">Indusland bank</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="trial-button-container">
                                        <a className="start-30-days" href='/login' style={{ textDecoration: 'none' }}>Start 14 Days Free Trial</a>
                                    </button>
                                </div>
                                <div className="frame-parent35">
                                    <div className="empty-state-parent">
                                        <div className="empty-state">
                                            <div className="div1">03</div>
                                        </div>
                                        <div className="insights-separator-wrapper">
                                            <div className="insights-separator" />
                                        </div>
                                    </div>
                                    <div className="get-instant-whatsapp-insights-parent">
                                        <div className="get-instant-whatsapp">
                                            Get instant WhatsApp insights
                                        </div>
                                        <div className="post-item">
                                            <div className="post-background" />
                                            <div className="post-image-parent">
                                                <div className="post-image" />
                                                <div className="frame-parent36">
                                                    <div className="post-button-icon-wrapper">
                                                        <img
                                                            className="post-button-icon"
                                                            alt=""
                                                            src="./public/home-desktop/vector-210-1.svg"
                                                        />
                                                    </div>
                                                    <div className="post1">Post</div>
                                                </div>
                                                <div className="content-preview">
                                                    <div className="one-metric-logo-container-parent">
                                                        <div className="one-metric-logo-container">
                                                            <img
                                                                className="one-metric-logo"
                                                                alt=""
                                                                src="./public/home-desktop/group-1000000965-1.svg"
                                                            />
                                                        </div>
                                                        <div className="frame-wrapper17">
                                                            <div className="onemetric-group">
                                                                <div className="onemetric2">OneMetric</div>
                                                                <div className="onemetricai1">@OneMetricAi</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="vivamus-posuere-orci-container1">
                                                        <span>Vivamus </span>
                                                        <span className="posuere">#posuere</span>
                                                        <span>
                                                            orci a leo sodales, sed aliquet arcu consequat. Ut
                                                            molestie porttitor
                                                        </span>
                                                        <span className="posuere">#sapien</span>
                                                    </div>
                                                    <div className="chart-container">
                                                        <div className="chart-background" />
                                                        <div className="chart-container-inner">
                                                            <div className="line-parent">
                                                                <div className="frame-child66" />
                                                                <div className="frame-child67" />
                                                                <div className="frame-child68" />
                                                            </div>
                                                        </div>
                                                        <div className="line-parent14">
                                                            <div className="frame-child69" />
                                                            <div className="frame-parent37">
                                                                <div className="frame-parent38">
                                                                    <div className="frame-parent39">
                                                                        <div className="frame-wrapper18">
                                                                            <div className="line-parent1">
                                                                                <div className="frame-child66" />
                                                                                <div className="frame-child71" />
                                                                                <div className="frame-child68" />
                                                                                <div className="frame-parent40">
                                                                                    <div className="frame-parent41">
                                                                                        <div className="grid-cells-wrapper">
                                                                                            <div className="line-parent">
                                                                                                <div className="grid-cells-child" />
                                                                                                <div className="grid-blocks" />
                                                                                                <div className="grid-cells-child" />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="line-parent">
                                                                                            <div className="frame-child66" />
                                                                                            <div className="frame-child74" />
                                                                                            <div className="frame-child66" />
                                                                                        </div>
                                                                                        <div className="line-parent">
                                                                                            <div className="frame-child66" />
                                                                                            <div className="frame-child77" />
                                                                                            <div className="frame-child66" />
                                                                                        </div>
                                                                                        <div className="frame-wrapper19">
                                                                                            <div className="line-parent18">
                                                                                                <div className="frame-child79" />
                                                                                                <div className="frame-child80" />
                                                                                                <div className="frame-child81" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="frame-wrapper20">
                                                                                        <div className="line-parent">
                                                                                            <div className="frame-child66" />
                                                                                            <div className="frame-child74" />
                                                                                            <div className="frame-child66" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="frame-wrapper21">
                                                                                        <div className="frame-parent42">
                                                                                            <div className="frame-wrapper22">
                                                                                                <div className="rectangle-parent5">
                                                                                                    <div className="frame-child85" />
                                                                                                    <div className="frame-child66" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="frame-wrapper23">
                                                                                                <div className="line-parent">
                                                                                                    <div className="frame-child66" />
                                                                                                    <div className="frame-child77" />
                                                                                                    <div className="frame-child66" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="line-parent">
                                                                                                <div className="frame-child79" />
                                                                                                <div className="frame-child91" />
                                                                                                <div className="grid-cells-child" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <img
                                                                                        className="chart-icon"
                                                                                        loading="lazy"
                                                                                        alt=""
                                                                                        src="./public/home-desktop/vector-211-1.svg"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="line-parent8">
                                                                            <div className="frame-child66" />
                                                                            <div className="frame-child94" />
                                                                            <div className="frame-child66" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="frame-wrapper24">
                                                                        <div className="line-parent23">
                                                                            <div className="frame-child96" />
                                                                            <div className="frame-child97" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="frame-parent43">
                                                                    <div className="line-parent8">
                                                                        <div className="grid-cells-child" />
                                                                        <div className="frame-child99" />
                                                                        <div className="frame-child81" />
                                                                    </div>
                                                                    <div className="frame-wrapper25">
                                                                        <div className="line-parent25">
                                                                            <div className="frame-child101" />
                                                                            <div className="frame-child97" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <img
                                                className="placeholder-icon"
                                                loading="lazy"
                                                alt=""
                                                src="./public/home-desktop/group-1000001008.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="homepage-inner1">
                        <section className="why-simply-grow-parent">
                            <h1 className="how-it-works">Why OneMetric?</h1>
                            <div className="benefits-container">
                                <div className="benefits-row">
                                    <div className="benefit-item-parent">
                                        <div className="benefit-item">
                                            <div className="benefit-icon-container">
                                                <div className="icon-background" />
                                                <img
                                                    className="benefit-icon"
                                                    loading="lazy"
                                                    alt=""
                                                    src="./public/home-desktop/vector-4.svg"
                                                />
                                            </div>
                                        </div>
                                        <div className="effortless-tracking-seamless">
                                            Effortless Tracking, Seamless WhatsApp Integration
                                        </div>
                                    </div>
                                    <div className="frame-parent44">
                                        <div className="vector-wrapper12">
                                            <img
                                                className="vector-icon1"
                                                loading="lazy"
                                                alt=""
                                                src="./public/home-desktop/vector-5.svg"
                                            />
                                        </div>
                                        <div className="lightning-fast-stock-news">
                                            Lightning-Fast Stock News curated for you
                                        </div>
                                    </div>
                                    <div className="frame-parent45">
                                        <div className="group-wrapper">
                                            <img
                                                className="group-icon1"
                                                loading="lazy"
                                                alt=""
                                                src="./public/home-desktop/group.svg"
                                            />
                                        </div>
                                        <div className="benefit-description-container-parent">
                                            <div className="benefit-description-container">
                                                <div className="daily-impact-reports">
                                                    Daily Impact Reports &amp; Market Insights
                                                </div>
                                            </div>
                                            <div className="coming-soon-container1">
                                                <i className="coming-soon1">Coming soon</i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="benefits-row">
                                    <div className="benefit-item-two-wrapper">
                                        <div className="benefit-item-two">
                                            <div className="benefit-two-icon-container">
                                                <img
                                                    className="benefit-two-icon"
                                                    loading="lazy"
                                                    alt=""
                                                    src="./public/home-desktop/group-219911497@2x.png"
                                                />
                                            </div>
                                            <div className="your-language-your">
                                                Your Language, Your Choice
                                            </div>
                                        </div>
                                    </div>
                                    <div className="frame-parent45">
                                        <div className="frame-wrapper26">
                                            <img
                                                className="frame-child103"
                                                loading="lazy"
                                                alt=""
                                                src="./public/home-desktop/group-1000000993@2x.png"
                                            />
                                        </div>
                                        <div className="benefit-two-description-contai">
                                            <div className="benefit-description-container">
                                                <div className="daily-impact-reports">
                                                    Family Portfolio Tracking
                                                </div>
                                            </div>
                                            <div className="benefit-three-description-cont">
                                                <i className="upgrade-available">Upgrade Available</i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
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
                                                            Enjoy news and charts in English and Other Languages
                                                        </div>
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
                    <div className="homepage-inner3">
                        <section className="faq-parent">
                            <h1 className="faq">FAQ</h1>
                            <div className="f-a-q-container">
                                {faqData.map((faq, index) => (
                                    <div key={index} className="what-is-simply-grow">
                                        <div className="simply-grow-description">
                                            <div className="what-is-simplygrow-and-what-do-parent">
                                                <div className="what-is-simplygrow">{faq.question}</div>
                                                {openFaqIndex === index && (
                                                    <div className="simplygrow-is-a">{faq.answer}</div>
                                                )}
                                            </div>
                                            <div className="definition-icon-wrapper" onClick={() => toggleFAQ(index)}>
                                                <img
                                                    className="definition-icon"
                                                    loading="lazy"
                                                    alt=""
                                                    src={openFaqIndex === index ? "./public/home-desktop/vector-212.svg" : "./public/home-desktop/vector-212-1.svg"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                    <div className="homepage-inner4">
                        <section className="referral-offer-parent">
                            <div className="referral-offer">
                                <h3 className="refer-and-get-container">
                                    <span>Refer and get a </span>
                                    <span className="free-month">
                                        <span className="free-month1">FREE monthly</span>
                                    </span>
                                    <span>
                                        <span className="free-month"> </span>
                                        <span>Plan</span>
                                        <span className="span3"> </span>
                                    </span>
                                </h3>
                                <button className="refer-now-button">
                                    <a className="refer-now" href='/login' style={{ textDecoration: 'none' }}>Refer now</a>
                                </button>
                            </div>
                            <img
                                className="icon"
                                loading="lazy"
                                alt=""
                                src="./public/home-desktop/8731674-1.svg"
                            />
                            <div className="frame-child109" />
                        </section>
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
        </HomeDesktopView>
    )
}

export default HomeDesktop
