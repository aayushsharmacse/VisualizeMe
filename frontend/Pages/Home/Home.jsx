import "./Home.css"
import img1 from "../../Logo/img1.jfif"
import img2 from "../../Logo/img2.jfif"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector} from "react-redux";
import {faMagnifyingGlassArrowRight, faPersonRays, faPaperPlane,faJetFighterUp} from "@fortawesome/free-solid-svg-icons"
// import {fawand} from "@fortawesome/free-regular-svg-icons"
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
export default function Home(){
    const {_id}=useSelector((state)=>state.user);
    return(
        <div className="completeHome"
        style={{ 
            height:"100%",
            backgroundImage: "url("+img2+")" ,
            backgroundAttachment:"fixed",
            backgroundSize: "100%"
        }}
        >
            <div className="section1Home">
                <div className="headMainTextDiv" >
                    <h4>The world is full of lies but there lies one single truth.</h4>
                    <h1><i>Visuals Speak<br/>Louder Than Words!</i></h1>
                </div>
                <div className="img1Div">
                    <img src={img1} id="img1" />
                </div>
            </div>
            <div className="section2Home">
                <h3>Here are we, Why Tell When You Can Illustrate?</h3>
                <h2>Use our powerful service to create your self a new image. Show, Don’t just Tell: Let Your Vision Shine!</h2>
                <div className="iconpersonrays">
                {/* <FontAwesomeIcon icon={faPersonRays} beat  className="personRaysIcon"/> */}
                <FontAwesomeIcon icon={faWandMagicSparkles} flip className="personRaysIcon"/>
                </div>
                <h1>Let us help you captivate your audience.</h1>
            </div>
            <div className="section3Home" >
                <h2>It's time to say bye to traditional papers and text 
                    <FontAwesomeIcon size="3x" icon={faPaperPlane} bounce style={{color: "white",}} /></h2>
                <h2><FontAwesomeIcon size="3x" icon={faJetFighterUp} fade style={{color: "white",}} /> Lets be revolutionary and visualize</h2>
                <h1>Use our Full Visualize Mode or Quick Visualize to be the part of this revolution</h1>                
                {_id ? 
                <button><Link to={`/user/${_id}`}>Dashboard</Link></button>
                :
                <>
                <h1>Sign up now!</h1>
                <br/>
                <button><Link to={`/signup`}>Sign up</Link></button>
                </>
                }
            </div>
            <Footer/>
        </div>
    );
}






// <div className="section4Div"  style={{margin:"auto",height:"700px", width:"700px"}}      >
// {<Carousel>
//     <div>
//         <img src={dashboard} />
//         <p className="legend">Dashboard to Analyse</p>
//     </div>
//     <div>
//         <img src={createOptions} />
//         <p className="legend">Choose your options to create</p>
//     </div>
//     <div>
//         <img src={createByResume} />
//         <p className="legend">Use the power of AI to simplify things</p>
//     </div>
//     <div>
//         <img src={createByFrom} />
//         <p className="legend">Or do a full edit</p>
//     </div>
// </Carousel>}
// </div>