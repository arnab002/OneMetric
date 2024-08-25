import React from 'react'
import { Icon } from '@iconify/react'

function Header() {
    return (
        <div className="navbar-header">
            <div className="row align-items-center justify-content-between">
                <div className="col-auto">
                    <div className="d-flex flex-wrap align-items-center gap-4">
                        <button type="button" className="sidebar-toggle">
                            <Icon
                                icon="heroicons:bars-3-solid"
                                className="icon text-2xl non-active"
                            />
                            <Icon
                                icon="iconoir:arrow-right"
                                className="icon text-2xl active"
                            />
                        </button>
                        <button type="button" className="sidebar-mobile-toggle">
                            <Icon icon="heroicons:bars-3-solid" className="icon" />
                        </button>
                        <form className="navbar-search">
                            <input type="text" name="search" placeholder="Search" />
                            <Icon icon="ion:search-outline" className="icon" />
                        </form>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="d-flex flex-wrap align-items-center gap-3">
                        {/* Message dropdown end */}
                        <div className="dropdown">
                            <button
                                className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                <Icon
                                    icon="iconoir:bell"
                                    className="text-primary-light text-xl"
                                />
                            </button>
                            <div className="dropdown-menu to-top dropdown-menu-lg p-0">
                                <div className="m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                                    <div>
                                        <h6 className="text-lg text-primary-light fw-semibold mb-0">
                                            Notifications
                                        </h6>
                                    </div>
                                    <span className="text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center">
                                        05
                                    </span>
                                </div>
                                <div className="max-h-400-px overflow-y-auto scroll-sm pe-4">
                                    <a
                                        href="javascript:void(0)"
                                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                                    >
                                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                                            <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                                <Icon
                                                    icon="bitcoin-icons:verify-outline"
                                                    className="icon text-xxl"
                                                />
                                            </span>
                                            <div>
                                                <h6 className="text-md fw-semibold mb-4">
                                                    Congratulations
                                                </h6>
                                                <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                                                    Your profile has been Verified. 
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-secondary-light flex-shrink-0">
                                            23 Mins ago
                                        </span>
                                    </a>
                                    <a
                                        href="javascript:void(0)"
                                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                                    >
                                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                                            <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                                <img
                                                    src="/assets/assets/images/notification/profile-1.png"
                                                    alt=""
                                                />
                                            </span>
                                            <div>
                                                <h6 className="text-md fw-semibold mb-4">
                                                    Ronald Richards
                                                </h6>
                                                <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                                                    You can stitch between artboards
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-secondary-light flex-shrink-0">
                                            23 Mins ago
                                        </span>
                                    </a>
                                    <a
                                        href="javascript:void(0)"
                                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                                    >
                                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                                            <span className="w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                                AM
                                            </span>
                                            <div>
                                                <h6 className="text-md fw-semibold mb-4">
                                                    Arlene McCoy
                                                </h6>
                                                <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                                                    Invite you to prototyping
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-secondary-light flex-shrink-0">
                                            23 Mins ago
                                        </span>
                                    </a>
                                    <a
                                        href="javascript:void(0)"
                                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                                    >
                                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                                            <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                                <img
                                                    src="/assets/assets/images/notification/profile-2.png"
                                                    alt=""
                                                />
                                            </span>
                                            <div>
                                                <h6 className="text-md fw-semibold mb-4">
                                                    Annette Black
                                                </h6>
                                                <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                                                    Invite you to prototyping
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-secondary-light flex-shrink-0">
                                            23 Mins ago
                                        </span>
                                    </a>
                                    <a
                                        href="javascript:void(0)"
                                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                                    >
                                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                                            <span className="w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                                DR
                                            </span>
                                            <div>
                                                <h6 className="text-md fw-semibold mb-4">
                                                    Darlene Robertson
                                                </h6>
                                                <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                                                    Invite you to prototyping
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-secondary-light flex-shrink-0">
                                            23 Mins ago
                                        </span>
                                    </a>
                                </div>
                                <div className="text-center py-12 px-16">
                                    <a
                                        href="javascript:void(0)"
                                        className="text-primary-600 fw-semibold text-md"
                                    >
                                        See All Notification
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Notification dropdown end */}
                        <div className="dropdown">
                            <button
                                className="d-flex justify-content-center align-items-center rounded-circle"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                <img
                                    src="/assets/assets/images/user.png"
                                    alt="image"
                                    className="w-40-px h-40-px object-fit-cover rounded-circle"
                                />
                            </button>
                            <div className="dropdown-menu to-top dropdown-menu-sm">
                                <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                                    <div>
                                        <h6 className="text-lg text-primary-light fw-semibold mb-2">
                                        Kathryn Murphy
                                        </h6>
                                        <span className="text-secondary-light fw-medium text-sm">
                                            Admin
                                        </span>
                                    </div>
                                    <button type="button" className="hover-text-danger">
                                        <Icon
                                            icon="radix-icons:cross-1"
                                            className="icon text-xl"
                                        />
                                    </button>
                                </div>
                                <ul className="to-top-list">
                                    <li>
                                        <a
                                            className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                                            href="/admin/profile"
                                        >
                                            <Icon
                                                icon="solar:user-linear"
                                                className="icon text-xl"
                                            />{" "}
                                            My Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3"
                                            href="/admin"
                                        >
                                            <Icon
                                                icon="lucide:power"
                                                className="icon text-xl"
                                            />{" "}
                                            Log Out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Profile dropdown end */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header