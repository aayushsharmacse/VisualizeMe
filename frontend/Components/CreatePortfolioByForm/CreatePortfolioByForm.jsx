import "./CreatePortfolioByForm.css";
import { useState,useReducer, useRef, useEffect } from 'react';
import resumeReducer from "./resumeReducer.js";
import initialResume from "./initialStates/initialResume.js";
import initialSection from "./initialStates/initialSection.js";
import initalBullet from "./initialStates/initalBullet.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCross, faExchange, faSkullCrossbones, faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch,useSelector} from "react-redux";
import { createPortfolioByFormUser } from "../../StateManagement/extraReducerFunctions.js";
import loader from "../../Loader/loader.gif"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
export default function CreatePortfolioByForm(){
  const [resume,dispatch]=useReducer(resumeReducer,initialResume);
  const {pathname}=useLocation();
  const reduxDispatch=useDispatch();
  const {isLoading,_id,accessToken}=useSelector((state)=>state.user);
  const [a,b,c,isEdit,portfolio]=pathname.split("/")
  const navigate=useNavigate();
    useEffect(()=>{
      const func=async()=>{
        try{
        if(isEdit==='edit'){
            const {data:{result:{userInfo}}}=await axios.get(`${import.meta.env.VITE_SERVER_URI}/view/getsingleuserportfolio/${portfolio}`)
            dispatch({type:"updateResume",userInfo:userInfo})
          }
        }
        catch(e){console.log(e)}
      }
      func();
    },[])
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const resumeCopy={...resume};
    const bulletImages=resumeCopy.bulletImages;
    delete resumeCopy.bulletImages;
    let profileImage;
    const formData=new FormData();
    if(resumeCopy.profileImage instanceof File){
      profileImage=resumeCopy.profileImage;
      resumeCopy.profileImage="";
      formData.append("profileImage",profileImage);
    }
    // else{
      // console.log("no changes in profile img")
    // }
    formData.append("portfolio",JSON.stringify(resumeCopy));
    bulletImages.forEach(bulletImage => {
      formData.append(bulletImage[0],bulletImage[1])
    });
    // console.log(formData)
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }
    try{
      const {payload: data}=await reduxDispatch(createPortfolioByFormUser(formData))
      if(data.success===false){
        alert(data.result.message);
      }
      else{
        if(isEdit==='edit'){
          alert("Portfolio edited successfully");
        }
        else{
          alert("Portfolio created successfully");
        }
        // console.log("now starting to navigate")
        navigate(`/user/${_id}`);
      }
    }
    catch(e){
      console.log(e);
    }
  }
  const handleImgChange=(e,maybe_bulletIndex,maybe_sectionIndex)=>{
    if(e.target.name==="profileImage"){
      const file=e.target.files[0];
      if(file){
        // console.log("entered here to handleImgchange for profile")
        dispatch({type:"resumeimageinput",etargetfile:file})
      }
    }
    else{
      const file=e.target.files[0];
      if(file){
        dispatch({type:"bulletimageinput",etargetfile:file,maybe_bulletIndex,maybe_sectionIndex});
      }
    }
  }
  // const UpdateResume=(e)=>{
  //   dispatch({type:"updateResume",resume:})
  // }
  const handleChange=(e)=>{
    dispatch({type:"resumetextinput",etarget:e.target})
  }
  const sectionhandleChange=(e,index)=>{
    dispatch({type:"sectiontextinput",etarget:e.target,index:index})
  }
  const handleAddSection=()=>{
    dispatch({type:"addSection",iseditingsection:-1});
  }
  const handleRemoveSection=(index)=>{
    dispatch({type:"removeSection",index:index})
  }
  const handleAddBullet=(sectionIndex)=>{
    dispatch({type:"addBullet",sectionIndex:sectionIndex})
  }
  const bulletHandleChange=(e,bulletIndex,sectionIndex)=>{
    dispatch({type:"bullettextinput",bulletIndex:bulletIndex, sectionIndex:sectionIndex,etarget:e.target})
  }
  const handleRemoveBullet=(bulletIndex,sectionIndex)=>{
    dispatch({type:"removeBullet",bulletIndex:bulletIndex,sectionIndex:sectionIndex})
  }
  const handleEditRemoveProfileImg=()=>{
    dispatch({type:"removeProfileImg"})
  }
  const handleEditRemoveBulletImg=(bulletIndex,index)=>{
    dispatch({type:"removeBulletImg",bulletIndex:bulletIndex,sectionIndex:index})
  }
  if(isLoading){
    return (
        <div className="loaderDiv">
            <img className="loaderImg" src={loader} />
        </div>
    );
  } 
    return (
        <div className="completeFormDiv">
            <form method="post" onSubmit={handleSubmit}>
                <label>Enter your name:
                <input 
                    type="text" 
                    name="userName" 
                    value={resume.userName || ""} 
                    onChange={handleChange}
                />
                </label>
                <br/>
                <label>Enter your email:
                    <input 
                    type="text" 
                    name="email" 
                    value={resume.email || ""} 
                    onChange={handleChange}
                    />
                    </label>
                <br/>
                {resume.profileImage && resume.profileImage.imageURI && resume.profileImage.imageURI!="" 
                ?
                (
                  <>
                <label className="imgLabel">Change your Profile Image 
                  <FontAwesomeIcon icon={faExchange} color="green"/>
                    <input 
                    type="file" 
                    name="profileImage"
                    // value={resume.profileImage || ""} 
                    onChange={(e)=>handleImgChange(e,-1,-1)}
                    accept="image/*"
                    />
                    </label>
                    <label className="imgLabel" onClick={handleEditRemoveProfileImg}>Remove your Profile Image:
                    <FontAwesomeIcon icon={faSkullCrossbones} color="red"/>
                      </label>
                  </>
                    ) 
                    :
                    <label>Enter your Profile Image:
                    <input 
                    type="file" 
                    name="profileImage"
                    // value={resume.profileImage || ""} 
                    onChange={(e)=>handleImgChange(e,-1,-1)}
                    accept="image/*"
                    />
                    </label>
                    }
                    <br/>
                    <label>Enter your title:
                    <input 
                    type="text" 
                    name="profileImageCaption" 
                    value={resume.profileImageCaption || ""} 
                    onChange={handleChange}
                    />
                    </label>
                    <br/>
                    <label>Enter your title Sub Caption:
                    <input 
                    type="text" 
                    name="profileImageSubCaption" 
                    value={resume.profileImageSubCaption || ""} 
                    onChange={handleChange}
                    />
                    </label>
                    <br/>
                    {resume.sections.map((section,index)=>{
                        return (<div className="sectionDiv"  key={index} >
                            <button type="button" onClick={()=>handleRemoveSection(index)}>Remove Section -</button>
                        <label>Enter your sectionHeader:
                        {/* {console.log(section,"found")} */}
                        <input 
                            type="text"
                            name="sectionHeader" 
                            value={section.sectionHeader || ""} 
                            onChange={(e)=>sectionhandleChange(e,index)}
                        />
                        </label>
                        <br/>
                        {/* {console.log(section.bullets)} */}
                        {section.bullets?.map((bullet,bulletIndex)=>{
                            return(
                            <div className="bulletDiv" key={bulletIndex}>
                              <button type="button" className="crossIconForBulletsButton" onClick={(e)=>handleRemoveBullet(bulletIndex,index)}>
                              <FontAwesomeIcon icon={faSquareXmark} size="2x" style={{color: "#ff2424",}} />
                              </button>
                              {bullet.bulletDisplayImage && 
                              bullet.bulletDisplayImage.imageURI
                               ?
                                (
                                  <>                                  
                                <label className="imgLabel">Change your bulletDisplayImage:
                                <FontAwesomeIcon icon={faExchange} color="green"/>
                                <input
                                    type="file"
                                    name={`bulletDisplayImage_${index}_${bulletIndex}`} 
                                    // value={bullet.bulletDisplayImage || ""} 
                                    onChange={(e)=>handleImgChange(e,bulletIndex,index)}
                                    accept="image/*"
                                />
                                </label>
                                <label className="imgLabel" onClick={()=>handleEditRemoveBulletImg(bulletIndex,index)}>Remove your Bullet display Image:
                                <FontAwesomeIcon icon={faSkullCrossbones} color="red"/>
                                  </label>
                                  </>
                                )
                                :
                                (
                                <label>Enter your bulletDisplayImage:
                                <input 
                                    type="file" 
                                    name={`bulletDisplayImage_${index}_${bulletIndex}`} 
                                    // value={bullet.bulletDisplayImage || ""} 
                                    onChange={(e)=>handleImgChange(e,bulletIndex,index)}
                                    accept="image/*"
                                />
                                </label>
                                )
                                }
                                <br/>
                            
                                <label>Enter your bulletHeader:
                                <input 
                                    type="text" 
                                    name="bulletHeader" 
                                    value={bullet.bulletHeader || ""} 
                                    onChange={(e)=>bulletHandleChange(e,bulletIndex,index)}
                                />
                                </label>
                                <br/>
                            
                                <label>Enter your bulletHeaderURI:
                                <input 
                                    type="text" 
                                    name="bulletHeaderURI" 
                                    value={bullet.bulletHeaderURI || ""} 
                                    onChange={(e)=>bulletHandleChange(e,bulletIndex,index)}
                                />
                                </label>
                                <br/>
                            
                                <label>Enter your bulletText:
                                <textarea 
                                    type="text" 
                                    name="bulletText" 
                                    value={bullet.bulletText || ""} 
                                    onChange={(e)=>bulletHandleChange(e,bulletIndex,index)}
                                />
                                </label>
                                <br/>
                            {/* <button onClick={handleSubmit}>tick for bullet</button> */}
                            </div>)
                        })}
                        <button type='button' onClick={()=>handleAddBullet(index)}>Add Bullet +</button>
                        {/* <input type='button' onClick={handleSubmit} value="tick for section"/> */}
                        </div>);
                    })
                    }
                    <button type='button' onClick={handleAddSection}>Add Section +</button>
                    <br/>
                    <button type="submit"> Submit </button>
                </form>
        </div>
    );
}