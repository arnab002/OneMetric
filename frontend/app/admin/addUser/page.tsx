"use client";
import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/Footer'

function AddUser() {
    return (
        <div>
            <>
                <Sidebar />
                <main className="dashboard-main">
                    <Header />
                    <div className="dashboard-main-body">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                            <h6 className="fw-semibold mb-0">Add User</h6>
                            {/* <div className="d-flex align-items-center gap-2">

                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => document.getElementById('bulkImport')?.click()}
                                    >
                                        Bulk Import
                                    </button>

                                    <input
                                        type="file"
                                        id="bulkImport"
                                        accept=".csv"
                                        multiple
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div> */}
                        </div>
                        <div className="card h-100 p-0 radius-12">
                            <div className="card-body p-24">
                                <div className="row justify-content-center">
                                    <div className="col-xxl-6 col-xl-8 col-lg-10">
                                        <div className="card border">
                                            <div className="card-body">
                                                <form action="#">
                                                    <div className="mb-20">
                                                        <label
                                                            htmlFor="name"
                                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                        >
                                                            Full Name <span className="text-danger-600">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control radius-8"
                                                            id="name"
                                                            placeholder="Enter Full Name"
                                                        />
                                                    </div>
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
                                                    <div className="mb-20">
                                                        <label
                                                            htmlFor="phone"
                                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                        >
                                                            Phone <span className="text-danger-600">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control radius-8"
                                                            id="phone"
                                                            placeholder="Enter phone number"
                                                        />
                                                    </div>
                                                    <div className="mb-20">
                                                        <label
                                                            htmlFor="planName"
                                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                        >
                                                            Plan Name <span className="text-danger-600">*</span>
                                                        </label>
                                                        <select
                                                            className="form-control radius-8 form-select"
                                                            id="planName"
                                                        >
                                                            <option value="1">Gold</option>
                                                            <option value="2">Diamond</option>
                                                        </select>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                                        <button
                                                            type="button"
                                                            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
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

export default AddUser
