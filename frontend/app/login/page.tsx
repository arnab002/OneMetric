'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../../public/assets/login.css';
import baseApiURL from '@/baseUrl';

function Login() {
  const [mobile, setMobile] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // State to hold validation error
  const router = useRouter();

  const validateMobile = (mobile: string) => {
    const regex = /^[6789]\d{9}$/;
    return regex.test(mobile);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateMobile(mobile)) {
      setError('Please enter a valid 10-digit Indian mobile number starting with 7, 8, or 9.');
      return;
    }
    setError(null); // Clear any previous error
    try {
      const response = await axios.post(`${baseApiURL()}/check-mobile`, { mobile });
      const { redirect } = response.data;
      router.push(`${redirect}?mobile=${mobile}`);
    } catch (error) {
      console.error('Error checking mobile number', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length <= 10) {
      setMobile(value);
    }
  };

  return (
    <div>
      <div className="login">
        <img className="login-child" alt="" src="./public/login/group-1000001016.svg" />
        <header className="main">
          <img className="image-18-icon" loading="lazy" alt="" src="./public/login/image-18@2x.png" />
          <div className="content">
            <div className="content">
              <a className="onemetric">OneMetric</a>
            </div>
          </div>
          <div className="frame-parent">
            <img className="frame-child" alt="" src="./public/login/group-1000000964.svg" />
            <img className="frame-item" alt="" src="./public/login/group-1000000966.svg" />
          </div>
        </header>
        <section className="form">
          <div className="number-field-parent">
            <div className="number-field">
              <img className="number-field-child" loading="lazy" alt="" src="./public/login/group-1000001008.svg" />
            </div>
            <form className="input-details" onSubmit={handleSubmit}>
              <div className="description">
                <div className="number-info">
                  <div className="input-instruction">
                    <h3 className="enter-your-whatsapp">Enter Your WhatsApp Number</h3>
                  </div>
                  <div className="an-otp-will">An OTP will be sent to your WhatsApp number for verification</div>
                </div>
                <div className="input-wrapper">
                  <div className="whatsapp-number">WhatsApp Number</div>
                  <div className="input-content">
                    <select className="country-code">
                      <option className="ind">IND</option>
                      {/* <div className="flag">
                        <img className="flag-icon" alt="" src="./public/flag-icon.svg" />
                      </div> */}
                    </select>
                    <div className="number-input">
                      <input
                        className="whatsapp-number1"
                        placeholder="WhatsApp Number"
                        type="text"
                        inputMode='numeric'
                        autoFocus
                        maxLength={10}
                        value={mobile}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {error && <div className="error-message" style={{color: 'red'}}>{error}</div>} {/* Display validation error */}
              <button className="button-container" type="submit">
                <div className="send-otp">Send OTP</div>
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
