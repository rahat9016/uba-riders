import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import FakeData from '../FakeData/FakeData.json'
import './destination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUserFriends } from '@fortawesome/free-solid-svg-icons';
const Destination = () => {
    const [search, setSearch] = useState(false)
    console.log(search)
    const { id } = useParams()
    const [data, setData] = useState([])
    useEffect(()=>{
        setData(FakeData)
    },[])
    const rider = data.find(data => data.id == id)
    const handleSearch = () => {
        setSearch(true)
    }
    return (
        <div className="destinationContainer">
            { id ? search ? <div className="mainLocationContainer">
                <div className="locationArea">
                    <h3>Mirpur</h3>
                    <h3>Dhanmondi</h3>
                </div>
                <div className="locationContainer">
                    <img src={rider.img} alt=""/>
                    <h5>{rider.select_car} </h5>
                    <h4><FontAwesomeIcon icon={faUserFriends} /> {rider.person}</h4>
                    <h4>${rider.amount}</h4>
                </div>
                <div className="locationContainer">
                    <img src={rider.img} alt=""/>
                    <h5>{rider.select_car} </h5>
                    <h4><FontAwesomeIcon icon={faUserFriends} /> {rider.person}</h4>
                    <h4>${rider.amount}</h4>
                </div>
                <div className="locationContainer">
                    <img src={rider.img} alt=""/>
                    <h5>{rider.select_car} </h5>
                    <h4><FontAwesomeIcon icon={faUserFriends} /> {rider.person}</h4>
                    <h4>${rider.amount}</h4>
                </div>
               
            </div> :
                <div className="addressFiled">
                    <form action="">
                        <p>Pick From</p>
                        <input type="text" name="" placeholder="Mirpur 1" /><br /><br />
                        <input type="text" name="" placeholder="Dhanmondi" /> <br /><br />
                        <button onClick={handleSearch}>Search</button>
                    </form>
                </div> :
                search ? <div>
                    <h5>Please Select Car <Link to="/home">Go to Home</Link> </h5>

                </div> :
                    <div className="addressFiled">
                        <form action="">
                            <input type="text" name="" placeholder="Mirpur 1" /><br /><br />
                            <input type="text" name="" placeholder="Dhanmondi" /> <br /><br />
                            <button onClick={handleSearch}>Search</button>
                        </form>
                    </div>
            }
            <div className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470541.7603818619!2d90.52499145139076!3d22.87248684578395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754c5be2346c413%3A0x7452f885dfe3105e!2sLakshmipur%20District!5e0!3m2!1sen!2sbd!4v1616246213793!5m2!1sen!2sbd"  allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    );
};

export default Destination;