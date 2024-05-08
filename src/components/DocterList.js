import React from 'react'
import '../styles/docterListCss.css';
import { useNavigate } from 'react-router-dom';

const DocterList = ({ doctor }) => {
    const navigate = useNavigate();

    return (
        <div className='list'>
            <div className='card'>
                <div className='cardName'>
                    Dr. {doctor.firstName}
                </div>
                <div className='DocterDetails'>
                    <p>
                        <span>Phone No :</span> {doctor.phone}
                    </p>
                    <p>
                        <span>Specialization: </span>{doctor.specialization}
                    </p>
                    <p>
                        <span>Experience :</span> {doctor.experience}
                    </p>
                    <p>
                        <span>Timings :</span> {doctor.timings}
                    </p>

                </div>
                <button className='Btn' onClick={() => navigate(`/docter/book-appointment/${doctor._id}`)}>Book Appointement</button>
            </div>
        </div>
    )
}

export default DocterList
