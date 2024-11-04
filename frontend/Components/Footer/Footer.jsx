import "./Footer.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {faSquareFacebook,faXTwitter,faYoutube} from "@fortawesome/free-brands-svg-icons";
export default function Footer(){
    return (
        <div className="footerDiv">
            <div className="leftSide">
            <p>© ForEver VisualizeME [Aayush]. All rights reserved.</p>
            <br/>
            <p>Contact/Support: aceksaayush@gmail.com</p>
            </div>
            <div className="rightSide">
                <p>Connect with us!</p>
                <div className="socialicons">
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
                <FontAwesomeIcon icon={faXTwitter} size="2x"/>
                <FontAwesomeIcon icon={faSquareFacebook} size="2x" />
                <FontAwesomeIcon icon={faYoutube} size="2x" />
                </div>
            </div>
        </div>
    );
}