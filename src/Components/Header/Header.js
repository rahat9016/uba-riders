import { Link } from 'react-router-dom';
import "./Header.css"
import React, { useContext } from "react";
import { UserContext } from '../../App';
const Header = () => {
    const [userData,setUserData] = useContext(UserContext)
    return (
        <div className="">
            
            <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container container-fluid">
                <Link to="/home" class="navbar-brand justify-content-center" style={{ color: "#FF5833", textDecoration: "none" }}><h1><Link to="/home" style={{color:"black",textDecoration:"none"}}>Uba Riders</Link></h1></Link>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div class="navbar-nav ">
                        <Link to="/home" class="nav-link active" >Home</Link>
                        <Link to="/destination" class="nav-link active" >Destination</Link>
                        <Link to="/blog" class="nav-link active" >Blog</Link>
                        <Link to="/contact" class="nav-link active" >Contact</Link>

                        {
                            userData.email ? <p>{userData.displayName}</p> :
                                <Link to="/login" className="header-link" class="nav-link btn " style={{ background: "orange", color: "#fff", padding: "12px 20px", borderRadius: "5px" }}>
                                    Log In
                                </Link>
                        }

                    </div>
                </div>
            </div>
        </nav>
        </div>
    );
};

export default Header;