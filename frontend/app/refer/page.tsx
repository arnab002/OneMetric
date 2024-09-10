'use client'
import React, { useEffect, useState } from "react";
import logo from "../../public/public/home/OneMetric_Transparent.png";
import { BarLoader, PulseLoader } from "react-spinners";

const ViralLoopsWidget = () => {
  const [iframeHeight, setIframeHeight] = useState('100vh');
  const [isLoaded, setIsLoaded] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const updateIframeHeight = () => {
      setIframeHeight(`${window.innerHeight}px`);
    };

    // Initial height set
    updateIframeHeight();

    // Update height on window resize
    window.addEventListener('resize', updateIframeHeight);

    // Create an iframe to load the Viral Loops page
    const iframe = document.createElement("iframe");
    iframe.src = "https://vrlps.co/w50aqp5/cp";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.zIndex = "9999";

    // Append the iframe to the body
    document.body.appendChild(iframe);

    // Set loaded state to true when iframe is loaded
    iframe.onload = () => {
      setIsLoaded(true);
      // Simulate content preparation time
      setTimeout(() => setContentReady(true), 1000);
    };

    // Clean up function
    return () => {
      window.removeEventListener('resize', updateIframeHeight);
      if (iframe && document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    };
  }, []);

  if (!isLoaded || !contentReady) {
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
          {!isLoaded ? 'Loading...' : 'Preparing your experience...'}
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

  return null; // The iframe is directly appended to the body in the useEffect hook
};

export default ViralLoopsWidget;