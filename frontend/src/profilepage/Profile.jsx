import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile =()=>{
  const {authUser} = useAuth();

  if (!authUser) {
    return <div>Loading...</div>;
  }

  return(
    <div className='flex flex-col items-center justify-center mix-w-full mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-lg
          bg-gray-400 bg-clip-padding
           backderop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className="text-white text-3xl flex justify-center" >Profile</h1>
      <img className="mx-auto p-2" 
        src={authUser.pic || 'https://via.placeholder.com/150'} 
        alt="Profile"
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />
      <div className="flex flex-col ">
        <p className="text-black font-bold text-xl pb-1">fullname:</p>
        <p className="bg-white rounded-md text-black"><span className="ml-2 font-bold">{authUser.fullname}</span></p>
        <p className="text-black font-bold text-xl pb-1">username:</p>
        <p className="bg-white rounded-md text-black"><span className="ml-2 font-bold">{authUser.username}</span></p>
        <p className="text-black font-bold text-xl pb-1">email:</p>
        <p className="bg-white rounded-md text-black"><span className="ml-2 font-bold">{authUser.email}</span></p>
        <p className="text-black font-bold text-xl pb-6"></p>
        <p className="bg-white rounded-md text-black "><span className="ml-2 font-bold">{authUser.message}</span></p>


      </div>
      {/* Add more fields as per your authUser object */} 
    </div>
    </div>
  )
}

export default Profile;