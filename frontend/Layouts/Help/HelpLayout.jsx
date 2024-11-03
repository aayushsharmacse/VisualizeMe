import { Outlet } from "react-router-dom";
import "./HelpLayout.css";
import { useSelector } from "react-redux";
import HelpOptions from "../../Components/HelpOptions/HelpOptions.jsx"; 
export default function HelpLayout(){
    const {userName}=useSelector((state)=>state.user);
    return (
        <div className="completeHelpLayoutDiv">
            <div className="headerTextForHelpLayoutDiv">
            {userName && <h1>Hi, there {userName}</h1>}
            <h2>Need some help? </h2>
            <h2>We are eager to help out.</h2>
            <hr/>
            </div>
            <HelpOptions/>
            <Outlet/>
        </div>
    );
}