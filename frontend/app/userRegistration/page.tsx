'use client';
import React, { useState, useEffect } from 'react'
import '../../public/assets/register.css'
import axios from 'axios';
import logo from "../../public/public/register/OneMetric_Transparent.png";
import { BarLoader, PulseLoader } from 'react-spinners'; // Import multiple loaders
import baseApiURL from '@/baseUrl';

function Registration() {
    const [isTokenChecked, setIsTokenChecked] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pincode, setPinCode] = useState('');
    const [billingAddress, setBillingAddress] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsRegistering(true);

        try {
            const response = await axios.post(`${baseApiURL()}/userRegistration`, {
                name,
                email,
                pincode,
                address: billingAddress,
            },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
            window.location.href = '/successRegister'
        } catch (error) {
            console.error('Error creating user:', error);
            setIsRegistering(false);
        }
    };

    useEffect(() => {
        const checkToken = () => {
            const storedToken = localStorage.getItem('authToken');
            setToken(storedToken);
            if (!storedToken) {
                window.location.href = '/login';
            } else {
                setIsTokenChecked(true);
            }
        };

        if (typeof window !== 'undefined') {
            checkToken();
        }
    }, []);

    const handleHomeClick = () => {
        window.location.href = '/'
    };

    if (!isTokenChecked) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#0B0C18',
                fontFamily: 'Arial, sans-serif'
            }}>
                <img src={logo.src} alt="OneMetric Logo" style={{ width: '150px', marginBottom: '20px' }} />
                <BarLoader
                    color={'#F37254'}
                    loading={true}
                    height={4}
                    width={150}
                />
                <p style={{ marginTop: '20px', color: '#fff' }}>
                    {isTokenChecked ? 'Loading...' : 'Preparing your experience...'}
                </p>
                <div style={{ marginTop: '10px' }}>
                    <PulseLoader
                        color={'#F37254'}
                        loading={true}
                        size={10}
                        speedMultiplier={0.7}
                    />
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="otp">
                <header className="otp1">
                    <img
                        className="image-18-icon"
                        loading="lazy"
                        alt=""
                        src="./public/register/image-18@2x.png"
                        onClick={handleHomeClick} style={{ cursor: 'pointer' }}
                    />
                    <div className="main">
                        <div className="main" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
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
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        autoFocus
                                                        required
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
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
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
                                                        required
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
                                    <button type="submit" className="finish-wrapper" disabled={isRegistering}>
                                        {isRegistering ? "Registering" : "Register"}
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