'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import "../../public/assets/otpSuccessful.css"

function OTPSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [paymentDetails, setPaymentDetails] = useState({
        transaction_id: '',
        order_id: '',
        payment_id: ''
    });

    useEffect(() => {
        // Get the query parameters
        const transaction_id = searchParams.get('transaction_id') || 'ABCD';
        const order_id = searchParams.get('order_id') || 'PQR';
        const payment_id = searchParams.get('payment_id') || 'FDC';

        // Set the payment details
        setPaymentDetails({ transaction_id, order_id, payment_id });

        const timer = setTimeout(() => {
            window.location.href = '/';
        }, 10000); // 10 seconds (increased from 3.5 seconds to give more time to read)

        return () => clearTimeout(timer);
    }, [router, searchParams]);

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
                <section className="deletion-container" style={{textAlign: 'center'}}>
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
                            <div className="successfully-verified">Payment Done Successfully!</div>
                            <div style={{marginTop: '20px', fontSize: '14px', color: '#666'}}>
                                <p>Transaction ID: {paymentDetails.transaction_id}</p>
                                <p>Order ID: {paymentDetails.order_id}</p>
                                <p>Payment ID: {paymentDetails.payment_id}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default OTPSuccess
