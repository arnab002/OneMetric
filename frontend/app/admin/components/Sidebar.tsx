import React from 'react'
import { Icon } from '@iconify/react'

function Sidebar() {
    return (
        <aside className="sidebar">
            <button type="button" className="sidebar-close-btn">
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
            <div className="sidebar-menu-area">
                <ul className="sidebar-menu" id="sidebar-menu">
                    <li>
                        <a href="/admin/dashboard">
                            <Icon
                                icon="solar:home-smile-angle-outline"
                                className="menu-icon"
                            />
                            <span>Dashboard</span>
                        </a>
                    </li>
                    &nbsp;
                    <li className="dropdown">
                        <a href="javascript:void(0)">
                            <Icon
                                icon="flowbite:users-group-outline"
                                className="menu-icon"
                            />
                            <span>Users</span>
                        </a>
                        <ul className="sidebar-submenu">
                            <li>
                                <a href="/admin/users">
                                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                                    Users List
                                </a>
                            </li>
                            <li>
                                <a href="/admin/addUser">
                                    <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                                    Add User
                                </a>
                            </li>
                            <li>
                                <a href="/admin/bulkUsers">
                                    <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                                    Bulk Users
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="javascript:void(0)">
                            <Icon
                                icon="fa6-solid:hand-holding-dollar"
                                className="menu-icon"
                            />
                            <span>Plans</span>
                        </a>
                        <ul className="sidebar-submenu">
                            {/* <li>
                                <a href="javascript:void(0)">
                                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                                    Plans List
                                </a>
                            </li> */}
                            <li>
                                <a href="/admin/editPlan">
                                    <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                                    Edit Plan
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/admin/blockUser">
                            <i className="ri-user-settings-line" />
                            <span>Block User</span>
                        </a>
                    </li>
                    <li>
                        <a href="/admin/profile">
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