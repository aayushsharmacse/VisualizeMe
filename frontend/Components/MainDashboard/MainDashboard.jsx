import { useEffect, useState } from "react";
import "./MainDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHandSparkles, faLink, faMagicWandSparkles, faSkullCrossbones, faSprayCanSparkles } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import {getportfoliosUser,deletePortfolioUser} from "../../StateManagement/extraReducerFunctions.js";
import loader from  "../../Loader/loader.gif"
export default function MainDashboard(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {_id,isLoading}=useSelector((state)=>state.user);
    const [data,setData]=useState([]);
    const {accessToken}=useSelector((state)=>state.user);
    const handleKill=async(portfolio)=>{
        console.log("entered to kill")
        try{
            console.log("portfolio",portfolio)
            const {payload:data}=await dispatch(deletePortfolioUser(portfolio));
            console.log("deleted",data)
            if(data.success==false){
                alert(data.result.message);
            }
            else if(!data.result.userInfo || data.result.userInfo.length===0){
                navigate(`/user/${_id}/createportfolio`)
            }
            else{
                setData(data.result.userInfo);
            }
        }
        catch(e){
            console.log(e);
        }
    }
    const handleEdit=(portfolio)=>{
        navigate(`/user/${_id}/edit/${portfolio}`);
    }
    useEffect(()=>{
        const func=async()=>{
            try{
                console.log("call to get portfolios")
            const {payload:data}= await dispatch(getportfoliosUser());
            if(data.success===false){
                alert(data.result.message);
            }
            else if(!data.result.userInfo){
                console.log("No user portfolios found")
                navigate(`/user/${_id}/createportfolio`)
            }
            else{
                console.log("found",data.result.userInfo)
                setData(data.result.userInfo);
            }
            }
            catch(e){
                console.log(e);
            }
        }
        func();
        console.log(data);
    },[])
    const handlegoToPortfolio=(portfolio)=>{
        navigate(`/view/${portfolio}`);
    }
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
                        <button className="goToPortfolio" onClick={()=>handlegoToPortfolio(portfolio)}>
                            <p>Portfolio {portfolio}</p>
                        </button>
                        <button className="edit" onClick={(e)=>handleEdit(portfolio)}>
                            <p><FontAwesomeIcon icon={faEdit} size="1.5x"/></p>
                        </button>
                        {console.log(index)}
                        <button className="kill" onClick={(e)=>handleKill(portfolio)}>
                            <p>Delete</p> <FontAwesomeIcon icon={faSkullCrossbones} size="1.5x" />    
                        </button>
                    </div>
                );
            })
            }
            {/* <br/>
            <br/>
            <br/> */}
            <div className="createAnotherDiv">
                <h4>Want to create another??</h4>
                <h3>Here you go, Visualize yourself differently <FontAwesomeIcon icon={faSprayCanSparkles} /></h3>
                <Link to={`/user/${_id}/createportfolio`} ><h3>
                Create another <FontAwesomeIcon icon={faLink}/>
                </h3></Link>
            </div>
        </div>
    );
}