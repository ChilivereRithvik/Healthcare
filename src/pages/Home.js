import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Row } from 'antd';
import DocterList from '../components/DocterList';

function Home() {

    const [doctor, setDoctors] = useState();


    // Function to fetch user data
    const getUserData = async () => {
        try {
            const res = await axios.get(
                '/api/v1/user/getAllDocter',

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

    useEffect(() => {
        getUserData(); // Call getUserData function on component mount
    }, []); // Empty dependency array to run effect only once

    return (
        <Layout>
            <h1>Home Page</h1>
            <Row>
                {doctor && doctor.map(doctor => (
                    <DocterList doctor={doctor} />

                ))}

            </Row>
        </Layout>
    );
}

export default Home;
