'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

const RedirectComponent = () => {
  const router = useRouter();
  
  // Initial screen size detection using window object directly for immediate action
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    // Redirect immediately based on the screen size
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        router.replace('/home-mobile');
      } else {
        router.replace('/home');
      }
    }
  }, [isMobile, router]);

  return null; // No need to render anything since we're just redirecting
};

const App = () => {
  return <RedirectComponent />;
};

export default App;

