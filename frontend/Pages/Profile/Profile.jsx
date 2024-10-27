import "./Profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"; 
import {signoutUser} from "../../StateManagement/extraReducerFunctions.js";
import loader from "../../Loader/loader.gif";
export default function Profile(){
    const {userName,email,isLoading}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleChangeDetails=()=>{
        alert("This functionality is not developed yet :) ")
        // console.log("handleChangeDetails");
    }
    const handleLogout=async()=>{
        await dispatch(signoutUser());
        navigate("/");
    }
    if(isLoading){
        return (
            <div className="loaderDiv">
                <img className="loaderImg" src={loader} />
            </div>
        );
    }
    return(
        <div className="complete">
                <FontAwesomeIcon icon={faUserCircle} size="10x"/>
            <div className="details">
                <div className="inDetailsDivs">
                    <p>User Name :</p>
                    <p>{userName}</p>
                </div>
                <div className="inDetailsDivs">
                    <p>Email :</p>
                    <p>{email}</p>
                </div>
                <div className="inDetailsDivs btns">
                <button onClick={handleChangeDetails}>Change details</button>
                <button onClick={handleLogout}>Logout</button>
                </div>
                {/* <button>Delete Account</button> */}
            </div>
        </div>
    );
}