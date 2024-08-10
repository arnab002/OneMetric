'use client'
import React, { useState } from 'react';
import '../../public/assets/referral.css';

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
      title: "Referral Program Overview",
      content: "At <b>OneMetric</b>, we value our users and appreciate their support in helping us grow our community. Our referral program is designed to reward both referrers and referees for spreading the word about our platform."
    },
    {
      title: "How it works",
      content: "Describe how the referral program works here."
    },
    {
      title: "Eligibility Criteria",
      content: "List the eligibility criteria for the referral program here."
    },
    {
      title: "Referral Redemption Process",
      content: "Explain the referral redemption process here."
    },
    {
      title: "Additional Terms and Conditions",
      content: "List any additional terms and conditions for the referral program here."
    },
    {
      title: "Contact Us",
      content: "Provide contact information for referral program inquiries here."
    },
    {
      title: "Agreement",
      content: "Include any agreement terms related to the referral program here."
    }
  ];

  return (
    <div>
      <div className="about-us">
        <header className="icons-parent">
          <div className="icons" id="iconsContainer">
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
          </div>
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
            <h3 className="referral-policy">Referral Policy</h3>
            <div className="at-wegro-we-container">
              <span>At </span>
              <b>OneMetric</b>
              <span>
                , we value our users and their support in growing our community. 
                Our referral program is designed to reward both referrers and 
                referees. Please review the following referral policy carefully:
              </span>
            </div>
            <div className="frame-parent1">
              {sections.map((section, index) => (
                <div key={index} className="frame-wrapper3">
                  <div 
                    className="referral-program-overview-parent"
                    onClick={() => toggleSection(index)}
                    style={{cursor: 'pointer'}}
                  >
                    <div className="referral-program-overview">{section.title}</div>
                    <div className="referral-menu-icons-wrapper">
                      <img
                        className="referral-menu-icons"
                        alt=""
                        src="./public/referral/referral-menu-icons.svg"
                        style={{transform: openSection === index ? 'rotate(180deg)' : 'none'}}
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
                          dangerouslySetInnerHTML={{__html: section.content}}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="by-making-a-container">
              <span>By participating in the referral program on </span>
              <b>OneMetric</b>
              <span>
                , you acknowledge that you have read, understood, and agreed to the
                terms of this referral policy.
              </span>
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
                  <div className="about-us1">About Us</div>
                  <div className="contact-us1">Contact Us</div>
                  <div className="refund-policy">Refund Policy</div>
                </div>
                <div className="terms-conditions-parent">
                  <div className="terms-conditions">Terms &amp; conditions</div>
                  <div className="referral-policy1">Referral Policy</div>
                  <div className="faqs">FAQs</div>
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