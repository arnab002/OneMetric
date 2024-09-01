import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import logo from "../../public/public/home/OneMetric_Transparent.png";
import { BarLoader, PulseLoader } from 'react-spinners'; // Import multiple loaders

interface HomeDesktopViewProps {
    children: React.ReactNode;
}

const HomeDesktopView: React.FC<HomeDesktopViewProps> = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1280 });
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && !isDesktop) {
            setShouldRender(false);
            window.location.href="/";
        } else {
            setShouldRender(true);
        }
    }, [isDesktop]);

    if (typeof window !== 'undefined' && shouldRender && isDesktop) {
        return <>{children}</>;
    }

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
                {shouldRender ? 'Loading...' : 'Preparing your experience...'}
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
};

export default HomeDesktopView;
