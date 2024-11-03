import "./Faq.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons"
export default function Faq(){
    const faqs = [
        {
            question: "What is VisualizeMe?",
            answer: "VisualizeMe is a SaaS platform that allows users to create their own portfolios in two ways: full visualize mode, where users fill out a form, and quick visualize mode, which uses AI to extract information from resumes."
        },
        {
            question: "How does the full visualize mode work?",
            answer: "In full visualize mode, users complete a form with their details, and a unique link to their generated portfolio is created for sharing."
        },
        {
            question: "What is the quick visualize mode?",
            answer: "Quick visualize mode leverages AI, specifically the Gemini API, to automatically extract information from users' resumes, saving them time on manual data entry."
        },
        {
            question: "Can I edit my portfolio after it's created?",
            answer: "Yes! After generating your portfolio, you can edit it at any time through your dashboard."
        },
        {
            question: "What features does the dashboard provide?",
            answer: "The dashboard allows you to find, edit, or delete your portfolios, and we're also working on analytical tools to track viewer numbers."
        },
        {
            question: "How can I contribute to VisualizeMe?",
            answer: "If you'd like to contribute or help us build this platform, please reach out to us at aceksaayush@gmail.com."
        },
        {
            question: "Is there any ongoing development for new features?",
            answer: "Yes, we are continuously working on improving the platform, including the development of analytical dashboards for portfolio performance."
        }
    ];
    const handleClick=(e)=>{
        e.currentTarget.children[1].classList.toggle("hidden");
        e.currentTarget.children[0].children[1].children[0].classList.toggle("hidden")
        e.currentTarget.children[0].children[1].children[1].classList.toggle("hidden")
    }
    return (
        <div className="completeFaqDiv">
            {faqs.map((faq,index)=>{
                return (
                    <div key={index} className="faq" onClick={handleClick}>
                        <div className="question">
                            <div className="q">
                                <h4>{faq.question}</h4>
                            </div>
                            <div className="icon" >
                                <FontAwesomeIcon icon={faCaretDown} className="iconDivDown" bounce size="2x"/>
                                <FontAwesomeIcon icon={faCaretUp}  className="iconDivUp hidden" bounce size="2x"/>
                            </div>
                        </div>
                        <div className="answer hidden">
                            <hr/>
                            <br/>
                            <p>{faq.answer}</p>
                            <br/>
                        </div>                        
                    </div>
                )
            } 
            )
            }
        </div>
    );
}