'use client'
import React, { useState } from 'react';
import '../../public/assets/privacy.css';

interface SectionContent {
  title: string;
  content: string;
}

const Referral: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
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
      content: "If you have any questions or concerns about this Privacy Policy, please contact us at admin@onemetric.in"
    }
  ];

  return (
    <div>
      <div className="about-us">
        <header className="icons-parent">
          {/* <div className="icons" id="iconsContainer">
            <div className="iconback-arrow">
              <div className="iconback-arrow-inner">
                <img
                  className="frame-child"
                  loading="lazy"
                  alt=""
                  src="./public/referral/vector-214.svg"
                />
              </div>
            </div>
          </div> */}
          <div className="frame-wrapper">
            <div className="iconback-arrow">
              <div className="image-18-parent">
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
            <div className="union-wrapper">
              <img
                className="union-icon"
                loading="lazy"
                alt=""
                src="./public/referral/union.svg"
              />
            </div>
          </div>
        </header>
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
            {/* <div className="by-making-a-container">
              <span>By participating in the referral program on </span>
              <b>OneMetric</b>
              <span>
                , you acknowledge that you have read, understood, and agreed to the
                terms of this referral policy.
              </span>
            </div> */}
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
            />
            <div className="frame-wrapper9">
              <div className="frame-wrapper">
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
                />
              </div>
              <img
                className="vector-icon2"
                loading="lazy"
                alt=""
                src="./public/referral/vector-1.svg"
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
                  <a href='#' style={{ textDecoration: "none", color: "#8A8D9E" }} className="contact-us1">Contact Us</a>
                  <a href='/refund' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy">Refund Policy</a>
                </div>
                <div className="terms-conditions-parent">
                  <a href='/privacy' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Privacy &amp; Policy</a>
                  <a href='#' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Terms &amp; conditions</a>
                  <a href='/referral' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy1">Referral Policy</a>
                  <a href='#' style={{ textDecoration: "none", color: "#8A8D9E" }} className="faqs">FAQs</a>
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