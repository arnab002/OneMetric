'use client'
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AdminProfile() {
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);

    const toggleSidebar = (): void => {
        setIsSidebarActive(prev => !prev);
    };

    return (
        <div>
            <Sidebar isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />
            <main className={`dashboard-main ${isSidebarActive ? 'active' : ''}`}>
                <Header isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />
                <div className="dashboard-main-body">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                        <h6 className="fw-semibold mb-0">View Profile</h6>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 m-auto">
                            <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
                                <div className="pb-24 ms-16 mb-24 me-16 mt--100">
                                    <div className="text-center border border-top-0 border-start-0 border-end-0 pt-120">
                                        <h6 className="mb-0 mt-16">Kathryn Murphy</h6>
                                        <span className="text-secondary-light mb-16">
                                            9865786551
                                        </span>
                                    </div>
                                    <div className="mt-24">
                                        <h6 className="text-xl mb-16">Personal Info</h6>
                                        <ul>
                                            <li className="d-flex align-items-center gap-1 mb-12">
                                                <span className="w-30 text-md fw-semibold text-primary-light">
                                                    Full Name
                                                </span>
                                                <span className="w-70 text-secondary-light fw-medium">
                                                    : &nbsp;&nbsp;&nbsp;&nbsp;Kathryn Murphy
                                                </span>
                                            </li>
                                            <li className="d-flex align-items-center gap-1 mb-12">
                                                <span className="w-30 text-md fw-semibold text-primary-light">
                                                    Email
                                                </span>
                                                <span className="w-70 text-secondary-light fw-medium">
                                                    : &nbsp;&nbsp;&nbsp;&nbsp;kathryn.murphy@example.com
                                                </span>
                                            </li>
                                            <li className="d-flex align-items-center gap-1 mb-12">
                                                <span className="w-30 text-md fw-semibold text-primary-light">
                                                    Phone
                                                </span>
                                                <span className="w-70 text-secondary-light fw-medium">
                                                    : &nbsp;&nbsp;&nbsp;&nbsp;9865786551
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    );
}

export default AdminProfile;
