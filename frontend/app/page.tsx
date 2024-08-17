// 'use client'
// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useMediaQuery } from 'react-responsive';

// const RedirectComponent = () => {
//   const router = useRouter();
  
//   // Initial screen size detection using window object directly for immediate action
//   const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

//   useEffect(() => {
//     // Redirect immediately based on the screen size
//     if (typeof window !== 'undefined') {
//       if (window.innerWidth < 768) {
//         router.replace('/home-mobile');
//       } else {
//         router.replace('/home');
//       }
//     }
//   }, [isMobile, router]);

//   return null; // No need to render anything since we're just redirecting
// };

// const App = () => {
//   return <RedirectComponent />;
// };

// export default App;


'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

const RedirectComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  // Use a single breakpoint to distinguish between mobile and desktop
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const targetRoute = isMobile ? '/home-mobile' : '/home';

      // Check if we're already on the target route to prevent unnecessary redirects
      if (pathname !== targetRoute) {
        router.replace(targetRoute);
      }
    }
  }, [isClient, isMobile, router, pathname]);

  // Render a loading state or return null
  return isClient ? null : <div>Loading...</div>;
};

const App = () => {
  return <RedirectComponent />;
};

export default App;