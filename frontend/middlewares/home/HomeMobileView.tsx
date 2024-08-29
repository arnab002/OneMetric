import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface HomeMobileViewProps {
    children: React.ReactNode;
}

const HomeMobileView: React.FC<HomeMobileViewProps> = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1200 });
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!isMobile && !isTablet) {
                setShouldRender(false);
                window.location.href = "/home";
            } else {
                setShouldRender(true);
            }
        }
    }, [isMobile, isTablet]);

    if (typeof window !== 'undefined' && shouldRender && (isMobile || isTablet)) {
        return <>{children}</>;
    }

    return null;
};

export default HomeMobileView;
