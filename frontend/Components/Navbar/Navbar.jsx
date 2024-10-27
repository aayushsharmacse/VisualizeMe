import { NavLink } from "react-router-dom";
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
export default function Navbar(){

    const {isLoggedIn,_id}=useSelector((state)=>state.user);
    const [isopen,setIsopen]=useState(false);
    const navLinksDiv=useRef();
    const handleClick=(e)=>{
        navLinksDiv.current.classList.toggle("hideORdisplaynav");
        navLinksDiv.current.parentElement.classList.toggle("completeDiv");
        navLinksDiv.current.parentElement.parentElement.classList.toggle("parentofcompleteDiv");
        setIsopen(!isopen);
    }
    return(
        //  completeDiv
        <div>
            <div className="mobileDiv" onClick={handleClick}>
            {!isopen? <FontAwesomeIcon icon={faBars} size="2x"/>
            : <FontAwesomeIcon icon={faXmark} size="2x"/>
            }
            </div>
            <div className="nav hideORdisplaynav" ref={navLinksDiv}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="help">Help</NavLink>
                <NavLink to="view">Explore</NavLink>
                <NavLink to="about">About</NavLink>
                {isLoggedIn? <NavLink to={`user/${_id}`} >Dashboard</NavLink> : <NavLink to="signin">Signin/Signup</NavLink>}
                {/* <NavLink to="signup">Signup</NavLink> */}
            </div>
        </div>
    );
}