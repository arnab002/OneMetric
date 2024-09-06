"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface FormData {
    name: string;
    email: string;
    phone: string;
    planName: string;
}

function AddUser() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        planName: '1', // Default to Gold (1)
    });

    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [adminToken, setAdminToken] = useState<string | null>(null);

    useEffect(() => {
        // Access localStorage only after component mounts (client-side)
        const token = localStorage.getItem('adminToken');
        setAdminToken(token);
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const planId = formData.planName === '1' ? 1 : 2; // Ensure correct mapping for plan ID
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bulk-upload`, {
                customer_name: formData.name,
                mobile_number: formData.phone,
                email: formData.email,
                plan_id: planId
            }, {

                headers: {
                    Authorization: `${adminToken}`, // Passing the token in the Authorization header
                }
            });

            setMessage('User added successfully!');
            setFormData({ name: '', email: '', phone: '', planName: '1' });
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Sidebar />
            <main className="dashboard-main">
                <Header />
                <div className="dashboard-main-body">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                        <h6 className="fw-semibold mb-0">Add User</h6>
                    </div>
                    <div className="card h-100 p-0 radius-12">
                        <div className="card-body p-24">
                            <div className="row justify-content-center">
                                <div className="col-xxl-6 col-xl-8 col-lg-10">
                                    <div className="card border">
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-20">
                                                    <label htmlFor="name" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                                        Full Name <span className="text-danger-600">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control radius-8"
                                                        id="name"
                                                        placeholder="Enter Full Name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-20">
                                                    <label htmlFor="email" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                                        Email <span className="text-danger-600">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control radius-8"
                                                        id="email"
                                                        placeholder="Enter email address"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-20">
                                                    <label htmlFor="phone" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                                        Phone <span className="text-danger-600">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control radius-8"
                                                        id="phone"
                                                        placeholder="Enter phone number"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        maxLength={10}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-20">
                                                    <label htmlFor="planName" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                                        Plan Name <span className="text-danger-600">*</span>
                                                    </label>
                                                    <select
                                                        className="form-control radius-8 form-select"
                                                        id="planName"
                                                        value={formData.planName}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="1">Gold</option>
                                                        <option value="2">Diamond</option>
                                                    </select>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center gap-3">
                                                    <button
                                                        type="button"
                                                        className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                                                        onClick={() => setFormData({ name: '', email: '', phone: '', planName: '1' })}
                                                        disabled={isLoading}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
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
        </div>
    );
}

export default AddUser;
