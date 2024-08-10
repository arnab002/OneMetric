'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import baseApiURL from '@/baseUrl';
import '../../public/assets/insights.css'

function Insights() {
    const [stockData, setStockData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [noDataFound, setNoDataFound] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const mobile = searchParams.get('mobile');
    const router = useRouter();

    const handleClick = () => {
        router.push(`/addStocks?mobile=${mobile}`);
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
                });

                const data = response.data.data || response.data;
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
                            />
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
                <div className="simply-grow-all">Simply Grow, All Right reserved © 2024</div>
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
                                    <div className="filter-names">
                                        <div className="all-16">
                                            <b className="all">All </b>
                                            <span className="span2">(16)</span>
                                        </div>
                                    </div>
                                    <div className="filter-names1">
                                        <div className="bank-nifty-50-container">
                                            <span className="bank-nifty">Bank Nifty </span>
                                            <span className="span3">(50)</span>
                                            <span className="bank-nifty"> </span>
                                        </div>
                                    </div>
                                    <div className="filter-names2">
                                        <div className="all-nifty-50-container">
                                            <span className="all">All Nifty 50</span>
                                            <span className="span3">
                                                <b className="b"> </b>
                                                <span className="b">(22)</span>
                                            </span>
                                            <span className="b">
                                                <span className="bank-nifty"> </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="filter-names3">
                                        <div className="all-banks8">
                                            <span>
                                                <span className="bank-nifty">All Banks</span>
                                                <span className="span3">(8) </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="filter-names4">
                                        <div className="psus-2">
                                            <span>
                                                <span className="bank-nifty">PSUs </span>
                                                <span className="span3">(2) </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="watchlist-items">
                                    {loading ? (
                                        <div style={{ color: 'white', margin: 'auto' }}>Loading...</div>
                                    ) : noDataFound ? (
                                        <div style={{ color: 'white', margin: 'auto' }}>No data found</div>
                                    ) : (
                                        stockData.map(stock => (
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
                                                    <div className="edit-delet">
                                                        <img
                                                            className="edit-icon"
                                                            loading="lazy"
                                                            alt="Edit"
                                                            src="./public/insights/edit.svg"
                                                        />
                                                        <img
                                                            className="edit-icon"
                                                            loading="lazy"
                                                            alt="Delete"
                                                            src="./public/insights/delete.svg"
                                                        />
                                                        <div className="delete1">
                                                            <img
                                                                className="edit-2-icon"
                                                                alt="Edit 2"
                                                                src="./public/insights/edit2.svg"
                                                            />
                                                        </div>
                                                        <div className="delete2">
                                                            <img
                                                                className="edit-2-icon1"
                                                                alt="Edit 2-1"
                                                                src="./public/insights/edit2-1.svg"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="watchlist-header">
                            <div className="alert-list-items">
                                <h3 className="newsfeed">Newsfeed</h3>
                                <div className="view-all-news">
                                    <a className="view-all1">View All</a>
                                </div>
                            </div>
                            <div className="news-items">
                                <div className="newsfeed1">
                                    <div className="news-content">
                                        <img
                                            className="image-9-icon"
                                            loading="lazy"
                                            alt=""
                                            src="./public/insights/image-9@2x.png"
                                        />
                                    </div>
                                    <div className="news-details">
                                        <div className="watchlist-filters">
                                            <div className="reliance-industries">Reliance Industries</div>
                                            <div className="reliance-gets-us">
                                                Reliance gets US approval to resume crude imports from
                                                Venezuela
                                            </div>
                                            <div className="news-time">
                                                <div className="jul-23-2024">Jul 23 2024 07:21 PM</div>
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
                                <div className="newsfeed1">
                                    <div className="news-content">
                                        <img
                                            className="image-9-icon"
                                            loading="lazy"
                                            alt=""
                                            src="./public/insights/image-91@2x.png"
                                        />
                                    </div>
                                    <div className="news-details">
                                        <div className="watchlist-filters">
                                            <div className="reliance-industries">Tata Power</div>
                                            <div className="tata-powers-microgrid">
                                                Tata Power’s Microgrid Arm partners with National Dairy
                                                Development Board to Solarize Milk Value Chain
                                            </div>
                                            <div className="news-time">
                                                <div className="jul-24-2024">Jul 24 2024 09:30 AM</div>
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
                                                <div className="frame-parent6">
                                                    <div className="vector-parent3">
                                                        <img
                                                            className="frame-child21"
                                                            alt=""
                                                            src="./public/insights/polygon-3.svg"
                                                        />
                                                        <div className="buy">1423 Buy</div>
                                                    </div>
                                                    <div className="vector-parent4">
                                                        <img
                                                            className="frame-child22"
                                                            alt=""
                                                            src="./public/insights/polygon-3-1.svg"
                                                        />
                                                        <div className="buy">232 Sell</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="newsfeed1">
                                    <div className="news-content">
                                        <img
                                            className="image-9-icon"
                                            loading="lazy"
                                            alt=""
                                            src="./public/insights/image-92@2x.png"
                                        />
                                    </div>
                                    <div className="news-details">
                                        <div className="watchlist-filters">
                                            <div className="reliance-industries">Muthoot Finance</div>
                                            <div className="reliance-gets-us">
                                                Muthoot Finance Consolidated March 2024 Net Sales at Rs
                                                4,163.80 crore, up 27.14% Y-o-Y
                                            </div>
                                            <div className="news-time">
                                                <div className="jul-25-2024">Jul 25 2024 11:32 AM</div>
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
                                                <div className="frame-parent7">
                                                    <div className="vector-parent5">
                                                        <img
                                                            className="frame-child21"
                                                            alt=""
                                                            src="./public/insights/polygon-3.svg"
                                                        />
                                                        <div className="buy">126 Buy</div>
                                                    </div>
                                                    <div className="vector-parent6">
                                                        <img
                                                            className="frame-child22"
                                                            alt=""
                                                            src="./public/insights/polygon-3-1.svg"
                                                        />
                                                        <div className="buy">43 Sell</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <div className="good-evening">Good Evening</div>
                <div className="footer">
                    <div className="footer-content">
                        <div className="frame-parent">
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
                        </div>
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