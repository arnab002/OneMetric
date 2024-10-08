'use client'
import React, { useState, useEffect } from 'react'
import '../../public/assets/privacy.css';
import { User } from 'react-feather';
import CustomSidebar from '../sidebar';

interface SectionContent {
  title: string;
  content: string;
}

const Referral: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSection, setOpenSection] = useState<number | null>(null);
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

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sections: SectionContent[] = [
    {
      title: "Information We Collect",
      content: "We may collect personal information that you voluntarily provide to us, such as your name, email address, and phone number, when you register an account or subscribe to our services. Additionally, we may automatically collect certain information about your device and usage patterns, such as your IP address and pages visited, to improve the Platform's functionality and user experience."
    },
    {
      title: " Use of Information",
      content: "We use the information we collect to provide and improve the Platform, personalise your experience, communicate with you about our services, analyse usage trends, and comply with legal obligations."
    },
    {
      title: "Sharing of Information",
      content: "We DO NOT share your personal information with third-party service providers and partners but we may also disclose your information in response to legal process or to protect our rights and the safety of our users."
    },
    {
      title: "Your Choices",
      content: "You may choose not to provide certain personal information, but this may limit your ability to access certain features of the Platform. You can opt out of receiving promotional communications from us at any time."
    },
    {
      title: "Children's Privacy",
      content: "The Platform is not intended for children under the age of 18, and we do not knowingly collect personal information from children under 18 years of age."
    },
    {
      title: "Changes to this Privacy Policy",
      content: "We may update this Privacy Policy from time to time. Any changes will be posted on the Platform, and your continued use of the Platform after such changes constitutes acceptance of the revised Privacy Policy."
    },
    {
      title: "Contact Us",
      content: "If you have any questions or concerns about this Privacy Policy, please contact us at <b>contact@onemetric.in</b>"
    }
  ];

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

  // Function to check if the token is expired
  const isTokenExpired = (token: string): boolean => {
    if (!token) return true;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  // Function to check token expiration and handle logout
  const checkTokenExpiration = () => {
    const token = localStorage.getItem('authToken');
    if (token && isTokenExpired(token)) {
      handleLogout();
    }
  };

  useEffect(() => {
    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(intervalId);
  }, []);

  // Modify the existing useEffect for token checking
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      if (token) {
        handleLogout(); // Auto-logout if token exists but is expired
      }
    }
  }, []);


  return (
    <div>
      <div className="about-us">
        <header className="icons-parent">
          <div className="frame-wrapper">
            <div className="iconback-arrow">
              <div className="image-18-parent" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                <img
                  className="image-18-icon"
                  loading="lazy"
                  alt=""
                  src="./public/referral/image-18@2x.png"
                />
                <a className="onemetric">OneMetric</a>
              </div>
            </div>
          </div>
          <div className="frame-parent">
            <img className="frame-item" alt="" src="./public/referral/group-1000000964.svg" />
            <img className="frame-inner" alt="" src="./public/referral/group-1000000966.svg" />
          </div>
          <div className="frame-group">
            <div className="frame-div">
              <img
                className="group-icon"
                alt=""
                src="./public/referral/group-1000000977.svg"
              />
            </div>
            <div className="frame-wrapper1">
              <img
                className="frame-child1"
                alt=""
                src="./public/referral/group-1000000998@2x.png"
              />
            </div>
            {isLoggedIn ? (
              <div className="user-icon-wrapper" style={{ position: 'relative' }}>
                <User onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
              </div>
            ) : (
              <div className="union-wrapper" onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
                <img
                  className="union-icon"
                  loading="lazy"
                  alt=""
                  src="./public/referral/union.svg"
                />
              </div>
            )}
          </div>
        </header>
        <CustomSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <section className="about-us-inner">
          <div className="referral-policy-parent">
            <h3 className="referral-policy">Privacy Policy</h3>
            <div className="at-wegro-we-container">
              <span>Welcome to </span>
              <b>OneMetric,</b>
              <span>
                &nbsp;We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and protect your information when you use our stock market news app platform.
              </span>
            </div>
            <div className="frame-parent1">
              {sections.map((section, index) => (
                <div key={index} className="frame-wrapper3">
                  <div
                    className="referral-program-overview-parent"
                    onClick={() => toggleSection(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="referral-program-overview">{section.title}</div>
                    <div className="referral-menu-icons-wrapper">
                      <img
                        className="referral-menu-icons"
                        alt=""
                        src="./public/referral/referral-menu-icons.svg"
                        style={{ transform: openSection === index ? 'rotate(180deg)' : 'none' }}
                      />
                    </div>
                  </div>
                  {openSection === index && (
                    <div className="frame-wrapper2">
                      <div className="frame-parent3">
                        <div className="ellipse-wrapper">
                          <div className="ellipse-div" />
                        </div>
                        <div
                          className="at-wegro-we-container1"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="footer">
          <div className="frame-parent4">
            <div className="frame-parent">
              <img
                className="frame-item"
                alt=""
                src="./public/referral/group-1000000964.svg"
              />
              <img
                className="frame-inner"
                alt=""
                src="./public/referral/group-1000000966.svg"
              />
            </div>
            <div className="frame-parent6">
              <img
                className="frame-child8"
                alt=""
                src="./public/referral/group-1000001000.svg"
              />
              <div className="add-stocks">Add Stocks</div>
            </div>
            <img
              className="image-18-icon"
              loading="lazy"
              alt=""
              src="./public/referral/image-18-1@2x.png"
              onClick={handleHomeClick} style={{ cursor: 'pointer' }}
            />
            <div className="frame-wrapper9">
              <div className="frame-wrapper" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                <b className="onemetric1">OneMetric</b>
              </div>
            </div>
            <div className="frame-parent7">
              <div className="rectangle-parent">
                <div className="rectangle-div" />
                <img
                  className="vector-icon1"
                  loading="lazy"
                  alt=""
                  src="./public/referral/vector.svg"
                  onClick={handleWhatsAppRedirect} style={{ cursor: 'pointer' }}
                />
              </div>
              <img
                className="vector-icon2"
                loading="lazy"
                alt=""
                src="./public/referral/vector-1.svg"
                onClick={handleTwitterRedirect} style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          <div className="footer-inner">
            <div className="footer-link-icons-parent">
              <img
                className="footer-link-icons"
                loading="lazy"
                alt=""
                src="./public/referral/vector-172.svg"
              />
              <div className="frame-parent8">
                <div className="about-us-parent">
                  <a href='/about' style={{ textDecoration: "none", color: "#8A8D9E" }} className="about-us1">About Us</a>
                  <a href='/disclaimer' style={{ textDecoration: "none", color: "#8A8D9E" }} className="contact-us1">Disclaimer</a>
                  <a href='/refund' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">Refund Policy</a>
                  <a href='/newsfeed' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">News Feed</a>
                  <a href='/plans' className="refund-policy" style={{ textDecoration: "none", color: "inherit" }}>Pricing</a>
                </div>
                <div className="terms-conditions-parent">
                  <a href='/privacy' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Privacy Policy</a>
                  <a href='/terms' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Terms &amp; conditions</a>
                  <a href='/referral' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy1">Referral Policy</a>
                  <a href='/contact' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy1">Contact Us</a>
                </div>
              </div>
              <img
                className="footer-link-icons1"
                loading="lazy"
                alt=""
                src="./public/referral/vector-172.svg"
              />
            </div>
          </div>
        </section>
        <div className="about-us-child">
          <div className="simply-grow-all-right-reserve-parent">
            <div className="simply-grow-all">
              OneMetric, All Right reserved © 2024
            </div>
            <div className="frame-wrapper10">
              <div className="vector-parent">
                <img
                  className="vector-icon3"
                  loading="lazy"
                  alt=""
                  src="./public/referral/vector-2.svg"
                />
                <img
                  className="frame-child9"
                  loading="lazy"
                  alt=""
                  src="./public/referral/group-219911503.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;