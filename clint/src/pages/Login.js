import React, { useState } from 'react';
import './LoginCss.css'; // You can style your form in LoginForm.css
import { UseDispatch, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { CiMedicalCase } from "react-icons/ci";
import { message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Define navigate function
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can implement your login logic, such as sending data to the server

        const values = {
            email: email,
            password: password
        };


        try {
            dispatch(showLoading())




            const res = await axios.post('/api/v1/user/login', values); // Fix typo in API path ('/api/v1/user/login' instead of '/api/vi/user/login')
            window.location.reload();

            dispatch(hideLoading());


            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                message.success("Login successful");
                navigate('/'); // Navigate to home page after successful login

            } else {
                message.error(res.data.message);
            }

        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }

        // Reset form fields
        setEmail('');
        setPassword('');
    };

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <p className='logo'><CiMedicalCase className='CiMedicalCase' />MediCare</p>
                <h2 className='signup'>Login</h2>

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
                <button type="submit">Login</button>
                <div>
                    <div className='orcase'>
                        <hr></hr>
                        <p className='or'>Or</p></div>
                    <div className='sign'>

                        <Link to='/register'>SignUp</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
