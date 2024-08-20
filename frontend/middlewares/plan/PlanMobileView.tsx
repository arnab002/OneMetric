import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface PlanMobileViewProps {
    children: React.ReactNode;
}

const PlanMobileView: React.FC<PlanMobileViewProps> = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!isMobile && !isTablet) {
                setShouldRender(false);
                window.location.href = "/plan";
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

export default PlanMobileView;
