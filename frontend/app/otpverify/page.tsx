'use client';
import React, { useEffect, useState, ChangeEvent } from 'react';
import '../../public/assets/otpverify.css';
import axios from 'axios';
import baseApiURL from '@/baseUrl';

const OTPVerify: React.FC = () => {
    const [mobile, setMobile] = useState<string | null>(null);
    const [country_code, setCountryCode] = useState<string>('91');
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [message, setMessage] = useState<string>('');
    const [resendDisabled, setResendDisabled] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [isOtpInvalid, setIsOtpInvalid] = useState<boolean>(false);
    const [remainingTime, setRemainingTime] = useState<number>(60);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

    const handleHomeClick = () => {
        window.location.href = '/'
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setMobile(params.get('mobile'));
        const countryCodeParam = params.get('countryCode');
        if (countryCodeParam) {
            setCountryCode(countryCodeParam);
        }
    }, []);

    useEffect(() => {
        if (otp.join('').length === 6 && mobile) {
            setIsVerifying(true);
            const formattedCountryCode = (country_code ?? '91').trim();
            const finalCountryCode = formattedCountryCode.startsWith('+') ? formattedCountryCode : `+${formattedCountryCode}`;

            axios.post(`${baseApiURL()}/verify-otp`, { mobile, country_code: finalCountryCode, otp: otp.join('') })
                .then(response => {
                    setIsOtpInvalid(false);
                    const token = response.data.token;
                    const redirectUrl = response.data.redirect;
                    sessionStorage.setItem('authToken', token);
                    console.log('Token stored in session storage');
                    window.location.href = `/successOtp?mobile=${mobile}&redirectUrl=${redirectUrl}`
                })
                .catch(error => {
                    setError('Invalid OTP. Please Try again.');
                    setIsOtpInvalid(true);
                    setOtp(['', '', '', '', '', '']);
                    (document.getElementById(`otp-0`) as HTMLInputElement)?.focus();
                })
                .finally(() => {
                    setIsVerifying(false);
                });
        }
    }, [otp, mobile, country_code]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendDisabled && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (remainingTime === 0) {
            setResendDisabled(false);
            setRemainingTime(60);
        }
        return () => clearInterval(timer);
    }, [resendDisabled, remainingTime]);

    useEffect(() => {
        // Focus on the first OTP input field when the component loads
        (document.getElementById(`otp-0`) as HTMLInputElement)?.focus();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            setError('');
            setIsOtpInvalid(false);
            if (index < 5) {
                (document.getElementById(`otp-${index + 1}`) as HTMLInputElement)?.focus();
            }
        }
    };

    const handleResend = () => {
        setResendDisabled(true);
        setRemainingTime(60);

        const formattedCountryCode = (country_code ?? '91').trim();
        const finalCountryCode = formattedCountryCode.startsWith('+') ? formattedCountryCode : `+${formattedCountryCode}`;

        axios.post(`${baseApiURL()}/login`, { mobile, country_code: finalCountryCode })
            .then(response => {
                setMessage('OTP has been resent to your mobile number.');
            })
            .catch(error => {
                setMessage('Error resending OTP.');
                console.error('Error resending OTP:', error);
            });

        setTimeout(() => {
            setResendDisabled(false);
        }, 30000);
    };

    const handleTermsRedirect = () => {
        window.open('/terms', '_blank');
    };

    const handlePrivacyRedirect = () => {
        window.open('/privacy', '_blank');
    };

    return (
        <div>
            <div className="otp">
                <header className="image-18-parent">
                    <img
                        className="image-18-icon"
                        loading="lazy"
                        alt=""
                        src="./public/OTP/OneMetric_Transparent.png"
                        onClick={handleHomeClick} style={{cursor: 'pointer'}}
                    />
                    <div className="frame-wrapper">
                        <div className="frame-wrapper" onClick={handleHomeClick} style={{cursor: 'pointer'}}>
                            <a className="onemetric">OneMetric</a>
                        </div>
                    </div>
                    <div className="frame-parent">
                        <img className="frame-child" alt="" src="./public/OTP/group-1000000964.svg" />
                        <img className="frame-item" alt="" src="./public/OTP/group-1000000966.svg" />
                    </div>
                </header>
                <main className="otp-inner">
                    <section className="input-container-parent">
                        <div className="input-container">
                            <div className="input-background-wrapper">
                                <div className="input-background">
                                    <div className="frame-group">
                                        <div className="frame-container">
                                            <div className="group-div">
                                                <div className="rectangle-parent">
                                                    <div className="frame-inner" />
                                                    <div className="otp-input" />
                                                </div>
                                                <div className="otp-indicator" />
                                            </div>
                                            <img
                                                className="group-icon"
                                                loading="lazy"
                                                alt=""
                                                src="./public/OTP/group-1000000975@2x.png"
                                            />
                                        </div>
                                        <div className="otp-divider" />
                                    </div>
                                    <div className="input-placeholder" />
                                    <div className="input-placeholder1" />
                                    <div className="input-placeholder2" />
                                </div>
                            </div>
                        </div>
                        <div className="info-container-parent">
                            <div className="info-container">
                                <div className="message-container-parent">
                                    <div className="message-container">
                                        <div className="enter-otp-sent-to-wrapper">
                                            <h3 className="enter-otp-sent">Enter OTP Sent to</h3>
                                        </div>
                                        <div className="phone-number-parent">
                                            <div className="phone-number">{mobile}</div>
                                            <div className="edit-delet-wrapper">
                                                <div className="edit-delet">
                                                    <img
                                                        className="edit-icon"
                                                        loading="lazy"
                                                        alt=""
                                                        src="./public/OTP/edit.svg"
                                                    />
                                                    <img
                                                        className="edit-icon"
                                                        loading="lazy"
                                                        alt=""
                                                        src="./public/OTP/delete.svg"
                                                    />
                                                    <div className="delete">
                                                        <img
                                                            className="edit-2-icon"
                                                            loading="lazy"
                                                            alt=""
                                                            src="./public/OTP/edit2.svg"
                                                        />
                                                    </div>
                                                    <div className="delete1">
                                                        <img
                                                            className="edit-2-icon1"
                                                            loading="lazy"
                                                            alt=""
                                                            src="./public/OTP/edit2-1.svg"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="enter-the-6-container">
                                        <p className="enter-the-6-digit-otp-received">
                                            <span className="enter-the">Enter the </span>
                                            <span className="digit-otp">6 Digit OTP</span>
                                            <span> received</span>
                                        </p>
                                        <p className="enter-the-6-digit-otp-received">
                                            on your WhatsApp number
                                        </p>
                                    </div>
                                </div>
                                <div className="otp-dots-container">
                                    {otp.map((value, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            className={`otp-dots ${isOtpInvalid ? 'invalid-otp' : ''}`}
                                            maxLength={1}
                                            inputMode="numeric"
                                            pattern="[0-9]"
                                            value={value}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    ))}
                                </div>
                                {isVerifying && (
                                    <div className="verifying-container">
                                        <div className="spinner"></div>
                                        <p style={{ color: 'white' }}>OTP verifying</p>
                                    </div>
                                )}
                                {isOtpInvalid && !isVerifying && (
                                    <p className="error-message">Invalid OTP. Please Try again.</p>
                                )}
                            </div>
                            <div className="frame-div">
                                <div className="resend-container">
                                    <button
                                        className="resend-otp"
                                        onClick={handleResend}
                                        disabled={resendDisabled}
                                    >
                                        Resend OTP
                                    </button>
                                    <span className="secs">{remainingTime} secs</span>
                                    <div className="it-may-take-container">
                                        <span>98% of users receive OTP in less than 60 secs</span>
                                        {/* <span className="secs">{remainingTime} secs</span> */}
                                    </div>
                                </div>
                            </div>
                            <div className="frame-parent1">
                                <div className="terms-container">
                                    <div className="by-verifying-otp-container">
                                        <span>
                                            <span>By verifying OTP you will be Agreed to our </span>
                                            <span className="terms-and-conditions" style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={handleTermsRedirect}>
                                                Terms and conditions
                                            </span>
                                            <span className="and"> and </span>
                                        </span>
                                        <span className="privacy-policy" style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={handlePrivacyRedirect}>Privacy policy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default OTPVerify;