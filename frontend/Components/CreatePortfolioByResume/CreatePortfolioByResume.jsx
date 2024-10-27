import "./CreatePortfolioByResume.css";
import {useNavigate,useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import axios from "axios";
import {createPortfolioByResumeUser} from "../../StateManagement/extraReducerFunctions.js";
import {useDispatch, useSelector} from "react-redux";
import loader from "../../Loader/loader.gif"
export default function CreatePortfolioByResume(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {_id,isLoading}=useSelector(state=>state.user);
    const [resume,setResume]=useState();
    const handleUploadResume=async(e)=>{
        if(e.target.files && e.target.files?.length!==0){
            console.log(e.target.files[0])
            // console.log(resume)
            // console.log(e.target.files[0].name)
            // console.log(e.target.files[0].size)
            const formData = new FormData();
            formData.append(
                "resume",
                e.target.files[0],
                e.target.files[0].name
            );
            let parsedResume;
            try{
            const {payload:data}=await dispatch(createPortfolioByResumeUser(formData));
            // console.log(data);
            if(data.success===false){
                alert(data.result.message);
            }
            else{
                parsedResume=data.result;
                alert("Portfolio created successfully");
                navigate(`/user/${_id}`)
            }
                // console.log(response.data);
                // parsedResume=response.data.result;
                // alert("Portfolio created successfully");
                // navigate(`user/${useLocation().pathname.split('/')[2]}`)
            }catch(e){
                console.log(e);
            }
        }
    }
    if(isLoading){
        return (
            <div className="loaderDiv">
                <img className="loaderImg" src={loader} />
            </div>
        );
    }  
    return(
        <div className="completeCreatePortfolioByResumeDiv">
            <label>
            <div className="uploadResumeIconMainDiv" onClick={handleUploadResume}>
                <div className="uploadResumeIconDiv">
                <FontAwesomeIcon icon={faCloudArrowUp} size="10x" />
                <p>Upload your resume</p>
                </div>
                {/* <p>Upload yoy resume</p> */}
            </div>
            <br/>
            <br/>
                <input type="file" name="resume" className="inputResume" value={resume || ""} onChange={handleUploadResume}/>
            </label>
            <p> Upload your resume to quick visualize </p>
        </div>
    );
}