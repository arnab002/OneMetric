import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AdminProfile() {
    return (
        <div>
            <Sidebar />
            <main className="dashboard-main">
                <Header />
                <div className="dashboard-main-body">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                        <h6 className="fw-semibold mb-0">View Profile</h6>
                    </div>
                    <div className="row gy-4">
                        <div className="col-lg-4">
                            <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
                                <img
                                    src="/assets/assets/images/user-grid/user-grid-bg1.png"
                                    alt=""
                                    className="w-100 object-fit-cover"
                                />
                                <div className="pb-24 ms-16 mb-24 me-16 mt--100">
                                    <div className="text-center border border-top-0 border-start-0 border-end-0">
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
                                                    : Kathryn Murphy
                                                </span>
                                            </li>
                                            <li className="d-flex align-items-center gap-1 mb-12">
                                                <span className="w-30 text-md fw-semibold text-primary-light">
                                                    Email
                                                </span>
                                                <span className="w-70 text-secondary-light fw-medium">
                                                    : kathryn.murphy@example.com
                                                </span>
                                            </li>
                                            <li className="d-flex align-items-center gap-1 mb-12">
                                                <span className="w-30 text-md fw-semibold text-primary-light">
                                                    Phone
                                                </span>
                                                <span className="w-70 text-secondary-light fw-medium">
                                                    : 9865786551
                                                </span>
                                            </li>
                                            <li className="d-flex align-items-center gap-1 mb-12">
                                                <span className="w-30 text-md fw-semibold text-primary-light">
                                                    Plan Name
                                                </span>
                                                <span className="w-70 text-secondary-light fw-medium">
                                                    : Gold
                                                </span>
                                            </li>
                                            <li className="d-flex align-items-center gap-1 mb-12">
                                                <span className="w-30 text-md fw-semibold text-primary-light">
                                                    Plan Status
                                                </span>
                                                <span className="w-70 text-secondary-light fw-medium">
                                                    : Active
                                                </span>
                                            </li>
                                            <li className="d-flex align-items-center gap-1 mb-12">
                                                <span className="w-30 text-md fw-semibold text-primary-light">
                                                    Plan Start Date
                                                </span>
                                                <span className="w-70 text-secondary-light fw-medium">
                                                    : 01/08/2024
                                                </span>
                                            </li>
                                            <li className="d-flex align-items-center gap-1 mb-12">
                                                <span className="w-30 text-md fw-semibold text-primary-light">
                                                    Plan Expiry Date
                                                </span>
                                                <span className="w-70 text-secondary-light fw-medium">
                                                    : 28/08/2024
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card h-100">
                                <div className="card-body p-24">
                                    <ul
                                        className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link d-flex align-items-center px-24 active"
                                                id="pills-edit-profile-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-edit-profile"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-edit-profile"
                                                aria-selected="true"
                                            >
                                                Edit Profile
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link d-flex align-items-center px-24"
                                                id="pills-change-passwork-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-change-passwork"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-change-passwork"
                                                aria-selected="false"
                                                tabIndex={-1}
                                            >
                                                Change Password
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link d-flex align-items-center px-24"
                                                id="pills-notification-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-notification"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-notification"
                                                aria-selected="false"
                                                tabIndex={-1}
                                            >
                                                Notification Settings
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div
                                            className="tab-pane fade show active"
                                            id="pills-edit-profile"
                                            role="tabpanel"
                                            aria-labelledby="pills-edit-profile-tab"
                                            tabIndex={0}
                                        >
                                            <br /><br />
                                            <form action="#">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="mb-20">
                                                            <label
                                                                htmlFor="name"
                                                                className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                            >
                                                                Full Name
                                                                <span className="text-danger-600">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control radius-8"
                                                                id="name"
                                                                placeholder="Enter Full Name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="mb-20">
                                                            <label
                                                                htmlFor="email"
                                                                className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                            >
                                                                Email <span className="text-danger-600">*</span>
                                                            </label>
                                                            <input
                                                                type="email"
                                                                className="form-control radius-8"
                                                                id="email"
                                                                placeholder="Enter email address"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="mb-20">
                                                            <label
                                                                htmlFor="number"
                                                                className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                            >
                                                                Phone
                                                            </label>
                                                            <input
                                                                type="text"
                                                                inputMode='numeric'
                                                                className="form-control radius-8"
                                                                id="number"
                                                                placeholder="Enter phone number"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="mb-20">
                                                            <label
                                                                htmlFor="plan-name"
                                                                className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                            >
                                                                Plan Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control radius-8"
                                                                id="plan-name"
                                                                placeholder="Enter Plan Name"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="mb-20">
                                                            <label
                                                                htmlFor="plan-status"
                                                                className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                            >
                                                                Plan Status
                                                            </label>
                                                            <select
                                                                className="form-control radius-8 form-select"
                                                                id="plan-status"
                                                                disabled
                                                            >
                                                                <option>Active</option>
                                                                <option>Deactive</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="mb-20">
                                                            <label
                                                                htmlFor="plan-start-date"
                                                                className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                            >
                                                                Plan Start Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control radius-8"
                                                                id="plan-start-date"
                                                                placeholder="Enter Plan Start Date"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="mb-20">
                                                            <label
                                                                htmlFor="plan-expiry-date"
                                                                className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                            >
                                                                Plan Expiry Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control radius-8"
                                                                id="plan-expiry-date"
                                                                placeholder="Enter Plan Expiry Date"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-end gap-3">
                                                    <button type="reset" className="btn btn-outline-secondary">
                                                        Discard Changes
                                                    </button>
                                                    <button type="submit" className="btn btn-primary">
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="pills-change-passwork"
                                            role="tabpanel"
                                            aria-labelledby="pills-change-passwork-tab"
                                            tabIndex={0}
                                        >
                                            <div className="mb-20">
                                                <label
                                                    htmlFor="your-password"
                                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                >
                                                    New Password <span className="text-danger-600">*</span>
                                                </label>
                                                <div className="position-relative">
                                                    <input
                                                        type="password"
                                                        className="form-control radius-8"
                                                        id="your-password"
                                                        placeholder="Enter New Password*"
                                                    />
                                                    <span
                                                        className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                                                        data-toggle="#your-password"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-20">
                                                <label
                                                    htmlFor="confirm-password"
                                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                >
                                                    Confirm Password <span className="text-danger-600">*</span>
                                                </label>
                                                <div className="position-relative">
                                                    <input
                                                        type="password"
                                                        className="form-control radius-8"
                                                        id="confirm-password"
                                                        placeholder="Confirm Password*"
                                                    />
                                                    <span
                                                        className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                                                        data-toggle="#confirm-password"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="pills-notification"
                                            role="tabpanel"
                                            aria-labelledby="pills-notification-tab"
                                            tabIndex={0}
                                        >
                                            <div className="form-switch switch-primary py-12 px-16 border radius-8 position-relative mb-16">
                                                <label
                                                    htmlFor="companzNew"
                                                    className="position-absolute w-100 h-100 start-0 top-0"
                                                />
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <span className="form-check-label line-height-1 fw-medium text-secondary-light">
                                                        Company News
                                                    </span>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="companzNew"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-switch switch-primary py-12 px-16 border radius-8 position-relative mb-16">
                                                <label
                                                    htmlFor="pushNotifcation"
                                                    className="position-absolute w-100 h-100 start-0 top-0"
                                                />
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <span className="form-check-label line-height-1 fw-medium text-secondary-light">
                                                        Push Notification
                                                    </span>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="pushNotifcation"
                                                        defaultChecked
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-switch switch-primary py-12 px-16 border radius-8 position-relative mb-16">
                                                <label
                                                    htmlFor="weeklyLetters"
                                                    className="position-absolute w-100 h-100 start-0 top-0"
                                                />
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <span className="form-check-label line-height-1 fw-medium text-secondary-light">
                                                        Weekly News Letters
                                                    </span>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="weeklyLetters"
                                                        defaultChecked
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-switch switch-primary py-12 px-16 border radius-8 position-relative mb-16">
                                                <label
                                                    htmlFor="meetUp"
                                                    className="position-absolute w-100 h-100 start-0 top-0"
                                                />
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <span className="form-check-label line-height-1 fw-medium text-secondary-light">
                                                        Meetups Near you
                                                    </span>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="meetUp"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-switch switch-primary py-12 px-16 border radius-8 position-relative mb-16">
                                                <label
                                                    htmlFor="orderNotification"
                                                    className="position-absolute w-100 h-100 start-0 top-0"
                                                />
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <span className="form-check-label line-height-1 fw-medium text-secondary-light">
                                                        Orders Notifications
                                                    </span>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="orderNotification"
                                                        defaultChecked
                                                    />
                                                </div>
                                            </div>
                                        </div>
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
