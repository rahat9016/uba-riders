import React from 'react';
import { useHistory } from 'react-router';
import './car.css'
const Car = (props) => {
    const {id,img,select_car} = props.car
    const history = useHistory()
    const carDestinationEventHandle = (id)=>{
        console.log('carDestinationEventHandle')
        const url = `/destination/${id}`
        history.push(url)
    }
    return (
        <div>
            <div className="carBox"  onClick={()=>carDestinationEventHandle(id)}>
                <img src={img} alt=""/>
                <h2>{select_car}</h2>
            </div>
            
        </div>
    );
};

export default Car;