import "./HelpOptions.css"
import { Link,useNavigate } from "react-router-dom";
export default function HelpOptions(){
    const navigate=useNavigate();
    const handleClickToFaq=()=>{
        navigate("/help/faq")
    }
    const handleClickToContact=()=>{
        navigate("/help/contact")
    }
    return (
        <div className="completeHelpOptionsDiv">
            <div className="OptionsToHelp">
                <button onClick={handleClickToFaq}>FAQ</button>
                <button onClick={handleClickToContact}>Contact the dev</button>
            </div>
        </div>
    );
}