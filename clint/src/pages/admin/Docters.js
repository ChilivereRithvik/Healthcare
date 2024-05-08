import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Button, Table, Flex, message } from 'antd';

function Docters() {
    const [docters, setDocters] = useState([]);

    const getDocters = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllDocters', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                setDocters(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    //----------------------------------------------------------------------
    ///handling docter-apply status 

    const handleAccountStatus = async (record, status) => {

        try {
            const res = await axios.post('/api/v1/admin/changeAccountStatus', { docterId: record._id, status: status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                message.success(res.data.message);
                window.location.reload();
            }
        

        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
        }
    }




    //-----------------------------------------------------






    // Call getDocters function when the component mounts
    useEffect(() => {
        getDocters();
    }, []); // Pass an empty dependency array to run this effect only once after the initial render

    const columns = [
        {
            title: 'Name',
            dataIndex: 'firstName',
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },

        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Specialization',
            dataIndex: 'specialization',
        },
        {
            title: 'Experience',
            dataIndex: 'experience'
        },
        {
            title: 'Timings',
            dataIndex: 'timings',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {record.status === 'pending' ? <button className='btn btn-success' onClick={() => handleAccountStatus(record, 'approved')}>Approve</button>
                        : <button className='btn btn-danger' style={{ background: 'red', color: 'aliceblue' }}>Reject</button>}
                </div>
            )
        }
    ];

    return (
        <Layout>
            <h3>All Docters</h3>
            <Table columns={columns} dataSource={docters} />
        </Layout>
    );
}

export default Docters;
