// import React from 'react'
// import { Icon } from '@iconify/react'

// function AdminLogin() {
//     return (
//         <div>
//             <section className="auth bg-base d-flex flex-center">

//                 <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center m-auto">
//                     <div className="max-w-464-px mx-auto w-100">
//                         <div>
//                             <a href="/admin/dashboard" className="sidebar-logo">
//                                 <img
//                                     src="/public/home/OneMetric_Transparent.png"
//                                     alt="site logo"
//                                     className="light-logo"
//                                 />
//                                 <img
//                                     src="/public/home/OneMetric_Transparent.png"
//                                     alt="site logo"
//                                     className="dark-logo"
//                                 /> 
//                                 <span><b>OneMetric</b></span>
//                                 <img
//                                     src="/public/home/OneMetric_Transparent.png"
//                                     alt="site logo"
//                                     className="logo-icon"
//                                 />
//                             </a>
//                             <br />
//                             <h4 className="mb-12">Welcome Admin</h4>
//                             {/* <p className="mb-32 text-secondary-light text-lg">
//                                 Welcome back! please enter your detail
//                             </p> */}
//                         </div>
//                         <br />
//                         <form action="/admin/dashboard">
//                             <div className="icon-field mb-16">
//                                 <span className="icon top-50 translate-middle-y">
//                                     <Icon icon="mage:email" />
//                                 </span>
//                                 <input
//                                     type="email"
//                                     className="form-control h-56-px bg-neutral-50 radius-12"
//                                     placeholder="Email"
//                                 />
//                             </div>
//                             <div className="position-relative mb-20">
//                                 <div className="icon-field">
//                                     <span className="icon top-50 translate-middle-y">
//                                         <Icon icon="solar:lock-password-outline" />
//                                     </span>
//                                     <input
//                                         type="password"
//                                         className="form-control h-56-px bg-neutral-50 radius-12"
//                                         id="your-password"
//                                         placeholder="Password"
//                                     />
//                                 </div>
//                                 <span
//                                     className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
//                                     data-toggle="#your-password"
//                                 />
//                             </div>
//                             <div className="">
//                                 <div className="d-flex justify-content-between gap-2">
//                                     <div className="form-check style-check d-flex align-items-center">
//                                         <input
//                                             className="form-check-input border border-neutral-300"
//                                             type="checkbox"
//                                             defaultValue=""
//                                             id="remeber"
//                                         />
//                                         <label className="form-check-label" htmlFor="remeber">
//                                             Remember me{" "}
//                                         </label>
//                                     </div>
//                                     <a href="javascript:void(0)" className="text-primary-600 fw-medium">
//                                         Forgot Password?
//                                     </a>
//                                 </div>
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
//                             >
//                                 {" "}
//                                 Sign In
//                             </button>
//                             {/* <div className="mt-32 center-border-horizontal text-center">
//                                 <span className="bg-base z-1 px-4">Or sign in with</span>
//                             </div> */}
//                             <div className="mt-32 d-flex align-items-center">
//                                 {/* <button
//                                     type="button"
//                                     className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
//                                 >
//                                     <Icon
//                                         icon="logos:google-icon"
//                                         className="text-primary-600 text-xl line-height-1"
//                                     />
//                                     Google
//                                 </button> */}
//                             </div>
//                             {/* <div className="mt-32 text-center text-sm">
//                                 <p className="mb-0">
//                                     Don’t have an account?{" "}
//                                     <a href="sign-up.html" className="text-primary-600 fw-semibold">
//                                         Sign Up
//                                     </a>
//                                 </p>
//                             </div> */}
//                         </form>
//                     </div>
//                 </div>
//             </section>

//         </div>
//     )
// }
// export default AdminLogin


'use client'
import React, { useState, FormEvent } from 'react';
import { Icon } from '@iconify/react';

interface AuthResponse {
    success: boolean;
}

interface AuthError {
    message: string;
}

// Mock authentication function
const mockAuth = (email: string, password: string): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "admin@onemetric.in" && password === "admin@123") {
                resolve({ success: true });
            } else {
                reject({ message: "Invalid credentials" } as AuthError);
            }
        }, 1000);
    });
};

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await mockAuth(email, password);
            window.location.href = "/admin/dashboard"
        } catch (err) {
            setError((err as AuthError).message);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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