'use client';
import React, { useState, useEffect } from 'react'
import '../../public/assets/account.css'
import axios from 'axios';
import baseApiURL from '@/baseUrl';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ReactCountryFlag from 'react-country-flag';
import { DollarSign, Info, Phone, ShoppingCart, User } from 'react-feather';

function Registration() {
    const [isTokenChecked, setIsTokenChecked] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        pincode: ''
    });

    const fetchUserDetails = async (storedToken: string) => {
        try {
            const response = await axios.get(`${baseApiURL()}/fetchUserData`, {
                headers: {
                    Authorization: `${storedToken}`,
                },
            });
            setUserDetails(response.data.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        const checkTokenAndFetchDetails = async () => {
            const storedToken = sessionStorage.getItem('authToken');
            setToken(storedToken);
            if (!storedToken) {
                window.location.href = '/login';
            } else {
                setIsTokenChecked(true);
                await fetchUserDetails(storedToken);
            }
        };

        if (typeof window !== 'undefined') {
            checkTokenAndFetchDetails();
        }
    }, []);

    if (!isTokenChecked) {
        return null; // Render nothing until the token is checked
    }

    const handleInsightsClick = () => {
        window.location.href = '/insights'
    };

    const handlePricingClick = () => {
        window.location.href = '/plans'
    };

    const handleContactClick = () => {
        window.location.href = '/contact'
    };

    const handleAboutClick = () => {
        window.location.href = '/about'
    };

    const handleHomeClick = () => {
        window.location.href = '/'
    };

    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        window.location.href = '/';
    };

    const handleAccountDetailsClick = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const modalStyles = {
        modal: {
            maxWidth: '280px',
            width: '70%',
            padding: '30px',
            borderRadius: '10px',
        },
    };

    return (
        <div>
            <div className="otp">
                <header className="otp1">
                    <img
                        className="image-18-icon"
                        loading="lazy"
                        alt=""
                        src="./public/register/image-18@2x.png"
                        onClick={handleHomeClick} style={{ cursor: 'pointer' }}
                    />
                    <div className="main">
                        <div className="main" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <a className="onemetric">OneMetric</a>
                        </div>
                    </div>
                    <div className="frame-parent">
                        <img className="frame-child" alt="" src="./public/register/group-1000000964.svg" />
                        <img className="frame-item" alt="" src="./public/register/group-1000000966.svg" />
                    </div>
                </header>
                <section className="metric-wrapper">
                    <div className="metric">
                        <div className="metric-inner">
                            <div className="frame-group">
                                <div className="frame-container">
                                    <div className="group-div">
                                        <div className="frame-parent1">
                                            <div className="rectangle-parent">
                                                <div className="frame-inner" />
                                                <div className="rectangle-div" />
                                            </div>
                                            <div className="ellipse-div" />
                                        </div>
                                        <img
                                            className="group-icon"
                                            loading="lazy"
                                            alt=""
                                            src="./public/register/group-1000000975@2x.png"
                                        />
                                    </div>
                                    <div className="frame-child1" />
                                </div>
                                <div className="frame-child2" />
                                <div className="frame-child3" />
                                <div className="frame-child4" />
                            </div>
                        </div>
                        <div className="input-fields-parent">
                            <div className="input-fields">
                                <div className="number-input">
                                    <div className="number-field">
                                        <h3 className="enter-your-whatsapp">
                                            Hello, {userDetails.name}
                                        </h3>
                                    </div>
                                </div>
                                <div>
                                    <div className="personal-info">
                                        <div className="input-labels">
                                            <div className="input-boxes">
                                                <div className="nested-input-boxes" onClick={handleAccountDetailsClick} style={{ cursor: 'pointer' }}>
                                                    <div className="full-name"><User /></div>
                                                    <span>Account Details</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-labels">
                                            <div className="input-boxes">
                                                <div className="nested-input-boxes" onClick={handleInsightsClick} style={{ cursor: 'pointer' }}>
                                                    <div className="email-id"><ShoppingCart /></div>
                                                    <span>Your Stock Basket</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-labels">
                                            <div className="input-boxes">
                                                <div className="nested-input-boxes" onClick={handlePricingClick} style={{ cursor: 'pointer' }}>
                                                    <div className="email-id"><span style={{fontSize: '25px'}}>₹</span></div>
                                                    <span>Manage Subscriptions</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-labels">
                                            <div className="input-boxes">
                                                <div className="nested-input-boxes" onClick={handleContactClick} style={{ cursor: 'pointer' }}>
                                                    <div className="email-id"><Phone /></div>
                                                    <span>Customer Support</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-labels">
                                            <div className="input-boxes">
                                                <div className="nested-input-boxes" onClick={handleAboutClick} style={{ cursor: 'pointer' }}>
                                                    <div className="email-id"><Info /></div>
                                                    <span>We @ Onemetric</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="finish-wrapper" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                        Log Out
                                    </button>
                                    <div className="personal-info" style={{ marginTop: '12%' }}>
                                        <div className="input-labels">
                                            <div className="input-boxes">
                                                <div className="nested-input-boxes" style={{ justifyContent: 'center', border: 'none' }}>
                                                    <span>Made with ❤️</span>
                                                    <div className="email-id">in &nbsp;<span><ReactCountryFlag countryCode="IN" svg /></span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Modal open={modalIsOpen} onClose={closeModal} center styles={modalStyles}>
                <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Account Details</h2>
                <div style={{ fontSize: '18px', lineHeight: '1.6' }}>
                    <p><strong>Name:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {userDetails.name}</p>
                    <p><strong>Email:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {userDetails.email}</p>
                    <p><strong>Phone:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {userDetails.mobile}</p>
                    <p><strong>Address:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {userDetails.address}</p>
                    <p><strong>Pincode:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {userDetails.pincode}</p>
                </div>
            </Modal>
        </div>
    )
}

export default Registration