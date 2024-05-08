import React, { useState } from 'react';
import { CiMedicalCase } from "react-icons/ci";
import './RegisterCss.css';
import { message } from "antd";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UseDispatch, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link } from 'react-router-dom';

function Register() {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can implement your sign up logic, such as sending data to the server
        const values = {
            name: name,
            email: email,
            password: password
        };


        console.log(values);



        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/register', values);
            dispatch(hideLoading());
            if (res.data.success) {
                message.success('Register Successgully');
                navigate('/login');
            } else {
                message.error(res.data.message);
            }

        } catch (e) {
            dispatch(hideLoading());
            console.log(e);
            message.error("Something went wrong")

        }
        // Reset form fields
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="signup-form-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <p className='logo'><CiMedicalCase className='CiMedicalCase'/>MediCare</p>
                <h2 className='signup'>SignUp</h2>
                <div className="form-group">
                    <label>UserName:</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
                <div>
                    <div className='orcase'>
                        <hr></hr>
                        <p className='or'>Or</p></div>
                    <div className='sign'>

                        <Link to='/login'>Login</Link>
                    </div>
                </div>
          
            </form>
        </div>
    );
}

export default Register;
