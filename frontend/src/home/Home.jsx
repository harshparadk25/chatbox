import React, { useEffect, useState } from 'react';
import Sidebar from './component/Sidebar';
import MessageContainer from './component/MessageContainer';

const Home = () => {

  const [selectedUser , setSelectedUser] = useState(null);
  const [isSidebar , setIsSidebar]= useState(true);

  const handelUserSelect=(user)=>{
    setSelectedUser(user);
    setIsSidebar(false);
  }
  const handelShowSidebar=()=>{
    setIsSidebar(true);
    setSelectedUser(null);
  }
  return (

    <div className='flex justify-between min-w-full
     md:min-w-[550px] md:max-w-[65%]
      px-2 h-[95%] md:h-full  
      rounded-xl shadow-lg
       bg-gray-400 bg-clip-padding
        backdrop-filter backdrop-blur-lg 
        bg-opacity-0'
        >
      <div className={`w-full py-2 md:flex ${isSidebar ? '' : 'hidden'}`}>
      <Sidebar onSelectUser={handelUserSelect}/>
      </div>
      <div className={`divider divider-horizontal px-3 md:flex
         ${isSidebar ? '' : 'hidden'} ${selectedUser ? 'block' : 'hidden'}`}></div>
      <div className={`flex-auto ${selectedUser ? '' : 'hidden md:flex'} bg-gray-200}`}>
      <MessageContainer onBackUser={handelShowSidebar}/>
      </div>
    </div>
  );
};

export default Home;
