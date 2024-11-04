import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser=createAsyncThunk("user/signupUser",async(input,thunkAPI)=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_SERVER_URI}/user/signup`,input);
        return response.data;
    }
    catch(e){
        return thunkAPI.rejectWithValue(e.response.data) ;
    }
})

export const signinUser=createAsyncThunk("user/signinUser",async(input,thunkAPI)=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_SERVER_URI}/user/signin`,input);
        return response.data;
    }
    catch(e){
        return thunkAPI.rejectWithValue(e.response.data);
    }
})

export const getportfoliosUser=createAsyncThunk("user/getportfolios",async(_,thunkAPI)=>{
    try{
        const response=await axios.get(`${import.meta.env.VITE_SERVER_URI}/user/getuserportfolios`
            ,{
                headers:{
                    "Authorization":`Bearer ${thunkAPI.getState().user.accessToken}`
                }
            }
        )
        return response.data;
    }
    catch(e){
        // console.log(e)
        return thunkAPI.rejectWithValue(e.response.data);
    }
})

export const signoutUser=createAsyncThunk("user/signoutUser",async(_,thunkAPI)=>{
    try{
        const response=await axios.get(`${import.meta.env.VITE_SERVER_URI}/user/signout`,{
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
        const response=await axios.post(`${import.meta.env.VITE_SERVER_URI}/user/submitportfolioresume`,input,{
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
        const response=await axios.post(`${import.meta.env.VITE_SERVER_URI}/user/submitportfolioform`,input,{
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

export const deletePortfolioUser=createAsyncThunk("user/deletePortfolioUser",async(input,thunkAPI)=>{
    try{
        const response=await axios.delete(`${import.meta.env.VITE_SERVER_URI}/user/deleteportfolio/${input}`,{
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

export const getPortfoliosForView=createAsyncThunk("user/getPortfoliosForView",async(input,thunkAPI)=>{
    try{
        const response=await axios.get(`${import.meta.env.VITE_SERVER_URI}/view/getportfoliosforview`)
        return response.data;
    }
    catch(e){
        return thunkAPI.rejectWithValue(e.response.data);
    }
})

export const getsingleportfolioView=createAsyncThunk("user/getsingleportfolioView",async(input,thunkAPI)=>{
    try{
        const response=await axios.get(`${import.meta.env.VITE_SERVER_URI}/view/getsingleuserportfolio/${input}`)
        return response.data;
    }
    catch(e){
        return thunkAPI.rejectWithValue(e.response.data);
    }
})