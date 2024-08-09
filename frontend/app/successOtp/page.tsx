'use client';
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import "../../public/assets/otpSuccessful.css"

function OTPSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mobile = searchParams.get('mobile');
    const redirectUrl = searchParams.get('redirectUrl');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (redirectUrl) {
                router.push(`${redirectUrl}?mobile=${mobile}`);
            }
        }, 2000); // 3 seconds

        return () => clearTimeout(timer);
    }, [mobile, redirectUrl, router]);

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
                            <div className="successfully-verified">Successfully Verified!</div>
                            <div className="placeholder-wrapper">
                                <div className="placeholder">{mobile}</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default OTPSuccess
