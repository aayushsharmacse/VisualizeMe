import "./CreatePortfolioLayout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faFaceGrinStars} from "@fortawesome/free-regular-svg-icons"
import { Outlet, useNavigate } from "react-router-dom";
// import { useState } from "react";
export default function CreatePortfolioLayout(){
    // const [visualizeOption,setVisualizeOption]=useState(null);
    const navigate=useNavigate();
    return(
        <div className="completeCreatePortfolioLayoutDiv">
            <h4><FontAwesomeIcon icon={faEye} size="1x"/> 
            Visualize yourself!</h4>
            <p>Use our powerful visualizer, portfolio maker
            to impress your viewers!
            </p>
            <p>Be it just not text that your viewer sees but rather yourself</p>
            <br/>
            <FontAwesomeIcon icon={faFaceGrinStars} size="3x"/>
            <br/>
            <div className="createPortfolioOptions">
                <button onClick={()=>navigate("./form",{relative:"path"})}>Full Visualize</button>
                <button onClick={()=>navigate("./resume",{relative:"path"})}>Quick Visualize</button>
            </div>
            <br/>
            <Outlet/>
        </div>
    );
}