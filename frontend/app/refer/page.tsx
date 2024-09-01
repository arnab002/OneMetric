'use client'
import React, { useEffect, useState } from "react";

const ViralLoopsWidget = () => {
  const [iframeHeight, setIframeHeight] = useState('100vh');
  const [isLoaded, setIsLoaded] = useState(false);

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
    iframe.onload = () => setIsLoaded(true);

    // Clean up function
    return () => {
      window.removeEventListener('resize', updateIframeHeight);
      if (iframe && document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    };
  }, []);

  return (
    <>
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: iframeHeight, 
          zIndex: 9998,
          background: '#fff',
          display: isLoaded ? 'none' : 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.2rem'
        }}
      >
        Loading Viral Loops content...
      </div>
      {/* The iframe is now directly appended to the body in the useEffect hook */}
    </>
  );
};

export default ViralLoopsWidget;