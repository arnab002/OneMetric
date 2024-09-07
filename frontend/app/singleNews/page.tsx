'use client'
import React, { useEffect, useState, ChangeEvent } from 'react';
import { User } from 'react-feather';
import axios from 'axios';
import logo from "../../public/public/insights/OneMetric_Transparent.png";
import { BarLoader, PulseLoader } from 'react-spinners'; // Import multiple loaders
import baseApiURL from '@/baseUrl';
import '../../public/assets/singleNews.css'
import CustomSidebar from '@/app/sidebar';

interface NewsItem {
    scrip_cd: number;
    news_id: string;
    stock_long_name: string;
    chart_img: string;
    summary: string;
    announced_at: string;
}

interface NewsResponse {
    success: boolean;
    data: NewsItem;
    message: string;
}

interface SingleNewsProps {
    initialStockName: string;
    initialId: string;
}


function SingleNews() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [planId, setPlanId] = useState<string>('');
    const [newsId, setNewsId] = useState<string | null>(null);
    const [trialStartDate, setTrialStartDate] = useState<Date | null>(null);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    const [newsData, setNewsData] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [newsLoading, setNewsLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isStartingTrial, setIsStartingTrial] = useState(false);
    const [isPlanValid, setIsPlanValid] = useState<boolean>(false);
    const [planStatus, setPlanStatus] = useState<string>('');
    const [daysUntilExpiry, setDaysUntilExpiry] = useState<number>(0);
    const [isPlanExpired, setIsPlanExpired] = useState<boolean>(false);
    const [isTokenChecked, setIsTokenChecked] = useState(false);
    const [isCheckingPlan, setIsCheckingPlan] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        // Fetch search params only on the client side
        const searchParams = new URLSearchParams(window.location.search);
        const newsIdParam = searchParams.get('id');
        
        setNewsId(newsIdParam);

    }, [newsId]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const checkToken = () => {
            const storedToken = localStorage.getItem('authToken');
            setToken(storedToken);
            if (!storedToken) {
                window.location.href = '/login';
            } else {
                setIsTokenChecked(true);
            }
        };

        if (typeof window !== 'undefined') {
            checkToken();
        }
    }, []);

    useEffect(() => {
        if (isTokenChecked && token) {
            checkPlanValidity();
        }
    }, [isTokenChecked, token]);


    useEffect(() => {
        if (isTokenChecked && token) {
            fetchNewsData();
        }
    }, [isTokenChecked, token]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const checkPlanValidity = async () => {
        setIsCheckingPlan(true);
        try {
            const response = await axios.post(
                `${baseApiURL()}/check-plan-validity`,
                undefined,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            const { success, status, data } = response.data;

            setIsPlanValid(success);
            setPlanStatus(status);

            // Check if data exists before accessing plan_id
            if (data && data.plan_id) {
                setPlanId(data.plan_id.toString());
            }

            if (success) {
                if (status === 'active') {
                    const expiryDate = new Date(data.expire_date);
                    const currentDate = new Date(data.current_date);
                    const timeDifference = expiryDate.getTime() - currentDate.getTime();
                    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

                    setDaysUntilExpiry(daysDifference);
                    setIsPlanExpired(daysDifference <= 0);

                    if (data.plan_id === 1) {
                        setTrialStartDate(new Date(data.current_date));
                    }
                } else if (status === 'newuser') {
                    // Handle new user case, no plan expiry
                    setIsPlanExpired(false);
                    setDaysUntilExpiry(0);
                } else {
                    setIsPlanExpired(true);
                }
            } else {
                setIsPlanExpired(true);
            }

        } catch (error) {
            console.error('Error checking plan validity:', error);
            setIsPlanExpired(true);
        } finally {
            setIsCheckingPlan(false);
        }
    };

    const renderPlanStatus = () => {
        if (isCheckingPlan) {
            return <span style={{ color: 'white', fontSize: '14px' }}>Checking plan status...</span>;
        }

        if (isPlanValid && planStatus === 'active') {
            const expiryMessage = `Your Plan is expiring in ${daysUntilExpiry} days`;

            if (planId === '1') {
                // Free trial
                return (
                    <>
                        <span className="plan-expiring" style={{ color: daysUntilExpiry <= 10 ? 'red' : '#ffbf00' }}>{expiryMessage}</span>&nbsp;&nbsp;
                        <button className="add-icon-parent-subscribe" style={{ cursor: 'pointer' }} onClick={handlePricingPageClick}>
                            <span className='add-subscribe'>Subscribe Now</span>
                        </button>
                    </>
                );
            } else {
                // Paid plans
                if (daysUntilExpiry <= 10) {
                    return (
                        <>
                            <span className="plan-expiring" style={{ color: daysUntilExpiry <= 5 ? 'red' : '#ffbf00' }}>
                                {expiryMessage}
                            </span>&nbsp;&nbsp;
                            <button className="add-icon-parent-renew" style={{ width: '120px', fontSize: '12px', cursor: 'pointer' }} onClick={handlePricingPageClick}>
                                <span className='add-renew'>Renew Plan</span>
                            </button>
                        </>
                    );
                } else {
                    return <span className="plan-expiring">{expiryMessage}</span>;
                }
            }
        }

        if (isPlanExpired) {
            return (
                <>
                    <span className="plan-expiring" style={{ color: 'red' }}>Your Plan has expired&nbsp;&nbsp;</span>
                    <button className="add-icon-parent-renew" style={{ cursor: 'pointer' }} onClick={handlePricingPageClick}>
                        <span className='add-renew'>Renew Plan</span>
                    </button>
                </>
            );
        }

        if (planStatus === 'newuser') {
            return (
                <>
                    <span className="plan-expiring">Start your free 14 days trial&nbsp;&nbsp;</span>
                    <button className="add-icon-parent-renew" onClick={handleAddToWatchlist}>
                        <span className='add-renew'>{isStartingTrial ? 'Starting.....' : 'Start Trial'}</span>
                    </button>
                </>
            );
        }

        // Default case if none of the above conditions are met
        return <span style={{ color: 'white' }}>Unable to determine plan status. Please contact support.</span>;
    };

    const fetchNewsData = async () => {
        setLoading(true);
        try {
            const response = await axios.get<NewsResponse>(`${baseApiURL()}/newssummary/${newsId}`);
            const result = response.data;

            if (result.success) {
                setNewsData(result.data);
            } else {
                setError('News data not found');
            }
        } catch (error) {
            console.error('Error fetching the news data:', error);
            setError('An error occurred while fetching news');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setSearchQuery(newQuery);
        setIsSearchActive(newQuery.trim() !== '');
    };

    const handleAddToWatchlist = async () => {

        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }

        setIsStartingTrial(true);

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

                // Re-check plan validity
                await checkPlanValidity();

                // Show updated plan status to user
                if (isPlanValid && planStatus === 'active') {
                    alert(`Your plan is now active and will expire in ${daysUntilExpiry} days.`);
                } else if (planStatus === 'newuser') {
                    alert('Your 14 days free trial has started!');
                } else {
                    alert('Your plan status has been updated. Please check your account for details.');
                }

            } else {
                alert('Payment verification failed. Please contact support.');
            }
        } catch (error) {
            console.error('Error processing payment or adding stocks:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsStartingTrial(false);
        }
    };

    const handleHomeClick = () => {
        window.location.href = '/'
    };

    const handlePricingPageClick = () => {
        window.location.href = '/plans'
    };

    const handleTwitterRedirect = () => {
        window.open('https://x.com/Onemetric_in', '_blank');
    };

    const handleWhatsAppRedirect = () => {
        window.open('https://api.whatsapp.com/send?phone=917204946777&text=Hi', '_blank');
    };


    if (!isTokenChecked) {
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
        <div>
            <div className="dashboard">
                <div className="dashboard-child" />
                <div className="dashboard-item" />
                <img className="image-13-icon" alt="" src="../../../../public/insights/image-13@2x.png" />
                <img className="vector-icon" alt="" src="../../../../public/insights/vector.svg" />
                <div className="dashboard-inner" />
                <img className="subtract-icon" alt="" src="../../../../public/insights/subtract.svg" />
                <header className="main">
                    <div className="frame-parent">
                        <img className="frame-child" alt="" src="../../../../public/insights/group-1000000964.svg" />
                        <img className="frame-item" alt="" src="../../../../public/insights/group-1000000966.svg" />
                    </div>
                    <div className="frame-group">
                        <img className="frame-inner" alt="" src="../../../../public/insights/group-1000001000.svg" />
                        <div className="add-stocks">Add Stocks</div>
                    </div>
                    <img
                        className="image-18-icon"
                        loading="lazy"
                        alt=""
                        src="../../../../public/insights/OneMetric_Transparent.png"
                        onClick={handleHomeClick}
                        style={{ cursor: 'pointer' }}
                    />
                    <div className="main-inner" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                        <div className="main-inner">
                            <a className="onemetric">OneMetric</a>
                        </div>
                    </div>
                    <div className="frame-container">
                        <div className="frame-wrapper">
                            <img
                                className="group-icon"
                                alt=""
                                src="../../../../public/insights/group-1000000977.svg"
                            />
                        </div>
                        <div className="frame-div">
                            <img
                                className="frame-child1"
                                alt=""
                                src="../../../../public/insights/group-1000000998@2x.png"
                            />
                        </div>
                        {isLoggedIn ? (
                            <div className="user-icon-wrapper" style={{ position: 'relative' }}>
                                <User onClick={toggleSidebar} style={{ cursor: 'pointer', color: 'white' }} />
                            </div>
                        ) : (
                            <div className="union-wrapper">
                                <img
                                    className="union-icon"
                                    loading="lazy"
                                    alt=""
                                    src="../../../../public/insights/union.svg"
                                />
                            </div>
                        )}
                    </div>
                </header>
                <CustomSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="simply-grow-all">OneMetric, All Right reserved © 2024</div>
                <main className="watchlist-wrapper">
                    <section className="watchlist">
                        <div className="trial-info">
                            <div className="add-your-favourite-container">
                                <span className='favourite-stock'>Add your favourite stocks to watch list</span>
                                <br />
                                {renderPlanStatus()}
                            </div>
                        </div>
                        <div className="watchlist-header">
                            {newsData && (
                                <div className="news-items">
                                    <div className="reliance-industries">{newsData.stock_long_name}</div>
                                    <div className="newsfeed1">
                                        <div className="news-content">
                                            <img
                                                src={newsData.chart_img}
                                                className="image-9-icon"
                                            />
                                        </div>
                                        <div className="news-details">
                                            <div className="watchlist-filters">
                                                {/* <div className="reliance-industries">{newsData.stock_long_name}</div> */}
                                                <div className="reliance-gets-us">{newsData.summary}</div>
                                                {/* <div className="announced-at">Announced at: {newsData.announced_at}</div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </main>
                {/* <section className="referral-offer-parent">
                    <div className="referral-offer">
                        <h3 className="refer-and-get-container">
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
                            </span>&nbsp;
                        </h3>
                        <button className="refer-now-button" onClick={handleReferClick}>
                            <a className="refer-now" style={{ textDecoration: 'none' }}>Refer now</a>
                        </button>
                    </div>
                    <img
                        className="icon"
                        loading="lazy"
                        alt=""
                        src="../../../../public/home-desktop/8731674-1.svg"
                    />
                    <div className="frame-child109" />
                </section> */}
                <footer className="footer">
                    <div className="footer-content">
                        <img
                            className="image-18-icon1"
                            loading="lazy"
                            alt=""
                            src="../../../../public/insights/OneMetric_Transparent.png"
                            onClick={handleHomeClick}
                            style={{ cursor: 'pointer' }}
                        />
                        <div className="main-inner">
                            <div className="main-inner" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                                <b className="onemetric1">OneMetric</b>
                            </div>
                        </div>
                        <div className="footer-social">
                            <div className="rectangle-parent">
                                <div className="rectangle-div" />
                                <img
                                    className="social-icon"
                                    loading="lazy"
                                    alt=""
                                    src="../../../../public/insights/vector.svg"
                                    onClick={handleWhatsAppRedirect} style={{ cursor: 'pointer' }}
                                />
                            </div>
                            <img
                                className="vector-icon1"
                                loading="lazy"
                                alt=""
                                src="../../../../public/insights/vector-1.svg"
                                onClick={handleTwitterRedirect}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                    <div className="footer-links">
                        <div className="link-list">
                            <img
                                className="link-icons"
                                loading="lazy"
                                alt=""
                                src="../../../../public/insights/vector-172.svg"
                            />
                            <div className="link-items">
                                <div className="link-names">
                                    <a href='/about' style={{ textDecoration: "none", color: "#8A8D9E" }} className="about-us">About Us</a>
                                    <a href='/disclaimer' style={{ textDecoration: "none", color: "#8A8D9E" }} className="contact-us">Disclaimer</a>
                                    <a href='/refund' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">Refund Policy</a>
                                    <a href='/newsfeed' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">News Feed</a>
                                    <a href='/plans' className="refund-policy" style={{ textDecoration: "none", color: "#8A8D9E" }}>Pricing</a>
                                </div>
                                <div className="link-names1">
                                    <a href='/privacy' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Privacy Policy</a>
                                    <a href='/terms' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Terms &amp; Conditions</a>
                                    <a href='/referral' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy">Referral Policy</a>
                                    <a href='/contact' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy">Contact Us</a>
                                </div>
                            </div>
                            <img
                                className="link-icons1"
                                loading="lazy"
                                alt=""
                                src="../../../../public/insights/vector-172.svg"
                            />
                        </div>
                    </div>
                </footer>

                {/* CopyRight Section */}
                <div className="bottom-sheet-icon-parent">
                    <h6 style={{ position: 'absolute', color: 'white', top: '-20px', left: '80px' }}>OneMetric, All Right reserved © 2024</h6>
                    <img
                        className="bottom-sheet-icon"
                        loading="lazy"
                        alt=""
                        src="../../../../public/insights/vector-2.svg"
                    />
                    <img
                        className="frame-child32"
                        loading="lazy"
                        alt=""
                        src="../../../../public/insights/group-219911503.svg"
                    />
                    <div className="bottomsheet">
                        <div className="bottom-sheet-header">
                            <div className="bottom-sheet-title">
                                <div className="placeholder">0</div>
                                <div className="stocks-selected">Stocks selected</div>
                            </div>
                        </div>
                        <div className="remove-action">
                            <img className="remove-action-child" alt="" />
                            <div className="remove-from-watchlist">Remove from Watchlist</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleNews