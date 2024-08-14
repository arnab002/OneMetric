'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit3, Trash } from 'react-feather';
import axios from 'axios';
import baseApiURL from '@/baseUrl';
import '../../public/assets/insights.css'

function Insights() {
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            router.push('/login');
        }
    }, []);
    const [newsData, setNewsData] = useState<Array<{ [key: string]: any }>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const postsPerPage = 4;
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [stockData, setStockData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newsLoading, setNewsLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [noDataFound, setNoDataFound] = useState<boolean>(false);
    const [noNewsDataFound, setNoNewsDataFound] = useState<boolean>(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [buttonStates, setButtonStates] = useState<{ [key: string]: boolean }>({});
    const [displayCount, setDisplayCount] = useState(30);
    const token = sessionStorage.getItem('authToken');

    const handleClick = () => {
        router.push(`/addStocks`);
    };

    const showMore = () => {
        setDisplayCount(prevCount => prevCount + 30);
    };

    useEffect(() => {
        const fetchStockData = async () => {
            setLoading(true);
            setNoDataFound(false);

            try {
                const endpoint = isSearching
                    ? `${baseApiURL()}/search-stocks`
                    : `${baseApiURL()}/stocks`;
            
                const response = await axios.get(endpoint, {
                    params: isSearching ? { query: searchQuery } : {},
                    headers: !isSearching ? { Authorization: `Bearer ${token}` } : {}, 
                });
            
                const data = response.data.data || response.data.data;
                setStockData(data);
            
                if (data.length === 0) {
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

        fetchStockData();
    }, [searchQuery, isSearching]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setIsSearching(event.target.value.length > 0);
    };

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        setIsSearching(false);
        setSearchQuery('');
    };

    useEffect(() => {
        // Fetch data from the API
        const fetchNewsData = async () => {
            setNewsLoading(true);
            setNoNewsDataFound(false);

            try {
                const response = await axios.get(`${baseApiURL()}/news`);
                const result = await response.data.data;
                setNewsData(result);

                if (result.length === 0) {
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

        fetchNewsData();
    }, []);

    // Calculate pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = newsData.slice(indexOfFirstPost, indexOfLastPost);

    // Handle pagination
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        // Implement your logout logic here
        console.log("Logged out");
    };

    const handleEditClick = (isin_code: string) => {
        setButtonStates((prevState) => ({
            ...prevState,
            [isin_code]: true,
        }));
    };

    const handleRemoveClick = (isin_code: string) => {
        setButtonStates((prevState) => ({
            ...prevState,
            [isin_code]: false,
        }));
    };

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
                        src="./public/insights/image-18@2x.png"
                    />
                    <div className="main-inner">
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
                        <div className="union-wrapper">
                            <img
                                className="union-icon"
                                loading="lazy"
                                alt=""
                                src="./public/insights/union.svg"
                                onClick={toggleDropdown} // Toggle dropdown on click
                                style={{ cursor: 'pointer' }}
                            />
                            {dropdownVisible && (
                                <div className="dropdown-menu">
                                    <button onClick={handleLogout}>Log Out</button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
                <div className="frame-parent4">
                    <input className="frame-input" type="checkbox" />
                    <div className="search-stock">Search Stock</div>
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
                        <div className="watchlist-header">
                            <div className="alert-list-items">
                                <h3 className="my-stock-watchlist">My Stock watchlist</h3>
                                <button className="add-icon-parent" id="frameButton" onClick={handleClick}>
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
                                    <div
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
                                    </div>
                                </div>
                                <div className="watchlist-items">
                                    {loading ? (
                                        <div style={{ color: 'white', margin: 'auto' }}>Loading...</div>
                                    ) : noDataFound ? (
                                        <div style={{ color: 'white', margin: 'auto' }}>No data found</div>
                                    ) : (
                                        stockData.slice(0, displayCount).map((stock) => (
                                            <div key={stock.isin_code} className="select-stocks">
                                                <div className="select-stocks-inner">
                                                    <div className="vector-wrapper">
                                                        <img className="frame-child5" alt="" />
                                                    </div>
                                                </div>
                                                <div className="stock-item">
                                                    <div className="adani-group1">{stock.stock_long_name}</div>
                                                </div>
                                                <div className="actions">
                                                    <div>
                                                        {!buttonStates[stock.isin_code] ? (
                                                            <Edit3
                                                                size={18}
                                                                onClick={() => handleEditClick(stock.isin_code)}
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    transition: 'transform 0.5s, opacity 0.5s',
                                                                    color: 'white',
                                                                    marginTop: '7%'
                                                                }}
                                                            />
                                                        ) : (
                                                            <div
                                                                onClick={() => handleRemoveClick(stock.isin_code)}
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    transition: 'transform 0.5s, opacity 0.5s',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    backgroundColor: 'red',
                                                                    padding: '10px',
                                                                }}
                                                            >
                                                                <Trash style={{ color: 'white' }} />
                                                                <span style={{ marginLeft: '4px', marginTop: '2px', color: 'white' }}>Remove</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    <br />
                                    {!loading && stockData.length > displayCount && (
                                        <button onClick={showMore} style={{ margin: "auto", borderRadius: "8px", padding: "10px" }}>
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
                                    currentPosts.map((news) => (
                                        <div className="newsfeed1" key={news.id}>
                                            <div className="news-content">
                                                <img
                                                    className="image-9-icon"
                                                    loading="lazy"
                                                    alt=""
                                                    src="./public/insights/Stock_Market.jpg"
                                                />
                                            </div>
                                            <div className="news-details">
                                                <div className="watchlist-filters">
                                                    <div className="reliance-industries">{news.stock_long_name}</div>
                                                    <div className="reliance-gets-us">{news.news_sub}</div>
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
                            {/* <div className="pagination">
                                {Array.from({ length: Math.ceil(newsData.length / postsPerPage) }, (_, index) => (
                                    <button key={index} onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </button>
                                ))}
                            </div> */}
                        </div>
                    </section>
                </main>
                <div className="good-evening">Good Evening</div>
                <div className="footer">
                    <div className="footer-content">
                        {/* <div className="frame-parent">
                            <img
                                className="frame-child"
                                alt=""
                                src="./public/insights/group-1000000964.svg"
                            />
                            <img
                                className="frame-item"
                                alt=""
                                src="./public/insights/group-1000000966.svg"
                            />
                        </div>
                        <div className="frame-group">
                            <img
                                className="frame-inner"
                                alt=""
                                src="./public/insights/group-1000001000.svg"
                            />
                            <div className="add-stocks">Add Stocks</div>
                        </div> */}
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
                                    <a href='#' style={{ textDecoration: "none", color: "#8A8D9E" }} className="contact-us">Contact Us</a>
                                    <a href='/refund' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">Refund Policy</a>
                                </div>
                                <div className="link-names1">
                                    <a href='#' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Terms &amp; conditions</a>
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
                <footer className="bottom-sheet-icon-parent">
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