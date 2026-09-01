import React, { useContext, useEffect } from "react";
import { dataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const { userData , setuserData,getUserData,serverURL} = useContext(dataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  if (!userData) {
    return (
      <div className="w-full h-screen bg-[#2b236e] flex flex-col items-center justify-center gap-5">
        Loading...
      </div>
    );
  }
  
  const handleLogOut = async ()=>{
    try {
       let data =  await axios.post(serverURL + "/api/logout",{},
        {
            withCredentials:true
        })
    } catch (error) {
        console.log(error);
    }
  }
    return (
  <div className="w-full h-screen bg-[#2b236e] flex flex-col items-center justify-center gap-5">
     <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-white relative border border-white">
            <img
              src={userData.profileImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
    <p className="text-white text-2xl">
      Hey,{" "}
      <span className="text-[rgb(244,244,27)] text-[25px] font-bold">
     {userData.firstName}
    </span>
      , Welcome to your Home page
    </p>

    <button className="bg-[#f3e824] text-black px-4 py-2 rounded-lg" onClick={handleLogOut}>
      LogOut
    </button>
  </div>
);
}

export default Home;