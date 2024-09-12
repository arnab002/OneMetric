'use client'
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Icon } from '@iconify/react'
import { usePathname } from 'next/navigation'

interface SidebarProps {
    isSidebarActive: boolean;
    toggleSidebar: () => void;
}

function Sidebar({ isSidebarActive, toggleSidebar }: SidebarProps) {
    const [isUsersOpen, setIsUsersOpen] = useState<boolean>(false);
    const [isPlansOpen, setIsPlansOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isDesktop, setIsDesktop] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 1024);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    useEffect(() => {
        const checkIfDesktop = () => {
            setIsDesktop(window.innerWidth >= 1280);
        };

        checkIfDesktop();
        window.addEventListener('resize', checkIfDesktop);

        return () => {
            window.removeEventListener('resize', checkIfDesktop);
        };
    }, []);

    const toggleDropdown = (setter: Dispatch<SetStateAction<boolean>>): void => {
        setter(prev => !prev);
    };

    const isActive = (href: string): boolean => {
        return pathname === href;
    };

    const sidebarClasses = `sidebar ${isSidebarActive && isDesktop ? 'active' : ''} ${isMobile ? (isSidebarActive ? 'sidebar-open' : '') : ''}`;

    return (
        <aside className={sidebarClasses}>
            <button type="button" className="sidebar-close-btn" onClick={toggleSidebar}>
                <Icon icon="radix-icons:cross-2" />
            </button>
            <div>
                <a href="/admin/dashboard" className="sidebar-logo">
                    <img
                        src="/public/home/OneMetric_Transparent.png"
                        alt="site logo"
                        className="light-logo"
                    />
                    <img
                        src="/public/home/OneMetric_Transparent.png"
                        alt="site logo"
                        className="dark-logo"
                    />
                    <img
                        src="/public/home/OneMetric_Transparent.png"
                        alt="site logo"
                        className="logo-icon"
                    />
                </a>
            </div>
            <div className="sidebar-menu-area open">
                <ul className="sidebar-menu show" id="sidebar-menu">
                    <li className={isActive('/admin/dashboard') ? 'active-page' : ''}>
                        <a href="/admin/dashboard" className={isActive('/admin/dashboard') ? 'active-page' : ''}>
                            <Icon
                                icon="solar:home-smile-angle-outline"
                                className="menu-icon"
                            />
                            <span>Dashboard</span>
                        </a>
                    </li>
                    &nbsp;
                    <li className={`dropdown ${(isUsersOpen || pathname.startsWith('/admin/users') || pathname === '/admin/addUser' || pathname === '/admin/bulkUsers') ? 'open' : ''}`}>
                        <a href="javascript:void(0)" onClick={() => toggleDropdown(setIsUsersOpen)}>
                            <Icon
                                icon="flowbite:users-group-outline"
                                className="menu-icon"
                            />
                            <span>Users</span>
                        </a>
                        {(isUsersOpen || pathname.startsWith('/admin/users') || pathname === '/admin/addUser' || pathname === '/admin/bulkUsers') && (
                            <ul className="sidebar-submenu show">
                                <li className={isActive('/admin/users') ? 'active-page' : ''}>
                                    <a href="/admin/users" className={isActive('/admin/users') ? 'active-page' : ''}>
                                        <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                                        Users List
                                    </a>
                                </li>
                                <li className={isActive('/admin/addUser') ? 'active-page' : ''}>
                                    <a href="/admin/addUser" className={isActive('/admin/addUser') ? 'active-page' : ''}>
                                        <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                                        Add User
                                    </a>
                                </li>
                                <li className={isActive('/admin/bulkUsers') ? 'active-page' : ''}>
                                    <a href="/admin/bulkUsers" className={isActive('/admin/bulkUsers') ? 'active-page' : ''}>
                                        <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                                        Bulk Users
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={`dropdown ${(isPlansOpen || pathname.startsWith('/admin/createPlan')) ? 'open' : ''}`}>
                        <a href="javascript:void(0)" onClick={() => toggleDropdown(setIsPlansOpen)}>
                            <Icon
                                icon="fa6-solid:hand-holding-dollar"
                                className="menu-icon"
                            />
                            <span>Plans</span>
                        </a>
                        {(isPlansOpen || pathname.startsWith('/admin/createPlan')) && (
                            <ul className="sidebar-submenu show">
                                <li className={isActive('/admin/createPlan') ? 'active-page' : ''}>
                                    <a href="/admin/createPlan" className={isActive('/admin/createPlan') ? 'active-page' : ''}>
                                        <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                                        Create Plan
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={isActive('/admin/blockUser') ? 'active-page' : ''}>
                        <a href="/admin/blockUser" className={isActive('/admin/blockUser') ? 'active-page' : ''}>
                            <i className="ri-user-settings-line" />
                            <span>Block User</span>
                        </a>
                    </li>
                    <li className={isActive('/admin/profile') ? 'active-page' : ''}>
                        <a href="/admin/profile" className={isActive('/admin/profile') ? 'active-page' : ''}>
                            <Icon
                                width={23}
                                height={23}
                                icon="eos-icons:admin"
                                className="menu-icon"
                            />
                            <span>&nbsp;Profile</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar