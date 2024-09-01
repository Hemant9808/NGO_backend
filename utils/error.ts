 export function appError(message:string, statusCode:any) {
    const error:any = new Error(message);
    error.statusCode = statusCode;
    Error.captureStackTrace(error, appError);
    return error;
  }