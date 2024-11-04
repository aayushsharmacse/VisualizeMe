import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"; 

    // Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
    api_key: process.env.CLOUDINARY_APIKEY, 
    api_secret: process.env.CLOUDINARY_APISECRET // Click 'View API Keys' above to copy your API secret
});
    
    // Upload an image
const uploadOnCloudinary = async(localFilePath)=>{

    if(!localFilePath){
        console.log("no localFilePath found")
        return null;
    }    
    try{
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    }
    catch(err){
        console.log(err);
        return null;
    };
}

export default uploadOnCloudinary;