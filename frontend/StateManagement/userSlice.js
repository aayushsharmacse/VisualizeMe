import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {signupUser,signinUser,getportfoliosUser,
    signoutUser,createPortfolioByResumeUser,createPortfolioByFormUser,
    deletePortfolioUser } from "./extraReducerFunctions.js"

const initialState={
    userName:"",
    email:"",
    _id:"",
    accessToken:"",
    isLoggedIn:false,
    isLoading:false,
    userSignInput:{},
    userportfolios:[]
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            // console.log(action.payload)
            state.userName=action.payload.userName;
            state.email=action.payload.email;
            state._id=action.payload._id;
            state.accessToken=action.payload.accessToken
        },
        setUserSignInput:(state,action)=>{
            state.userSignInput=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(signupUser.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(signupUser.fulfilled,(state,action)=>{
                state.userName=action.payload.result.userName;
                state.email=action.payload.result.email;
                state.isLoading=false;
            })
            .addCase(signupUser.rejected,(state)=>{
                state.isLoading=false;
            })
            .addCase(signinUser.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(signinUser.fulfilled,(state,action)=>{
                const {userName,email,_id,accessToken}=action.payload.result;
                state.userName=userName;
                state.email=email;
                state._id=_id;
                state.accessToken=accessToken;
                state.isLoading=false;
                state.isLoggedIn=true;
            })
            .addCase(signinUser.rejected,(state)=>{
                state.isLoading=false;
            })
            .addCase(getportfoliosUser.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getportfoliosUser.fulfilled,(state,action)=>{
                state.isLoading=false;
            })
            .addCase(getportfoliosUser.rejected,(state)=>{
                state.isLoading=false;
            })
            .addCase(signoutUser.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(signoutUser.fulfilled,(state,action)=>{
                return initialState;
            })
            .addCase(signoutUser.rejected,(state)=>{
                state.isLoading=false;
            })
            .addCase(createPortfolioByResumeUser.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(createPortfolioByResumeUser.fulfilled,(state,action)=>{
                state.isLoading=false;
            })
            .addCase(createPortfolioByResumeUser.rejected,(state)=>{
                state.isLoading=false;
            })
            .addCase(createPortfolioByFormUser.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(createPortfolioByFormUser.fulfilled,(state,action)=>{
                // state.userportfolios=[action.result]
                state.isLoading=false;
            })
            .addCase(createPortfolioByFormUser.rejected,(state)=>{
                state.isLoading=false;
            })
            .addCase(deletePortfolioUser.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(deletePortfolioUser.fulfilled,(state,action)=>{
                state.isLoading=false;
            })
            .addCase(deletePortfolioUser.rejected,(state)=>{
                state.isLoading=false;
            })
    },
})

export const { setUserDetails,setUserSignInput }=userSlice.actions;
export default userSlice.reducer;