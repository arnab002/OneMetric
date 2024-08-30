'use client'
import React, { useState, useEffect } from 'react'
import '../../public/assets/about.css'
import { User } from 'react-feather';

function About() {
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
                            <div className="user-icon-wrapper" style={{ position: 'relative' }}>
                                <User onClick={handleUserAccountClick} style={{ cursor: 'pointer' }} />
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
                <section className="about">
                    <div className="about-us-parent">
                        <h3 className="about-us1">About US</h3>
                        <div className="at-wegro-were-container">
                            <span>At </span>
                            <span className="wegro">OneMetric,&nbsp;&nbsp;</span>
                            <span>
                                we're on a mission to revolutionize the way people access news for
                                their stock market investments. We understand the challenges faced by
                                everyday investors who rely on timely and accurate information to make
                                informed decisions. That's why we've created a platform that delivers
                                personalized stock news directly to your WhatsApp, in your preferred
                                language, within just 90 seconds.
                            </span>
                        </div>
                        <br />
                        <h3 className="about-us1">Vision Statement</h3>
                        <div className="at-wegro-were-container">
                            <span>💡 At </span>
                            <span className="wegro">&nbsp;OneMetric,&nbsp;&nbsp;</span>
                            <span>
                                our vision is to empower investors in Bharat by providing them with effortless access to timely and relevant stock market news. We envision a future where every investor, regardless of their experience or background, can make informed decisions with confidence and ease. Through our innovative platform, we strive to simplify the complexities of the stock market and pave the way for a more inclusive and accessible trading experience. Our ultimate goal is to become the go-to destination for investors seeking reliable, personalized news that helps them unlock their full potential in the world of finance.
                            </span>
                        </div>
                        <br />
                        <h3 className="about-us1">Mission Statement</h3>
                        <div className="at-wegro-were-container">
                            <span>💡 At </span>
                            <span className="wegro">&nbsp;OneMetric,&nbsp;&nbsp;</span>
                            <span>
                                our mission is to revolutionize the way investors access and utilize stock market news. We are dedicated to providing a seamless and personalized experience that saves time, effort, and frustration for our users. Through the power of technology and data-driven insights, we strive to deliver accurate, timely, and actionable information directly to our users' fingertips via WhatsApp. By democratizing access to reliable stock market news, we aim to empower investors of all levels to make informed decisions and achieve their financial goals with confidence and ease. Our commitment is to simplify the trading process and enhance the lives of investors by delivering unparalleled value and convenience through our platform.
                            </span>
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
                                    <a href='/disclaimer' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy">Disclaimer</a>
                                    <a href='/refund' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">Refund Policy</a>
                                    <a href='/insights' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">News Feed</a>
                                    <a href='/plans' className="refund-policy" style={{ textDecoration: "none", color: "inherit" }}>Pricing</a>
                                </div>
                                <div className="link-column1">
                                    <a href='/privacy' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Privacy Policy</a>
                                    <a href='/terms' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Terms &amp; conditions</a>
                                    <a href='/referral' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy">Referral Policy</a>
                                    <a href='/contact' style={{ textDecoration: "none", color: "#8A8D9E" }} className="contact-us">Contact Us</a>
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

export default About
