import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const [docter, setDocter] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        phone: '',
        address: '',
        specialization: '',
        experience: '',
        feesPreCunsaltation: '',
        timings: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/docter/updateProfile', { ...formData, userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                navigate('/');
            } else {
                message.error(res.data.success);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something Went Wrong');
        }
    };

    const getDocterInfo = async () => {
        try {
            const res = await axios.post('/api/v1/docter/getDocterInfo', { userId: params.id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.data) {
                setDocter(res.data.data);
                // Set initial form data from docter object
                setFormData({
                    firstName: res.data.data.firstName,
                    email: res.data.data.email,
                    phone: res.data.data.phone,
                    address: res.data.data.address,
                    specialization: res.data.data.specialization,
                    experience: res.data.data.experience,
                    feesPreCunsaltation: res.data.data.feesPreCunsaltation,
                    timings: res.data.data.timings
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDocterInfo();
        // eslint-disable-next-line
    }, []);

    return (
        <Layout>
            {docter && (
                <div className='Docform'>
                    <form onSubmit={handleSubmit}>
                        <h4><span>*</span>Personal Details</h4><br />
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} placeholder="Your first name" onChange={handleChange} required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" placeholder='example@gmail.com' name="email" value={formData.email} onChange={handleChange} required />

                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" name="phone" className='inp' placeholder='Your phone number ' value={formData.phone} onChange={handleChange} required />

                        <label htmlFor="address">Address:</label>
                        <input id="address" name="address" placeholder='Your address' className='inp' value={formData.address} onChange={handleChange} required />

                        <h4 className='prof'><span>*</span>Professional Details</h4><br />
                        <label htmlFor="specialization">Specialization:</label>
                        <input id="specialization" placeholder='Your Specialization' name="specialization" className='inp' value={formData.specialization} onChange={handleChange} required />

                        <label htmlFor="experience">Experience:</label>
                        <input type="text" id="experience" name="experience" value={formData.experience} placeholder="Your experience" onChange={handleChange} required />

                        <label htmlFor="feesPreCunsaltation">Fees Pre Consultation</label>
                        <input id="feesPreCunsaltation" placeholder='Your Fees Pre Consultation' type='number' name="feesPreCunsaltation" className='inp' value={formData.feesPreCunsaltation} onChange={handleChange} required />

                        <label htmlFor="timings">Timings:</label>
                        <input id="timings" type='time' name="timings" className='inp' value={formData.timings} onChange={handleChange} required />

                        <input type="submit" value="Update" className='btn' />
                    </form>
                </div>
            )}
        </Layout>
    );
};

export default Profile;
