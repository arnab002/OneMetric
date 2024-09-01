'use client';
import React, { useEffect, useState, useMemo } from 'react';
import '../../public/assets/addstocks.css';
import axios from 'axios';
import baseApiURL from '@/baseUrl';
import logo from "../../public/public/home/OneMetric_Transparent.png";
import { BarLoader, PulseLoader } from 'react-spinners'; // Import multiple loaders
import { ArrowLeft, User } from 'react-feather';
import { Plus, Check, Edit3, Trash } from 'react-feather';

interface Stock {
    stock_long_name: string;
    sc_name?: string;
    scrip_cd: string;
    // Add other properties as needed
}

type ButtonState = 'plus' | 'check' | 'edit' | 'trash' | 'removing';

function AddStocks() {
    const [planId, setPlanId] = useState<string>('');
    const [trialStartDate, setTrialStartDate] = useState<Date | null>(null);
    const [showTabs, setShowTabs] = useState(true);
    const [cachedStockData, setCachedStockData] = useState<any[]>([]);
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
    const [watchlistCount, setWatchlistCount] = useState(0);
    const [selectedStocks, setSelectedStocks] = useState<Set<number>>(new Set());
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isAddingMultiple, setIsAddingMultiple] = useState(false);
    const [lastSuccessfulSearchQuery, setLastSuccessfulSearchQuery] = useState<string>('');
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    const [isTokenChecked, setIsTokenChecked] = useState(false);
    const [isCheckingPlan, setIsCheckingPlan] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const MAX_WATCHLIST_STOCKS = 500;

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
            fetchUserWatchlist();
            fetchWatchlistCount();
        }
    }, [isTokenChecked, token]);

    useEffect(() => {
        if (isTokenChecked && token) {
            fetchStockData(selectedFilter);
        }
    }, [isTokenChecked, token, selectedFilter]);

    // Memoized search function
    const searchStocks = useMemo(() => {
        return (query: string, stocks: Stock[]): Stock[] => {
            const lowercaseQuery = query.toLowerCase().trim();
            if (!lowercaseQuery) return stocks;

            const filteredStocks = stocks.filter(stock => {
                const stockLongName = stock.stock_long_name.toLowerCase();
                const scName = stock.sc_name ? stock.sc_name.toLowerCase() : '';
                
                return stockLongName.startsWith(lowercaseQuery) || scName.startsWith(lowercaseQuery);
            });

            // Custom sorting function
            const sortStocks = (a: Stock, b: Stock) => {
                const aName = a.sc_name ? a.sc_name.toLowerCase() : a.stock_long_name.toLowerCase();
                const bName = b.sc_name ? b.sc_name.toLowerCase() : b.stock_long_name.toLowerCase();

                // First, sort by exact match
                if (aName.startsWith(lowercaseQuery) && !bName.startsWith(lowercaseQuery)) return -1;
                if (!aName.startsWith(lowercaseQuery) && bName.startsWith(lowercaseQuery)) return 1;

                // Then, sort alphabetically
                for (let i = 0; i < aName.length && i < bName.length; i++) {
                    if (aName[i] !== bName[i]) {
                        return aName.charCodeAt(i) - bName.charCodeAt(i);
                    }
                }

                // If all characters are the same up to the length of the shorter string,
                // sort by length (shorter first)
                return aName.length - bName.length;
            };

            return filteredStocks.sort(sortStocks);
        };
    }, []);

    useEffect(() => {
        if (cachedStockData.length > 0) {
            const searchResults = searchStocks(searchQuery, cachedStockData);
            setStockData(searchResults);
            setNoDataFound(searchResults.length === 0);
            setShowSearchResults(true);
            setLoading(false);
        }
    }, [searchQuery, cachedStockData, searchStocks]);

    const sortStocksAlphabetically = (stocks: any[]) => {
        return [...stocks].sort((a, b) =>
            a.stock_long_name.localeCompare(b.stock_long_name, undefined)
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

    const fetchWatchlistCount = async () => {
        try {
            const response = await axios.get(`${baseApiURL()}/stock-watchlist`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setWatchlistCount(response.data.data.length);
        } catch (error) {
            console.error('Error fetching watchlist count:', error);
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
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleUserAccountClick = () => {
        window.location.href = '/userAccount'
    };

    const SelectAllButton = ({ stocks, onSelectAll }: { stocks: any[], onSelectAll: (selected: boolean) => void }) => {
        const [isAllSelected, setIsAllSelected] = useState(false);

        const handleSelectAll = () => {
            const newState = !isAllSelected;
            setIsAllSelected(newState);
            onSelectAll(newState);
        };

        return (
            <button
                className="add-icon-parent"
                onClick={handleSelectAll}
                disabled={isAddingMultiple}
                style={{ width: "165px", borderRadius: "8px", padding: "10px", cursor: isAddingMultiple ? 'not-allowed' : 'pointer', marginBottom: '10px' }}
            >
                <span className='add' style={{ margin: 'auto' }}>
                    {isAddingMultiple ? 'Adding...' : (isAllSelected ? 'Deselect All' : 'Add all to watchlist')}
                </span>
            </button>
        );
    };

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        setSelectedStocks(new Set());
        fetchStockData(filter);
    };

    const handleSelectAll = async (selected: boolean) => {
        if (selected) {
            const allStockIds = stockData.map(stock => stock.scrip_cd);
            setSelectedStocks(new Set(allStockIds));

            if (watchlistCount >= MAX_WATCHLIST_STOCKS) {
                alert(`You've reached the maximum limit of ${MAX_WATCHLIST_STOCKS} stocks in your watchlist.`);
                return;
            }

            setIsAddingMultiple(true);
            let addedCount = 0;
            let newUserWatchlist = [...userWatchlist];
            let newButtonStates = { ...buttonStates };

            for (const scrip_cd of allStockIds) {
                if (watchlistCount + addedCount >= MAX_WATCHLIST_STOCKS) {
                    alert(`You've reached the maximum limit of ${MAX_WATCHLIST_STOCKS} stocks in your watchlist.`);
                    break;
                }

                if (!newUserWatchlist.includes(scrip_cd)) {
                    try {
                        await axios.post(`${baseApiURL()}/add-stock-to-watchlist`, {
                            scrip_cd: scrip_cd
                        }, {
                            headers: {
                                Authorization: `${token}`,
                            },
                        });

                        newUserWatchlist.push(scrip_cd);
                        const stock = stockData.find(s => s.scrip_cd === scrip_cd);
                        if (stock) {
                            newButtonStates[stock.isin_code] = 'edit';
                        }
                        addedCount++;
                    } catch (error) {
                        console.error('Error adding stock:', error);
                    }
                }
            }

            setUserWatchlist(newUserWatchlist);
            setButtonStates(newButtonStates);
            setWatchlistCount(prevCount => prevCount + addedCount);
            setIsAddingMultiple(false);

            alert(`${addedCount} stock${addedCount !== 1 ? 's' : ''} added to your watchlist.`);
        } else {
            setSelectedStocks(new Set());
        }
    };

    const fetchStockData = async (filter: string = 'all') => {
        setLoading(true);
        setNoDataFound(false);
        setShowSearchResults(false);

        try {
            let endpoint = `${baseApiURL()}/stocks`;
            switch (filter) {
                case 'bankNifty':
                    endpoint = `${baseApiURL()}/banknifty`;
                    break;
                case 'nifty50':
                    endpoint = `${baseApiURL()}/nifty50`;
                    break;
            }

            const response = await axios.get(endpoint);
            let data = response.data.data || [];

            // Apply the filtration to remove stocks with names containing only digits and uppercase letters
            data = data.filter((stock: { stock_long_name: string }) => {
                const regexPattern = /^[\dA-Z]+$/;
                return !regexPattern.test(stock.stock_long_name);
            });

            // Sort alphabetically
            data = sortStocksAlphabetically(data);

            setCachedStockData(data);
            setStockData(data);
            setNoDataFound(data.length === 0);
        } catch (error) {
            console.error('Error fetching stock data:', error);
            setNoDataFound(true);
        } finally {
            setLoading(false);
            setShowSearchResults(true);
        }
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
            console.log("Plan validity response:", response.data);

            const { success, status, data } = response.data;

            setIsPlanValid(success);
            setPlanStatus(status);
            setPlanId(data.plan_id.toString());

            if (success && status === 'active') {
                const expiryDate = new Date(data.expire_date);
                const currentDate = new Date(data.current_date);
                const timeDifference = expiryDate.getTime() - currentDate.getTime();
                const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
                setDaysUntilExpiry(daysDifference);
                setIsPlanExpired(daysDifference <= 0);

                if (data.plan_id === 1) {
                    setTrialStartDate(new Date(data.current_date));
                }
            } else {
                setIsPlanExpired(true);
            }

            console.log("Updated state:", {
                isPlanValid: success,
                planStatus: status,
                planId: data.plan_id.toString(),
                daysUntilExpiry: Math.ceil((new Date(data.expire_date).getTime() - new Date(data.current_date).getTime()) / (1000 * 3600 * 24)),
                isPlanExpired: !success || status !== 'active'
            });

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
                        <span className="plan-expiring">{expiryMessage}</span>&nbsp;&nbsp;
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
                    <span className="plan-expired" style={{ color: 'red' }}>Your Plan has expired&nbsp;&nbsp;</span>
                    <button className="add-icon-parent-renew" style={{ cursor: 'pointer' }} onClick={handlePricingPageClick}>
                        <span className='add-renew'>Renew Plan</span>
                    </button>
                </>
            );
        }

        if (planStatus === 'newuser') {
            return (
                <>
                    <span className="enjoy-your-30">Start your free 14 days trial&nbsp;&nbsp;</span>
                    <button className="purchase-plan-button" onClick={handleAddToWatchlist}>
                        Start Trial
                    </button>
                </>
            );
        }

        // Default case if none of the above conditions are met
        return <span style={{ color: 'white' }}>Unable to determine plan status. Please contact support.</span>;
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setSearchQuery(newQuery);
        setIsSearchActive(newQuery.trim() !== '');
        setShowTabs(newQuery.trim() === '');
    };

    const showMore = () => {
        setDisplayCount(prevCount => prevCount + 30);
    };

    const handlePlusClick = async (scrip_cd: string, index: number) => {
        if (watchlistCount >= MAX_WATCHLIST_STOCKS) {
            alert(`You've reached the maximum limit of ${MAX_WATCHLIST_STOCKS} stocks in your watchlist.`);
            return;
        }

        const selectedStock = stockData[index];
        const scripcd = selectedStock.scrip_cd;

        setButtonStates((prevState) => ({
            ...prevState,
            [scrip_cd]: 'check',
        }));

        try {
            await axios.post(`${baseApiURL()}/add-stock-to-watchlist`, {
                scrip_cd: scrip_cd
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserWatchlist((prev) => [...prev, scripcd]);
            setWatchlistCount((prevCount) => prevCount + 1);

            setButtonStates((prevState) => ({
                ...prevState,
                [scrip_cd]: 'edit',
            }));

        } catch (error) {
            console.error('Error adding stock:', error);
            setButtonStates((prevState) => ({
                ...prevState,
                [scrip_cd]: 'plus',
            }));
            alert("Failed to add stock. Please try again.");
        }

        setVisibleActions((prevState) => ({
            ...prevState,
            [index]: false,
        }));
    };

    const handleEditClick = (scrip_cd: string) => {
        setButtonStates((prevState) => ({
            ...prevState,
            [scrip_cd]: 'trash',
        }));
    };

    const handleRemoveClick = async (scrip_cd: string, index: number) => {
        const selectedStock = stockData[index];
        const scripcd = selectedStock.scrip_cd;

        setButtonStates((prevState) => ({
            ...prevState,
            [scrip_cd]: 'removing',
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
                    Authorization: `${token}`,
                },
            });

            setUserWatchlist((prev) => prev.filter(id => id !== scripcd));
            setWatchlistCount((prevCount) => prevCount - 1); // Decrement the count

            setTimeout(() => {
                setButtonStates((prevState) => ({
                    ...prevState,
                    [scrip_cd]: 'plus',
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
                [scrip_cd]: 'edit',
            }));
            setIsRemoving((prevState) => ({
                ...prevState,
                [index]: false,
            }));
            alert("Failed to delete stock. Please try again.");
        }
    };

    const handleAddToWatchlist = async () => {

        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found in localStorage');
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

    const handleHomeClick = () => {
        window.location.href = '/'
    };

    const handleInsightsClick = () => {
        window.location.href = '/insights'
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
            <div className="add-stocks">
                <div className="add-stocks-parent">
                    <header className="main">
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
                            <div className="frame-div">
                                <img
                                    className="frame-child1"
                                    alt=""
                                    src="./public/insights/group-1000000998@2x.png"
                                />
                            </div>
                            {isLoggedIn ? (
                                <div className="user-icon-wrapper" style={{ position: 'relative' }}>
                                    <User onClick={handleUserAccountClick} style={{ cursor: 'pointer' }} />
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
                    <div className="add-stocks2">
                        <span onClick={handleInsightsClick} style={{ cursor: 'pointer' }}><ArrowLeft /></span>
                        &nbsp;&nbsp;<span style={{ paddingTop: '0.2%' }}>Add Stocks</span>
                    </div>
                    <div className="trial-info">
                        <div className="add-your-favourite-container">
                            <span style={{ color: 'white' }}>Add your favourite stocks to watch list</span>
                            <br />
                            {renderPlanStatus()}
                        </div>
                    </div>
                    <div className="add-stocks1">
                        <div className="icons-back">
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
                    <div className="indices-options-parent">
                        {showTabs && (
                            <div className="indices-options">
                                <div
                                    className={`indices-names ${selectedFilter === 'all' ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('all')}
                                >
                                    <div className="all-16">
                                        <b>All </b>
                                        <span className="span">({stockData.length})</span>
                                    </div>
                                </div>
                                <div
                                    className={`indices-names1 ${selectedFilter === 'bankNifty' ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('bankNifty')}
                                >
                                    <div className="bank-nifty-50-container">
                                        <span>Bank Nifty </span>
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
                                        </span>
                                        <span>
                                            <span> </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="stocks-list">
                            {loading ? (
                                <div style={{ color: 'white', margin: 'auto' }}>Loading...</div>
                            ) : noDataFound ? (
                                <div style={{ color: 'white', margin: 'auto' }}>No data found</div>
                            ) : showSearchResults || !isSearchActive ? (
                                <>
                                    {(selectedFilter === 'bankNifty' || selectedFilter === 'nifty50') && showTabs && (
                                        <SelectAllButton stocks={stockData} onSelectAll={handleSelectAll} />
                                    )}
                                    {stockData.slice(0, displayCount).map((stock, index) => (
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
                                                    buttonStates[stock.scrip_cd] === 'edit' || !buttonStates[stock.scrip_cd] ? (
                                                        <Edit3
                                                            onClick={() => handleEditClick(stock.scrip_cd)}
                                                            style={{
                                                                transition: 'opacity 0.3s',
                                                                opacity: 1,
                                                                cursor: 'pointer',
                                                                color: 'green'
                                                            }}
                                                        />
                                                    ) : buttonStates[stock.scrip_cd] === 'trash' ? (
                                                        <div
                                                            onClick={() => handleRemoveClick(stock.scrip_cd, index)}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                backgroundColor: 'red',
                                                                padding: '10px',
                                                                transition: 'opacity 0.3s',
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
                                                    buttonStates[stock.scrip_cd] === 'plus' || !buttonStates[stock.scrip_cd] ? (
                                                        <Plus
                                                            onClick={() => handlePlusClick(stock.scrip_cd, index)}
                                                            style={{ cursor: 'pointer', color: 'white' }}
                                                        />
                                                    ) : buttonStates[stock.scrip_cd] === 'check' ? (
                                                        <Check
                                                            style={{
                                                                transition: 'opacity 0.3s',
                                                                opacity: 1,
                                                                backgroundColor: 'green',
                                                                color: 'white',
                                                                borderRadius: '50%',
                                                                padding: '1%'
                                                            }}
                                                        />
                                                    ) : null
                                                )}
                                                {buttonStates[stock.scrip_cd] === 'removing' && (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            backgroundColor: 'red',
                                                            padding: '10px',
                                                            transition: 'opacity 0.3s',
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
                                    ))}
                                </>
                            ) : null}
                        </div>
                        {!loading && stockData.length > displayCount && (
                            <button className="add-icon-parent" onClick={showMore} style={{ width: "120px", margin: "auto", borderRadius: "8px", padding: "10px", cursor: 'pointer' }}>
                                <span className='add' style={{ margin: 'auto' }}>Show More</span>
                            </button>
                        )}
                    </div>
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
                            <div className="footer-social">
                                <div className="rectangle-parent">
                                    <div className="rectangle-div" />
                                    <img
                                        className="social-icon"
                                        loading="lazy"
                                        alt=""
                                        src="./public/insights/vector.svg"
                                        onClick={handleWhatsAppRedirect} style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <img
                                    className="vector-icon1"
                                    loading="lazy"
                                    alt=""
                                    src="./public/insights/vector-1.svg"
                                    onClick={handleTwitterRedirect} style={{ cursor: 'pointer' }}
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
                                        <a href='/disclaimer' style={{ textDecoration: "none", color: "#8A8D9E" }} className="contact-us">Disclaimer</a>
                                        <a href='/refund' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">Refund Policy</a>
                                        <a href='/insights' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">News Feed</a>
                                        <a href='/plans' className="refund-policy" style={{ textDecoration: "none", color: "#8A8D9E" }}>Pricing</a>
                                    </div>
                                    <div className="link-names1">
                                        <a href='/privacy' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Privacy Policy</a>
                                        <a href='/terms' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Terms &amp; conditions</a>
                                        <a href='/referral' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy">Referral Policy</a>
                                        <a href='/contact' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy">Contact Us</a>
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

