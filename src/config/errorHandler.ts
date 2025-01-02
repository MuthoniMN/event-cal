import responseInterceptor from "./responseInterceptor";


export default async function errorHandler(func) {
  try {
    return func()
  }catch(e){
    console.error(e.message);
    return responseInterceptor(500, "Internal Server Error. Please try again", {})
  }
}
