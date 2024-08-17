'use client'
import React, { useState } from 'react';
import '../../public/assets/refund.css';

interface SectionContent {
  title: string;
  content: string[];
}

const Refund: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections: SectionContent[] = [
    {
      title: "Refund Eligibility",
      content: [
        "Refunds are generally <b>not possible</b> for our products or services.",
        "However, we may consider refund requests in exceptional cases deemed fit by <b>OneMetric</b> at its sole discretion.",
        "We reserve the right to determine refund eligibility on a <b>case-by-case basis.</b>"
      ]
    },
    {
      title: "Eligible Refund Scenarios",
      content: [
        "Only exceptional circumstances will be considered for a refund.",
        "Such circumstances may include technical issues preventing access to our services, or other situations deemed appropriate by <b>OneMetric.</b>"
      ]
    },
    {
      title: "Refund Request Process",
      content: [
        "To request a refund, please contact our customer support team at <b>support@onemetric.co.in</b> within <b>7days</b> of your purchase.",
        "Please provide detailed information regarding the reason for your refund request, along with any relevant documentation or evidence."
      ]
    },
    {
      title: "Refund Decisions",
      content: [
        "Refund requests will be reviewed and processed by <b>OneMetric</b> on a case-by-case basis.",
        "We reserve the right to accept or deny refund requests at our sole discretion.",
        "Our decision regarding refund eligibility is final and not subject to appeal."
      ]
    },
    {
      title: "Refund Method",
      content: [
        "If a refund is approved, it will be processed using the original method of payment.",
        "Refunds may take <b>15-30 business days</b> to be reflected in your account, depending on your payment provider."
      ]
    },
    {
      title: "Contact Information",
      content: [
        "If you have any questions or concerns regarding our refund policy, please contact us at <b>support@onemetric.co.in</b>"
      ]
    },
    {
      title: "Policy Changes",
      content: [
        "<b>OneMetric</b> reserves the right to update or modify this refund policy at any time with prior notice.",
        "Any changes to the refund policy will be effective immediately upon posting on our website."
      ]
    }
  ];

  return (
    <div>
      <div className="about-us">
        <header className="top-navigation">
          <div className="top-navigation-inner">
            <div className="iconback-arrow">
              <div className="refund-title-container">
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
            <div className="refund-content-container">
              <img
                className="union-icon"
                loading="lazy"
                alt=""
                src="./public/refund/union.svg"
              />
            </div>
          </div>
        </header>
        <main className="about-us-inner">
          <section className="refund-policy-parent">
            <h3 className="refund-policy">Refund Policy</h3>
            <div className="at-wegro-we-container">
              <span>At </span>
              <b>OneMetric</b>
              <span>
                , we strive to provide our users with the best experience possible. We
                understand that occasionally circumstances may arise that require a
                refund. Please review the following refund policy carefully before
                making any purchases:
              </span>
            </div>
            <div className="frame-div">
              {sections.map((section, index) => (
                <div key={index} className="contact-container-parent">
                  <div 
                    className="refund-eligibility-parent" 
                    onClick={() => toggleSection(index)}
                    style={{cursor: 'pointer'}}
                  >
                    <div className="refund-eligibility">{section.title}</div>
                    <img
                      className="refund-bullet-points-container"
                      loading="lazy"
                      alt=""
                      src={`./public/refund/frame-1000001009@2x.png`}
                      style={{transform: openSection === index ? 'rotate(180deg)' : 'none'}}
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
                            dangerouslySetInnerHTML={{__html: item}}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="by-making-a-container">
              <span>By making a purchase on </span>
              <b>OneMetric</b>
              <span>
                , you acknowledge that you have read, understood, and agreed to the
                terms of this refund policy.
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
            />
            <div className="footer-brand-container-wrapper">
              <div className="top-navigation-inner">
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
                />
              </div>
              <img
                className="social-icon-shape1"
                loading="lazy"
                alt=""
                src="./public/refund/vector-1.svg"
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
                  <a href='/contact' style={{ textDecoration: "none", color: "#8A8D9E" }} className="contact-us">Contact Us</a>
                  <a href='/refund' style={{ textDecoration: "none", color: "#8A8D9E" }} className="refund-policy1">Refund Policy</a>
                </div>
                <div className="terms-conditions-parent">
                  <a href='/privacy' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Privacy Policy</a>
                  <a href='/terms' style={{ textDecoration: "none", color: "#8A8D9E" }} className="terms-conditions">Terms &amp; conditions</a>
                  <a href='/referral' style={{ textDecoration: "none", color: "#8A8D9E" }} className="referral-policy">Referral Policy</a>
                  <a href='#' style={{ textDecoration: "none", color: "#8A8D9E" }} className="faqs">FAQs</a>
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