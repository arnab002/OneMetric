'use client'
import React, { useState, FormEvent, useEffect } from 'react';
import baseApiURL from '@/baseUrl';
import { Icon } from '@iconify/react';

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Check if admin is already logged in
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('adminToken');
          const authStatus = !!token;
          setIsAuthenticated(authStatus);
          if (authStatus) {
            window.location.href = "/admin/dashboard";
          }
        }
      }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminlogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('adminToken', token);
                localStorage.setItem('isAdminAuthenticated', 'true');
                window.location.href = "/admin/dashboard";
            } else {
                const { error } = await response.json();
                setError(error || 'An error occurred during login');
            }
        } catch (error) {
            setError('An error occurred during login');
        }

        setLoading(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (isAuthenticated) {
        return null;
    }


    return (
        <div>
            <section className="auth bg-base d-flex flex-center">
                <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center m-auto">
                    <div className="max-w-464-px mx-auto w-100">
                        <div>
                            <a href="/admin/dashboard" className="sidebar-logo">
                                <img
                                    src="/public/home/OneMetric_Transparent.png"
                                    alt="site logo"
                                    className="light-logo"
                                />
                                <img
                                    src="/public/home/OneMetric_Transparent.png"
                                    alt="site logo"
                                    className="dark-logo"
                                />
                                <span><b>OneMetric</b></span>
                                <img
                                    src="/public/home/OneMetric_Transparent.png"
                                    alt="site logo"
                                    className="logo-icon"
                                />
                            </a>
                            <br />
                            <h4 className="mb-12">Welcome Admin</h4>
                        </div>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div className="icon-field mb-16">
                                <span className="icon top-50 translate-middle-y">
                                    <Icon icon="mage:email" />
                                </span>
                                <input
                                    type="email"
                                    className="form-control h-56-px bg-neutral-50 radius-12"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="position-relative mb-20">
                                <div className="icon-field">
                                    <span className="icon top-50 translate-middle-y">
                                        <Icon icon="solar:lock-password-outline" />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control h-56-px bg-neutral-50 radius-12"
                                        id="your-password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span
                                        className="icon top-50 translate-middle-y cursor-pointer"
                                        style={{ right: '10px', left: 'auto' }}
                                        onClick={togglePasswordVisibility}
                                    >
                                        <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} />
                                    </span>
                                </div>
                            </div>
                            {error && <div className="text-danger mb-3">{error}</div>}
                            <button
                                type="submit"
                                className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                                disabled={loading}
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminLogin;