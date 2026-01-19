import axios from "axios"
import { axiosInstance } from "../utils/axiosInstance"

export const signupApi = async(userData)=>{
    try {
        const {data} = await axiosInstance.post("/v1/user/signup",userData);
        return data;
    } catch (error) {
         throw error.response?.data || { message: "Signup failed" };
    }
}
export const loginApi = async (userData)=>{
    try {
        const {data} = await axiosInstance.post("v1/user/login",userData);
        return data;
    } catch (error) {
        throw error.response?.data || {message:"Login Failed"};
    }
}

export const getUser = async ()=>{
    try {
        const response = await axiosInstance.get("/v1/user/me");
        return response.data;
    } catch (error) {
         throw error.response?.data || { message: "Failed to load user details" };
    }
}

export const goGhost = async () => {
  const res = await axiosInstance.put("/v1/user/go-ghost");
  return res.data;
};