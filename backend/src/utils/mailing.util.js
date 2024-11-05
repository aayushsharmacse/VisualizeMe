import nodemailer from "nodemailer";
import path from "path";
let transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_ADDRESS,
        pass:process.env.EMAIL_PASSWORD
    }
});

const sendMyMail=async(mail)=>{
    let mailObj;
    let cid=Date.now().toString()+"visualizeME";
    if(mail.portfolio){
        mailObj={
            from:process.env.EMAIL_ADDRESS,
            to:mail.to,
            subject:"From VisualizeMe",
            html:`<h1>Hi,there</h1><p>You have received a mail from ${mail.email} , ${mail.name}, please find it below</p>
            <p>${mail.message}</p><img src="cid:${cid}"/>`,
            attachments: [{
                filename: 'visualizeME.png',
                path: path.join(process.cwd(), 'src', 'logo.png'),
                cid: cid
            }]
        }
    }
    else{
        mailObj={
            from:process.env.EMAIL_ADDRESS,
            to:"aceksaayush@gmail.com",
            subject:"From VisualizeMe",
            html:`<h1>Name is ${mail.name}</h1> <h2>Contact back ${mail.contact}</h2> <p>${mail.message}</p>
            <img src="cid:${cid}"/>`,
            attachments: [{
                filename: 'visualizeME.png',
                path: path.join(process.cwd(), 'src', 'logo.png'),
                cid: cid
            }]
        }
    }
    await transporter.sendMail(mailObj);
}
export default sendMyMail;