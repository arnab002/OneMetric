'use client'
import React, { useState, useEffect } from 'react'
import '../../public/assets/contact.css'
import { User } from 'react-feather';
import CustomSidebar from '../sidebar';

function Contact() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleHomeClick = () => {
        window.location.href = '/'
    };

    const handleLoginClick = () => {
        window.location.href = '/login'
    };

    const handleTwitterRedirect = () => {
        window.open('https://x.com/Onemetric_in', '_blank');
    };

    const handleWhatsAppRedirect = () => {
        window.open('https://api.whatsapp.com/send?phone=917204946777&text=Hi', '_blank');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
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

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    return (
        <div>
            <div className="about-us">
                <header className="navigation">
                    <div className="hero">
                        <div className="iconback-arrow">
                            <div className="image-18-parent" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                                <img
                                    className="image-18-icon"
                                    loading="lazy"
                                    alt=""
                                    src="./public/about/OneMetric_Transparent.png"
                                />
                                <a className="onemetric">OneMetric</a>
                            </div>
                        </div>
                    </div>
                    <div className="frame-parent">
                        <img className="frame-child" alt="" src="./public/about/group-1000000964.svg" />
                        <img className="frame-item" alt="" src="./public/about/group-1000000966.svg" />
                    </div>
                    <div className="frame-group">
                        <div className="frame-wrapper">
                            <img
                                className="frame-inner"
                                alt=""
                                src="./public/about/group-1000000977.svg"
                            />
                        </div>
                        <div className="frame-container">
                            <img
                                className="group-icon"
                                alt=""
                                src="./public/about/group-1000000998@2x.png"
                            />
                        </div>
                        {isLoggedIn ? (
                            <div className="user-icon-wrapper">
                                <User onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
                            </div>
                        ) : (
                            <div className="content" onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
                                <img
                                    className="union-icon"
                                    loading="lazy"
                                    alt=""
                                    src="./public/about/union.svg"
                                />
                            </div>
                        )}
                    </div>
                </header>
                <CustomSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
                <section className="about">
                    <div className="about-us-parent">
                        <h3 className="about-us1">Contact Us</h3>
                        <div className="at-wegro-were-container">
                            <span>At </span>
                            <span className="wegro">OneMetric,&nbsp;&nbsp;</span>
                            <span>
                                we're on a mission to revolutionize the way people access news for
                                their stock market investments. We understand the challenges faced by
                                everyday investors who rely on timely and accurate information to make
                                informed decisions.
                            </span>
                            <br /><br /><br />
                            <span><b>Address :</b> Poorva Gounder Colony, Five Roads, Salem, Tamilnadu 636004</span><br /><br />
                            <span>You can reachout to us @ <b>9035141333</b> or mail us at <b>contact@onemetric.in</b></span>
                        </div>
                    </div>
                </section>
                <section className="footer">
                    <div className="footer-content">
                        <div className="frame-parent">
                            <img
                                className="frame-child"
                                alt=""
                                src="./public/about/group-1000000964.svg"
                            />
                            <img
                                className="frame-item"
                                alt=""
                                src="./public/about/group-1000000966.svg"
                            />
                        </div>
                        <div className="frame-parent1">
                            <img
                                className="frame-child3"
                                alt=""
                                src="./public/about/group-1000001000.svg"
                            />
                            <div className="add-stocks">Add Stocks</div>
                        </div>
                        <img
                            className="image-18-icon"
                            loading="lazy"
                            alt=""
                            src="./public/about/OneMetric_Transparent.png"
                            onClick={handleHomeClick} style={{ cursor: 'pointer' }}
                        />
                        <div className="footer-metrics">
                            <div className="hero" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                                <b className="onemetric1">OneMetric</b>
                            </div>
                        </div>
                        <div className="footer-actions">
                            <div className="icon-background-parent">
                                <div className="icon-background" />
                                <img
                                    className="social-icon-shape"
                                    loading="lazy"
                                    alt=""
                                    src="./public/about/vector.svg"
                                    onClick={handleWhatsAppRedirect} style={{ cursor: 'pointer' }}
                                />
                            </div>
                            <img
                                className="social-icon-shape1"
                                loading="lazy"
                                alt=""
                                src="./public/about/vector-1.svg"
                                onClick={handleTwitterRedirect} style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                    <div className="footer-links">
                        <div className="links-container">
                            <img
                                className="links-container-child"
                                loading="lazy"
                                alt=""
                                src="./public/about/vector-172.svg"
                            />
                            <div className="link-columns">
                                <div className="link-column">
                                    <a href='/about' style={{ textDecoration: "none", color: "#8A8D9E" }} className="about-us2">About Us</a>
                                    <a href='/disclaimer' style={{ textDecoration: "none", color: "#8A8D9E" }} className="contact-us">Disclaimer</a>
                                    <a href='/refund' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">Refund Policy</a>
                                    <a href='/insights' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">News Feed</a>
                                    <a href='/plans' className="refund-policy" style={{ textDecoration: "none", color: "inherit" }}>Pricing</a>
                                </div>
                                <div className="link-column1">
                                    <a href='/privacy' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Privacy Policy</a>
                                    <a href='/terms' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Terms &amp; Conditions</a>
                                    <a href='/referral' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy">Referral Policy</a>
                                    <a href='/contact' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy">Contact Us</a>
                                </div>
                            </div>
                            <img
                                className="links-container-item"
                                loading="lazy"
                                alt=""
                                src="./public/about/vector-172.svg"
                            />
                        </div>
                    </div>
                </section>
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
    )
}

export default Contact
