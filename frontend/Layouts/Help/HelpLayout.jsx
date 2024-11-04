import { Outlet } from "react-router-dom";
import "./HelpLayout.css";
import { useSelector } from "react-redux";
import HelpOptions from "../../Components/HelpOptions/HelpOptions.jsx"; 
import Footer from "../../Components/Footer/Footer.jsx"
import { useLocation } from "react-router-dom";
export default function HelpLayout(){
    const {userName}=useSelector((state)=>state.user);
    const {pathname}=useLocation();
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
            {/* {
                pathname==="/help" ?
                (
                    <div className="shiftToBottom">
                        <Footer/>
                    </div>
                )
                :
                (
                    <Footer/>
                )
            } */}
        </div>
    );
}