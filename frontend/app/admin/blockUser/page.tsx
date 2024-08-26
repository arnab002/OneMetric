import React from 'react';
import { Icon } from '@iconify/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

interface User {
    phone: string;
    name: string;
    email: string;
    planName: string;
    status: string;
}

function BlockUser() {
    const users: User[] = [
        {
            phone: "9865786551",
            name: "Kathryn Murphy",
            email: "osgoodwy@gmail.com",
            planName: "Diamond",
            status: "UnBlocked"
        },
        {
            phone: "9748996248",
            name: "Rounak Saha",
            email: "saharounak013@gmail.com",
            planName: "Gold",
            status: "UnBlocked"
        }
        // Add more users as needed
    ];
    return (
        <div>
            <>
                <Sidebar />
                <main className="dashboard-main">
                    <Header />
                    <div className="dashboard-main-body">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                            <h6 className="fw-semibold mb-0">Block Users</h6>

                        </div>
                        <div className="card h-100 p-0 radius-12">
                            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                                <div className="d-flex align-items-center flex-wrap gap-3">
                                    <span className="text-md fw-medium text-secondary-light mb-0">
                                        Show
                                    </span>
                                    <select className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                            <option key={num}>{num}</option>
                                        ))}
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
                                        <option>Blocked</option>
                                        <option>UnBlocked</option>
                                    </select>
                                </div>
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
                                                    Status
                                                </th>
                                                {/* <th scope="col" className="text-center">
                                                    Action
                                                </th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-10">
                                                            <div className="form-check style-check d-flex align-items-center">
                                                                <input
                                                                    className="form-check-input radius-4 border border-neutral-400"
                                                                    type="checkbox"
                                                                    name="checkbox"
                                                                />
                                                            </div>
                                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                                {user.phone}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                                            {user.name}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                                            {user.email}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                                            {user.planName}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="bg-success-focus text-success-600 border border-success-main px-24 py-4 radius-4 fw-medium text-sm">
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                    {/* <td className="text-center">
                                                        <div className="d-flex align-items-center gap-10 justify-content-center">
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
                                                    </td> */}
                                                </tr>
                                            ))}
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
                    <Footer />
                </main>
            </>
        </div>
    );
}

export default BlockUser;
