import "./Dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function Dashboard(){
    const navigate=useNavigate();
    const {_id}=useSelector((state)=>state.user);
    const handleClick=(e)=>{
        navigate(`/user/${_id}/profile`);
    }
    return (
        <div className="complete">
            <div className="dashboard">
                <div>
                    <h1>Welcome back user</h1>
                    <h3>Number of clicks - 3</h3>
                </div>
                <div className="userProfileDiv">
                    <FontAwesomeIcon icon={faUserCircle} size="10x"/>
                    <button onClick={handleClick}>Edit account details</button>
                </div>
            </div>
            <br/>
            <hr/>
            <br/>
            {/* <button onClick={()=>{navigate("/signup")}}>vgbhjsx</button> */}
            {/* <div className="createPortfolioOptions">
                div.createPortfolio
            </div> */}
            <Outlet/>
        </div>
    );
}