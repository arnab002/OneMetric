import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface DesktopViewProps {
    children: React.ReactNode;
}

const DesktopView: React.FC<DesktopViewProps> = ({ children }) => {
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

    return null;
};

export default DesktopView;
