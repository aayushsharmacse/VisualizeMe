import { useEffect, useState } from "react";
import "./MainDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import {getportfoliosUser} from "../../StateManagement/extraReducerFunctions.js";
import loader from  "../../Loader/loader.gif"
export default function MainDashboard(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {_id,isLoading}=useSelector((state)=>state.user);
    const [data,setData]=useState([]);
    const {accessToken}=useSelector((state)=>state.user);    
    useEffect(()=>{
        const func=async()=>{
            try{
            const {payload:data}= await dispatch(getportfoliosUser());
            if(data.success===false){
                alert(data.result.message);
            }
            else if(!data.result.userInfo){
                console.log("No user portfolios found")
                navigate(`/user/${_id}/createportfolio`)
            }
            else{
                setData([data.result.userInfo]);
            }
            }
            catch(e){
                console.log(e);
            }
        }
        func();
        console.log(data);
    },[])
    if(isLoading){
        return (
            <div className="loaderDiv">
                <img className="loaderImg" src={loader} />
            </div>
        );
    }  
    return(
        <div className="completeMainDashboardDiv">
            {data.length!==0 &&
            data.map((portfolio,index)=>{
                return (
                    <div key={index} className="portfolioDiv">
                        <button className="goToPortfolio">
                            Portfolio {portfolio}
                        </button>
                        <button className="kill">
                            Delete <FontAwesomeIcon icon={faSkullCrossbones} size="2x" />    
                        </button>
                    </div>
                );
            })
        }
        </div>
    );
}