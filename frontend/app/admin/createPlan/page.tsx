"use client";
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CreatePlan() {
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);
    const [duration, setDuration] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [adminToken, setAdminToken] = useState<string | null>(null);

    useEffect(() => {
        // Access localStorage only after component mounts (client-side)
        const token = localStorage.getItem('adminToken');
        setAdminToken(token);
    }, []);

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDuration(e.target.value);
    };

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const payload = {
                amount_in_rs: parseInt(price),
                duration_in_months: parseInt(duration),
                status: 'active', // Status is always active
            };

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/plans`, payload, {
                headers: {
                    Authorization: `${adminToken}`, // Passing the token in the Authorization header
                }
            });

            setMessage('Plan created successfully!');
            setDuration('');
            setPrice('');
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'An error occurred while creating the plan.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSidebar = (): void => {
        setIsSidebarActive(prev => !prev);
    };

    return (
        <div>
            <>
                <Sidebar isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />
                <main className={`dashboard-main ${isSidebarActive ? 'active' : ''}`}>
                    <Header isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />
                    <div className="dashboard-main-body">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                            <h6 className="fw-semibold mb-0">Create Plan</h6>
                        </div>
                        <div className="card h-100 p-0 radius-12">
                            <div className="card-body p-24">
                                <div className="row justify-content-center">
                                    <div className="col-xxl-6 col-xl-8 col-lg-10">
                                        <div className="card border">
                                            <div className="card-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="mb-20">
                                                        <label
                                                            htmlFor="duration"
                                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                        >
                                                            Plan Duration <span className="text-danger-600">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            inputMode="numeric"
                                                            maxLength={2}
                                                            className="form-control radius-8"
                                                            id="duration"
                                                            placeholder="Enter Plan Duration in Months"
                                                            value={duration}
                                                            onChange={handleDurationChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="mb-20">
                                                        <label
                                                            htmlFor="price"
                                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                        >
                                                            Plan Price <span className="text-danger-600">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            inputMode="numeric"
                                                            maxLength={6}
                                                            className="form-control radius-8"
                                                            id="price"
                                                            placeholder="Enter Plan Price"
                                                            value={price}
                                                            onChange={handlePriceChange}
                                                            pattern="[0-9]*"
                                                            required
                                                            onKeyPress={(e) => {
                                                                if (!/[0-9]/.test(e.key)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                                                        <button
                                                            type="button"
                                                            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-3 py-2 radius-8"
                                                            onClick={() => {
                                                                setDuration('');
                                                                setPrice('');
                                                                setMessage('');
                                                            }}
                                                            disabled={isLoading}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary border border-primary-600 text-md px-3 py-4 radius-8"
                                                            disabled={isLoading}
                                                        >
                                                            {isLoading ? 'Saving...' : 'Save'}
                                                        </button>
                                                    </div>
                                                </form>
                                                {message && (
                                                    <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                                                        {message}
                                                    </div>
                                                )}
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
    );
}

export default CreatePlan;
