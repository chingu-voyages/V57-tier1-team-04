import axios from "./Axios";

export const fetchPrs=async(state)=>{
    const res= axios.get(`/prs?state=${state}`);
    return res.data;
}