'use client';
import React, { useEffect, useState } from 'react';
import '../../public/assets/addstocks.css';
import axios from 'axios';
import baseApiURL from '@/baseUrl';
import { Trash2, Plus } from 'react-feather';

function AddStocks() {
    const [stockData, setStockData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [noDataFound, setNoDataFound] = useState<boolean>(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [visibleActions, setVisibleActions] = useState<{ [key: number]: boolean }>({});
    const [addedStocks, setAddedStocks] = useState<number[]>([]); // Track added stocks
    const [displayCount, setDisplayCount] = useState(30);
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        console.error('No token found in sessionStorage');
        return;
    }

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
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

    const handleToggleActions = (index: number) => {
        setVisibleActions((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handleAddStock = async (index: number) => {
        const selectedStock = stockData[index];
        const scrip_cd = selectedStock.scrip_cd;

        try {
            await axios.post(`${baseApiURL()}/add-stock-to-watchlist`, {
                scrip_cd: scrip_cd
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Passing the token in the Authorization header
                    },
                });
            alert("Stock Added Successfully!!");
            console.log(`Stock ${scrip_cd} added!!`);

            // Add this stock to the addedStocks state
            setAddedStocks((prev) => [...prev, index]);

        } catch (error) {
            console.error('Error adding stock:', error);
        }

        setVisibleActions((prevState) => ({
            ...prevState,
            [index]: false,
        }));
    };

    const handleDeleteStock = async (index: number) => {
        const selectedStock = stockData[index];
        const scrip_cd = selectedStock.scrip_cd;

        try {
            await axios.post(`${baseApiURL()}/delete-stock-from-watchlist`, {
                scrip_cd: scrip_cd
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Passing the token in the Authorization header
                    },
                });
            alert("Stock Deleted Successfully!!!");
            console.log(`Stock ${scrip_cd} deleted !!`);
            setStockData(stockData.filter((_, i) => i !== index));
            setAddedStocks((prev) => prev.filter((i) => i !== index)); // Remove from addedStocks
        } catch (error) {
            console.error('Error deleting stock:', error);
        }

        setVisibleActions((prevState) => ({
            ...prevState,
            [index]: false,
        }));
    };

    const showMore = () => {
        setDisplayCount(prevCount => prevCount + 30);
    };

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
                    <div className="add-stocks1">
                        <div className="icons-back">
                            <div className="icons" id="iconsContainer">
                                <div className="iconback-arrow">
                                    <div className="path-wrapper">
                                        <img className="path-icon" alt="" src="./public/addstocks/path.svg" />
                                    </div>
                                </div>
                            </div>
                            <div className="add-stocks2">Add Stocks</div>
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
                        <div className="indices-options">
                            <div
                                className={`indices-names ${selectedFilter === 'all' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('all')}
                            >
                                <div className="all-16">
                                    <b>All </b>
                                    <span className="span">(16)</span>
                                </div>
                            </div>
                            <div
                                className={`indices-names1 ${selectedFilter === 'bankNifty' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('bankNifty')}
                            >
                                <div className="bank-nifty-50-container">
                                    <span>Bank Nifty </span>
                                    <span className="span1">(50)</span>
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
                                        <span>(22)</span>
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
                                stockData.slice(0, displayCount).map((stock, index) => (
                                    <div key={index} className="select-stocks">
                                        <div className="select-stocks-inner">
                                            <div className="vector-wrapper">
                                                <img className="vector-icon" alt="" />
                                            </div>
                                        </div>
                                        <div className="adani-group-wrapper">
                                            <div className="adani-group" style={{ color: 'white' }}>{stock.stock_long_name} ({stock.scrip_cd})</div>
                                        </div>
                                        <div className="edit-delete-options-wrapper">
                                            {addedStocks.includes(index) ? (
                                                visibleActions[index] ? (
                                                    <div>
                                                        <Trash2 size={20} color="white" style={{ cursor: 'pointer' }} onClick={() => handleDeleteStock(index)} />
                                                    </div>
                                                ) : (
                                                    <button onClick={() => handleToggleActions(index)}>Options</button>
                                                )
                                            ) : (
                                                <Plus size={20} color="white" style={{ cursor: 'pointer' }} onClick={() => handleAddStock(index)} />
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                            {!loading && stockData.length > displayCount && (
                                <button onClick={showMore} style={{ margin: "auto", borderRadius: "8px", padding: "10px" }}>Show More</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStocks;

