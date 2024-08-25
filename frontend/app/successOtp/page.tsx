'use client';
import React, { useState, useEffect } from 'react';
import "../../public/assets/otpSuccessful.css"

function OTPSuccess() {
    const [mobile, setMobile] = useState<string | null>(null);
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

    useEffect(() => {
        // Fetch search params only on the client side
        const searchParams = new URLSearchParams(window.location.search);
        const mobileParam = searchParams.get('mobile');
        const redirectUrlParam = searchParams.get('redirectUrl');
        
        setMobile(mobileParam);
        setRedirectUrl(redirectUrlParam);

        const timer = setTimeout(() => {
            if (redirectUrlParam) {
                window.location.href = `${redirectUrlParam}`;
            }
        }, 2000); // 2 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <div className="otp">
                <section className="frame-parent">
                    <div className="frame-wrapper">
                        <div className="frame-group">
                            <div className="frame-container">
                                <div className="group-div">
                                    <div className="frame-parent1">
                                        <div className="rectangle-parent">
                                            <div className="frame-child" />
                                            <div className="frame-item" />
                                        </div>
                                        <div className="frame-inner" />
                                    </div>
                                    <img
                                        className="group-icon"
                                        loading="lazy"
                                        alt=""
                                        src="./public/otpSuccess/group-1000000975@2x.png"
                                    />
                                </div>
                                <div className="rectangle-div" />
                            </div>
                            <div className="frame-child1" />
                            <div className="frame-child2" />
                            <div className="frame-child3" />
                        </div>
                    </div>
                    <header className="image-and-verification">
                        <img
                            className="image-18-icon"
                            loading="lazy"
                            alt=""
                            src="./public/otpSuccess/image-18@2x.png"
                        />
                        <div className="image-and-verification-inner">
                            <div className="image-and-verification-inner">
                                <a className="onemetric">OneMetric</a>
                            </div>
                        </div>
                        <div className="frame-div">
                            <img
                                className="frame-child4"
                                alt=""
                                src="./public/otpSuccess/group-1000000964.svg"
                            />
                            <img
                                className="frame-child5"
                                alt=""
                                src="./public/otpSuccess/group-1000000966.svg"
                            />
                        </div>
                    </header>
                </section>
                <section className="deletion-container">
                    <div className="frame-parent2">
                        <div className="delete-wrapper">
                            <div className="delete">
                                <img
                                    className="edit-2-icon"
                                    loading="lazy"
                                    alt=""
                                    src="./public/otpSuccess/edit2.svg"
                                />
                            </div>
                        </div>
                        <div className="successfully-verified-parent">
                            {/* <div className="successfully-verified">Successfully Verified!</div> */}
                            <div className="placeholder-wrapper">
                                <div className="placeholder">Start Your <span style={{color: 'yellow'}}>Epic</span> journey</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default OTPSuccess
