'use client';
import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import '../../public/assets/otpverify.css';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import baseApiURL from '@/baseUrl';

const OTPVerify: React.FC = () => {
    const searchParams = useSearchParams();
    const mobile = searchParams.get('mobile');
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [message, setMessage] = useState<string>('');
    const [resendDisabled, setResendDisabled] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [isOtpInvalid, setIsOtpInvalid] = useState<boolean>(false);
    const [remainingTime, setRemainingTime] = useState<number>(60);
    const otpGeneratedRef = useRef(false);

    useEffect(() => {
        if (mobile && !otpGeneratedRef.current) {
            // Generate OTP using the provided mobile number
            otpGeneratedRef.current = true;
            axios.post(`${baseApiURL()}/generate-otp`, { mobile })
                .then(response => {
                    setMessage('OTP has been sent to your mobile number.');
                })
                .catch(error => {
                    setMessage('Error sending OTP.');
                    console.error('Error sending OTP:', error);
                });

            // Enable the resend button after 30 seconds
            const timer = setTimeout(() => {
                setResendDisabled(false);
            }, 30000);

            return () => clearTimeout(timer);
        }
    }, [mobile]);

    useEffect(() => {
        if (otp.join('').length === 6) {
            axios.post(`${baseApiURL()}/verify-otp`, { mobile, otp: otp.join('') })
                .then(response => {
                    setIsOtpInvalid(false);
                    axios.post(`${baseApiURL()}/verification`, { mobile })
                        .then(response => {
                            const token = response.data.token;
                            const redirectUrl = response.data.redirectUrl;
                            sessionStorage.setItem('authToken', token);
                            console.log('Token stored in session storage');
                            router.push(`/successOtp?mobile=${mobile}&redirectUrl=${redirectUrl}`);
                        })
                        .catch(error => {
                            setError('Error during mobile number verification.');
                            console.error('Error during mobile number verification:', error);
                        });
                })
                .catch(error => {
                    setError('Invalid OTP. Please Try again.');
                    setIsOtpInvalid(true);
                    setOtp(['', '', '', '', '', '']);
                    (document.getElementById(`otp-0`) as HTMLInputElement)?.focus();
                });
        }
    }, [otp, mobile, router]);

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

        axios.post(`${baseApiURL()}/generate-otp`, { mobile })
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

    return (
        <div>
            <div className="otp">
                <header className="image-18-parent">
                    <img
                        className="image-18-icon"
                        loading="lazy"
                        alt=""
                        src="./public/OTP/image-18@2x.png"
                    />
                    <div className="frame-wrapper">
                        <div className="frame-wrapper">
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
                                {isOtpInvalid && (
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
                                    <div className="it-may-take-container">
                                        <span>It may take up to </span>
                                        <span className="secs">{remainingTime} secs</span>
                                        <span> to receive OTP </span>
                                    </div>
                                </div>
                            </div>
                            <div className="frame-parent1">
                                <div className="terms-container">
                                    <div className="by-verifying-otp-container">
                                        <span>
                                            <span>By verifying OTP you will be Agreed to our </span>
                                            <span className="terms-and-conditions">
                                                Terms and conditions
                                            </span>
                                            <span className="and"> and </span>
                                        </span>
                                        <span className="privacy-policy">Privacy policy</span>
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