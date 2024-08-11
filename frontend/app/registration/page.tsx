'use client';
import React, { useState } from 'react'
import '../../public/assets/register.css'
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import baseApiURL from '@/baseUrl';

function Registration() {
    const searchParams = useSearchParams();
    const mobile = searchParams.get('mobile');
    const router = useRouter();

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    // const [countrycode, setCountryCode] = useState('');
    const [pincode, setPinCode] = useState('');
    const [billingAddress, setBillingAddress] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${baseApiURL()}/userRegistration`, {
                fullname,
                email,
                pincode,
                billing_address: billingAddress,
                mobile,
            });
            router.push(`/successRegister?mobile=${mobile}`);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };
    return (
        <div>
            <div className="otp">
                <header className="otp1">
                    <img
                        className="image-18-icon"
                        loading="lazy"
                        alt=""
                        src="./public/register/image-18@2x.png"
                    />
                    <div className="main">
                        <div className="main">
                            <a className="onemetric">OneMetric</a>
                        </div>
                    </div>
                    <div className="frame-parent">
                        <img className="frame-child" alt="" src="./public/register/group-1000000964.svg" />
                        <img className="frame-item" alt="" src="./public/register/group-1000000966.svg" />
                    </div>
                </header>
                <section className="metric-wrapper">
                    <div className="metric">
                        <div className="metric-inner">
                            <div className="frame-group">
                                <div className="frame-container">
                                    <div className="group-div">
                                        <div className="frame-parent1">
                                            <div className="rectangle-parent">
                                                <div className="frame-inner" />
                                                <div className="rectangle-div" />
                                            </div>
                                            <div className="ellipse-div" />
                                        </div>
                                        <img
                                            className="group-icon"
                                            loading="lazy"
                                            alt=""
                                            src="./public/register/group-1000000975@2x.png"
                                        />
                                    </div>
                                    <div className="frame-child1" />
                                </div>
                                <div className="frame-child2" />
                                <div className="frame-child3" />
                                <div className="frame-child4" />
                            </div>
                        </div>
                        <div className="input-fields-parent">
                            <div className="input-fields">
                                <div className="number-input">
                                    <div className="number-field">
                                        <h3 className="enter-your-whatsapp">
                                            Enter Your Profile Details
                                        </h3>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="personal-info">
                                        <div className="input-labels">
                                            <div className="full-name">Full Name</div>
                                            <div className="input-boxes">
                                                <div className="nested-input-boxes">
                                                    <input
                                                        className="sreejesh-parambath"
                                                        placeholder="John Smith"
                                                        type="text"
                                                        value={fullname}
                                                        onChange={(e) => setFullname(e.target.value)}
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-labels">
                                            <div className="email-id">Email ID</div>
                                            <div className="input-boxes">
                                                <div className="nested-input-boxes">
                                                    <input
                                                        className="sreejesh-parambath"
                                                        placeholder="abc@example.com"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="input-labels">
                                            <div className="email-id">Country Code</div>
                                            <div className="input-boxes">
                                                <div className="nested-input-boxes">
                                                    <input
                                                        className="sreejesh-parambath"
                                                        placeholder='IN'
                                                        type="text"
                                                        value={countrycode}
                                                        onChange={(e) => setCountryCode(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="input-labels">
                                            <div className="email-id">Pin Code</div>
                                            <div className="input-boxes">
                                                <div className="nested-input-boxes">
                                                    <input
                                                        className="sreejesh-parambath"
                                                        placeholder='700001'
                                                        type="text"
                                                        inputMode='numeric'
                                                        value={pincode}
                                                        onChange={(e) => setPinCode(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-labels">
                                            <div className="billing-address-optional">
                                                Billing Address (Optional)
                                            </div>
                                            <div className="input-labels-child">
                                                <textarea
                                                    className="no-3-rmz-infinity-tower-e-wrapper"
                                                    value={billingAddress}
                                                    onChange={(e) => setBillingAddress(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="finish-wrapper">
                                        Register
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Registration