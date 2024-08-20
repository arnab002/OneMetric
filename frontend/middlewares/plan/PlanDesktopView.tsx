import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface PlanDesktopViewProps {
    children: React.ReactNode;
}

const PlanDesktopView: React.FC<PlanDesktopViewProps> = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1280 });
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && !isDesktop) {
            setShouldRender(false);
            window.location.href="/plans";
        } else {
            setShouldRender(true);
        }
    }, [isDesktop]);

    if (typeof window !== 'undefined' && shouldRender && isDesktop) {
        return <>{children}</>;
    }

    return null;
};

export default PlanDesktopView;
