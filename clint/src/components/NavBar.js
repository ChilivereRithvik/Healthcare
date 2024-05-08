// NavBar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBarCss.css'; // Import CSS for styling

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav>
            <Link to='/' className='title'>
                MediCare
            </Link>
            <div className='menu' onClick={() => {
                setMenuOpen(!menuOpen);
            }}>
                <span></span>
                <span></span>
                <span></span>

            </div>

            <ul className={menuOpen ? "open" : ""}>

                <li>
                    <NavLink to="/" className="nav-NavLink">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className="nav-NavLink">About</NavLink>
                </li>
                <li>
                    <NavLink to="/servicies" className="nav-NavLink">Services</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className="nav-NavLink">Contact</NavLink>
                </li>
                <li className='login'>
                    <NavLink to="/login" className="nav-NavLink login">Login</NavLink>
                </li>
                <li className='register'>
                    <NavLink to="/register" className="nav-NavLink register">SignUp</NavLink>
                </li>
            </ul>
            <ul>
                <li className='nn'>
                    <NavLink to="/login" className="nav-NavLink nn1">Login</NavLink>
                </li>
                <li className='nn1'>
                    <NavLink to="/register" className="nav-NavLink  nn">SignUp</NavLink>
                </li>
            </ul>

        </nav>
    );
};

export default NavBar;
