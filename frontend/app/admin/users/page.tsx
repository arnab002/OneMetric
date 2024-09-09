'use client'
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import baseApiURL from "@/baseUrl";
import { Icon } from "@iconify/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

interface User {
  name: string;
  email: string;
  mobile: string;
  created_at: string;
  registeredPlan: {
    plan_id: number;
    expire_date: string;
    created_at: string;
  };
}

interface ApiResponse {
  data: User[];
  meta: {
    totalUsers: number;
    currentPage: number;
    totalPages: number;
  };
}

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!user) return null;

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog" ref={modalRef}>
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h6 className="modal-title mb-0">User Details</h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="pb-24 ms-16 mb-4 me-16 mt--100">
              <div className="text-center border border-top-0 border-start-0 border-end-0 pt-120">
                <h6 className="mb-0 mt-16">{user.name}</h6>
                <span className="text-secondary-light mb-16">
                  {user.mobile}
                </span>
              </div>
              <div className="mt-40">
                <ul>
                  <li className="d-flex align-items-center gap-1 mb-12">
                    <span className="w-30 text-md fw-semibold text-primary-light">
                      Full Name
                    </span>
                    <span className="w-70 text-secondary-light fw-medium">
                      : &nbsp;&nbsp;&nbsp;&nbsp;{user.name}
                    </span>
                  </li>
                  <li className="d-flex align-items-center gap-1 mb-12">
                    <span className="w-30 text-md fw-semibold text-primary-light">
                      Email
                    </span>
                    <span className="w-70 text-secondary-light fw-medium">
                      : &nbsp;&nbsp;&nbsp;&nbsp;{user.email}
                    </span>
                  </li>
                  <li className="d-flex align-items-center gap-1 mb-12">
                    <span className="w-30 text-md fw-semibold text-primary-light">
                      Phone
                    </span>
                    <span className="w-70 text-secondary-light fw-medium">
                      : &nbsp;&nbsp;&nbsp;&nbsp;{user.mobile}
                    </span>
                  </li>
                  <li className="d-flex align-items-center gap-1 mb-12">
                    <span className="w-30 text-md fw-semibold text-primary-light">
                      Plan Name
                    </span>
                    <span className="w-70 text-secondary-light fw-medium">
                      : &nbsp;&nbsp;&nbsp;&nbsp;{user.registeredPlan.plan_id}
                    </span>
                  </li>
                  <li className="d-flex align-items-center gap-1 mb-12">
                    <span className="w-30 text-md fw-semibold text-primary-light">
                      Plan Status
                    </span>
                    <span className="w-70 text-secondary-light fw-medium">
                      : &nbsp;&nbsp;&nbsp;&nbsp;{new Date(user.registeredPlan.expire_date) > new Date() ? "Active" : "Expired"}
                    </span>
                  </li>
                  <li className="d-flex align-items-center gap-1 mb-12">
                    <span className="w-30 text-md fw-semibold text-primary-light">
                      Plan Start Date
                    </span>
                    <span className="w-70 text-secondary-light fw-medium">
                      : &nbsp;&nbsp;&nbsp;&nbsp;{new Date(user.registeredPlan.created_at).toLocaleDateString()}
                    </span>
                  </li>
                  <li className="d-flex align-items-center gap-1 mb-12">
                    <span className="w-30 text-md fw-semibold text-primary-light">
                      Plan Expiry Date
                    </span>
                    <span className="w-70 text-secondary-light fw-medium">
                      : &nbsp;&nbsp;&nbsp;&nbsp;{new Date(user.registeredPlan.expire_date).toLocaleDateString()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const authStatus = localStorage.getItem('isAdminAuthenticated') === 'true';
      const token = localStorage.getItem('adminToken');
      if (!authStatus || !token) {
        window.location.href = "/admin";
      } else {
        await fetchUserData(token, currentPage);
      }
    };

    checkAuthAndFetchData();
  }, [currentPage]);

  const fetchUserData = async (token: string, page: number) => {
    try {
      const response = await axios.get<ApiResponse>(`${baseApiURL()}/user-details?page=${page}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      const { data, meta } = response.data;
      setUsers(data);
      setTotalPages(meta.totalPages);
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('isAdminAuthenticated');
        localStorage.removeItem('adminToken');
        window.location.href = "/admin";
      }
    }
  };

  const handlePhoneClick = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(
        <li key={i} className="page-item">
          <a
            className={`page-link ${i === currentPage ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-secondary-light'} fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md`}
            href="javascript:void(0)"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };

  return (
    <div>
      <>
        <Sidebar />
        <main className="dashboard-main">
          <Header />
          <div className="dashboard-main-body">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24"></div>
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
                        <th scope="col" className="text-center">
                          Action
                        </th>
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
                              <span
                                style={{ cursor: 'pointer', textDecoration: 'none' }}
                                onClick={() => handlePhoneClick(user)}
                              >
                                {user.mobile}
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
                              {user.registeredPlan.plan_id}
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="text-md mb-0 fw-normal text-secondary-light">
                              {new Date(user.registeredPlan.created_at).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="text-md mb-0 fw-normal text-secondary-light">
                              {new Date(user.registeredPlan.expire_date).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="bg-success-focus text-success-600 border border-success-main px-24 py-4 radius-4 fw-medium text-sm">
                              {new Date(user.registeredPlan.expire_date) > new Date() ? "Active" : "Expired"}
                            </span>
                          </td>
                          <td className="text-center">
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                  <span>Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, users.length)} of {users.length} entries</span>
                  <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                    <li className="page-item">
                      <a
                        className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                        href="javascript:void(0)"
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      >
                        <Icon icon="ep:d-arrow-left" className="" />
                      </a>
                    </li>
                    {renderPagination()}
                    <li className="page-item">
                      <a
                        className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                        href="javascript:void(0)"
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      >
                        <Icon icon="ep:d-arrow-right" className="" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <UserModal user={selectedUser} onClose={closeModal} />
      </>
    </div>
  );
}

export default UsersList;
