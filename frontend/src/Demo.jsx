import { useState,useReducer } from 'react'

const initialResume={
    userName: '',
    email: '',
    profileImage: null,
    profileImageCaption: '',
    profileImageSubCaption: '',
    sections:[]
}
const initialSection={
    sectionHeader:'',
    bullets:[]
}
const initalBullet={
    bulletDisplayImage:null,
    bulletHeader:'',
    bulletHeaderURI:'',
    bulletText:''
};

function resumeReducer(resume,action){
    switch(action.type){
        case "addSection":{
            return ({...resume, sections:[...resume.sections,{
              sectionHeader:'',
              bullets:[]
          }],
        })
        }
        case "resumetextinput":{
          return {...resume,[action.etarget.name]:action.etarget.name==="profileImage"?
            action.etarget.files[0]:action.etarget.value}
        }
        case "sectiontextinput":{
          return {...resume,sections:resume.sections.map((section,index)=>{
            if(index===action.index){
              return {...section,[action.etarget.name]:action.etarget.value}
            }
            else{
              return section;
            }
          })}
        }
        case "removeSection":
          return ({
            ...resume,
            sections:resume.sections.filter((_,index)=>index!==action.index)
        })
        case "addBullet":
            return ({
              ...resume,
              sections:resume.sections.map((section,index)=>{
                if(index===action.sectionIndex){
                  return {...section,
                  bullets:[...section.bullets,{
                    bulletDisplayImage:null,
                    bulletHeader:'',
                    bulletHeaderURI:'',
                    bulletText:''
                }]}
                }
                else{
                  return section;
                }
              })
        })
        case "bullettextinput":
          return({
            ...resume,
            sections:resume.sections.map((section,sectionIndex)=>{
              if(sectionIndex===action.sectionIndex){
                return {
                  ...section,
                  bullets:section.bullets.map((bullet,bulletIndex)=>{
                    if(bulletIndex==action.bulletIndex){
                      return {
                        ...bullet,
                        [action.etarget.name] :
                            action.etarget.name==="bulletDisplayImage"?action.etarget.files[0]:action.etarget.value
                      }
                    }
                    else{
                      return bullet;
                    }
                  })
                }
              }
              else{
                return section;
              }
            })
        })
        default:{
            throw Error(`${action.type} not found`);
        }
    }

}
function Demo() {
    
    const [resume,dispatch]=useReducer(resumeReducer,initialResume);

    // const [isEditingSection,setIsEditingSection]=useState(null);
  const handleSubmit=()=>{}

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
  return (
    <div style={{border:"2px solid red"}}>
     <form onSubmit={handleSubmit}>
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
          value={resume.profileImage || ""} 
          onChange={handleChange}
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
            return (<div key={index} style={{border:"2px solid blue"}}>
                <button type="button" style={{color:"blue"}} onClick={()=>handleRemoveSection(index)}>Remove Section -</button>
             <label>Enter your sectionHeader:
               <input 
                 type="text"
                 name="sectionHeader" 
                 value={section.sectionHeader || ""} 
                 onChange={(e)=>sectionhandleChange(e,index)}
               />
               </label>
               <br/>
               {section.bullets?.map((bullet,bulletIndex)=>{
                return(
                  <div key={bulletIndex} style={{border:"2px solid green"}}>
                    <label>Enter your bulletDisplayImage:
                      <input 
                        type="file" 
                        name="bulletDisplayImage" 
                        value={bullet.bulletDisplayImage || ""} 
                        onChange={(e)=>bulletHandleChange(e,bulletIndex,index)}
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
                      <input 
                        type="text" 
                        name="bulletText" 
                        value={bullet.bulletText || ""} 
                        onChange={(e)=>bulletHandleChange(e,bulletIndex,index)}
                      />
                      </label>
                      <br/>
                  <button onClick={handleSubmit}>tick for bullet</button>
                  </div>)
               })}
              <button type='button' style={{color:"green"}} onClick={()=>handleAddBullet(index)}>Add Bullet +</button>
             <input type='button' onClick={handleSubmit} value="tick for section"/>
             </div>);
        })
        }
        <button type='button' style={{color:"blue"}} onClick={handleAddSection}>Add Section +</button>



        <input type="submit" />
    </form>
    </div>
  )
}

export default Demo;
