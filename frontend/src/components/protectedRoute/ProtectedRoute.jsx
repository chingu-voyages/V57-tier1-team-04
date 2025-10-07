import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute=()=>{
    const {auth}=useAuth();
    if(auth.loading) return <p>Loading</p>
    if(!auth.userType) return <Navigate to="/login" />

    return <Outlet/>;
}

export default ProtectedRoute;