import { useState } from "react";
import "./ContactForm.css"
import axios from "axios";
import {useSelector} from "react-redux";
export default function ContactForm(){
    const [mail,setMail]=useState({contact:"",message:"",name:""});
    const accessToken=useSelector((state)=>state.user);
    const handleChange=(e)=>{
        setMail({...mail,[e.target.name]:e.target.value});
    }
    const handleSubmit=async()=>{
        console.log(mail);
        if(mail.contact.trim()!="" && mail.message.trim()!="" && mail.name.trim()!=""){
            try{
            await axios.post(`http://localhost:4000/user/sendmail`,mail)
            }
            catch(e){
                alert(e);
            }
        }
        else{
            alert("Please fill all the fields")
        }
    }
    return (
        <div className="contactFormDiv">
            <h3>Feedbacks? Request some feature? Contribute? Contact right now!!</h3>
            <h4>Also if you have any job or internship opportunites for dev 😜</h4>
            <div className="myForm">
                <div className="inputField">
                    <div className="label">Name</div>
                    <div className="input">
                        <input type="text" name="name" value={mail.name} onChange={handleChange}/>
                    </div>
                </div>
                <div className="inputField">
                    <div className="label">Email/Phone</div>
                    <div className="input">
                        <input type="text" name="contact" value={mail.contact} onChange={handleChange}/>
                    </div>
                </div>
                <div className="inputField">
                    <div className="label">Message</div>
                    <div className="input">
                        <textarea name="message" value={mail.message} onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <div className="buttonDiv">
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}