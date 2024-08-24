'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../../public/assets/login.css';
import baseApiURL from '@/baseUrl';
import { parsePhoneNumberFromString, getCountries, CountryCode, getCountryCallingCode } from 'libphonenumber-js';

interface CountryOption {
  code: CountryCode;
  name: string;
}

function Login(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mobile, setMobile] = useState<string>('');
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [error, setError] = useState<string | null>(null);
  const [countryCodes, setCountryCodes] = useState<CountryOption[]>([]);
  const router = useRouter();

  useEffect(() => {
    const codes: CountryOption[] = getCountries().map((country) => ({
      code: country,
      name: new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country,
    }));
    setCountryCodes(codes);
  }, []);

  const validateMobile = (phoneNumber: string, country: CountryCode): boolean => {
    try {
      const parsedNumber = parsePhoneNumberFromString(phoneNumber, country);
      return parsedNumber?.isValid() || false;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateMobile(mobile, countryCode)) {
      setError('Please enter a valid mobile number.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const countryCallingCode = `+${getCountryCallingCode(countryCode)}`;
      const parsedNumber = parsePhoneNumberFromString(mobile, countryCode);
      const formattedNumber = parsedNumber?.nationalNumber; // Just the mobile number without country code

      const payload = {
        country_code: countryCallingCode,
        mobile: formattedNumber,
      };

      const response = await axios.post(`${baseApiURL()}/login`, payload);
      console.log(`OTP for ${formattedNumber} is: ${response.data.otp}`)
      router.push(`/otpverify?countryCode=${countryCallingCode}&mobile=${formattedNumber}`);
    } catch (error) {
      console.error('Error checking mobile number', error);
      setError('Error Sending OTP.');
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setMobile(value);

    // Attempt to detect country code from input
    const parsedNumber = parsePhoneNumberFromString(value);
    if (parsedNumber?.isValid()) {
      const detectedCountry = parsedNumber.country;
      if (detectedCountry) {
        setCountryCode(detectedCountry as CountryCode);
      }
    }
  };

  const handleCountryCodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value as CountryCode);
  };

  return (
    <div>
      <div className="login">
        <img className="login-child" alt="" src="./public/login/group-1000001016.svg" />
        <header className="main">
          <img className="image-18-icon" loading="lazy" alt="" src="./public/login/OneMetric_Transparent.png" />
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
              <img className="number-field-child" loading="lazy" alt="" src="./public/login/Group 1000001008.png" />
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
                    <select
                      className="country-code"
                      value={countryCode}
                      onChange={handleCountryCodeChange}
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name} (+{getCountryCallingCode(country.code)})
                        </option>
                      ))}
                    </select>
                    <div className="number-input">
                      <input
                        className="whatsapp-number1"
                        placeholder="WhatsApp Number"
                        type="tel"
                        inputMode='tel'
                        autoFocus
                        value={mobile}
                        maxLength={10}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {error && <div className="error-message" style={{ color: 'red', margin: 'auto' }}>{error}</div>}
              <button className="button-container" type="submit" disabled={isLoading}>
                <div className="send-otp">{isLoading ? "Sending OTP....." : "Send OTP"}</div>
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
