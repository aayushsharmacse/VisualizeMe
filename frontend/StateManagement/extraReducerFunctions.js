import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser=createAsyncThunk("user/signupUser",async(input,thunkAPI)=>{
    try{
        const response=await axios.post("http://localhost:4000/user/signup",input);
        console.log(response.data)
        return response.data;
    }
    catch(e){
        return thunkAPI.rejectWithValue(e.response.data) ;
    }
})

export const signinUser=createAsyncThunk("user/signinUser",async(input,thunkAPI)=>{
    try{
        console.log(thunkAPI)
        const response=await axios.post("http://localhost:4000/user/signin",input);
        console.log(response.data)
        return response.data;
    }
    catch(e){
        return thunkAPI.rejectWithValue(e.response.data);
    }
})

export const getportfoliosUser=createAsyncThunk("user/getportfolios",async(_,thunkAPI)=>{
    try{
        const response=await axios.get("http://localhost:4000/user/getuserportfolios"
            ,{
                headers:{
                    "Authorization":`Bearer ${thunkAPI.getState().user.accessToken}`
                }
            }
        )
        return response.data;
    }
    catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue(e.response.data);
    }
})

export const signoutUser=createAsyncThunk("user/signoutUser",async(_,thunkAPI)=>{
    try{
        const response=await axios.get("http://localhost:4000/user/signout",{
            headers:{
                "Authorization":`Bearer ${thunkAPI.getState().user.accessToken}`
            }
        })
        return response.data;
    }
    catch(e){
        return thunkAPI.rejectWithValue(e.response.data);
    }
})

export const createPortfolioByResumeUser=createAsyncThunk("user/createPortfolioByResumeUser",async(input,thunkAPI)=>{
    try{
        console.log("reached here at last")
        const response=await axios.post("http://localhost:4000/user/submitportfolioresume",input,{
            headers:{
                "Authorization":`Bearer ${thunkAPI.getState().user.accessToken}`
            }
        })
        return response.data;
    }
    catch(e){
        return thunkAPI.rejectWithValue(e.response.data);
    }
})

export const createPortfolioByFormUser=createAsyncThunk("user/createPortfolioByFormUser",async(input,thunkAPI)=>{
    try{
        const response=await axios.post("http://localhost:4000/user/submitportfolioform",input,{
            headers:{
                "Authorization":`Bearer ${thunkAPI.getState().user.accessToken}`
            }
        })
        return response.data;
    }
    catch(e){
        return thunkAPI.rejectWithValue(e.response.data);
    }
})