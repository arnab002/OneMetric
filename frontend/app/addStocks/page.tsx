'use client';
import React, { useEffect, useState } from 'react';
import '../../public/assets/addstocks.css';
import axios from 'axios';
import baseApiURL from '@/baseUrl';
import { Trash2, Plus, Check, Edit3, Trash } from 'react-feather';

type ButtonState = 'plus' | 'check' | 'edit' | 'trash';

function AddStocks() {
    const [stockData, setStockData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [noDataFound, setNoDataFound] = useState<boolean>(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [visibleActions, setVisibleActions] = useState<{ [key: number]: boolean }>({});
    const [buttonStates, setButtonStates] = useState<{ [key: string]: ButtonState }>({});
    const [addedStocks, setAddedStocks] = useState<number[]>([]); // Track added stocks
    const [displayCount, setDisplayCount] = useState(30);
    const [isPlanValid, setIsPlanValid] = useState(true);
    const token = sessionStorage.getItem('authToken');
    // if (!token) {
    //     console.error('No token found in sessionStorage');
    //     return;
    // }

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

        const checkPlanValidity = async () => {
            try {
                const response = await axios.post(`${baseApiURL()}/check-plan-validity`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setIsPlanValid(response.data.success);
            } catch (error) {
                console.error('Error checking plan validity:', error);
            }
        };

        fetchStockData();
        checkPlanValidity();
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

    // const handlePlusClick = (isin_code: string, index: number) => {
    //     setButtonStates((prevState) => ({
    //         ...prevState,
    //         [isin_code]: 'check',
    //     }));
    //     setAddedStocks((prev) => [...prev, index]);
    //     setTimeout(() => {
    //         setButtonStates((prevState) => ({
    //             ...prevState,
    //             [isin_code]: 'edit',
    //         }));
    //     }, 2000);
    // };

    const handlePlusClick = async (isin_code: string, index: number) => {
        const selectedStock = stockData[index];
        const scrip_cd = selectedStock.scrip_cd;

        // Set button state to 'check' immediately
        setButtonStates((prevState) => ({
            ...prevState,
            [isin_code]: 'check',
        }));

        try {
            // Make the API call
            await axios.post(`${baseApiURL()}/add-stock-to-watchlist`, {
                scrip_cd: scrip_cd
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Passing the token in the Authorization header
                },
            });

            console.log(`Stock ${scrip_cd} added!!`);

            // Add this stock to the addedStocks state
            setAddedStocks((prev) => [...prev, index]);

            // Show success message
            alert("Stock Added Successfully!!");

            // Change button state to 'edit' after a delay
            setTimeout(() => {
                setButtonStates((prevState) => ({
                    ...prevState,
                    [isin_code]: 'edit',
                }));
            }, 1000);

        } catch (error) {
            console.error('Error adding stock:', error);

            // If there's an error, revert the button state
            setButtonStates((prevState) => ({
                ...prevState,
                [isin_code]: 'plus',
            }));

            // Show error message
            alert("Failed to add stock. Please try again.");
        }

        // Hide any visible actions
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

    // const handleRemoveClick = (isin_code: string, index: number) => {
    //     setButtonStates((prevState) => ({
    //         ...prevState,
    //         [isin_code]: 'plus',
    //     }));
    //     setAddedStocks((prev) => prev.filter((i) => i !== index));
    // };

    const handleRemoveClick = async (isin_code: string, index: number) => {
        const selectedStock = stockData[index];
        const scrip_cd = selectedStock.scrip_cd;
    
        // Set button state to 'trash' immediately
        setButtonStates((prevState) => ({
            ...prevState,
            [isin_code]: 'trash',
        }));
    
        try {
            // Make the API call to delete the stock
            await axios.post(`${baseApiURL()}/delete-stock-from-watchlist`, {
                scrip_cd: scrip_cd
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Passing the token in the Authorization header
                },
            });
    
            // Show success message
            alert("Stock Deleted Successfully!!!");
    
            // Reset the button state to 'plus' after a short delay
            setTimeout(() => {
                setButtonStates((prevState) => ({
                    ...prevState,
                    [isin_code]: 'plus',
                }));
            }, 1000);
    
        } catch (error) {
            console.error('Error deleting stock:', error);
            
            // If there's an error, revert the button state
            setButtonStates((prevState) => ({
                ...prevState,
                [isin_code]: 'edit',
            }));
    
            // Show error message
            alert("Failed to delete stock. Please try again.");
        }
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
                            {/* <div className="icons" id="iconsContainer">
                                <div className="iconback-arrow">
                                    <div className="path-wrapper">
                                        <img className="path-icon" alt="" src="./public/addstocks/path.svg" />
                                    </div>
                                </div>
                            </div> */}
                            <div className="add-stocks2">Add Stocks</div>
                            <div className="frame-parent">
                                <img
                                    className="frame-child"
                                    alt=""
                                    src="./public/group-1000001006.svg"
                                />

                                <div className="import-cas-file">Import CAS file</div>
                            </div>
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
                            <span>Add your favourite stocks to watch list and </span>
                            {isPlanValid ? (
                                <span className="enjoy-your-30">Enjoy your 30 days Free Trial</span>
                            ) : (
                                <span className="plan-expiring">Your Plan is Expiring</span>
                            )}
                        </div>
                        <div className="no-card-information">
                            No card information is required for the free trial
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
                                            {/* {addedStocks.includes(index) ? (
                                                visibleActions[index] ? (
                                                    <div>
                                                        <Trash2 size={20} color="white" style={{ cursor: 'pointer' }} onClick={() => handleDeleteStock(index)} />
                                                    </div>
                                                ) : (
                                                    <button onClick={() => handleToggleActions(index)}>Options</button>
                                                )
                                            ) : (
                                                <Plus size={20} color="white" style={{ cursor: 'pointer' }} onClick={() => handleAddStock(index)} />
                                            )} */}
                                            {buttonStates[stock.isin_code] === 'plus' || !buttonStates[stock.isin_code] ? (
                                                <Plus
                                                    onClick={() => handlePlusClick(stock.isin_code, index)}
                                                    style={{ cursor: 'pointer', color: 'white' }}
                                                />
                                            ) : null}
                                            {buttonStates[stock.isin_code] === 'check' && (
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
                                            )}
                                            {buttonStates[stock.isin_code] === 'edit' && (
                                                <Edit3
                                                    onClick={() => handleEditClick(stock.isin_code)}
                                                    style={{
                                                        transition: 'opacity 2s',
                                                        opacity: 1,
                                                        cursor: 'pointer',
                                                        color: 'white'
                                                    }}
                                                />
                                            )}
                                            {buttonStates[stock.isin_code] === 'trash' && (
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
                                                    <span style={{ marginLeft: '4px', marginTop: '4px', color: 'white' }}>Remove</span>
                                                </div>
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

