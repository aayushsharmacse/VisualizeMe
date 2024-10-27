import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./SigninOrSignup.css";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { signupUser,signinUser } from "../../StateManagement/extraReducerFunctions.js";
import { setUserSignInput } from "../../StateManagement/userSlice.js";
import loader from "../../Loader/loader.gif";
export default function SigninOrSignup(){
    console.log("again")
    const dispatch=useDispatch();
    const path=useLocation();
    const {isLoading}=useSelector((state)=>state.user);
    const {userSignInput}=useSelector((state)=>state.user);
    const [signinOrsignup,setSigninORsignup]=useState(path.pathname.slice(1));
    const [input,setInput]=useState({});
    const handleChange=(e)=>{
        console.log(input)
        setInput({...input,[e.target.name]:e.target.value});
    }
    useEffect(()=>{
        setInput({});
    },[signinOrsignup])
    useEffect(()=>{
        setSigninORsignup(path.pathname.slice(1));
    },[path.pathname.slice(1)])
    useEffect(()=>{
        setInput(userSignInput);
    },[])
    const navigate=useNavigate();
    const handleSubmitSignup=async()=>{
        try{
            dispatch(setUserSignInput(input));
            const {payload}=await dispatch(signupUser(input));
            if(payload.success===false){
                alert(payload.result.message);
                return;
            }
            console.log("everything was fine")
            setSigninORsignup("signin");
            navigate("../signin");
        }
        catch(e){
            console.log(e)
        }
    }
    const handleSubmitSignin=async()=>{
        try{
            dispatch(setUserSignInput(input))
            const {payload:data}=await dispatch(signinUser(input));
            if(data.success===false){
                alert(data.result.message);
                return;
            }
            navigate(`/user/${data.result._id}`);
        }
        catch(e){
            console.log(e);
        }
    }
    if(isLoading){
        return (
            <div className="loaderDiv">
                <img className="loaderImg" src={loader} />
            </div>
        );
    }
    return(
        <>
            <div className="mainSignDiv">
                <h1>{signinOrsignup==='signin'?
                "Sign In" : "Sign Up"}</h1>
                <div className="inputfields">
                    {
                    signinOrsignup==='signup'&&
                    <>
                    <h4>Username</h4>
                    <input type="text" name="userName" value={input.userName || ""} onChange={handleChange}/>
                    </>
                    }
                    <h4>Email</h4>
                    <input type="email" name="email" value={input.email || ""} onChange={handleChange}/>
                    <h4>Password</h4>
                    <input type="password" name="password" value={input.password || ""} onChange={handleChange}/>
                    <br/>
                    <input  className="submitBtn" type="submit" onClick={signinOrsignup==='signin'? handleSubmitSignin : handleSubmitSignup} />
                </div>
                <div className="changesign">
                    {
                    signinOrsignup==='signin'
                    ?
                    <Link to="../signup" onClick={()=>{setSigninORsignup("signup")}}>Sign Up instead</Link>
                    :
                    <Link to="../signin" onClick={()=>{setSigninORsignup("signin")}}>Sign in instead</Link>
                    }
                </div>
            </div>
        </>
    );
}