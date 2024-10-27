import "./CreatePortfolioByForm.css";
import { useState,useReducer, useRef } from 'react';
import resumeReducer from "./resumeReducer.js";
import initialResume from "./initialStates/initialResume.js";
import initialSection from "./initialStates/initialSection.js";
import initalBullet from "./initialStates/initalBullet.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import { createPortfolioByFormUser } from "../../StateManagement/extraReducerFunctions.js";
export default function CreatePortfolioByForm(){
  const [resume,dispatch]=useReducer(resumeReducer,initialResume);
  const reduxDispatch=useDispatch();
    // const inputImgs=useRef();
    // const [isEditingSection,setIsEditingSection]=useState(null);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(resume)
    const data=await reduxDispatch(createPortfolioByFormUser());
    console.log(data);
  }

  const handleImgChange=(e,maybe_bulletIndex,maybe_sectionIndex)=>{
    if(e.target.name==="profileImage"){
      const file=e.target.files[0];
      if(file){
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
                <label>Enter your Profile Image:
                    <input 
                    type="file" 
                    name="profileImage" 
                    // value={resume.profileImage || ""} 
                    onChange={(e)=>handleImgChange(e,-1,-1)}
                    accept="image/*"
                    />
                    </label>
                    <br/>
                    <label>Enter your Profile Image Caption:
                    <input 
                    type="text" 
                    name="profileImageCaption" 
                    value={resume.profileImageCaption || ""} 
                    onChange={handleChange}
                    />
                    </label>
                    <br/>
                    <label>Enter your Profile Image Sub Caption:
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
                        {console.log(section,"found")}
                        <input 
                            type="text"
                            name="sectionHeader" 
                            value={section.sectionHeader || ""} 
                            onChange={(e)=>sectionhandleChange(e,index)}
                        />
                        </label>
                        <br/>
                        {console.log(section.bullets)}
                        {section.bullets?.map((bullet,bulletIndex)=>{
                            return(
                            <div className="bulletDiv" key={bulletIndex}>
                              <button type="button" className="crossIconForBulletsButton" onClick={(e)=>handleRemoveBullet(bulletIndex,index)}>
                              <FontAwesomeIcon icon={faSquareXmark} size="2x" style={{color: "#ff2424",}} />
                              </button>
                                <label>Enter your bulletDisplayImage:
                                <input 
                                    type="file" 
                                    name="bulletDisplayImage" 
                                    // value={bullet.bulletDisplayImage || ""} 
                                    onChange={(e)=>handleImgChange(e,bulletIndex,index)}
                                    accept="image/*"
                                />
                                </label>
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