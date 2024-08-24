import React from 'react'
import { Icon } from '@iconify/react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

function AdminHome() {
    return (
        <div>
            <>
                <Sidebar />
                <main className="dashboard-main">
                    <Header />
                    <div className="dashboard-main-body">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                            <h6 className="fw-semibold mb-0">Dashboard</h6>
                            <ul className="d-flex align-items-center gap-2">
                                <li className="fw-medium">
                                    <a
                                        href="index.html"
                                        className="d-flex align-items-center gap-1 hover-text-primary"
                                    >
                                        <Icon
                                            icon="solar:home-smile-angle-outline"
                                            className="icon text-lg"
                                        />
                                        Dashboard
                                    </a>
                                </li>
                                <li>-</li>
                                <li className="fw-medium">CRM</li>
                            </ul>
                        </div>
                        <div className="row gy-4">
                            <div className="col-xxl-8">
                                <div className="row gy-4">
                                    <div className="col-xxl-4 col-sm-6">
                                        <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-1">
                                            <div className="card-body p-0">
                                                <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="mb-0 w-48-px h-48-px bg-primary-600 flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0">
                                                            <Icon
                                                                icon="mingcute:user-follow-fill"
                                                                className="icon"
                                                            />
                                                        </span>
                                                        <div>
                                                            <span className="mb-2 fw-medium text-secondary-light text-sm">
                                                                New Users
                                                            </span>
                                                            <h6 className="fw-semibold">15,000</h6>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="new-user-chart"
                                                        className="remove-tooltip-title rounded-tooltip-value"
                                                    />
                                                </div>
                                                <p className="text-sm mb-0">
                                                    Increase by{" "}
                                                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                                                        +200
                                                    </span>{" "}
                                                    this week
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-sm-6">
                                        <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-2">
                                            <div className="card-body p-0">
                                                <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="mb-0 w-48-px h-48-px bg-success-main flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6">
                                                            <Icon
                                                                icon="mingcute:user-follow-fill"
                                                                className="icon"
                                                            />
                                                        </span>
                                                        <div>
                                                            <span className="mb-2 fw-medium text-secondary-light text-sm">
                                                                Active Users
                                                            </span>
                                                            <h6 className="fw-semibold">8,000</h6>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="active-user-chart"
                                                        className="remove-tooltip-title rounded-tooltip-value"
                                                    />
                                                </div>
                                                <p className="text-sm mb-0">
                                                    Increase by{" "}
                                                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                                                        +200
                                                    </span>{" "}
                                                    this week
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-sm-6">
                                        <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-3">
                                            <div className="card-body p-0">
                                                <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="mb-0 w-48-px h-48-px bg-yellow text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                                                            <Icon
                                                                icon="iconamoon:discount-fill"
                                                                className="icon"
                                                            />
                                                        </span>
                                                        <div>
                                                            <span className="mb-2 fw-medium text-secondary-light text-sm">
                                                                Total Sales
                                                            </span>
                                                            <h6 className="fw-semibold">$5,00,000</h6>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="total-sales-chart"
                                                        className="remove-tooltip-title rounded-tooltip-value"
                                                    />
                                                </div>
                                                <p className="text-sm mb-0">
                                                    Increase by{" "}
                                                    <span className="bg-danger-focus px-1 rounded-2 fw-medium text-danger-main text-sm">
                                                        -$10k
                                                    </span>{" "}
                                                    this week
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-sm-6">
                                        <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-4">
                                            <div className="card-body p-0">
                                                <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="mb-0 w-48-px h-48-px bg-purple text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                                                            <Icon
                                                                icon="mdi:message-text"
                                                                className="icon"
                                                            />
                                                        </span>
                                                        <div>
                                                            <span className="mb-2 fw-medium text-secondary-light text-sm">
                                                                Conversion
                                                            </span>
                                                            <h6 className="fw-semibold">25%</h6>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="conversion-user-chart"
                                                        className="remove-tooltip-title rounded-tooltip-value"
                                                    />
                                                </div>
                                                <p className="text-sm mb-0">
                                                    Increase by{" "}
                                                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                                                        +5%
                                                    </span>{" "}
                                                    this week
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-sm-6">
                                        <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-5">
                                            <div className="card-body p-0">
                                                <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="mb-0 w-48-px h-48-px bg-pink text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                                                            <Icon icon="mdi:leads" className="icon" />
                                                        </span>
                                                        <div>
                                                            <span className="mb-2 fw-medium text-secondary-light text-sm">
                                                                Leads
                                                            </span>
                                                            <h6 className="fw-semibold">250</h6>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="leads-chart"
                                                        className="remove-tooltip-title rounded-tooltip-value"
                                                    />
                                                </div>
                                                <p className="text-sm mb-0">
                                                    Increase by{" "}
                                                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                                                        +20
                                                    </span>{" "}
                                                    this week
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-sm-6">
                                        <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-6">
                                            <div className="card-body p-0">
                                                <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="mb-0 w-48-px h-48-px bg-cyan text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                                                            <Icon
                                                                icon="streamline:bag-dollar-solid"
                                                                className="icon"
                                                            />
                                                        </span>
                                                        <div>
                                                            <span className="mb-2 fw-medium text-secondary-light text-sm">
                                                                Total Profit
                                                            </span>
                                                            <h6 className="fw-semibold">$3,00,700</h6>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="total-profit-chart"
                                                        className="remove-tooltip-title rounded-tooltip-value"
                                                    />
                                                </div>
                                                <p className="text-sm mb-0">
                                                    Increase by{" "}
                                                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                                                        +$15k
                                                    </span>{" "}
                                                    this week
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Revenue Growth start */}
                            <div className="col-xxl-4">
                                <div className="card h-100 radius-8 border">
                                    <div className="card-body p-24">
                                        <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                                            <div>
                                                <h6 className="mb-2 fw-bold text-lg">Revenue Growth</h6>
                                                <span className="text-sm fw-medium text-secondary-light">
                                                    Weekly Report
                                                </span>
                                            </div>
                                            <div className="text-end">
                                                <h6 className="mb-2 fw-bold text-lg">$50,000.00</h6>
                                                <span className="bg-success-focus ps-12 pe-12 pt-2 pb-2 rounded-2 fw-medium text-success-main text-sm">
                                                    $10k
                                                </span>
                                            </div>
                                        </div>
                                        <div id="revenue-chart" className="mt-28" />
                                    </div>
                                </div>
                            </div>
                            {/* Revenue Growth End */}
                            {/* Earning Static start */}
                            {/* <div className="col-xxl-8">
                                <div className="card h-100 radius-8 border-0">
                                    <div className="card-body p-24">
                                        <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                                            <div>
                                                <h6 className="mb-2 fw-bold text-lg">Earning Statistic</h6>
                                                <span className="text-sm fw-medium text-secondary-light">
                                                    Yearly earning overview
                                                </span>
                                            </div>
                                            <div className="">
                                                <select className="form-select form-select-sm w-auto bg-base border text-secondary-light">
                                                    <option>Yearly</option>
                                                    <option>Monthly</option>
                                                    <option>Weekly</option>
                                                    <option>Today</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mt-20 d-flex justify-content-center flex-wrap gap-3">
                                            <div className="d-inline-flex align-items-center gap-2 p-2 radius-8 border pe-36 br-hover-primary group-item">
                                                <span className="bg-neutral-100 w-44-px h-44-px text-xxl radius-8 d-flex justify-content-center align-items-center text-secondary-light group-hover:bg-primary-600 group-hover:text-white">
                                                    <Icon
                                                        icon="fluent:cart-16-filled"
                                                        className="icon"
                                                    />
                                                </span>
                                                <div>
                                                    <span className="text-secondary-light text-sm fw-medium">
                                                        Sales
                                                    </span>
                                                    <h6 className="text-md fw-semibold mb-0">$200k</h6>
                                                </div>
                                            </div>
                                            <div className="d-inline-flex align-items-center gap-2 p-2 radius-8 border pe-36 br-hover-primary group-item">
                                                <span className="bg-neutral-100 w-44-px h-44-px text-xxl radius-8 d-flex justify-content-center align-items-center text-secondary-light group-hover:bg-primary-600 group-hover:text-white">
                                                    <Icon icon="uis:chart" className="icon" />
                                                </span>
                                                <div>
                                                    <span className="text-secondary-light text-sm fw-medium">
                                                        Income
                                                    </span>
                                                    <h6 className="text-md fw-semibold mb-0">$200k</h6>
                                                </div>
                                            </div>
                                            <div className="d-inline-flex align-items-center gap-2 p-2 radius-8 border pe-36 br-hover-primary group-item">
                                                <span className="bg-neutral-100 w-44-px h-44-px text-xxl radius-8 d-flex justify-content-center align-items-center text-secondary-light group-hover:bg-primary-600 group-hover:text-white">
                                                    <Icon
                                                        icon="ph:arrow-fat-up-fill"
                                                        className="icon"
                                                    />
                                                </span>
                                                <div>
                                                    <span className="text-secondary-light text-sm fw-medium">
                                                        Profit
                                                    </span>
                                                    <h6 className="text-md fw-semibold mb-0">$200k</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="barChart" />
                                    </div>
                                </div>
                            </div> */}
                            {/* Earning Static End */}
                            {/* Campaign Static start */}
                            {/* <div className="col-xxl-4">
                                <div className="row gy-4">
                                    <div className="col-xxl-12 col-sm-6">
                                        <div className="card h-100 radius-8 border-0">
                                            <div className="card-body p-24">
                                                <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                                                    <h6 className="mb-2 fw-bold text-lg">Campaigns</h6>
                                                    <div className="">
                                                        <select className="form-select form-select-sm w-auto bg-base border text-secondary-light">
                                                            <option>Yearly</option>
                                                            <option>Monthly</option>
                                                            <option>Weekly</option>
                                                            <option>Today</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <div className="d-flex align-items-center justify-content-between gap-3 mb-12">
                                                        <div className="d-flex align-items-center">
                                                            <span className="text-xxl line-height-1 d-flex align-content-center flex-shrink-0 text-orange">
                                                                <Icon
                                                                    icon="majesticons:mail"
                                                                    className="icon"
                                                                />
                                                            </span>
                                                            <span className="text-primary-light fw-medium text-sm ps-12">
                                                                Email
                                                            </span>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2 w-100">
                                                            <div className="w-100 max-w-66 ms-auto">
                                                                <div
                                                                    className="progress progress-sm rounded-pill"
                                                                    role="progressbar"
                                                                    aria-label="Success example"
                                                                    aria-valuenow={25}
                                                                    aria-valuemin={0}
                                                                    aria-valuemax={100}
                                                                >
                                                                    <div
                                                                        className="progress-bar bg-orange rounded-pill"
                                                                        style={{ width: "80%" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <span className="text-secondary-light font-xs fw-semibold">
                                                                80%
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between gap-3 mb-12">
                                                        <div className="d-flex align-items-center">
                                                            <span className="text-xxl line-height-1 d-flex align-content-center flex-shrink-0 text-success-main">
                                                                <Icon
                                                                    icon="eva:globe-2-fill"
                                                                    className="icon"
                                                                />
                                                            </span>
                                                            <span className="text-primary-light fw-medium text-sm ps-12">
                                                                Website
                                                            </span>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2 w-100">
                                                            <div className="w-100 max-w-66 ms-auto">
                                                                <div
                                                                    className="progress progress-sm rounded-pill"
                                                                    role="progressbar"
                                                                    aria-label="Success example"
                                                                    aria-valuenow={25}
                                                                    aria-valuemin={0}
                                                                    aria-valuemax={100}
                                                                >
                                                                    <div
                                                                        className="progress-bar bg-success-main rounded-pill"
                                                                        style={{ width: "60%" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <span className="text-secondary-light font-xs fw-semibold">
                                                                60%
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between gap-3 mb-12">
                                                        <div className="d-flex align-items-center">
                                                            <span className="text-xxl line-height-1 d-flex align-content-center flex-shrink-0 text-info-main">
                                                                <Icon
                                                                    icon="fa6-brands:square-facebook"
                                                                    className="icon"
                                                                />
                                                            </span>
                                                            <span className="text-primary-light fw-medium text-sm ps-12">
                                                                Facebook
                                                            </span>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2 w-100">
                                                            <div className="w-100 max-w-66 ms-auto">
                                                                <div
                                                                    className="progress progress-sm rounded-pill"
                                                                    role="progressbar"
                                                                    aria-label="Success example"
                                                                    aria-valuenow={25}
                                                                    aria-valuemin={0}
                                                                    aria-valuemax={100}
                                                                >
                                                                    <div
                                                                        className="progress-bar bg-info-main rounded-pill"
                                                                        style={{ width: "49%" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <span className="text-secondary-light font-xs fw-semibold">
                                                                49%
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                                        <div className="d-flex align-items-center">
                                                            <span className="text-xxl line-height-1 d-flex align-content-center flex-shrink-0 text-indigo">
                                                                <Icon
                                                                    icon="fluent:location-off-20-filled"
                                                                    className="icon"
                                                                />
                                                            </span>
                                                            <span className="text-primary-light fw-medium text-sm ps-12">
                                                                Email
                                                            </span>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2 w-100">
                                                            <div className="w-100 max-w-66 ms-auto">
                                                                <div
                                                                    className="progress progress-sm rounded-pill"
                                                                    role="progressbar"
                                                                    aria-label="Success example"
                                                                    aria-valuenow={25}
                                                                    aria-valuemin={0}
                                                                    aria-valuemax={100}
                                                                >
                                                                    <div
                                                                        className="progress-bar bg-indigo rounded-pill"
                                                                        style={{ width: "70%" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <span className="text-secondary-light font-xs fw-semibold">
                                                                70%
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-12 col-sm-6">
                                        <div className="card h-100 radius-8 border-0 overflow-hidden">
                                            <div className="card-body p-24">
                                                <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                                                    <h6 className="mb-2 fw-bold text-lg">Customer Overview</h6>
                                                    <div className="">
                                                        <select className="form-select form-select-sm w-auto bg-base border text-secondary-light">
                                                            <option>Yearly</option>
                                                            <option>Monthly</option>
                                                            <option>Weekly</option>
                                                            <option>Today</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-wrap align-items-center mt-3">
                                                    <ul className="flex-shrink-0">
                                                        <li className="d-flex align-items-center gap-2 mb-28">
                                                            <span className="w-12-px h-12-px rounded-circle bg-success-main" />
                                                            <span className="text-secondary-light text-sm fw-medium">
                                                                Total: 500
                                                            </span>
                                                        </li>
                                                        <li className="d-flex align-items-center gap-2 mb-28">
                                                            <span className="w-12-px h-12-px rounded-circle bg-warning-main" />
                                                            <span className="text-secondary-light text-sm fw-medium">
                                                                New: 500
                                                            </span>
                                                        </li>
                                                        <li className="d-flex align-items-center gap-2">
                                                            <span className="w-12-px h-12-px rounded-circle bg-primary-600" />
                                                            <span className="text-secondary-light text-sm fw-medium">
                                                                Active: 1500
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    <div
                                                        id="donutChart"
                                                        className="flex-grow-1 apexcharts-tooltip-z-none title-style circle-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* Campaign Static End */}
                            {/* Client Payment Status Start */}
                            {/* <div className="col-xxl-4 col-sm-6">
                                <div className="card h-100 radius-8 border-0">
                                    <div className="card-body p-24">
                                        <h6 className="mb-2 fw-bold text-lg">Client Payment Status</h6>
                                        <span className="text-sm fw-medium text-secondary-light">
                                            Weekly Report
                                        </span>
                                        <ul className="d-flex flex-wrap align-items-center justify-content-center mt-32">
                                            <li className="d-flex align-items-center gap-2 me-28">
                                                <span className="w-12-px h-12-px rounded-circle bg-success-main" />
                                                <span className="text-secondary-light text-sm fw-medium">
                                                    Paid: 500
                                                </span>
                                            </li>
                                            <li className="d-flex align-items-center gap-2 me-28">
                                                <span className="w-12-px h-12-px rounded-circle bg-info-main" />
                                                <span className="text-secondary-light text-sm fw-medium">
                                                    Pending: 500
                                                </span>
                                            </li>
                                            <li className="d-flex align-items-center gap-2">
                                                <span className="w-12-px h-12-px rounded-circle bg-warning-main" />
                                                <span className="text-secondary-light text-sm fw-medium">
                                                    Overdue: 1500
                                                </span>
                                            </li>
                                        </ul>
                                        <div className="mt-40">
                                            <div id="paymentStatusChart" className="margin-16-minus" />
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* Client Payment Status End */}
                            {/* Country Status Start */}
                            {/* <div className="col-xxl-4 col-sm-6">
                                <div className="card radius-8 border-0">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                                            <h6 className="mb-2 fw-bold text-lg">Countries Status</h6>
                                            <div className="">
                                                <select className="form-select form-select-sm w-auto bg-base border text-secondary-light">
                                                    <option>Yearly</option>
                                                    <option>Monthly</option>
                                                    <option>Weekly</option>
                                                    <option>Today</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="world-map" />
                                    <div className="card-body p-24 max-h-266-px scroll-sm overflow-y-auto">
                                        <div className="">
                                            <div className="d-flex align-items-center justify-content-between gap-3 mb-3 pb-2">
                                                <div className="d-flex align-items-center w-100">
                                                    <img
                                                        src="/assets/assets/images/flags/flag1.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-sm mb-0">USA</h6>
                                                        <span className="text-xs text-secondary-light fw-medium">
                                                            1,240 Users
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 w-100">
                                                    <div className="w-100 max-w-66 ms-auto">
                                                        <div
                                                            className="progress progress-sm rounded-pill"
                                                            role="progressbar"
                                                            aria-label="Success example"
                                                            aria-valuenow={25}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        >
                                                            <div
                                                                className="progress-bar bg-primary-600 rounded-pill"
                                                                style={{ width: "80%" }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <span className="text-secondary-light font-xs fw-semibold">
                                                        80%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between gap-3 mb-3 pb-2">
                                                <div className="d-flex align-items-center w-100">
                                                    <img
                                                        src="/assets/assets/images/flags/flag2.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-sm mb-0">Japan</h6>
                                                        <span className="text-xs text-secondary-light fw-medium">
                                                            1,240 Users
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 w-100">
                                                    <div className="w-100 max-w-66 ms-auto">
                                                        <div
                                                            className="progress progress-sm rounded-pill"
                                                            role="progressbar"
                                                            aria-label="Success example"
                                                            aria-valuenow={25}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        >
                                                            <div
                                                                className="progress-bar bg-orange rounded-pill"
                                                                style={{ width: "60%" }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <span className="text-secondary-light font-xs fw-semibold">
                                                        60%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between gap-3 mb-3 pb-2">
                                                <div className="d-flex align-items-center w-100">
                                                    <img
                                                        src="/assets/assets/images/flags/flag3.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-sm mb-0">France</h6>
                                                        <span className="text-xs text-secondary-light fw-medium">
                                                            1,240 Users
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 w-100">
                                                    <div className="w-100 max-w-66 ms-auto">
                                                        <div
                                                            className="progress progress-sm rounded-pill"
                                                            role="progressbar"
                                                            aria-label="Success example"
                                                            aria-valuenow={25}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        >
                                                            <div
                                                                className="progress-bar bg-yellow rounded-pill"
                                                                style={{ width: "49%" }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <span className="text-secondary-light font-xs fw-semibold">
                                                        49%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between gap-3">
                                                <div className="d-flex align-items-center w-100">
                                                    <img
                                                        src="/assets/assets/images/flags/flag4.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-sm mb-0">Germany</h6>
                                                        <span className="text-xs text-secondary-light fw-medium">
                                                            1,240 Users
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 w-100">
                                                    <div className="w-100 max-w-66 ms-auto">
                                                        <div
                                                            className="progress progress-sm rounded-pill"
                                                            role="progressbar"
                                                            aria-label="Success example"
                                                            aria-valuenow={25}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        >
                                                            <div
                                                                className="progress-bar bg-success-main rounded-pill"
                                                                style={{ width: "100%" }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <span className="text-secondary-light font-xs fw-semibold">
                                                        100%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* Country Status End */}
                            {/* Top performance Start */}
                            {/* <div className="col-xxl-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                                            <h6 className="mb-2 fw-bold text-lg mb-0">Top Performer</h6>
                                            <a
                                                href="javascript:void(0)"
                                                className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
                                            >
                                                View All
                                                <Icon
                                                    icon="solar:alt-arrow-right-linear"
                                                    className="icon"
                                                />
                                            </a>
                                        </div>
                                        <div className="mt-32">
                                            <div className="d-flex align-items-center justify-content-between gap-3 mb-32">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src="/assets/assets/images/users/user1.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-md mb-0">Dianne Russell</h6>
                                                        <span className="text-sm text-secondary-light fw-medium">
                                                            Agent ID: 36254
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-primary-light text-md fw-medium">
                                                    60/80
                                                </span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between gap-3 mb-32">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src="/assets/assets/images/users/user2.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-md mb-0">Wade Warren</h6>
                                                        <span className="text-sm text-secondary-light fw-medium">
                                                            Agent ID: 36254
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-primary-light text-md fw-medium">
                                                    50/70
                                                </span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between gap-3 mb-32">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src="/assets/assets/images/users/user3.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-md mb-0">Albert Flores</h6>
                                                        <span className="text-sm text-secondary-light fw-medium">
                                                            Agent ID: 36254
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-primary-light text-md fw-medium">
                                                    55/75
                                                </span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between gap-3 mb-32">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src="/assets/assets/images/users/user4.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-md mb-0">Bessie Cooper</h6>
                                                        <span className="text-sm text-secondary-light fw-medium">
                                                            Agent ID: 36254
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-primary-light text-md fw-medium">
                                                    60/80
                                                </span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between gap-3 mb-32">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src="/assets/assets/images/users/user5.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-md mb-0">Arlene McCoy</h6>
                                                        <span className="text-sm text-secondary-light fw-medium">
                                                            Agent ID: 36254
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-primary-light text-md fw-medium">
                                                    55/75
                                                </span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between gap-3">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src="/assets/assets/images/users/user1.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-md mb-0">Arlene McCoy</h6>
                                                        <span className="text-sm text-secondary-light fw-medium">
                                                            Agent ID: 36254
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-primary-light text-md fw-medium">
                                                    50/70
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* Top performance End */}
                            {/* Latest Performance Start */}
                            {/* <div className="col-xxl-6">
                                <div className="card h-100">
                                    <div className="card-header border-bottom bg-base ps-0 py-0 pe-24 d-flex align-items-center justify-content-between">
                                        <ul
                                            className="nav bordered-tab nav-pills mb-0"
                                            id="pills-tab"
                                            role="tablist"
                                        >
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className="nav-link active"
                                                    id="pills-to-do-list-tab"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#pills-to-do-list"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="pills-to-do-list"
                                                    aria-selected="true"
                                                >
                                                    All Item
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className="nav-link"
                                                    id="pills-recent-leads-tab"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#pills-recent-leads"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="pills-recent-leads"
                                                    aria-selected="false"
                                                    tabIndex={-1}
                                                >
                                                    Best Match
                                                </button>
                                            </li>
                                        </ul>
                                        <a
                                            href="javascript:void(0)"
                                            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
                                        >
                                            View All
                                            <Icon
                                                icon="solar:alt-arrow-right-linear"
                                                className="icon"
                                            />
                                        </a>
                                    </div>
                                    <div className="card-body p-24">
                                        <div className="tab-content" id="pills-tabContent">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-to-do-list"
                                                role="tabpanel"
                                                aria-labelledby="pills-to-do-list-tab"
                                                tabIndex={0}
                                            >
                                                <div className="table-responsive scroll-sm">
                                                    <table className="table bordered-table mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Task Name </th>
                                                                <th scope="col">Assigned To </th>
                                                                <th scope="col">Due Date</th>
                                                                <th scope="col">Status</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div>
                                                                        <span className="text-md d-block line-height-1 fw-medium text-primary-light text-w-200-px">
                                                                            Hotel Management System
                                                                        </span>
                                                                        <span className="text-sm d-block fw-normal text-secondary-light">
                                                                            #5632
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>Kathryn Murphy</td>
                                                                <td>27 Mar 2024</td>
                                                                <td>
                                                                    {" "}
                                                                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                        Active
                                                                    </span>
                                                                </td>
                                                                <td className="text-center text-neutral-700 text-xl">
                                                                    <div className="dropdown">
                                                                        <button
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <Icon
                                                                                icon="ph:dots-three-outline-vertical-fill"
                                                                                className="icon"
                                                                            />
                                                                        </button>
                                                                        <ul className="dropdown-menu p-12 border bg-base shadow">
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Another action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Something else here
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div>
                                                                        <span className="text-md d-block line-height-1 fw-medium text-primary-light text-w-200-px">
                                                                            Hotel Management System
                                                                        </span>
                                                                        <span className="text-sm d-block fw-normal text-secondary-light">
                                                                            #5632
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>Darlene Robertson</td>
                                                                <td>27 Mar 2024</td>
                                                                <td>
                                                                    {" "}
                                                                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                        Active
                                                                    </span>
                                                                </td>
                                                                <td className="text-center text-neutral-700 text-xl">
                                                                    <div className="dropdown">
                                                                        <button
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <Icon
                                                                                icon="ph:dots-three-outline-vertical-fill"
                                                                                className="icon"
                                                                            />
                                                                        </button>
                                                                        <ul className="dropdown-menu p-12 border bg-base shadow">
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Another action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Something else here
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div>
                                                                        <span className="text-md d-block line-height-1 fw-medium text-primary-light text-w-200-px">
                                                                            Hotel Management System
                                                                        </span>
                                                                        <span className="text-sm d-block fw-normal text-secondary-light">
                                                                            #5632
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>Courtney Henry</td>
                                                                <td>27 Mar 2024</td>
                                                                <td>
                                                                    {" "}
                                                                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                        Active
                                                                    </span>
                                                                </td>
                                                                <td className="text-center text-neutral-700 text-xl">
                                                                    <div className="dropdown">
                                                                        <button
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <Icon
                                                                                icon="ph:dots-three-outline-vertical-fill"
                                                                                className="icon"
                                                                            />
                                                                        </button>
                                                                        <ul className="dropdown-menu p-12 border bg-base shadow">
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Another action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Something else here
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div>
                                                                        <span className="text-md d-block line-height-1 fw-medium text-primary-light text-w-200-px">
                                                                            Hotel Management System
                                                                        </span>
                                                                        <span className="text-sm d-block fw-normal text-secondary-light">
                                                                            #5632
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>Jenny Wilson</td>
                                                                <td>27 Mar 2024</td>
                                                                <td>
                                                                    {" "}
                                                                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                        Active
                                                                    </span>
                                                                </td>
                                                                <td className="text-center text-neutral-700 text-xl">
                                                                    <div className="dropdown">
                                                                        <button
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <Icon
                                                                                icon="ph:dots-three-outline-vertical-fill"
                                                                                className="icon"
                                                                            />
                                                                        </button>
                                                                        <ul className="dropdown-menu p-12 border bg-base shadow">
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Another action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Something else here
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div>
                                                                        <span className="text-md d-block line-height-1 fw-medium text-primary-light text-w-200-px">
                                                                            Hotel Management System
                                                                        </span>
                                                                        <span className="text-sm d-block fw-normal text-secondary-light">
                                                                            #5632
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>Leslie Alexander</td>
                                                                <td>27 Mar 2024</td>
                                                                <td>
                                                                    {" "}
                                                                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                        Active
                                                                    </span>
                                                                </td>
                                                                <td className="text-center text-neutral-700 text-xl">
                                                                    <div className="dropdown">
                                                                        <button
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <Icon
                                                                                icon="ph:dots-three-outline-vertical-fill"
                                                                                className="icon"
                                                                            />
                                                                        </button>
                                                                        <ul className="dropdown-menu p-12 border bg-base shadow">
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Another action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Something else here
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div
                                                className="tab-pane fade"
                                                id="pills-recent-leads"
                                                role="tabpanel"
                                                aria-labelledby="pills-recent-leads-tab"
                                                tabIndex={0}
                                            >
                                                <div className="table-responsive scroll-sm">
                                                    <table className="table bordered-table mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Task Name </th>
                                                                <th scope="col">Assigned To </th>
                                                                <th scope="col">Due Date</th>
                                                                <th scope="col">Status</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div>
                                                                        <span className="text-md d-block line-height-1 fw-medium text-primary-light text-w-200-px">
                                                                            Hotel Management System
                                                                        </span>
                                                                        <span className="text-sm d-block fw-normal text-secondary-light">
                                                                            #5632
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>Kathryn Murphy</td>
                                                                <td>27 Mar 2024</td>
                                                                <td>
                                                                    {" "}
                                                                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                        Active
                                                                    </span>
                                                                </td>
                                                                <td className="text-center text-neutral-700 text-xl">
                                                                    <div className="dropdown">
                                                                        <button
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <Icon
                                                                                icon="ph:dots-three-outline-vertical-fill"
                                                                                className="icon"
                                                                            />
                                                                        </button>
                                                                        <ul className="dropdown-menu p-12 border bg-base shadow">
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Another action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Something else here
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div>
                                                                        <span className="text-md d-block line-height-1 fw-medium text-primary-light text-w-200-px">
                                                                            Hotel Management System
                                                                        </span>
                                                                        <span className="text-sm d-block fw-normal text-secondary-light">
                                                                            #5632
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>Darlene Robertson</td>
                                                                <td>27 Mar 2024</td>
                                                                <td>
                                                                    {" "}
                                                                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                        Active
                                                                    </span>
                                                                </td>
                                                                <td className="text-center text-neutral-700 text-xl">
                                                                    <div className="dropdown">
                                                                        <button
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <Icon
                                                                                icon="ph:dots-three-outline-vertical-fill"
                                                                                className="icon"
                                                                            />
                                                                        </button>
                                                                        <ul className="dropdown-menu p-12 border bg-base shadow">
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Another action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Something else here
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div>
                                                                        <span className="text-md d-block line-height-1 fw-medium text-primary-light text-w-200-px">
                                                                            Hotel Management System
                                                                        </span>
                                                                        <span className="text-sm d-block fw-normal text-secondary-light">
                                                                            #5632
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>Courtney Henry</td>
                                                                <td>27 Mar 2024</td>
                                                                <td>
                                                                    {" "}
                                                                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                        Active
                                                                    </span>
                                                                </td>
                                                                <td className="text-center text-neutral-700 text-xl">
                                                                    <div className="dropdown">
                                                                        <button
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <Icon
                                                                                icon="ph:dots-three-outline-vertical-fill"
                                                                                className="icon"
                                                                            />
                                                                        </button>
                                                                        <ul className="dropdown-menu p-12 border bg-base shadow">
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Another action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Something else here
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div>
                                                                        <span className="text-md d-block line-height-1 fw-medium text-primary-light text-w-200-px">
                                                                            Hotel Management System
                                                                        </span>
                                                                        <span className="text-sm d-block fw-normal text-secondary-light">
                                                                            #5632
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>Jenny Wilson</td>
                                                                <td>27 Mar 2024</td>
                                                                <td>
                                                                    {" "}
                                                                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                        Active
                                                                    </span>
                                                                </td>
                                                                <td className="text-center text-neutral-700 text-xl">
                                                                    <div className="dropdown">
                                                                        <button
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <Icon
                                                                                icon="ph:dots-three-outline-vertical-fill"
                                                                                className="icon"
                                                                            />
                                                                        </button>
                                                                        <ul className="dropdown-menu p-12 border bg-base shadow">
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Another action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Something else here
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div>
                                                                        <span className="text-md d-block line-height-1 fw-medium text-primary-light text-w-200-px">
                                                                            Hotel Management System
                                                                        </span>
                                                                        <span className="text-sm d-block fw-normal text-secondary-light">
                                                                            #5632
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>Leslie Alexander</td>
                                                                <td>27 Mar 2024</td>
                                                                <td>
                                                                    {" "}
                                                                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                        Active
                                                                    </span>
                                                                </td>
                                                                <td className="text-center text-neutral-700 text-xl">
                                                                    <div className="dropdown">
                                                                        <button
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <Icon
                                                                                icon="ph:dots-three-outline-vertical-fill"
                                                                                className="icon"
                                                                            />
                                                                        </button>
                                                                        <ul className="dropdown-menu p-12 border bg-base shadow">
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Another action
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                                                                    href="javascript:void(0)"
                                                                                >
                                                                                    Something else here
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="col-xxl-6">
                                <div className="card h-100">
                                    <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                                        <h6 className="text-lg fw-semibold mb-0">Last Transaction</h6>
                                        <a
                                            href="javascript:void(0)"
                                            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
                                        >
                                            View All
                                            <Icon
                                                icon="solar:alt-arrow-right-linear"
                                                className="icon"
                                            />
                                        </a>
                                    </div>
                                    <div className="card-body p-24">
                                        <div className="table-responsive scroll-sm">
                                            <table className="table bordered-table mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Transaction ID</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>5986124445445</td>
                                                        <td>27 Mar 2024</td>
                                                        <td>
                                                            {" "}
                                                            <span className="bg-warning-focus text-warning-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                Pending
                                                            </span>
                                                        </td>
                                                        <td>$20,000.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5986124445445</td>
                                                        <td>27 Mar 2024</td>
                                                        <td>
                                                            {" "}
                                                            <span className="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                Rejected
                                                            </span>
                                                        </td>
                                                        <td>$20,000.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5986124445445</td>
                                                        <td>27 Mar 2024</td>
                                                        <td>
                                                            {" "}
                                                            <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                Completed
                                                            </span>
                                                        </td>
                                                        <td>$20,000.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5986124445445</td>
                                                        <td>27 Mar 2024</td>
                                                        <td>
                                                            {" "}
                                                            <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                Completed
                                                            </span>
                                                        </td>
                                                        <td>$20,000.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5986124445445</td>
                                                        <td>27 Mar 2024</td>
                                                        <td>
                                                            {" "}
                                                            <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                                                Completed
                                                            </span>
                                                        </td>
                                                        <td>$20,000.00</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* Latest Performance End */}
                            <div className="card h-100 p-0 radius-12">
                                <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                                    <div className="d-flex align-items-center flex-wrap gap-3">
                                        <span className="text-md fw-medium text-secondary-light mb-0">
                                            Show
                                        </span>
                                        <select className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                        </select>
                                        <form className="navbar-search">
                                            <input
                                                type="text"
                                                className="bg-base h-40-px w-auto"
                                                name="search"
                                                placeholder="Search"
                                            />
                                            <Icon icon="ion:search-outline" className="icon" />
                                        </form>
                                        <select className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px">
                                            <option>Status</option>
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>
                                    </div>
                                    <a
                                        href="/admin/addUser"
                                        className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
                                    >
                                        <Icon
                                            icon="ic:baseline-plus"
                                            className="icon text-xl line-height-1"
                                        />
                                        Add New User
                                    </a>
                                </div>
                                <div className="card-body p-24">
                                    <div className="table-responsive scroll-sm">
                                        <table className="table bordered-table sm-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <div className="d-flex align-items-center gap-10">
                                                            <div className="form-check style-check d-flex align-items-center">
                                                                <input
                                                                    className="form-check-input radius-4 border input-form-dark"
                                                                    type="checkbox"
                                                                    name="checkbox"
                                                                    id="selectAll"
                                                                />
                                                            </div>
                                                            S.L
                                                        </div>
                                                    </th>
                                                    <th scope="col">Join Date</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Department</th>
                                                    <th scope="col">Designation</th>
                                                    <th scope="col" className="text-center">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="text-center">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-10">
                                                            <div className="form-check style-check d-flex align-items-center">
                                                                <input
                                                                    className="form-check-input radius-4 border border-neutral-400"
                                                                    type="checkbox"
                                                                    name="checkbox"
                                                                />
                                                            </div>
                                                            01
                                                        </div>
                                                    </td>
                                                    <td>25 Jan 2024</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src="/assets/assets/images/user-list/user-list1.png"
                                                                alt=""
                                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    Kathryn Murphy
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                                            osgoodwy@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>HR</td>
                                                    <td>Manager</td>
                                                    <td className="text-center">
                                                        <span className="bg-success-focus text-success-600 border border-success-main px-24 py-4 radius-4 fw-medium text-sm">
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                                            <button
                                                                type="button"
                                                                className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="majesticons:eye-line"
                                                                    className="icon text-xl"
                                                                />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon icon="lucide:edit" className="menu-icon" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="fluent:delete-24-regular"
                                                                    className="menu-icon"
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-10">
                                                            <div className="form-check style-check d-flex align-items-center">
                                                                <input
                                                                    className="form-check-input radius-4 border border-neutral-400"
                                                                    type="checkbox"
                                                                    name="checkbox"
                                                                />
                                                            </div>
                                                            02
                                                        </div>
                                                    </td>
                                                    <td>25 Jan 2024</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src="/assets/assets/images/user-list/user-list2.png"
                                                                alt=""
                                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    Annette Black
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                                            redaniel@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>Design</td>
                                                    <td>UI UX Designer</td>
                                                    <td className="text-center">
                                                        <span className="bg-neutral-200 text-neutral-600 border border-neutral-400 px-24 py-4 radius-4 fw-medium text-sm">
                                                            Inactive
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                                            <button
                                                                type="button"
                                                                className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="majesticons:eye-line"
                                                                    className="icon text-xl"
                                                                />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon icon="lucide:edit" className="menu-icon" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="fluent:delete-24-regular"
                                                                    className="menu-icon"
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-10">
                                                            <div className="form-check style-check d-flex align-items-center">
                                                                <input
                                                                    className="form-check-input radius-4 border border-neutral-400"
                                                                    type="checkbox"
                                                                    name="checkbox"
                                                                />
                                                            </div>
                                                            03
                                                        </div>
                                                    </td>
                                                    <td>10 Feb 2024</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src="/assets/assets/images/user-list/user-list3.png"
                                                                alt=""
                                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    Ronald Richards
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                                            seannand@mail.ru
                                                        </span>
                                                    </td>
                                                    <td>Design</td>
                                                    <td>UI UX Designer</td>
                                                    <td className="text-center">
                                                        <span className="bg-success-focus text-success-600 border border-success-main px-24 py-4 radius-4 fw-medium text-sm">
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                                            <button
                                                                type="button"
                                                                className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="majesticons:eye-line"
                                                                    className="icon text-xl"
                                                                />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon icon="lucide:edit" className="menu-icon" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="fluent:delete-24-regular"
                                                                    className="menu-icon"
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-10">
                                                            <div className="form-check style-check d-flex align-items-center">
                                                                <input
                                                                    className="form-check-input radius-4 border border-neutral-400"
                                                                    type="checkbox"
                                                                    name="checkbox"
                                                                />
                                                            </div>
                                                            04
                                                        </div>
                                                    </td>
                                                    <td>10 Feb 2024</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src="/assets/assets/images/user-list/user-list4.png"
                                                                alt=""
                                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    Eleanor Pena
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                                            miyokoto@mail.ru
                                                        </span>
                                                    </td>
                                                    <td>Design</td>
                                                    <td>UI UX Designer</td>
                                                    <td className="text-center">
                                                        <span className="bg-success-focus text-success-600 border border-success-main px-24 py-4 radius-4 fw-medium text-sm">
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                                            <button
                                                                type="button"
                                                                className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="majesticons:eye-line"
                                                                    className="icon text-xl"
                                                                />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon icon="lucide:edit" className="menu-icon" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="fluent:delete-24-regular"
                                                                    className="menu-icon"
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-10">
                                                            <div className="form-check style-check d-flex align-items-center">
                                                                <input
                                                                    className="form-check-input radius-4 border border-neutral-400"
                                                                    type="checkbox"
                                                                    name="checkbox"
                                                                />
                                                            </div>
                                                            05
                                                        </div>
                                                    </td>
                                                    <td>15 March 2024</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src="/assets/assets/images/user-list/user-list5.png"
                                                                alt=""
                                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    Leslie Alexander
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                                            icadahli@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>Design</td>
                                                    <td>UI UX Designer</td>
                                                    <td className="text-center">
                                                        <span className="bg-neutral-200 text-neutral-600 border border-neutral-400 px-24 py-4 radius-4 fw-medium text-sm">
                                                            Inactive
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                                            <button
                                                                type="button"
                                                                className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="majesticons:eye-line"
                                                                    className="icon text-xl"
                                                                />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon icon="lucide:edit" className="menu-icon" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="fluent:delete-24-regular"
                                                                    className="menu-icon"
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-10">
                                                            <div className="form-check style-check d-flex align-items-center">
                                                                <input
                                                                    className="form-check-input radius-4 border border-neutral-400"
                                                                    type="checkbox"
                                                                    name="checkbox"
                                                                />
                                                            </div>
                                                            06
                                                        </div>
                                                    </td>
                                                    <td>15 March 2024</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src="/assets/assets/images/user-list/user-list6.png"
                                                                alt=""
                                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    Albert Flores
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                                            warn@mail.ru
                                                        </span>
                                                    </td>
                                                    <td>Design</td>
                                                    <td>UI UX Designer</td>
                                                    <td className="text-center">
                                                        <span className="bg-success-focus text-success-600 border border-success-main px-24 py-4 radius-4 fw-medium text-sm">
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                                            <button
                                                                type="button"
                                                                className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="majesticons:eye-line"
                                                                    className="icon text-xl"
                                                                />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon icon="lucide:edit" className="menu-icon" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="fluent:delete-24-regular"
                                                                    className="menu-icon"
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-10">
                                                            <div className="form-check style-check d-flex align-items-center">
                                                                <input
                                                                    className="form-check-input radius-4 border border-neutral-400"
                                                                    type="checkbox"
                                                                    name="checkbox"
                                                                />
                                                            </div>
                                                            07
                                                        </div>
                                                    </td>
                                                    <td>27 April 2024</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src="/assets/assets/images/user-list/user-list7.png"
                                                                alt=""
                                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    Jacob Jones
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                                            zitka@mail.ru
                                                        </span>
                                                    </td>
                                                    <td>Development</td>
                                                    <td>Frontend developer</td>
                                                    <td className="text-center">
                                                        <span className="bg-success-focus text-success-600 border border-success-main px-24 py-4 radius-4 fw-medium text-sm">
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                                            <button
                                                                type="button"
                                                                className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="majesticons:eye-line"
                                                                    className="icon text-xl"
                                                                />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon icon="lucide:edit" className="menu-icon" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="fluent:delete-24-regular"
                                                                    className="menu-icon"
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-10">
                                                            <div className="form-check style-check d-flex align-items-center">
                                                                <input
                                                                    className="form-check-input radius-4 border border-neutral-400"
                                                                    type="checkbox"
                                                                    name="checkbox"
                                                                />
                                                            </div>
                                                            08
                                                        </div>
                                                    </td>
                                                    <td>25 Jan 2024</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src="/assets/assets/images/user-list/user-list8.png"
                                                                alt=""
                                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    Jerome Bell
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                                            igerrin@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>Development</td>
                                                    <td>Frontend developer</td>
                                                    <td className="text-center">
                                                        <span className="bg-neutral-200 text-neutral-600 border border-neutral-400 px-24 py-4 radius-4 fw-medium text-sm">
                                                            Inactive
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                                            <button
                                                                type="button"
                                                                className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="majesticons:eye-line"
                                                                    className="icon text-xl"
                                                                />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon icon="lucide:edit" className="menu-icon" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="fluent:delete-24-regular"
                                                                    className="menu-icon"
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-10">
                                                            <div className="form-check style-check d-flex align-items-center">
                                                                <input
                                                                    className="form-check-input radius-4 border border-neutral-400"
                                                                    type="checkbox"
                                                                    name="checkbox"
                                                                />
                                                            </div>
                                                            09
                                                        </div>
                                                    </td>
                                                    <td>30 April 2024</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src="/assets/assets/images/user-list/user-list2.png"
                                                                alt=""
                                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    Marvin McKinney
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                                            maka@yandex.ru
                                                        </span>
                                                    </td>
                                                    <td>Development</td>
                                                    <td>Frontend developer</td>
                                                    <td className="text-center">
                                                        <span className="bg-success-focus text-success-600 border border-success-main px-24 py-4 radius-4 fw-medium text-sm">
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                                            <button
                                                                type="button"
                                                                className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="majesticons:eye-line"
                                                                    className="icon text-xl"
                                                                />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon icon="lucide:edit" className="menu-icon" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="fluent:delete-24-regular"
                                                                    className="menu-icon"
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-10">
                                                            <div className="form-check style-check d-flex align-items-center">
                                                                <input
                                                                    className="form-check-input radius-4 border border-neutral-400"
                                                                    type="checkbox"
                                                                    name="checkbox"
                                                                />
                                                            </div>
                                                            10
                                                        </div>
                                                    </td>
                                                    <td>30 April 2024</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src="/assets/assets/images/user-list/user-list10.png"
                                                                alt=""
                                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    Cameron Williamson
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                                            danten@mail.ru
                                                        </span>
                                                    </td>
                                                    <td>Development</td>
                                                    <td>Frontend developer</td>
                                                    <td className="text-center">
                                                        <span className="bg-success-focus text-success-600 border border-success-main px-24 py-4 radius-4 fw-medium text-sm">
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                                            <button
                                                                type="button"
                                                                className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="majesticons:eye-line"
                                                                    className="icon text-xl"
                                                                />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon icon="lucide:edit" className="menu-icon" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                            >
                                                                <Icon
                                                                    icon="fluent:delete-24-regular"
                                                                    className="menu-icon"
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                                        <span>Showing 1 to 10 of 12 entries</span>
                                        <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                                            <li className="page-item">
                                                <a
                                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                                    href="javascript:void(0)"
                                                >
                                                    <Icon icon="ep:d-arrow-left" className="" />
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    className="page-link text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md bg-primary-600 text-white"
                                                    href="javascript:void(0)"
                                                >
                                                    1
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px"
                                                    href="javascript:void(0)"
                                                >
                                                    2
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                                    href="javascript:void(0)"
                                                >
                                                    3
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                                    href="javascript:void(0)"
                                                >
                                                    4
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                                    href="javascript:void(0)"
                                                >
                                                    5
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                                    href="javascript:void(0)"
                                                >
                                                    {" "}
                                                    <Icon icon="ep:d-arrow-right" className="" />{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </main>
            </>
        </div>
    )
}

export default AdminHome