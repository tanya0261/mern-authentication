import React from 'react'
import { useContext } from 'react'
import { dataContext } from '../context/UserContext'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const { serverURL,userData,setuserData , getUserData} = useContext(dataContext);
  let navigate = useNavigate()
   let [email,setEmail]=useState("")
   let [password,setPassword]=useState("")
  
  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    let {data}=await axios.post(serverURL + "/api/login",{
        email,
        password
    },{withCredentials:true});
     console.log("Login Response:", data);

    console.log("getUserData:", getUserData);
    await getUserData();
    navigate("/");
   } catch (error) {
     
    console.log("FULL ERROR:", error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert(error.message);
    }
   }
  // axios login request here
};
  return (
    <div className="w-full h-screen bg-[#000000] flex justify-center items-center">
  <div className="w-[90%] max-w-[500px] h-[400px] bg-[#2b236e] rounded flex flex-col justify-center items-center gap-5">

    <h1 className="text-white text-[20px] font-semibold">Login</h1>

    <form className="w-full flex flex-col items-center gap-5" onSubmit={handleLogin}>

      <input
        type="email"
        placeholder="email"
        className="w-[80%] h-[50px] bg-white rounded-lg px-3 outline-none"
         value={email} onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        className="w-[80%] h-[50px] bg-white rounded-lg px-3 outline-none"
        value={password}  onChange={(e)=>setPassword(e.target.value)}
      />
    <button className='bg-[#f3e824] text-black px-[10px] py-[5px] rounded-lg'>Login</button>
    <p className='text-white cursor-pointer' onClick={()=>navigate("/signup")}
    >Want to Create new account ? <span className='text-yellow-300'>SignUp</span></p>
    </form>

  </div>
</div>
  )
}

export default Login
