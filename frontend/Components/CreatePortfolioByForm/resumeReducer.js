
export default function resumeReducer(resume,action){
    console.log(action.type)
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
        case "resumeimageinput":{
            return {...resume,profileImage:action.etargetfile}
        }
        case "bulletimageinput":{
          console.log(action)
          return {...resume,
            sections:resume.sections.map((section,sectionIndex)=>{
              if(sectionIndex===action.maybe_sectionIndex){
                return {...section,
                  bullets:section.bullets.map((bullet,bulletIndex)=>{
                    if(bulletIndex===action.maybe_bulletIndex){
                      return {...bullet,bulletDisplayImage:action.etargetfile}
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
          };
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
        case "removeSection":{
          return ({
            ...resume,
            sections:resume.sections.filter((_,index)=>index!==action.index)
        })
        }
        case "addBullet":{
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
        }
        case "removeBullet":{
          console.log("request received to remove a bullet")
          console.log("current resume=",resume)
          console.log("Action=",action)
          console.log("will be after it resume",{
            ...resume,
            sections:resume.sections.map((section,sectionIndex)=>{
              if(sectionIndex===action.sectionIndex){
                return {
                  ...section,
                  bullets: section.bullets.filter((bullet,bulletIndex)=>{
                    return bulletIndex!==action.bulletIndex;
                  })
                }
              }
              else{
                return section;
              }
            })
          })
          return ({
            ...resume,
            sections:resume.sections.map((section,sectionIndex)=>{
              if(sectionIndex===action.sectionIndex){
                return {
                  ...section,
                  bullets: section.bullets.filter((bullet,bulletIndex)=>{
                    return bulletIndex!==action.bulletIndex;
                  })
                }
              }
              else{
                return section;
              }
            })
          })
        }
        case "bullettextinput":{
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
        }
        default:{
            throw Error(`${action.type} not found`);
        }
    }
}