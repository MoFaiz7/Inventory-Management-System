import React from 'react'
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import Button from 'react-bootstrap/Button';
import { useAuthContext } from '../hooks/useAuthContext';
import './Navb.css'
import '../App.css'

const Navb = () => {
    const logo = "https://logos-download.com/wp-content/uploads/2019/11/Indian_Railway_Logo_2.png";
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    }

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-light d-flex justify-content-between" style={{ marginBottom: "20px" }}>
                <a className="navbar-brand" href="">
                    <img src={logo} width="30" height="30" style={{ "margin": "10px 25px" }} alt="Indian Railways" />
                    <Link to="" className="navbar-brand">Inventory Management System</Link>
                </a>




                {user && (<div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">About</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/list" className="nav-link">Current Stock</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/update" className="nav-link">Modify</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Feed Items</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/remove" className="nav-link">Remove Items</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/shortage" className="nav-link">Shortage</Link>
                        </li>
                    </ul>
                </div>)}
                {user && (<div className='btnsPanel'>
                    <span>{user.user}</span>
                    <Button variant="danger" style={{borderRadius: "2rem"}} onClick={handleLogout} >Log Out</Button></div>)}
                {!user && (<div className='d-flex' >
                    <Button variant="primary" className='d-flex justify-content-center align-items-center' style={{borderRadius: "2rem", margin: "0 10px"}} ><Link to="/signup" className="navbar-brand" style={{ color: "white", fontSize: "15px", margin: 0, "padding": "0px 15px" }} >Sign Up</Link></Button>
                    <Button variant="primary" className='d-flex justify-content-center align-items-center' style={{borderRadius: "2rem"}}  ><Link to="/login" className="navbar-brand" style={{ color: "white", fontSize: "15px", margin: 0, "padding": "0px 15px" }} >Login</Link></Button>
                    
                </div>)}
            </nav>
        </div>
    )
}

export default Navb