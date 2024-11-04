import "./ViewPortfolio.css";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import loader from "../../Loader/loader.gif";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIdBadge} from "@fortawesome/free-regular-svg-icons";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {getsingleportfolioView} from "../../StateManagement/extraReducerFunctions.js";
import bg from "../../Logo/img2.jfif";
export default function ViewPortfolio(){
    const {isLoading,_id,isLoggedIn}=useSelector((state)=>state.user)
    const navigate=useNavigate();
    const {pathname}=useLocation();
    const portfolio=pathname.split("/")[2];
    const dispatch=useDispatch();
    const [resume,setResume]=useState({});
    const [contactDetails,setContactDetails]=useState({});
    const handleChange=(e)=>{
        setContactDetails({...contactDetails,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(contactDetails.name && contactDetails.email && contactDetails.message){
            try{
            await axios.post(`${import.meta.env.VITE_SERVER_URI}/mail/sendmail`,{...contactDetails,portfolio})
            }
            catch(e){
                alert(e);
            }
        }
        else{
            alert("Please fill all the fields");
        }
    }
    useEffect(()=>{
        const func=async()=>{
            try{
                const {payload:data}=await dispatch(getsingleportfolioView(portfolio))
                if(data.success===true){
                    setResume(data.result.userInfo);
                }
                else{
                    alert(data.result.message)
                    if(isLoggedIn){
                        navigate(`/user/${_id}`);
                    }
                }
            }
            catch(e){
                console.log(e);
                alert("Some error occured. Please contact support if the error persists.")
                if(isLoggedIn){
                    navigate(`/user/${_id}`);
                }
            }
        }
        func();
    },[])
    if(isLoading){
        return (
            <div className="loaderDiv">
                <img className="loaderImg" src={loader} />
            </div>
        );
    }  
    return( resume &&
            <div className="completeViewPortfolioDiv"
            // style={{ 
            //     height:"100%",
            //     backgroundImage: "url("+bg+")" ,
            //     backgroundAttachment:"fixed",
            //     backgroundSize: "100%",
            // }}
            >
                <div className="topProfile">
                    {resume.profileImage && resume.profileImage.imageURI &&
                    <div className="leftTopTopSlide">
                    <img src={resume.profileImage.imageURI} className="resumeProfileImageImageURI" />
                    </div>
                    }
                    {/* <div className="DivInBtw"></div> */}
                    <div className="rightTopBottomSlide">
                        {resume.userName && <h1 className="rightTopBottomSlideText">{resume.userName}</h1>}
                        {resume.profileImageCaption && <h3 className="rightTopBottomSlideText">{resume.profileImageCaption}</h3>}
                        {resume.profileImageSubCaption && <p className="rightTopBottomSlideText">{resume.profileImageSubCaption}</p>}
                    </div>
                </div>
                <div className="sections">
                    {resume.sections &&
                    resume.sections.map((section,sectionIndex)=>{
                        return(
                            // <div className="DivAboveSection">
                            <div key={sectionIndex} className="section">
                                <div className="sectionHeaderDiv">
                                {section.sectionHeader && <h1 className="sectionHeader">{section.sectionHeader}</h1>}
                                </div>
                                {/* <div className="DivAboveBullet"> */}
                                <div className="bullets">
                                {section.bullets 
                                && 
                                section.bullets.map((bullet,bulletIndex)=>{
                                    return (
                                            // bullet.bulletDisplayImage && bullet.bulletDisplayImage.imageURI 
                                            
                                            (
                                            <div key={bulletIndex} className="topprofileCSSreplacedbullt">
                                            {bullet.bulletDisplayImage && bullet.bulletDisplayImage.imageURI &&
                                            <div className="leftTopTopSlide">
                                            <img src={bullet.bulletDisplayImage.imageURI} className="resumeProfileImageImageURI" />
                                            </div>
                                            }
                                            {/* <div className="DivInBtw"></div> */}
                                            <div className="rightTopBottomSlide">
                                                {(bullet.bulletHeader && bullet.bulletHeaderURI && bullet.bulletHeaderURI!=="")
                                                ?
                                                <Link to={bullet.bulletHeaderURI} target="_blank" rel="noopener noreferrer">
                                                <h3 className="rightTopBottomSlideText bulletHeader">{bullet.bulletHeader}<FontAwesomeIcon icon={faArrowUpRightFromSquare} /></h3>
                                                </Link>
                                                :
                                                (bullet.bulletHeader && <h3 className="rightTopBottomSlideText bulletHeader">{bullet.bulletHeader}</h3>)
                                                }
                                                {bullet.bulletText && <p className="rightTopBottomSlideText">{bullet.bulletText}</p>}
                                            </div>
                                        </div>
                                            )
                                        // :
                                        // <div className="bullet">
                                        //     <div className="bulletHeader"><p>{bullet.bulletHeader}</p></div>
                                        //     <div className="bulletText"><p>{bullet.bulletText}</p></div>
                                        // </div>
                                    )
                                })
                                }
                                </div>
                                {/* </div> */}
                                {/* </div> */}
                            </div>
                        );
                    })
                    }
                </div>
                <div className="contactMe">
                    <div className="contactMeCaptions">
                        <p>Get in tough</p>
                        <FontAwesomeIcon className="icon" icon={faIdBadge} shake size="2x"/>
                    </div>
                    <div className="contactMeForm">
                        <form onSubmit={handleSubmit} >
                        <div><h3>Name:</h3>
                        </div>
                            <input name="name" onChange={handleChange} type="text"/>
                        <div><h3>Email:</h3></div>
                            <input name="email" onChange={handleChange} type="text"/>
                        <div><h3>Message:</h3></div>
                            <textarea name="message" onChange={handleChange} type="text"/>
                        <br/>
                        <br/>
                        <button type="submit" className="submitbtn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
    );
}