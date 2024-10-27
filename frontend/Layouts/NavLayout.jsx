import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.jsx"
import "./NavLayout.css"
import loader from "../Loader/loader.gif"
import { useSelector } from "react-redux";
export default function NavLayout(){
    const {isLoading}=useSelector((state)=>state.user);
    // if(isLoading){
    //     return (
    //         <div className="loaderDiv">
    //             <img className="loaderImg" src={loader} />
    //         </div>
    //     );
    // }
    return(
        <div className="completeDiv">
        <Navbar/>
        <Outlet/>
        </div>
    );
}
