'use client'
import React, { useEffect, useState } from 'react';
import { User, LogOut } from 'react-feather';
import { Edit3, Trash } from 'react-feather';
import axios from 'axios';
import baseApiURL from '@/baseUrl';
import '../../public/assets/insights.css'

interface Stock {
    id: string;
    isin_code: string;
    scrip_cd: string;
    // Add other properties of your stock object here
}

type ButtonState = 'plus' | 'check' | 'edit' | 'trash';

function Insights() {
    const [newsData, setNewsData] = useState<Array<{ [key: string]: any }>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [editingStockId, setEditingStockId] = useState<string | null>(null);
    const [isRemoving, setIsRemoving] = useState<{ [key: string]: boolean }>({});
    const postsPerPage = 16;
    const [stockData, setStockData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newsLoading, setNewsLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [noDataFound, setNoDataFound] = useState<boolean>(false);
    const [noNewsDataFound, setNoNewsDataFound] = useState<boolean>(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [buttonStates, setButtonStates] = useState<{ [key: string]: ButtonState }>({});
    const [displayCount, setDisplayCount] = useState(20);
    const [displayNewsCount, setDisplayNewsCount] = useState(4);
    const [isPlanValid, setIsPlanValid] = useState<boolean>(false);
    const [planStatus, setPlanStatus] = useState<string>('');
    const [daysUntilExpiry, setDaysUntilExpiry] = useState<number>(0);
    const [isPlanExpired, setIsPlanExpired] = useState<boolean>(false);
    const [isTokenChecked, setIsTokenChecked] = useState(false);
    const [isCheckingPlan, setIsCheckingPlan] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const checkToken = () => {
            const storedToken = sessionStorage.getItem('authToken');
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
            fetchStockData();
            fetchNewsData();
        }
    }, [isTokenChecked, token, searchQuery, isSearching]);

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

    const showMore = () => {
        setDisplayCount(prevCount => prevCount + 8);
    };

    const showNewsMore = () => {
        setDisplayNewsCount(prevCount => prevCount + 4);
    };

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
            setIsPlanValid(response.data.success);
            setPlanStatus(response.data.status);

            if (response.data.success && response.data.status === 'active') {
                const expiryDate = new Date(response.data.data.expire_date);
                const currentDate = new Date(response.data.data.current_date);
                const timeDifference = expiryDate.getTime() - currentDate.getTime();
                const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
                setDaysUntilExpiry(daysDifference);
                setIsPlanExpired(daysDifference <= 0);
            } else if (response.data.status === 'newuser') {
                setIsPlanExpired(false);
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

    const sortStocksAlphabetically = (stocks: any[]) => {
        return [...stocks].sort((a, b) =>
            a.stock_long_name.localeCompare(b.stock_long_name, undefined, { sensitivity: 'base' })
        );
    };

    const fetchStockData = async () => {
        setLoading(true);
        setNoDataFound(false);

        try {
            const endpoint = isSearching
                ? `${baseApiURL()}/search-stocks`
                : `${baseApiURL()}/stock-watchlist`;

            const response = await axios.get(endpoint, {
                params: isSearching ? { query: searchQuery } : {},
                headers: !isSearching ? { Authorization: `${token}` } : {},
            });

            const data = response.data.data || response.data.data;

            const sortedData = sortStocksAlphabetically(data);
            setStockData(sortedData);

            if (sortedData.length === 0) {
                setNoDataFound(true);
            } else {
                setNoDataFound(false);
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
            setNoDataFound(true);
        } finally {
            setLoading(false);
        }
    };

    const fetchNewsData = async () => {
        setNewsLoading(true);
        setNoNewsDataFound(false);

        try {
            const response = await axios.get(`${baseApiURL()}/news`);
            const result = await response.data.data;

            // Function to modify the subtitle
            const modifySubtitle = (subtitle: string) => {
                return subtitle.replace(/\s-\s\d+\s-\s/, ' - ');
            };

            // Assign images to news items and modify subtitles
            const newsWithImages = result.map((newsItem: any, index: number) => ({
                ...newsItem,
                imageUrl: newsImages[index % newsImages.length],
                subtitle: modifySubtitle(newsItem.news_sub)
            }));

            setNewsData(newsWithImages);

            if (newsWithImages.length === 0) {
                setNoNewsDataFound(true);
            } else {
                setNoNewsDataFound(false);
            }
        } catch (error) {
            console.error('Error fetching the news data:', error);
            setNoNewsDataFound(true);
        } finally {
            setNewsLoading(false);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setIsSearching(event.target.value.length > 0);
    };

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        setIsSearching(false);
        setSearchQuery('');
    };

    // Calculate pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = newsData.slice(indexOfFirstPost, indexOfLastPost);

    // Handle pagination
    // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleEditClick = (id: string) => {
        setEditingStockId(currentId => currentId === id ? null : id);
    };

    const handleRemoveClick = async (isin_code: string, scrip_cd: string, id: string) => {
        setIsRemoving((prevState) => ({
            ...prevState,
            [id]: true,
        }));

        try {
            await axios.post(`${baseApiURL()}/delete-stock-from-watchlist`, {
                scrip_cd: scrip_cd,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEditingStockId(null); // Reset editing state
            fetchStockData();
        } catch (error) {
            console.error('Error deleting stock:', error);
            alert("Failed to delete stock. Please try again.");
        } finally {
            setIsRemoving((prevState) => ({
                ...prevState,
                [id]: false,
            }));
        }
    };


    const handleAddToWatchlist = async () => {

        const token = sessionStorage.getItem('authToken');
        if (!token) {
            console.error('No token found in sessionStorage');
            return;
        }

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
                    alert('Your 30-day free trial has started!');
                } else {
                    alert('Your plan status has been updated. Please check your account for details.');
                }

            } else {
                alert('Payment verification failed. Please contact support.');
            }
        } catch (error) {
            console.error('Error processing payment or adding stocks:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const [newsImages, setNewsImages] = useState<string[]>([
        "./public/insights/Stock_3.jpg",
        "./public/insights/Stock_3.jpg",
        "./public/insights/Stock_2.jpg",
        "./public/insights/Stock_3.jpg",
    ]);

    const handleHomeClick = () => {
        window.location.href = '/'
    };

    const handleTwitterRedirect = () => {
        window.open('https://x.com/Onemetric_in', '_blank');
    };


    if (!isTokenChecked) {
        return null; // Render nothing until the token is checked
    }

    return (
        <div>
            <div className="dashboard">
                <div className="dashboard-child" />
                <div className="dashboard-item" />
                <img className="image-13-icon" alt="" src="./public/insights/image-13@2x.png" />
                <img className="vector-icon" alt="" src="./public/insights/vector.svg" />
                <div className="dashboard-inner" />
                <img className="subtract-icon" alt="" src="./public/insights/subtract.svg" />
                <header className="main">
                    <div className="frame-parent">
                        <img className="frame-child" alt="" src="./public/insights/group-1000000964.svg" />
                        <img className="frame-item" alt="" src="./public/insights/group-1000000966.svg" />
                    </div>
                    <div className="frame-group">
                        <img className="frame-inner" alt="" src="./public/insights/group-1000001000.svg" />
                        <div className="add-stocks">Add Stocks</div>
                    </div>
                    <img
                        className="image-18-icon"
                        loading="lazy"
                        alt=""
                        src="./public/insights/OneMetric_Transparent.png"
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
                                src="./public/insights/group-1000000977.svg"
                            />
                        </div>
                        <div className="frame-div">
                            <img
                                className="frame-child1"
                                alt=""
                                src="./public/insights/group-1000000998@2x.png"
                            />
                        </div>
                        {isLoggedIn ? (
                            <div className="user-icon-wrapper" style={{ position: 'relative' }}>
                                <User onClick={toggleDropdown} style={{ cursor: 'pointer', color: 'white' }} />
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
                            <div className="union-wrapper">
                                <img
                                    className="union-icon"
                                    loading="lazy"
                                    alt=""
                                    src="./public/insights/union.svg"
                                />
                            </div>
                        )}
                    </div>
                </header>
                <div className="frame-parent4">
                    <input className="frame-input" type="checkbox" />
                    <div className="search-stock">Search Stocks</div>
                </div>
                <div className="insights-header-wrapper">
                    <div className="stock-search" id="stockSearchContainer">
                        <div className="search-input">
                            <img
                                className="search-input-child"
                                alt=""
                                src="./public/insights/group-1000000977-2.svg"
                            />
                        </div>
                        <input
                            className="search-placeholder"
                            placeholder="Search stocks"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <div className="price-wrapper">
                            <div className="price">Price</div>
                        </div>
                        <div className="delete-wrapper">
                            <div className="delete">Delete</div>
                        </div>
                    </div>
                </div>
                <div className="simply-grow-all">OneMetric, All Right reserved © 2024</div>
                <main className="watchlist-wrapper">
                    <section className="watchlist">
                        <div className="trial-info">
                            <div className="add-your-favourite-container">
                                <span className='favourite-stock'>Add your favourite stocks to watch list and </span>
                                <br />
                                {isCheckingPlan ? (
                                    <span style={{ color: 'white', fontSize: '14px' }}>Checking plan status...</span>
                                ) : isPlanValid && planStatus === 'active' && !isPlanExpired ? (
                                    <span className="plan-expiring">Your Plan is expiring in {daysUntilExpiry} days</span>
                                ) : isPlanExpired ? (
                                    <>
                                        <span className="plan-expired" style={{ color: 'white' }}>Your Plan has expired&nbsp;&nbsp;</span>
                                        <button className="renew-plan-button" onClick={handleAddToWatchlist}>
                                            Renew Plan
                                        </button>
                                    </>
                                ) : planStatus === 'newuser' ? (
                                    <>
                                        <span className="enjoy-your-30">Enjoy your free 30 days trial&nbsp;&nbsp;</span>
                                        <button className="purchase-plan-button" onClick={handleAddToWatchlist}>
                                            Purchase Plan
                                        </button>
                                    </>
                                ) : (
                                    <span style={{ color: 'white' }}>Checking your plan status........</span>
                                )}
                            </div>
                            {/* <div className="no-card-information">
                                No card information is required for the free trial
                            </div> */}
                        </div>
                        <div className="watchlist-header">
                            <div className="alert-list-items">
                                <h3 className="my-stock-watchlist">My Stock watchlist</h3>
                                <button className="add-icon-parent" id="frameButton" onClick={() => window.location.href = '/addStocks'}>
                                    <div className="add-icon">
                                        <img
                                            className="add-icon-child"
                                            alt=""
                                            src="./public/insights/group-1000001002.svg"
                                        />
                                    </div>
                                    <div className="add">Add</div>
                                </button>
                            </div>
                            <div className="watchlist-filters">
                                <div className="filter-tabs">
                                    <div
                                        className={`filter-names ${selectedFilter === 'all' ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('all')}
                                    >
                                        <div className="all-16">
                                            <b className="all">All </b>
                                            <span className="span2">({stockData.length})</span>
                                        </div>
                                    </div>
                                    {/* <div
                                        className={`filter-names1 ${selectedFilter === 'bankNifty' ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('bankNifty')}
                                    >
                                        <div className="bank-nifty-50-container">
                                            <span className="bank-nifty">Bank Nifty </span>
                                            <span className="span3">({stockData.filter(stock => stock.category === 'bankNifty').length})</span>
                                        </div>
                                    </div>
                                    <div
                                        className={`filter-names2 ${selectedFilter === 'nifty50' ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('nifty50')}
                                    >
                                        <div className="all-nifty-50-container">
                                            <span className="all">Nifty 50</span>
                                            <span className="span3">({stockData.filter(stock => stock.category === 'nifty50').length})</span>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="watchlist-items">
                                    {loading ? (
                                        <div style={{ color: 'white', margin: 'auto' }}>Loading...</div>
                                    ) : noDataFound ? (
                                        <div style={{ color: 'white', margin: 'auto' }}>No data found</div>
                                    ) : (
                                        stockData.slice(0, displayCount).map((stock, index) => (
                                            <div key={stock.id} className="select-stocks">
                                                <div className="select-stocks-inner">
                                                    <div className="vector-wrapper">
                                                        <img className="frame-child5" alt="" />
                                                    </div>
                                                </div>
                                                <div className="stock-item">
                                                    <div className="adani-group1">{stock.stock_long_name}</div>
                                                </div>
                                                <div className="actions">
                                                    {editingStockId === stock.id ? (
                                                        <div
                                                            onClick={() => handleRemoveClick(stock.isin_code, stock.scrip_cd, stock.id)}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                backgroundColor: 'red',
                                                                padding: '10px',
                                                                borderRadius: '4px',
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            <Trash style={{ color: 'white' }} />
                                                            <span style={{ marginLeft: '4px', color: 'white' }}>
                                                                {isRemoving[stock.id] ? 'Removing....' : 'Remove'}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <Edit3
                                                            onClick={() => handleEditClick(stock.id)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                color: 'white'
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    <br />
                                    {!loading && stockData.length > displayCount && (
                                        <button onClick={showMore} style={{ margin: "auto", borderRadius: "8px", padding: "10px", cursor: 'pointer' }}>
                                            Show More
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="watchlist-header">
                            <div className="alert-list-items">
                                <h3 className="newsfeed">Newsfeed</h3>
                            </div>
                            <div className="news-items">
                                {newsLoading ? (
                                    <div style={{ color: 'white', margin: 'auto' }}>Loading...</div>
                                ) : noNewsDataFound ? (
                                    <div style={{ color: 'white', margin: 'auto' }}>No data found</div>
                                ) : (
                                    newsData.slice(0, displayNewsCount).map((news) => (
                                        <div className="newsfeed1" key={news.id}>
                                            <div className="news-content">
                                                <img
                                                    className="image-9-icon"
                                                    loading="lazy"
                                                    alt=""
                                                    src={news.imageUrl}
                                                />
                                            </div>
                                            <div className="news-details">
                                                <div className="watchlist-filters">
                                                    <div className="reliance-industries">{news.stock_long_name}</div>
                                                    <div className="reliance-gets-us">{news.subtitle}</div>
                                                    <div className="news-time">
                                                        <div className="jul-23-2024">{new Date(news.news_date_time).toLocaleString()}</div>
                                                        <div className="read-parent">
                                                            <div className="read">Read</div>
                                                            <img
                                                                className="frame-child4"
                                                                alt=""
                                                                src="./public/insights/vector-213.svg"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="traders-opinion-vote-on-this-n-parent">
                                                        <div className="traders-opinion-vote">
                                                            Traders opinion vote on this news
                                                        </div>
                                                        <div className="frame-parent5">
                                                            <div className="vector-parent1">
                                                                <img
                                                                    className="frame-child21"
                                                                    alt=""
                                                                    src="./public/insights/polygon-3.svg"
                                                                />
                                                                <div className="buy">243 Buy</div>
                                                            </div>
                                                            <div className="vector-parent2">
                                                                <img
                                                                    className="frame-child22"
                                                                    alt=""
                                                                    src="./public/insights/polygon-3-1.svg"
                                                                />
                                                                <div className="buy">3938 Sell</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )
                                }
                            </div>
                            {!newsLoading && newsData.length > displayNewsCount && (
                                <button onClick={showNewsMore} style={{ margin: "auto", borderRadius: "8px", padding: "10px", cursor: 'pointer' }}>
                                    Show More
                                </button>
                            )}
                        </div>
                    </section>
                </main>
                <div className="good-evening">Good Evening</div>
                <div className="footer">
                    <div className="footer-content">
                        <img
                            className="image-18-icon1"
                            loading="lazy"
                            alt=""
                            src="./public/insights/OneMetric_Transparent.png"
                            onClick={handleHomeClick}
                            style={{ cursor: 'pointer' }}
                        />
                        <div className="main-inner">
                            <div className="main-inner" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                                <b className="onemetric1">OneMetric</b>
                            </div>
                        </div>
                        <div className="footer-social-mobile">
                            <div className="rectangle-parent">
                                <div className="rectangle-div" />
                                <img
                                    className="social-icon"
                                    loading="lazy"
                                    alt=""
                                    src="./public/insights/vector.svg"
                                />
                            </div>
                            <img
                                className="vector-icon1"
                                loading="lazy"
                                alt=""
                                src="./public/insights/vector-1.svg"
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
                                src="./public/insights/vector-172.svg"
                            />
                            <div className="link-items">
                                <div className="link-names">
                                    <a href='/about' style={{ textDecoration: "none", color: "#8A8D9E" }} className="about-us">About Us</a>
                                    <a href='/contact' style={{ textDecoration: "none", color: "#8A8D9E" }} className="contact-us">Contact Us</a>
                                    <a href='/refund' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">Refund Policy</a>
                                    <a href='/plans' className="refund-policy" style={{ textDecoration: "none", color: "#8A8D9E" }}>Pricing</a>
                                </div>
                                <div className="link-names1">
                                    <a href='/privacy' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Privacy &amp; Policy</a>
                                    <a href='/terms' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Terms &amp; conditions</a>
                                    <a href='/referral' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy">Referral Policy</a>
                                    <div className="footer-social">
                                        <div className="rectangle-parent">
                                            <div className="rectangle-div" />
                                            <img
                                                className="social-icon"
                                                loading="lazy"
                                                alt=""
                                                src="./public/insights/vector.svg"
                                            />
                                        </div>
                                        <img
                                            className="vector-icon1"
                                            loading="lazy"
                                            alt=""
                                            src="./public/insights/vector-1.svg"
                                            onClick={handleTwitterRedirect}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <img
                                className="link-icons1"
                                loading="lazy"
                                alt=""
                                src="./public/insights/vector-172.svg"
                            />
                        </div>
                    </div>
                </div>
                <footer className="bottom-sheet-icon-parent">
                    <h6 style={{ position: 'absolute', color: 'white', top: '-20px', left: '80px' }}>OneMetric, All Right reserved © 2024</h6>
                    <img
                        className="bottom-sheet-icon"
                        loading="lazy"
                        alt=""
                        src="./public/insights/vector-2.svg"
                    />
                    <img
                        className="frame-child32"
                        loading="lazy"
                        alt=""
                        src="./public/insights/group-219911503.svg"
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
                </footer>
            </div>
        </div>
    )
}

export default Insights