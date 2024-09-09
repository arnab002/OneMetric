'use client'
import React, { useState, useEffect } from 'react'
import '../../public/assets/terms.css';
import { User, LogOut } from 'react-feather';
import CustomSidebar from '../sidebar';

interface SectionContent {
  title: string;
  content: string[];
}

const Refund: React.FC = () => {
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
      title: "Eligibility",
      content: [
        "You must be at least 18 years old and have the legal capacity to enter into these Terms.",
      ]
    },
    {
      title: "Use of Platform",
      content: [
        "In order to access certain features of the Platform, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information as necessary to keep it accurate, current, and complete.",
        "You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account. You agree to notify us immediately of any unauthorised use of your account or any other breach of security"
      ]
    },
    {
      title: "Content",
      content: [
        "The Platform may contain content provided by the Company, its partners, or third parties. All content, including but not limited to articles, news updates, charts, and analysis, is provided for informational purposes only and should not be construed as financial or investment advice.",
        "You acknowledge and agree that you are solely responsible for evaluating the accuracy, completeness, and usefulness of any content provided on the Platform and for making investment decisions based on your own judgement and risk tolerance."
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        "The Platform and its content, including but not limited to text, graphics, logos, images, and software, are protected by copyright, trademark, and other intellectual property laws. You agree not to modify, reproduce, distribute, or create derivative works based on the Platform or its content without the Company's prior written consent.",
      ]
    },
    {
      title: "Privacy",
      content: [
        "Your use of the Platform is subject to the Company's Privacy Policy, which governs the collection, use, and disclosure of your personal information. By using the Platform, you consent to the collection and use of your personal information as described in the Privacy Policy."
      ]
    },
    {
      title: "Disclaimers",
      content: [
        "The platform is provided and available without any warranties of any kind, express or implied. To the fullest extent permitted by applicable law, the company disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement."
      ]
    },
    {
      title: "Limitation of Liability",
      content: [
        "To the maximum extent permitted by applicable law, in no event shall the company or its affiliates, partners, licensors, or service providers be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or in connection with your use of the platform.",
      ]
    },
    {
      title: "Governing Law",
      content: [
        "These Terms shall be governed by and construed in accordance with the laws of Karnataka State, without regard to its conflict of law principles.",
      ]
    },
    {
      title: "Modifications to Terms",
      content: [
        "The Company reserves the right to modify or update these Terms at any time without prior notice. Any changes to these Terms will be effective immediately upon posting on the Platform. Your continued use of the Platform after any such modifications constitutes your acceptance of the revised Terms.",
      ]
    },
    {
      title: "Contact Us",
      content: [
        "If you have any questions or concerns about these Terms, please contact us at <b>contact@onemetric.in</b>",
      ]
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
        <header className="top-navigation">
          <div className="top-navigation-inner">
            <div className="iconback-arrow">
              <div className="refund-title-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                <img
                  className="image-18-icon"
                  loading="lazy"
                  alt=""
                  src="./public/refund/image-18@2x.png"
                />
                <a className="onemetric">OneMetric</a>
              </div>
            </div>
          </div>
          <div className="frame-parent">
            <img className="frame-item" alt="" src="./public/refund/group-1000000964.svg" />
            <img className="frame-inner" alt="" src="./public/refund/group-1000000966.svg" />
          </div>
          <div className="frame-group">
            <div className="frame-wrapper">
              <img
                className="group-icon"
                alt=""
                src="./public/refund/group-1000000977.svg"
              />
            </div>
            <div className="frame-container">
              <img
                className="frame-child1"
                alt=""
                src="./public/refund/group-1000000998@2x.png"
              />
            </div>
            {isLoggedIn ? (
              <div className="user-icon-wrapper" style={{ position: 'relative' }}>
                <User onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
              </div>
            ) : (
              <div className="refund-content-container" onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
                <img
                  className="union-icon"
                  loading="lazy"
                  alt=""
                  src="./public/refund/union.svg"
                />
              </div>
            )}
          </div>
        </header>
        <CustomSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="about-us-inner">
          <section className="refund-policy-parent">
            <h3 className="refund-policy">Terms and Conditions</h3>
            <div className="at-wegro-we-container">
              <span>These Terms and Conditions ("Terms") govern your use of </span>
              <b>OneMetric.in</b>
              <span>
                , owned and operated by Turnet India . By accessing or using the Platform, you agree to comply with these Terms. If you do not agree with these Terms, please do not use the Platform.
              </span>
            </div>
            <div className="frame-div">
              {sections.map((section, index) => (
                <div key={index} className="contact-container-parent">
                  <div
                    className="refund-eligibility-parent"
                    onClick={() => toggleSection(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="refund-eligibility">{section.title}</div>
                    <img
                      className="refund-bullet-points-container"
                      loading="lazy"
                      alt=""
                      src={`./public/refund/frame-1000001009@2x.png`}
                      style={{ transform: openSection === index ? 'rotate(180deg)' : 'none' }}
                    />
                  </div>
                  {openSection === index && (
                    <div className="refund-bullet-point-rows">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="refund-bullet-point-items">
                          <div className="refund-bullet-point-details">
                            <div className="bullet-point-icons" />
                          </div>
                          <div
                            className="refunds-are-generally-container"
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
        <div className="footer">
          <div className="footer-container">
            <div className="frame-parent">
              <img
                className="frame-item"
                alt=""
                src="./public/refund/group-1000000964.svg"
              />
              <img
                className="frame-inner"
                alt=""
                src="./public/refund/group-1000000966.svg"
              />
            </div>
            <div className="frame-parent24">
              <img
                className="frame-child18"
                alt=""
                src="./public/refund/group-1000001000.svg"
              />
              <div className="add-stocks">Add Stocks</div>
            </div>
            <img
              className="image-18-icon"
              loading="lazy"
              alt=""
              src="./public/refund/image-18-1@2x.png"
              onClick={handleHomeClick} style={{ cursor: 'pointer' }}
            />
            <div className="footer-brand-container-wrapper">
              <div className="top-navigation-inner" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                <b className="onemetric1">OneMetric</b>
              </div>
            </div>
            <div className="frame-parent25">
              <div className="social-icon-background-parent">
                <div className="social-icon-background" />
                <img
                  className="social-icon-shape"
                  loading="lazy"
                  alt=""
                  src="./public/refund/vector.svg"
                  onClick={handleWhatsAppRedirect} style={{ cursor: 'pointer' }}
                />
              </div>
              <img
                className="social-icon-shape1"
                loading="lazy"
                alt=""
                src="./public/refund/vector-1.svg"
                onClick={handleTwitterRedirect} style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          <div className="footer-links-container-wrapper">
            <div className="footer-links-container">
              <img
                className="footer-link-icons"
                loading="lazy"
                alt=""
                src="./public/refund/vector-172.svg"
              />
              <div className="footer-links-content">
                <div className="about-us-parent">
                  <a href='/about' style={{ textDecoration: "none", color: "#8A8D9E" }} className="about-us1">About Us</a>
                  <a href='/disclaimer' style={{ textDecoration: "none", color: "#8A8D9E" }} className="contact-us">Disclaimer</a>
                  <a href='/refund' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy1">Refund Policy</a>
                  <a href='/newsfeed' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy1">News Feed</a>
                  <a href='/plans' className="refund-policy1" style={{ textDecoration: "none", color: "inherit" }}>Pricing</a>
                </div>
                <div className="terms-conditions-parent">
                  <a href='/privacy' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Privacy Policy</a>
                  <a href='/terms' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Terms &amp; Conditions</a>
                  <a href='/referral' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy">Referral Policy</a>
                  <a href='/contact' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy">Contact Us</a>
                </div>
              </div>
              <img
                className="footer-link-icons1"
                loading="lazy"
                alt=""
                src="./public/refund/vector-172.svg"
              />
            </div>
          </div>
        </div>
        <div className="copyright-container-wrapper">
          <div className="copyright-container">
            <div className="simply-grow-all">
              OneMetric, All Right reserved © 2024
            </div>
            <div className="social-icons-container-wrapper">
              <div className="social-icons-container">
                <img
                  className="social-icon-shape2"
                  loading="lazy"
                  alt=""
                  src="./public/refund/vector-2.svg"
                />
                <img
                  className="social-icons-container-child"
                  loading="lazy"
                  alt=""
                  src="./public/refund/group-219911503.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;