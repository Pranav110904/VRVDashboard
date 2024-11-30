import React from "react";
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
import Analytics from "../Dashboard/Analytics";
import ActivityLogs from "../Dashboard/ActivityLogs";


const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#222] text-[#222]">
      {/* Sidebar */}
      <aside className="w-full md:w-3/12 2xl:w-1/5 bg-[#bac3ff] overflow-x-hidden md:border-r-[0.1px] border-[#292a2e] p-8 flex justify-around md:flex-col fixed bottom-0 md:relative md:h-full md:items-start md:justify-start">
        <div className="flex justify-center w-full h-full">
          <div>
            {/* Logo Section */}
            <div className="flex py-5 justify-center items-center mb-8">
              <div className="flex flex-row justify-center items-center gap-8 font-raleway font-extrabold text-4xl">
                <SiDeepcool color="#5154da" size={70} /> LOGO
              </div>
            </div>

            {/* User Info */}
            <div className="flex flex-col justify-center items-center">
              <div><img src={face} className="rounded-full w-20 h-20" alt="Profile" /></div>
              <div className="font-semibold font-raleway text-lg my-2">Pranav Kedari</div>
              <div className="font-semibold font-raleway text-sm border-2 py-1 px-3 rounded-xl border-[#696969]">View</div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col justify-center items-center mt-10">
              <ul className="font-raleway">
                <li className="flex items-center gap-3 text-[#0c0d3a] hover:text-[#222] px-10 py-5 rounded-2xl hover:bg-[#9e9ff3] transition-colors">
                  <Link to="users" className="flex items-center gap-3">
                    <RiUserSharedFill className="text-[#222361]" size={25} />
                    <span className="font-relway text-lg font-semibold">Users</span>
                  </Link>
                </li>
                <li className="flex items-center gap-3 text-[#0c0d3a] hover:text-[#222] px-10 py-5 rounded-2xl hover:bg-[#9e9ff3] transition-colors">
                  <Link to="roles" className="flex items-center gap-3">
                    <FaClipboardUser className="text-[#222361]" size={25} />
                    <span className="font-relway text-lg font-semibold">Roles</span>
                  </Link>
                </li>
                <li className="flex items-center gap-3 text-[#0c0d3a] hover:text-[#222] px-10 py-5 rounded-2xl hover:bg-[#9e9ff3] transition-colors">
                  <Link to="permissions" className="flex items-center gap-3">
                    <FaFileShield className="text-[#222361]" size={25} />
                    <span className="font-relway text-lg font-semibold">Permissions</span>
                  </Link>
                </li>
                <li className="flex items-center gap-3 text-[#0c0d3a] hover:text-[#222] px-10 py-5 rounded-2xl hover:bg-[#9e9ff3] transition-colors">
                  <Link to="analytics" className="flex items-center gap-3">
                    <MdAnalytics className="text-[#222361]" size={25} />
                    <span className="font-relway text-lg font-semibold">Analytics</span>
                  </Link>
                </li>
                <li className="flex items-center gap-3 text-[#0c0d3a] hover:text-[#222] px-10 py-5 rounded-2xl hover:bg-[#9e9ff3] transition-colors">
                  <Link to="activity-logs" className="flex items-center gap-3">
                    <FiActivity className="text-[#222361]" size={25} />
                    <span className="font-relway text-lg font-semibold">Activity Logs</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 px-10 py-5 mt-16 md:mt-0 text-white">
        <Routes>
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="activity-logs" element={<ActivityLogs />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
