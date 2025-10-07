import axios from "./Axios";

export const getCurrentUser=async()=>{
    const res=await axios.get("/auth/user");
    return res.data;
}

export const logoutUser=async()=>{
    const res= await axios.post("/auth/logout")
    return res.data;
}