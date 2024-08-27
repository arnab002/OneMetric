'use client'
import React, { useState, useEffect } from 'react'
import '../../public/assets/privacy.css';
import { User } from 'react-feather';

interface SectionContent {
  title: string;
  content: string;
}

const Referral: React.FC = () => {
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

  const sections: SectionContent[] = [
    {
      title: "Information We Collect and How We Use It",
      content: "When you sign up for OneMetric, we ask for certain details, such as your phone number, to set up your account. We also gather information on your stock preferences and how you use our platform. This data helps us tailor our service to your needs, providing you with timely and relevant stock market alerts."
    },
    {
      title: "Reliable Sources of Information",
      content: "OneMetric pulls stock announcements from credible sources like BSE/NSE, ensuring you receive accurate and up-to-date information. Please be aware that the updates we provide are for informational purposes only and do not constitute trading advice."
    },
    {
      title: "Automated Data Processing",
      content: "Our processes are fully automated, meaning no human intervention is involved in selecting or sending out updates. We use advanced AI to summarise data from trusted stock exchanges and deliver concise updates directly to your WhatsApp."
    },
    {
      title: "How We Protect Your Personal Information",
      content: "Your privacy is our priority. We use advanced security measures to safeguard your personal information from unauthorised access or misuse. Rest assured, we never share, sell, or trade your data with third parties for commercial gain."
    },
    {
      title: "Data Retention Policy",
      content: "We retain your information only for as long as necessary to provide our services or as required by law. You have full control over your data and can request its deletion or update at any time."
    },
    {
      title: "Your Rights as a User",
      content: "You can access and manage your personal information through our platform. If you wish to stop receiving updates, simply follow the instructions provided in our communications to unsubscribe."
    },
    {
      title: "No Trading Recommendations",
      content: "While OneMetric provides valuable stock market news and alerts, it’s important to note that we do not offer any trading recommendations. Our service is designed to inform, not advise. Users should perform their own research or consult with financial experts before making any investment decisions."
    },
    {
      title: "Updates to This Disclaimer",
      content: "As we evolve, our practices may change. We will update this disclaimer to reflect any new developments, so please review it regularly."
    },
    {
      title: "Contact Us",
      content: "If you have any questions or concerns about this disclaimer or how we handle your data, feel free to reach out to us at <b>contact@onemetric.in</b>"
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
                <User onClick={handleUserAccountClick} style={{ cursor: 'pointer' }} />
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
        <section className="about-us-inner">
          <div className="referral-policy-parent">
            <h3 className="referral-policy">Disclaimer</h3>
            <div className="at-wegro-we-container">
              <span>Welcome to </span>
              <b>OneMetric,</b>
              <span>
                &nbsp;We are committed to protecting your privacy and ensuring the security of your personal information. This Disclaimer explains how we collect, use, and protect your information when you use our stock market news app platform.
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
                  <a href='/disclaimer' style={{ textDecoration: "none", color: "#8A8D9E" }} className="about-us1">Disclaimer</a>
                  <a href='/refund' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">Refund Policy</a>
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