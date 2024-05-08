import React from 'react'
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import '../styles/BookingPageCss.css';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import { message } from 'antd';
import { set } from 'mongoose';
const BookingPage = () => {
    const { user } = useSelector((state) => state.user);
    const [doctor, setDoctors] = useState();
    const params = useParams();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [isAvailable, setIsAvailable] = useState();
    const dispatch = useDispatch();

    // Function to fetch user data
    const getUserData = async () => {
        try {
            const res = await axios.post(
                '/api/v1/docter/getDocterById', { docterId: params.docterId },

                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );
            if (res.data.success) {
                setDoctors(res.data.data);
            }


        } catch (error) {
            console.log(error); // Log any errors for debugging
        }
    };

    // =========================Booking Function=========

    const handleBooking = async () => {
        try {
            dispatch(showLoading);
            const res = await axios.post('/api/v1/user/book-appintement', {
                doctorId: params.docterId,
                userId: user._id,
                doctorInfo: doctor,
                date: date,
                userInfo: user,
                time: time,


            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                setDate(null);
                setTime(null);
            }

        } catch (error) {
            dispatch(hideLoading);
            console.log(error);

        }
    }





    //===================================

    useEffect(() => {
        getUserData(); // Call getUserData function on component mount
    }, []); // Empty dependency array to run effect only once









    return (
        <Layout>
            <h3>Booking Page</h3>
            <div className='Container'>
                {doctor && (
                    <div>
                        <p className='doc'>
                            Dr. {doctor.firstName}
                        </p>
                        <p>
                            Timings : {doctor.timings}
                        </p>
                        <p>
                            Fees : {5000}
                        </p>
                        <div>
                            <DatePicker className="date" format="DD-MM-YY" onChange={(value) => setDate(moment(value).format("DD-MM-YY"))} />
                            <TimePicker className="time" format={"HH:MM"} onChange={(value) => setTime(moment(value).format("HH:MM"))} />
                        </div>
                        <button className='avalbtn'>
                            Check Availability
                        </button>
                        <button className='avalbtn book' onClick={handleBooking}>
                            Book Now
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default BookingPage
