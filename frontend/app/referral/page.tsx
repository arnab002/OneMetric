'use client'
import React, { useState, useEffect } from 'react'
import '../../public/assets/referral.css';
import { User } from 'react-feather';

interface SectionContent {
  title: string;
  content: string[];
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
      title: "Referral Program Overview",
      content: [
        "💡 At OneMetric, we value our users and appreciate their support in helping us grow our community. Our referral program is designed to reward both referrers and referees for spreading the word about our platform."
      ]
    },
    {
      title: "How It Works",
      content: [
        "💡 <b>Referral Code/Link:</b> Each user is provided with a unique referral code or link that they can share with friends, family, or colleagues.",
        "💡 <b>Referee Benefits:</b> When a new user (referee) signs up using a referral code or link and subscribes(buys) to a paid plan, they are  rewarded with a 1 month free extension.",
        "💡 <b>Referrer Benefits:</b> The user who referred the new user will receive a one-month free subscription extension as a token of our appreciation once the new user subscribes for a paid plan."
      ]
    },
    {
      title: "Eligibility Criteria",
      content: [
        "💡 <b>New Users:</b> To be eligible for the referral benefits, the referee must be a new user who has never signed up for OneMetric before.",
        "💡 <b>Subscription Status:</b> Both the referrer and referee must have active accounts at the time of referral and reward redemption."
      ]
    },
    {
      title: "Referral Redemption Process",
      content: [
        "💡 <b>Referee Redemption:</b> Upon signing up using a referral code or link and subscribing(buys) to a paid plan, they are rewarded with a 1 month free extension.",
        "💡 <b>Referrer Redemption:</b> Once the referee's buys a subscription , the referrer will receive a one-month free subscription extension credited to their account."
      ]
    },
    {
      title: "Additional Terms and Conditions",
      content: [
        "💡 <b>Multiple Referrals:</b> Users may refer multiple friends and earn rewards for each successful referral.",
        "💡 <b>Fair Usage Policy:</b> OneMetric reserves the right to monitor and review referral activity to prevent abuse of the referral program.",
        "💡 <b>Changes to the Program:</b> We reserve the right to modify or terminate the referral program at any time without prior notice.",
        "💡 <b>Fraudulent Activity:</b> Any attempt to manipulate or exploit the referral program through fraudulent activity will result in immediate disqualification and may lead to account suspension."
      ]
    },
    {
      title: "Contact Us",
      content: [
        "💡 If you have any questions or concerns regarding our referral program, please don't hesitate to contact our support team at <b>contact@onemetric.in</b>"
      ]
    },
    {
      title: "Agreement",
      content: [
        "💡 By participating in our referral program, you agree to abide by the terms and conditions outlined in this policy."
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
        <header className="top-navigation">
          <div className="top-navigation-inner">
            <div className="iconback-arrow">
              <div className="refund-title-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
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
            <div className="frame-wrapper">
              <img
                className="group-icon"
                alt=""
                src="./public/referral/group-1000000977.svg"
              />
            </div>
            <div className="frame-container">
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
              <div className="refund-content-container" onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
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
        <main className="about-us-inner">
          <section className="refund-policy-parent">
            <h3 className="refund-policy">Referral Policy</h3>
            <div className="at-wegro-we-container">
              <span>At </span>
              <b>OneMetric</b>
              <span>
                , we value our users and their support in growing our community. Our referral program is designed to reward both referrers and referees. Please review the following referral policy carefully:
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
                      src={`./public/referral/frame-1000001009@2x.png`}
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
            <div className="by-making-a-container">
              <span>By participating in the referral program on &nbsp;</span>
              <b>OneMetric</b>
              <span>
                , you acknowledge that you have read, understood, and agreed to the terms of this referral policy.
              </span>
            </div>
          </section>
        </main>
        <div className="footer">
          <div className="footer-container">
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
            <div className="frame-parent24">
              <img
                className="frame-child18"
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
                  src="./public/referral/vector.svg"
                  onClick={handleWhatsAppRedirect} style={{ cursor: 'pointer' }}
                />
              </div>
              <img
                className="social-icon-shape1"
                loading="lazy"
                alt=""
                src="./public/referral/vector-1.svg"
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
                src="./public/referral/vector-172.svg"
              />
              <div className="footer-links-content">
                <div className="about-us-parent">
                  <a href='/about' style={{ textDecoration: "none", color: "#8A8D9E" }} className="about-us1">About Us</a>
                  <a href='/disclaimer' style={{ textDecoration: "none", color: "#8A8D9E" }} className="contact-us">Disclaimer</a>
                  <a href='/refund' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy1">Refund Policy</a>
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
                src="./public/referral/vector-172.svg"
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
                  src="./public/referral/vector-2.svg"
                />
                <img
                  className="social-icons-container-child"
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