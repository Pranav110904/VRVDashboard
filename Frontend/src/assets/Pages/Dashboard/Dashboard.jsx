import React, { Profiler } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { SiDeepcool } from "react-icons/si";
import face from '../../Images/face.jpg';
import { RiUserSharedFill } from "react-icons/ri";
import { FaClipboardUser, FaFileShield } from "react-icons/fa6";
import { MdAnalytics } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import Users from '../Dashboard/Users'
import Roles from "../Dashboard/Roles";
import Permissions from "../Dashboard/Permissions";
import Prime from "../Dashboard/Prime";
import ActivityLogs from "../Dashboard/ActivityLogs";
import Profile from "../Dashboard/Profile";
import { SiManageiq } from "react-icons/si";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import AddUser from "./AddUser";
import AddRole from "./AddRole";

const Dashboard = () => {
  
  return (
    <div className="flex flex-col font-raleway md:flex-row h-screen bg-[#222361] text-[#222]">
      
      <aside id="style-2" className=" md:w-[250px] 2xl:w-[280px] bg-[#bac3ff]  overflow-x-hidden border-r border-[#bac3ff] p-2 flex justify-around md:flex-col fixed bottom-0 md:relative md:h-full md:items-start md:justify-start">
        <div className="flex justify-start  px-4 w-full h-full">
          <div>
            
            <div className="flex py-5 justify-center items-center mb-5">
              <div className="flex flex-row justify-center items-center gap-8 font-raleway font-extrabold text-2xl">
                <SiDeepcool color="#5154da" size={50} /> LOGO
              </div>
            </div>

            
            <Link to="profile" className="flex flex-row justify-center gap-2 items-center  bg-[#4c4fde26]  rounded-2xl  py-3">
              <div><img src={face} className="rounded-full w-10 h-10" alt="Profile" /></div>
              <div className="font-semibold font-raleway text-sm my-2">Pranav Kedari</div>
            </Link>

            
            <div className="flex flex-col justify-center items-center mt-10">
              <ul className="font-raleway">
              <li className="flex items-center gap-3 text-[#0c0d3a] hover:text-[#222] px-6 py-5 rounded-2xl hover:bg-[#9e9ff3] transition-colors">
                  <Link to="app" className="flex items-center gap-3">
                    <TbLayoutDashboardFilled  className="text-[#222361]" size={20} />
                    <span className="font-relway text-sm font-semibold">Dashboard</span>
                  </Link>
                </li>
                <li className="flex items-center gap-3 text-[#0c0d3a] hover:text-[#222] px-6 py-5 rounded-2xl hover:bg-[#9e9ff3] transition-colors">
                  <Link to="users" className="flex items-center gap-3">
                    <RiUserSharedFill className="text-[#222361]" size={20} />
                    <span className="font-relway text-sm font-semibold">Users</span>
                  </Link>
                </li>
                <li className="flex items-center gap-3 text-[#0c0d3a] hover:text-[#222] px-6 py-5 rounded-2xl hover:bg-[#9e9ff3] transition-colors">
                  <Link to="roles" className="flex items-center gap-3">
                    <FaClipboardUser className="text-[#222361]" size={20} />
                    <span className="font-relway text-sm font-semibold">Roles</span>
                  </Link>
                </li>
                <li className="flex items-center gap-3 text-[#0c0d3a] hover:text-[#222] px-6 py-5 rounded-2xl hover:bg-[#9e9ff3] transition-colors">
                  <Link to="permissions" className="flex items-center gap-3">
                    <FaFileShield className="text-[#222361]" size={20} />
                    <span className="font-relway text-sm font-semibold">Permissions</span>
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 px-10 font-raleway py-5 mt-16 md:mt-0 text-white">

      <div className="bg-[#bac3ff] rounded-2xl p-6 font-raleway mt-4 font-bold text-1xl sm:text-5xl md:text-2xl lg:text-2xl xl:text-3xl flex text-[#222361] items-center gap-3 mb-10">
        <SiManageiq color="#222361" />
        RBAC Management System
      </div>

      <Routes>
        
        <Route path="app" element={<Prime />} />
        <Route path="users" element={<Users />} />
        <Route path="users/adduser" element={<AddUser />} /> 
        <Route path="roles" element={<Roles />} />
        <Route path="roles/addrole" element={<AddRole />} /> 
        <Route path="permissions" element={<Permissions />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
