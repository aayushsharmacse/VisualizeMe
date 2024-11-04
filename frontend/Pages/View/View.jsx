import "./View.css";
import {useDispatch,useSelector} from "react-redux";
import { useState,useEffect } from "react";
import {getPortfoliosForView} from "../../StateManagement/extraReducerFunctions.js"
import img from "../../Logo/defaultImgageForView.jfif";
import {useNavigate} from "react-router-dom";
import loader from "../../Loader/loader.gif";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
export default function View(){
    const [data,setData]=useState([]);
    const dispatch=useDispatch();
    const {isLoading}=useSelector((state)=>state.user)
    const navigate=useNavigate();
    useEffect(()=>{
        const func=async()=>{
            try{
                const {payload:response}=await dispatch(getPortfoliosForView());
                console.log(response);
                if(response.success){
                    setData(response.result.data);
                }
                else{
                    alert(response.result.message);
                }
            }
            catch(e){
                console.log(e);
            }
        }
        func();
    },[]);
    const handleClick=(_id)=>{
        navigate(`/view/${_id}`);
    }
    if(isLoading){
        return (
            <div className="loaderDiv">
                <img className="loaderImg" src={loader} />
            </div>
        );
    }
    return (
        <div className="completeViewDiv">
               <div className="filters">
                    <div className="searchfilter">
                        <input type="text" placeholder="Search..."/>
                        <div className="searchIconDiv">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="ic"/>
                        </div>
                    </div>
                    <hr />
               </div>
               <div className="portfoliosDivAtView">
                {data && data.map((portfolio,index)=>{
                    return (
                        <div className="portfolioDivAtView" key={index} onClick={()=>handleClick(portfolio._id)}>
                            {/* <div className="userImage"> */}
                                {
                                portfolio.profileImage && portfolio.profileImage!="" && portfolio.profileImage.imageURI && portfolio.profileImage.imageURI!=""
                                ?
                                <img src={portfolio.profileImage.imageURI}/>
                                :
                                <img src={img}/>
                                }
                            {/* </div> */}
                            <div className="PortfolioDetailsSummaryDiv">
                                <p>{portfolio.userName? portfolio.userName : "## Unfilled name ##"}</p>
                                <p>{portfolio.profileImageCaption}</p>
                            </div>
                        </div>
                    );
                })}
               </div>
        </div>
    );
}