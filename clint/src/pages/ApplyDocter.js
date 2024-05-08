import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/ApplyDocCss.css';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';


import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

function ApplyDocter() {

    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        additionalInfo: '',
        expreience: '',
        feesPreCunsaltation: '',
        timings: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can handle form submission logic here, like sending data to a server
        try {

            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/apply-docter', { ...formData, userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.success);
                navigate('/');
            } else {
                message.error(res.data.message);
            }


        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something Went Wrong');
        }











        // Reset form data
        setFormData({
            name: '',
            email: '',
            phone: '',
            specialization: '',
            additionalInfo: '',
            expreience: '',
            feesPreCunsaltation: '',
            timings: ''
        });
    };

    return (
        <Layout>
            <p className='heading'>Apply For Docter</p>
            <div className='Docform'>
                <form onSubmit={handleSubmit}>
                    <h4><span>*</span>Presonal Details</h4><br></br>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} placeholder="Your first name" onChange={handleChange} required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder='example@gmail.com' name="email" value={formData.email} onChange={handleChange} required />

                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" className='inp' placeholder='Your phone number ' value={formData.phone} onChange={handleChange} required />


                    <label htmlFor="address">Address:</label>
                    <input id="address" name="address" placeholder='Your address' className='inp' value={formData.address} onChange={handleChange} required>

                    </input>
                    <h4 className='prof'><span>*</span>Proficinal Details</h4><br></br>

                    <label htmlFor="specialization">Specialization:</label>
                    <input id="specialization" placeholder='Your Specialization' name="specialization" className='inp' value={formData.specialization} onChange={handleChange} required>

                    </input>
                    <label htmlFor="experience">Experience:</label>
                    <input type="text" id="experience" name="experience" value={formData.experience} placeholder="Your experience" onChange={handleChange} required />

                    <label htmlFor="feesPreCunsaltation">Fees  Pre Cunsaltation</label>
                    <input id="feesPreCunsaltation" placeholder='Your Fees Pre Cunsaltation' type='text' name="feesPreCunsaltation" className='inp' value={formData.feesPreCunsaltation} onChange={handleChange} required />



                    <label htmlFor="timings">Timings:</label>
                    <input id="timings" type='time' name="timings" className='inp' value={formData.timings} onChange={handleChange} required />





                    <input type="submit" value="Submit" className='btn' />
                </form>
            </div>
        </Layout>
    )
}

export default ApplyDocter;
