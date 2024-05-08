import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Button, Table, Flex } from 'antd';

function Users() {
  const [users, setUsers] = useState([]);

  // Define getUsers function to fetch users
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };


  // Call getUsers function when the component mounts
  useEffect(() => {
    getUsers();
  }, []); // Pass an empty dependency array to run this effect only once after the initial render
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },

    {
      title: 'Docter',
      dataIndex: "isDocter",
      render: (text, record) => (
        <span>{record.isDocter ? "Yes" : "No"}</span>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          <Button type='danger' style={{ color: 'aliceblue', background: 'red' }}>
            Block
          </Button>
        </div>
      )
    }


  ]



  return (
    <Layout>
      <h2>Users List</h2>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
}

export default Users;
