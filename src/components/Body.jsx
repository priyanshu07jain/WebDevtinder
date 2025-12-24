import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./Navbar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utiles/constant"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utiles/userSlice"
import { useEffect } from "react"

const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=useSelector((store)=>store.user);
  const fetchData=async()=>{
    try{
      if(userData) return;
      const res= await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
   dispatch(addUser(res.data));
  }
    catch(err){
      if(err.status==401){
navigate("/login");
      }
      
      console.error(err);
    }
  }
  useEffect(()=>{
  fetchData();
  },[])
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body