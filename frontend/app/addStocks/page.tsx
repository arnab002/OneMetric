'use client';
import React, { useEffect, useState, useMemo } from 'react';
import '../../public/assets/addstocks.css';
import axios from 'axios';
import baseApiURL from '@/baseUrl';
import { User, LogOut } from 'react-feather';
import { Plus, Check, Edit3, Trash } from 'react-feather';

type ButtonState = 'plus' | 'check' | 'edit' | 'trash' | 'removing';

function AddStocks() {
    const [stockData, setStockData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [noDataFound, setNoDataFound] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [isRemoving, setIsRemoving] = useState<{ [key: number]: boolean }>({});
    const [visibleActions, setVisibleActions] = useState<{ [key: number]: boolean }>({});
    const [buttonStates, setButtonStates] = useState<{ [key: string]: ButtonState }>({});
    const [addedStocks, setAddedStocks] = useState<number[]>([]); // Track added stocks
    const [displayCount, setDisplayCount] = useState(30);
    const [isPlanValid, setIsPlanValid] = useState<boolean>(false);
    const [planStatus, setPlanStatus] = useState<string>('');
    const [daysUntilExpiry, setDaysUntilExpiry] = useState<number>(0);
    const [isPlanExpired, setIsPlanExpired] = useState<boolean>(false);
    const [userWatchlist, setUserWatchlist] = useState<number[]>([]);
    const [isTokenChecked, setIsTokenChecked] = useState(false);
    const [isCheckingPlan, setIsCheckingPlan] = useState(false);
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
            fetchStockData(selectedFilter);
            fetchUserWatchlist();
        }
    }, [isTokenChecked, token, searchQuery, isSearching, selectedFilter]);


    const sortStocksAlphabetically = (stocks: any[]) => {
        return [...stocks].sort((a, b) =>
            a.stock_long_name.localeCompare(b.stock_long_name, undefined, { sensitivity: 'base' })
        );
    };

    const fetchUserWatchlist = async () => {
        try {
            const response = await axios.get(`${baseApiURL()}/stock-watchlist`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setUserWatchlist(response.data.data.map((stock: any) => stock.scrip_cd));
        } catch (error) {
            console.error('Error fetching user watchlist:', error);
        }
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

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        fetchStockData(filter);
    };

    const fetchStockData = async (filter: string = 'all') => {
        setLoading(true);
        setNoDataFound(false);

        try {
            let endpoint = `${baseApiURL()}/stocks`;
            if (isSearching) {
                endpoint = `https://yzeab2y3rxgoogdsnt3552dlcy0luxco.lambda-url.us-east-1.on.aws`;
            } else {
                switch (filter) {
                    case 'bankNifty':
                        endpoint = `${baseApiURL()}/banknifty`;
                        break;
                    case 'nifty50':
                        endpoint = `${baseApiURL()}/nifty50`;
                        break;
                }
            }

            const response = await axios.get(endpoint, {
                params: isSearching ? { query: searchQuery } : {},
            });

            let data = response.data.data || response.data.data;

            // Apply the filtration with type assertion
            data = data.filter((stock: { stock_long_name: string }) => {
                const regexPattern = /^[\dA-Z]+$/; // Match any string that consists only of digits and uppercase letters
                return !regexPattern.test(stock.stock_long_name);
            });

            // Sort the data alphabetically
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

    const sortedStockData = useMemo(() => sortStocksAlphabetically(stockData), [stockData]);

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setIsSearching(event.target.value.length > 0);
    };

    const showMore = () => {
        setDisplayCount(prevCount => prevCount + 30);
    };

    const handlePlusClick = async (isin_code: string, index: number) => {
        const selectedStock = sortedStockData[index];
        const scrip_cd = selectedStock.scrip_cd;

        setButtonStates((prevState) => ({
            ...prevState,
            [isin_code]: 'check',
        }));

        try {
            await axios.post(`${baseApiURL()}/add-stock-to-watchlist`, {
                scrip_cd: scrip_cd
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(`Stock ${scrip_cd} added!!`);

            setUserWatchlist((prev) => [...prev, scrip_cd]);

            alert("Stock Added Successfully!!");

            setTimeout(() => {
                setButtonStates((prevState) => ({
                    ...prevState,
                    [isin_code]: 'edit',
                }));
            }, 1000);

        } catch (error) {
            console.error('Error adding stock:', error);
            setButtonStates((prevState) => ({
                ...prevState,
                [isin_code]: 'plus',
            }));
            alert("Failed to add stock. Please try again.");
        }

        setVisibleActions((prevState) => ({
            ...prevState,
            [index]: false,
        }));
    };

    const handleEditClick = (isin_code: string) => {
        setButtonStates((prevState) => ({
            ...prevState,
            [isin_code]: 'trash',
        }));
    };

    const handleRemoveClick = async (isin_code: string, index: number) => {
        const selectedStock = sortedStockData[index];
        const scrip_cd = selectedStock.scrip_cd;

        setButtonStates((prevState) => ({
            ...prevState,
            [isin_code]: 'removing',
        }));

        setIsRemoving((prevState) => ({
            ...prevState,
            [index]: true,
        }));

        try {
            await axios.post(`${baseApiURL()}/delete-stock-from-watchlist`, {
                scrip_cd: scrip_cd
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Stock Deleted Successfully!!!");

            setUserWatchlist((prev) => prev.filter(id => id !== scrip_cd));

            setTimeout(() => {
                setButtonStates((prevState) => ({
                    ...prevState,
                    [isin_code]: 'plus',
                }));

                setIsRemoving((prevState) => ({
                    ...prevState,
                    [index]: false,
                }));
            }, 1000);

        } catch (error) {
            console.error('Error deleting stock:', error);
            setButtonStates((prevState) => ({
                ...prevState,
                [isin_code]: 'edit',
            }));
            setIsRemoving((prevState) => ({
                ...prevState,
                [index]: false,
            }));
            alert("Failed to delete stock. Please try again.");
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

    if (!isTokenChecked) {
        return null; // Render nothing until the token is checked
    }

    return (
        <div>
            <div className="add-stocks">
                <div className="add-stocks-parent">
                    <header className="main">
                        <img
                            className="image-18-icon"
                            loading="lazy"
                            alt=""
                            src="./public/insights/image-18@2x.png"
                        />
                        <div className="main-inner">
                            <div className="main-inner">
                                <a className="onemetric">OneMetric</a>
                            </div>
                        </div>
                        <div className="frame-container">
                            <div className="frame-div">
                                <img
                                    className="frame-child1"
                                    alt=""
                                    src="./public/insights/group-1000000998@2x.png"
                                />
                            </div>
                            {isLoggedIn ? (
                                <div className="user-icon-wrapper" style={{ position: 'relative' }}>
                                    <User onClick={toggleDropdown} style={{ cursor: 'pointer' }} />
                                    {showDropdown && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '80%',
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
                    <div className="add-stocks1">
                        <div className="icons-back">
                            <div className="add-stocks2">Add Stocks</div>
                            {/* <div className="frame-parent">
                                <img
                                    className="frame-child"
                                    alt=""
                                    src="./public/group-1000001006.svg"
                                />

                                <div className="import-cas-file">Import CAS file</div>
                            </div> */}
                        </div>
                        <div className="icons-back1">
                            <div className="frame-group" id="frameContainer">
                                <div className="frame-wrapper">
                                    <img
                                        className="frame-item"
                                        alt=""
                                        src="./public/addstocks/group-1000000977.svg"
                                    />
                                </div>
                                <input
                                    className="search-placeholder"
                                    placeholder="Search stocks"
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="trial-info">
                        <div className="add-your-favourite-container">
                            <span style={{ color: 'white' }}>Add your favourite stocks to watch list and </span>
                            {isCheckingPlan ? (
                                <span>Checking plan status...</span>
                            ) : isPlanValid && planStatus === 'active' && !isPlanExpired ? (
                                <span className="plan-expiring">Your Plan is expiring in {daysUntilExpiry} days</span>
                            ) : isPlanExpired ? (
                                <>
                                    <span className="plan-expired">Your Plan has expired&nbsp;&nbsp;</span>
                                    <button className="renew-plan-button" onClick={handleAddToWatchlist}>
                                        Renew Plan
                                    </button>
                                </>
                            ) : planStatus === 'newuser' ? (
                                <>
                                    <span className="enjoy-your-30">Enjoy your free 30 days trial</span>
                                    <button className="purchase-plan-button" onClick={handleAddToWatchlist}>
                                        Purchase Plan
                                    </button>
                                </>
                            ) : (
                                <span>Check your plan status</span>
                            )}
                        </div>
                        {/* <div className="no-card-information">
                            No card information is required for the free trial
                        </div> */}
                    </div>
                    <div className="indices-options-parent">
                        <div className="indices-options">
                            <div
                                className={`indices-names ${selectedFilter === 'all' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('all')}
                            >
                                <div className="all-16">
                                    <b>All </b>
                                    {/* <span className="span">{stockData.length}</span> */}
                                </div>
                            </div>
                            <div
                                className={`indices-names1 ${selectedFilter === 'bankNifty' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('bankNifty')}
                            >
                                <div className="bank-nifty-50-container">
                                    <span>Bank Nifty </span>
                                    {/* <span className="span1">(50)</span> */}
                                    <span> </span>
                                </div>
                            </div>
                            <div
                                className={`indices-names2 ${selectedFilter === 'nifty50' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('nifty50')}
                            >
                                <div className="all-nifty-50-container">
                                    <span>Nifty 50</span>
                                    <span className="span1">
                                        <b className="b"> </b>
                                        {/* <span>(22)</span> */}
                                    </span>
                                    <span>
                                        <span> </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="stocks-list">
                            {loading ? (
                                <div style={{ color: 'white', margin: 'auto' }}>Loading...</div>
                            ) : noDataFound ? (
                                <div style={{ color: 'white', margin: 'auto' }}>No data found</div>
                            ) : (
                                sortedStockData.slice(0, displayCount).map((stock, index) => (
                                    <div key={index} className="select-stocks">
                                        <div className="select-stocks-inner">
                                            <div className="vector-wrapper">
                                                <img className="vector-icon" alt="" />
                                            </div>
                                        </div>
                                        <div className="adani-group-wrapper">
                                            <div className="adani-group" style={{ color: 'white' }}>{stock.stock_long_name}</div>
                                        </div>
                                        <div className="edit-delete-options-wrapper">
                                            {userWatchlist.includes(stock.scrip_cd) ? (
                                                buttonStates[stock.isin_code] === 'edit' || !buttonStates[stock.isin_code] ? (
                                                    <Edit3
                                                        onClick={() => handleEditClick(stock.isin_code)}
                                                        style={{
                                                            transition: 'opacity 2s',
                                                            opacity: 1,
                                                            cursor: 'pointer',
                                                            color: 'white'
                                                        }}
                                                    />
                                                ) : buttonStates[stock.isin_code] === 'trash' ? (
                                                    <div
                                                        onClick={() => handleRemoveClick(stock.isin_code, index)}
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
                                                        <span style={{ marginLeft: '4px', marginTop: '4px', color: 'white' }}>
                                                            {isRemoving[index] ? 'Removing...' : 'Remove'}
                                                        </span>
                                                    </div>
                                                ) : null
                                            ) : (
                                                buttonStates[stock.isin_code] === 'plus' || !buttonStates[stock.isin_code] ? (
                                                    <Plus
                                                        onClick={() => handlePlusClick(stock.isin_code, index)}
                                                        style={{ cursor: 'pointer', color: 'white' }}
                                                    />
                                                ) : buttonStates[stock.isin_code] === 'check' ? (
                                                    <Check
                                                        style={{
                                                            transition: 'opacity 2s',
                                                            opacity: 1,
                                                            backgroundColor: 'green',
                                                            color: 'white',
                                                            borderRadius: '50%',
                                                            padding: '1%'
                                                        }}
                                                    />
                                                ) : null
                                            )}
                                            {buttonStates[stock.isin_code] === 'removing' && (
                                                <div
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
                                                    <span style={{ marginLeft: '4px', marginTop: '4px', color: 'white' }}>Removing...</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {!loading && sortedStockData.length > displayCount && (
                            <button onClick={showMore} style={{ margin: "auto", borderRadius: "8px", padding: "10px" }}>Show More</button>
                        )}
                    </div>
                    <div className="footer">
                        <div className="footer-content">
                            <img
                                className="image-18-icon1"
                                loading="lazy"
                                alt=""
                                src="./public/insights/image-18@2x.png"
                            />
                            <div className="main-inner">
                                <div className="main-inner">
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
                                        src="./public/insights/vector.svg"
                                    />
                                </div>
                                <img
                                    className="vector-icon1"
                                    loading="lazy"
                                    alt=""
                                    src="./public/insights/vector-1.svg"
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
                                        <a href='#' style={{ textDecoration: "none", color: "#8A8D9E" }} className="faqs">FAQs</a>
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
                    <div className="copyright">
                        <div className="simply-grow-all-right-reserve-parent">
                            <div className="simply-grow-all">
                                OneMetric, All Right reserved © 2024
                            </div>
                            <div className="social-links">
                                <div className="social-icon-parent">
                                    <img
                                        className="social-icon"
                                        loading="lazy"
                                        alt=""
                                        src="./public/about/vector-2.svg"
                                    />
                                    <img
                                        className="frame-child4"
                                        loading="lazy"
                                        alt=""
                                        src="./public/about/group-219911503.svg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStocks;

