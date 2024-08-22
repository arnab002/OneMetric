import React from 'react'
import { Icon } from '@iconify/react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

function UsersList() {
    return (
        <div>
            <>
                <Sidebar />
                <main className="dashboard-main">
                    <Header />
                    <div className="dashboard-main-body">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                            <h6 className="fw-semibold mb-0">Users Grid</h6>
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
                                <li className="fw-medium">Users Grid</li>
                            </ul>
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
                                        <option>Status</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                                <a
                                    href="add-user.html"
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

                    <Footer />
                </main>
            </>
        </div>
    )
}

export default UsersList