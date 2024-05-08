import React from 'react';
import Layout from '../components/Layout';
import { Tabs, notification, message } from 'antd';
import '../styles/NotificationCss.css';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Notification() {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading);
            const res = await axios.post('/api/v1/user/get-all-notification', { userId: user._id }, {
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });




            dispatch(hideLoading);

            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }

        } catch (er) {
            dispatch(hideLoading());
            console.log(er);
            message.error("something went wrong")
        }

    }
    //Delete all Read
    const handleMarkAllDelete = async () => {
        try {

            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/delete-all-notification', { userId: user._id }, {
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }

        } catch (error) {
            console.log(error);
            message.error("something Went Wrong in Notification");
        } finally {
            dispatch(hideLoading());
        }



    }
    return (
        <Layout>
            <h4 className='headding'>Notification page</h4>


            <Tabs>
                <Tabs.TabPane tab='unRead' key={0}>
                    <div className='tab'>
                        <p onClick={handleMarkAllRead}>Mark all read</p>
                    </div>


                    {
                        user?.notification.map((notificationMsg) => (
                            <div className='card'>

                                <div className='card-text'

                                    onClick={() => {
                                        navigate(notificationMsg.onClickPath)
                                    }
                                    } >


                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }


                </Tabs.TabPane>

                <Tabs.TabPane tab='Read' key={1}>
                    <div className='tab'>
                        <p onClick={handleMarkAllDelete}>Delete all read</p>
                    </div>
                    {
                        user?.seennotification.map((notificationMsg) => (
                            <div className='card'>

                                <div className='card-text'

                                    onClick={() => {
                                        navigate(notificationMsg.onClickPath)
                                    }
                                    } >


                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }


                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default Notification
