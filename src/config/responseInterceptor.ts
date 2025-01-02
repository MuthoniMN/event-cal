export default function responseInterceptor(
  status: number,
  message: string,
  data,
){
  const response = {
    status,
    message,
    data
  };
  return response;
}
