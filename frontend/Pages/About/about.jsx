import "./About.css";
import logo from "../../Logo/logo.png"
import img1 from "../../Logo/1.PNG"
import img2 from "../../Logo/2.PNG"
import img3 from "../../Logo/3.PNG"
import img4 from "../../Logo/4.PNG"
export default function About(){
    return(
        <>
        <div className="completeAboutDiv">
            <div>
                <img src={logo} />
            </div>
            <div>
                <h1>A service like NONE other</h1>
            </div>
            <div>
                <h2>Just to be something more useful :) to you</h2>
            </div>
            <div>
                <p>Currently we help you create yourself a beautiful portfolio for free.</p>
            </div>
            <div>
                <p>More services coming up in future!</p>
            </div>
            {/* <div className="about">
                <h1>About the Dev</h1>
            </div> */}
        {/* <div className="docs"> */}
                <p>How it is done? See below</p>
                <p>Step 1 - Signup</p>
                <p>Step 2 - Go to your unique dashboard</p>
                <img src={img4}/>
                <p>Step 3 - If you already have created your portfolios they will be visible here</p>
                <p>Step 4 - Want to create a new one? We have two powerful modes for it.</p>
                <img src={img3}/>
                <p>Step 4 Mode 1 - Full visualize</p>
                <img src={img1}/>
                <p>Step 4 Mode 2 - Quick visualize with the power of AI</p>
                <img src={img2}/>
                <p>Go back to your dashboard to analyse or to edit</p>
                <h2>Have any ideas? or want to contribe? or to contact dev? 
                    email dev right now!!!
                     aceksaayush@gmail.com</h2>
            {/* </div> */}
        </div>
        </>
    );
}