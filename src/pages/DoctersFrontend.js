import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

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
            console.error(err);
        }
    };

    // Call getDocters function when the component mounts
    useEffect(() => {
        getDocters();
    }, []); // Pass an empty dependency array to run this effect only once after the initial render

    const columns = [
        {
            title: 'Name',
            dataIndex: 'firstname',
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Phone',
            dataIndex: 'phone'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {record.status === 'pending' ? <button className='btn btn-success'>Approve</button> : <button className='btn btn-danger'>Reject</button>}
                </div>
            )
        }
    ];

    return (
        <Layout>
            <h3>All Docters</h3>
            {/* Display doctors data here */}
        </Layout>
    );
}

export default Docters;
