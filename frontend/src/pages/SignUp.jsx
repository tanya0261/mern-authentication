import React, { useState, useContext, useRef } from "react";
import dpp from "../assets/dpp.avif";
import { dataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { serverURL,userData,setuserData , getUserData} = useContext(dataContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [frontendImage, setFrontendImage] = useState(dpp);
  const [backendImage, setBackendImage] = useState(null);

  const fileRef = useRef(null);

  function handleImage(e) {
    const selectedFile = e.target.files[0];

    console.log("Selected File:", selectedFile);

    if (!selectedFile) return;

    setBackendImage(selectedFile);
    setFrontendImage(URL.createObjectURL(selectedFile));
  }

  const handleSignUP = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();

      formdata.append("firstName", firstName);
      formdata.append("lastName", lastName);
      formdata.append("userName", userName);
      formdata.append("email", email);
      formdata.append("password", password);

      if (backendImage) {
        formdata.append("profileImage", backendImage);
      }

      console.log("backendImage:", backendImage);

      for (let pair of formdata.entries()) {
        console.log(pair[0], pair[1]);
      }

     const {data} = await axios.post(
  `${serverURL}/api/signup`,
  formdata,
  { withCredentials: true }
);
await getUserData()
setuserData(data.user)
navigate("/")

console.log("Profile Image:", data.data.user.profileImage);

      navigate("/login");
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-[#000000] flex justify-center items-center">
      <div className="w-[90%] max-w-[500px] h-[600px] bg-[#2b236e] rounded flex flex-col justify-center items-center gap-5">
        <h1 className="text-white text-[20px] font-semibold">
          Sign Up
        </h1>

        <form
          className="w-full flex flex-col items-center gap-5"
          onSubmit={handleSignUP}
        >
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileRef}
            onChange={handleImage}
          />

          <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-white relative border border-white">
            <img
              src={frontendImage}
              alt="profile"
              className="w-full h-full object-cover"
            />

            <div
              className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-50 flex justify-center items-center text-white font-semibold text-[20px] cursor-pointer"
              onClick={() => fileRef.current?.click()}
            >
              +
            </div>
          </div>

          <div className="w-[80%] h-[50px] flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 h-full bg-white rounded-lg px-3 outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 h-full bg-white rounded-lg px-3 outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Username"
            className="w-[80%] h-[50px] bg-white rounded-lg px-3 outline-none"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-[80%] h-[50px] bg-white rounded-lg px-3 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-[80%] h-[50px] bg-white rounded-lg px-3 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-[#f3e824] text-black px-4 py-2 rounded-lg"
          >
            Sign Up
          </button>

          <p
            className="text-white cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already have an account?{" "}
            <span className="text-yellow-300">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;