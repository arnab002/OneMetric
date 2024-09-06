'use client'
import React, { useState, Dispatch, SetStateAction } from 'react'
import { Icon } from '@iconify/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function Sidebar() {
    const [isUsersOpen, setIsUsersOpen] = useState<boolean>(false);
    const [isPlansOpen, setIsPlansOpen] = useState<boolean>(false);
    const pathname = usePathname();

    const toggleDropdown = (setter: Dispatch<SetStateAction<boolean>>): void => {
        setter(prev => !prev);
    };

    const isActive = (href: string): boolean => {
        return pathname === href;
    };

    return (
        <aside className="sidebar">
            <button type="button" className="sidebar-close-btn">
                <Icon icon="radix-icons:cross-2" />
            </button>
            <div>
                <Link href="/admin/dashboard" className="sidebar-logo">
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
                </Link>
            </div>
            <div className="sidebar-menu-area">
                <ul className="sidebar-menu" id="sidebar-menu">
                    <li className={isActive('/admin/dashboard') ? 'active' : ''}>
                        <Link href="/admin/dashboard">
                            <Icon
                                icon="solar:home-smile-angle-outline"
                                className="menu-icon"
                            />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    &nbsp;
                    <li className={`dropdown ${isUsersOpen ? 'open' : ''} ${pathname.startsWith('/admin/users') || pathname === '/admin/addUser' || pathname === '/admin/bulkUsers' ? 'active' : ''}`}>
                        <a href="#" onClick={() => toggleDropdown(setIsUsersOpen)}>
                            <Icon
                                icon="flowbite:users-group-outline"
                                className="menu-icon"
                            />
                            <span>Users</span>
                        </a>
                        {isUsersOpen && (
                            <ul className="sidebar-submenu">
                                <li className={isActive('/admin/users') ? 'active' : ''}>
                                    <Link href="/admin/users">
                                        <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                                        Users List
                                    </Link>
                                </li>
                                <li className={isActive('/admin/addUser') ? 'active' : ''}>
                                    <Link href="/admin/addUser">
                                        <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                                        Add User
                                    </Link>
                                </li>
                                <li className={isActive('/admin/bulkUsers') ? 'active' : ''}>
                                    <Link href="/admin/bulkUsers">
                                        <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                                        Bulk Users
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={`dropdown ${isPlansOpen ? 'open' : ''} ${pathname.startsWith('/admin/createPlan') ? 'active' : ''}`}>
                        <a href="#" onClick={() => toggleDropdown(setIsPlansOpen)}>
                            <Icon
                                icon="fa6-solid:hand-holding-dollar"
                                className="menu-icon"
                            />
                            <span>Plans</span>
                        </a>
                        {isPlansOpen && (
                            <ul className="sidebar-submenu">
                                <li className={isActive('/admin/createPlan') ? 'active' : ''}>
                                    <Link href="/admin/createPlan">
                                        <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                                        Create Plan
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={isActive('/admin/blockUser') ? 'active' : ''}>
                        <Link href="/admin/blockUser">
                            <i className="ri-user-settings-line" />
                            <span>Block User</span>
                        </Link>
                    </li>
                    <li className={isActive('/admin/profile') ? 'active' : ''}>
                        <Link href="/admin/profile">
                            <Icon
                                width={23}
                                height={23}
                                icon="eos-icons:admin"
                                className="menu-icon"
                            />
                            <span>&nbsp;Profile</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar