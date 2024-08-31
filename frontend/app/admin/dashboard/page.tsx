'use client'
import React, { useEffect, useState, useContext } from 'react'
import { Icon } from '@iconify/react'
import axios from 'axios'
import baseApiURL from '@/baseUrl'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

function AdminHome() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userStats, setUserStats] = useState({
        totalUsers: 0,
        paidUsers: 0
    });

    const [revenueStats, setRevenueStats] = useState({
        totalRevenue: 0
    });

    const checkAuth = () => {
        const authStatus = localStorage.getItem('isAdminAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
        if (!authStatus) {
            window.location.href = "/admin"
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserStats();
            fetchRevenueStats();
        }
    }, [isAuthenticated]);

    const fetchUserStats = async () => {
        try {
            const response = await axios.get(`${baseApiURL()}/user-stats`);
            const data = await response.data;
            setUserStats({
                totalUsers: data.totalUsers,
                paidUsers: data.paidUsers
            });
        } catch (error) {
            console.error('Error fetching user statistics:', error);
        }
    };

    const fetchRevenueStats = async () => {
        try {
            const response = await axios.get(`${baseApiURL()}/total-revenue`);
            const data = await response.data;
            setRevenueStats({
                totalRevenue: data.totalRevenue
            });
        } catch (error) {
            console.error('Error fetching revenue statistics:', error);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div>
            <>
                <Sidebar />
                <main className="dashboard-main">
                    <Header />
                    <div className="dashboard-main-body">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                            <h6 className="fw-semibold mb-0">Dashboard</h6>
                        </div>
                        <div className="row gy-4">
                            <div className="col-xxl-12">
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
                                                                Total No of Users
                                                            </span>
                                                            <h6 className="fw-semibold">{userStats.totalUsers}</h6>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                                Total Paid Users
                                                            </span>
                                                            <h6 className="fw-semibold">{userStats.paidUsers}</h6>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                                Total Revenue
                                                            </span>
                                                            <h6 className="fw-semibold">₹{revenueStats.totalRevenue}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                                    <option>Subscribed Plans</option>
                                                    <option>Diamond</option>
                                                    <option>Gold</option>
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
                                                                    WhatsApp Number
                                                                </div>
                                                            </th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col" className="text-center">
                                                                Subscribed Plans Name
                                                            </th>
                                                            <th scope="col" className="text-center">
                                                                Start Date
                                                            </th>
                                                            <th scope="col" className="text-center">
                                                                End Date
                                                            </th>
                                                            <th scope="col" className="text-center">
                                                                Plan Status
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
                                                                    9865786551
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    Kathryn Murphy
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    osgoodwy@gmail.com
                                                                </span>
                                                            </td>
                                                            <td className="text-center">
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    Diamond
                                                                </span>
                                                            </td>
                                                            <td className="text-center">
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    01 Aug 2024
                                                                </span>
                                                            </td>
                                                            <td className="text-center">
                                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                    31 July 2025
                                                                </span>
                                                            </td>
                                                            <td className="text-center">
                                                                <span className="bg-success-focus text-success-600 border border-success-main px-24 py-4 radius-4 fw-medium text-sm">
                                                                    Active
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                                                <span>Showing 1 to 1 of 1 entries</span>
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
                                                            <Icon icon="ep:d-arrow-right" className="" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
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