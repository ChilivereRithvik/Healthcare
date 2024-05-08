import React, { useState, useEffect } from "react";
import "../styles/LayoutStyles.css";
import { AdminMenu, userMenu } from '../Data/data';

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";

const Layout = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarMenu, setSidebarMenu] = useState([]);
    // let isDocter = false;
    // console.log(user.isDoctor);
    const handleLogout = () => {
        localStorage.clear();
        message.success("Logout Successfully");
        navigate('/login');
    };
    //Docter menu-------------------------------------------------------
    const docterMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'fa-solid fa-house'
        }, {
            name: 'Appointment',
            path: '/appointment',
            icon: 'fa-solid fa-list'
        },
        {
            name: 'Profile',
            path: `/docter/profile/${user?._id}`,
            icon: 'fa-solid fa-user',
        }, 
        {
            name: 'AI',
            path: '/ai',
            icon: 'fa-regular fa-message'
        },
    ];
 

    useEffect(() => {
        // Define sidebar menu based on user role
        if (user?.isAdmin) {


            setSidebarMenu(AdminMenu);
        } else if (user?.isDocter) {


            setSidebarMenu(docterMenu);
        } else {



            setSidebarMenu(userMenu);
        }
    }, []); // Update sidebar menu when user changes

    // Update sidebar menu when user changes


    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h6>MediCare</h6>
                        </div>
                        <div className="menu">
                            <div className="menuicon">
                                <span>Menu</span>
                            </div>
                            {sidebarMenu.map((menu) => {
                                const isActive = location.pathname === menu.path;
                                return (
                                    <div key={menu.name} className={`menu-item ${isActive && "active"}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                );
                            })}
                            <div className={`menu-item`} onClick={handleLogout}>
                                <i className='fa-solid fa-right-from-bracket'></i>
                                <Link to='/login'>Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <div className="header-contant">
                                <Badge count={user && user.notification.length} onClick={() => {
                                    navigate("/notification");
                                }}>
                                    <i className="fa-solid fa-bell"></i>
                                </Badge>
                                <Link to="/profile" className="link">{user?.name}</Link>
                            </div>
                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
