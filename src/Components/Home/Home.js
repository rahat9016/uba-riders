import React, { useEffect, useState } from 'react';
import Car from '../Car/Car';
import carData from '../FakeData/FakeData.json'
import './home.css'
const Home = () => {
    const [cars,setCars] = useState([])
    useEffect(()=>{
        setCars(carData)
    },[])
    return (
        <div className="carsContainer">
            <div className="carContainer">
            {
                cars.map(car => <Car car={car} key={car.id}></Car>)
            }
            </div>
        </div>
    );
};

export default Home;