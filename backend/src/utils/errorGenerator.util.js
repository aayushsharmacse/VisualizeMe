class CustomAPIError extends Error {
    constructor(
        statusCode=501,
        message= "Something went wrong",
        loc="Error from Server side",
    ){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.loc=loc
    }
}
  
const createError = (statusCode,message,loc) => {
return new CustomAPIError(statusCode, message,loc);
}

export { CustomAPIError, createError};