import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold,} from "@google/generative-ai"  
  

export default async function runGemini(myfile){
    let result=null;
    try{
    const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    // maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig:generationConfig
  });
  
  
  const uploadResponse = await fileManager.uploadFile(myfile.path, {
    mimeType: myfile.mimetype,
    displayName: myfile.originalname,
  });

  console.log(
    `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`,
  );

  result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
    {text: "For the given differnet types of input files generate json data as per following model to directly save in db. Make sure to understand the schema and differenciate between different sections and Bullets. Also if there is another extra nested structure like 1st is the resume, second is the section, 3rd is the bullet, if 4th nested structure appears please use judgement like maybe merge those nested structure different points to create paragraph please remove newline characters i.e forwardslash-n .\nimport mongoose from \"mongoose\";\nconst bulletSchema=new mongoose.Schema({\n    bulletDisplayImage:{\n        imageURI:{\n            type:String,\n        },\n        dimensionX:{\n            type:String,\n        },\n        dimensionY:{\n            type:String,\n        }\n    },\n    bulletHeader:{\n        type:String\n    },\n    bulletHeaderURI:{\n        type:String\n    },\n    bulletText:{\n        type:String\n    }\n}, {timestamps:true});\n\n\nconst sectionSchema=new mongoose.Schema({\n    sectionHeader:{\n        type:String,\n    },\n    bullets:[\n        {\n            type:bulletSchema\n        }\n    ]\n}, {timestamps:true});\n\nconst userInfoSchema=new mongoose.Schema({\n    userName:{\n        type:String\n    },\n    email:{\n        type:String,\n    },\n    profileImage:{\n        imageURI:{\n            type:String,\n        },\n        dimensionX:{\n            type:String,\n        },\n        dimensionY:{\n            type:String,\n        }\n    },\n    profileImageCaption:{\n        type:String,\n        default:\"Hey there 👋\"\n    },\n    profileImageSubCaption:{\n        type:String\n    },\n    sections:[\n        {\n            type:sectionSchema\n        }\n    ]\n\n}, {timestamps:true})\n\nexport const UserInfo=mongoose.model(\"UserInfo\",userInfoSchema);"},
  ]);
  
    // console.log(result.response.text());
}
catch(e){
    console.log(e);
    return null;
} 
  return result.response.text();
}