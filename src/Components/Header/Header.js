import { Link } from 'react-router-dom';
import "./Header.css"
import React, { useContext } from "react";
import { UserContext } from '../../App';
const Header = () => {
    const [userData,setUserData] = useContext(UserContext)
    return (
        <div className="headerContainer">
            
            <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container container-fluid">
                <Link to="/home" className="navbar-brand justify-content-center" style={{ color: "#FF5833", textDecoration: "none" }}><h1><Link to="/home" style={{color:"black",textDecoration:"none"}}>Uba Riders</Link></h1></Link>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav  headerNav">
                        <Link to="/home" className="nav-link active headerLink">Home</Link>
                        <Link to="/destination" className="nav-link active headerLink">Destination</Link>

                        <Link to="/blog" className="nav-link active headerLink">Blog</Link>
                        <Link to="/contact" className="nav-link active headerLink">Contact</Link>
                        {
                            userData.email ? <Link style={{paddingTop:'8px'}}>{userData.displayName}</Link>  :
                                <Link to="/login" className="btn" style={{ background: "orange", color: "#fff", padding: "12px 20px", borderRadius: "5px" }}>
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