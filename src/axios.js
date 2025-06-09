import axios from "axios";

console.log("ENV:", process.env.REACT_APP_API_URL);


const instance = axios.create({
  baseURL:'https://site-backend-wbcb.onrender.com',
});

instance.interceptors.request.use((config)=>{
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})

export default instance