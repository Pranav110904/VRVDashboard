
import React, { useState } from "react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { SiDeepcool } from "react-icons/si";
import { MdMenu, MdClose } from "react-icons/md";
import face from '../../Images/face.jpg';
import { RiUserSharedFill } from "react-icons/ri";
import { FaClipboardUser, FaFileShield } from "react-icons/fa6";
import { SiManageiq } from "react-icons/si";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import Users from '../Dashboard/Users'
import Roles from "../Dashboard/Roles";
import Permissions from "../Dashboard/Permissions";
import Prime from "../Dashboard/Prime";
import AddUser from "./AddUser";
import AddRole from "./AddRole";
import { RiMenu4Fill } from "react-icons/ri";
import { ImSearch } from "react-icons/im";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to check if the current path is active
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  // Logout handler
  const handleLogout = () => {
    // Here you would typically:
    // 1. Clear authentication tokens
    // 2. Clear user session
    // 3. Redirect to login page
    localStorage.clear(); // Example of clearing local storage
    navigate('/login'); // Redirect to login page
  };

  const NavItem = ({ to, icon: Icon, label }) => (
    <li 
      className={`
        flex items-center gap-3 
        px-6 py-5 rounded-2xl 
        transition-colors
        ${isActive(to) 
          ? 'bg-[#9e9ff3] text-[#0c0d3a]' 
          : 'text-[#0c0d3a] hover:text-[#222] hover:bg-[#9e9ff3]'
        }
      `}
    >
      <Link to={to} className="flex items-center gap-3">
        <Icon 
          className={`
            ${isActive(to) ? 'text-[#0c0d3a]' : 'text-[#222361]'}
          `} 
          size={20} 
        />
        <span className="font-relway text-sm font-semibold">{label}</span>
      </Link>
    </li>
  );

  const MobileBottomNav = () => (
    <div className="md:hidden fixed bottom-0 left-0  rounded-t-3xl rounded-b-3xl mb-3 w-[90%] mx-auto right-0 bg-white/20 backdrop-blur-lg backdrop-saturate-150 border border-white/30 shadow-lg flex justify-around py-4 z-50">
      {[
        { 
          to: "app", 
          icon: TbLayoutDashboardFilled, 
          label: "Dashboard" 
        },
        { 
          to: "users", 
          icon: RiUserSharedFill, 
          label: "Users" 
        },
        { 
          to: "roles", 
          icon: FaClipboardUser, 
          label: "Roles" 
        },
        { 
          to: "permissions", 
          icon: FaFileShield, 
          label: "Permissions" 
        }
      ].map(({ to, icon: Icon, label }) => (
        <Link 
          key={to} 
          to={to} 
          className={`
            flex flex-col items-center justify-center
            ${isActive(to) 
              ? 'text-[#676aff]  rounded-xl ' 
              : 'text-[#9f9f9f] '
            }
            
          `}
        >
          <Icon size={25} />
          <span className="text-xs">{label}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col font-raleway md:flex-row h-screen bg-[#222361] text-[#222]">
      {/* Sidebar - Hidden on mobile, visible on md screens */}
      <aside className={`
        hidden md:block fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'w-[250px] 2xl:w-[280px] rounded-r-2xl' : 'w-[100px] *: rounded-r-2xl'}
        bg-white overflow-x-hidden border-r border-[#bac3ff] p-2
      `}>
        <div className="flex justify-start px-4 w-full h-full relative">
          <div className="w-full flex flex-col justify-between h-full">
            <div>
              {/* Menu Toggle Button */}
              <div className="flex justify-between items-center py-5 mb-5">
                <div className="flex items-center gap-2">
                  {isMenuOpen && <SiDeepcool color="#5154da" size={45} />}
                  {isMenuOpen && <span className="font-extrabold text-2xl">LOGO</span>}
                </div>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`${isMenuOpen ? 'p-2 rounded-full ' : 'p-2 rounded-full  '} `}

                >
                  {isMenuOpen ? <MdClose size={24} className="" /> : <RiMenu4Fill size={24}  />}
                </button>
              </div>

              {isMenuOpen && (
                <div className="flex flex-col justify-center items-center rounded-r-2xl">
                  <Link className="flex flex-row justify-center gap-2 items-center bg-[#4c4fde26] rounded-2xl py-3 px-3">
                    <div><img src={face} className="rounded-full w-10 h-10" alt="Profile" /></div>
                    <div className="font-semibold font-raleway text-sm my-2">Pranav Kedari</div>
                  </Link>

                  <div className="flex flex-col justify-center gap-10 items-center mt-10">
                    <ul className="font-raleway flex flex-col gap-3">
                      <NavItem to="app" icon={TbLayoutDashboardFilled} label="Dashboard" />
                      <NavItem to="users" icon={RiUserSharedFill} label="Users" />
                      <NavItem to="roles" icon={FaClipboardUser} label="Roles" />
                      <NavItem to="permissions" icon={FaFileShield} label="Permissions" />
                    </ul>
                  </div>
                </div>
              )}

              {!isMenuOpen && (
                <div className="flex flex-col items-center gap-6 mt-10 rounded-l-2xl">
                  <div><img src={face} className="rounded-full w-10 h-10" alt="Profile" /></div>
                  <Link 
                    to="app" 
                    className={`
                      flex flex-col items-center rounded-2xl p-4 
                      ${isActive('app') ? 'bg-[#bebfff]' : 'bg-white'}
                    `} 
                    title="Dashboard"
                  >
                    <TbLayoutDashboardFilled size={24} />
                  </Link>
                  <Link 
                    to="users" 
                    className={`
                      flex flex-col items-center rounded-2xl p-4  
                      ${isActive('users') ? 'bg-[#bebfff] rounded-2xl p-4' : 'bg-white'}
                    `} 
                    title="Users"
                  >
                    <RiUserSharedFill size={24} />
                  </Link>
                  <Link 
                    to="roles" 
                    className={`
                      flex flex-col items-center rounded-2xl p-4 
                      ${isActive('roles') ? 'bg-[#bebfff] rounded-2xl p-4' : ''}
                    `} 
                    title="Roles"
                  >
                    <FaClipboardUser size={24} />
                  </Link>
                  <Link 
                    to="permissions" 
                    className={`
                    flex flex-col items-center rounded-2xl p-4 
                      ${isActive('permissions') ? 'bg-[#bebfff] rounded-2xl p-4' : ''}
                    `} 
                    title="Permissions"
                  >
                    <FaFileShield size={24} />
                  </Link>
                </div>
              )}
            </div>

            {/* Logout Section */}
            <div className={`
              flex items-center justify-center mb-6 
              ${!isMenuOpen ? 'w-full' : ''}
            `}>
              <button 
                onClick={handleLogout}
                className={`
                  flex items-center gap-3 p-3 rounded-2xl 
                  hover:bg-red-100 transition-colors duration-300
                  ${isMenuOpen 
                    ? 'w-full mx-4 bg-[#f0f0f0] text-red-600 justify-center' 
                    : 'w-10 h-10 justify-center hover:bg-red-50'}
                `}
                title="Logout"
              >
                <CiLogout 
                  size={isMenuOpen ? 20 : 24} 
                  className="text-red-600" 
                />
                {isMenuOpen && <span className="text-sm font-semibold">Logout</span>}
              </button>
            </div>
          </div>
        </div>
      </aside>
      {/* Main content area */}
      <main className={`
        flex-1 px-4 md:px-10 font-raleway py-5 md:mt-0 mt-32  text-white relative 
        transition-all duration-300 ease-in-out h-screen w-screen overflow-x-hidden pb-28
        ${isMenuOpen ? 'md:ml-[250px] 2xl:ml-[280px]' : 'md:ml-[80px] '}
      `}>
        {/* Mobile Header - Visible only on mobile */}
        <div className="md:hidden bg-[#222361] flex justify-between items-center p-3 fixed top-0 left-0 right-0 w-full h-max">
            <div className="flex items-center gap-3">
              <SiDeepcool color="#5154da" size={35} /> {/* Increased icon size */}
              <span className="font-bold text-xl text-white">LOGO</span> {/* Increased text size */}
            </div>
            <div className="flex items-center gap-3">
            <button 
                onClick={handleLogout}
                className=''
                title="Logout"
                
              >
                <CiLogout 
                  size={25} 
                />
              </button>
              <img src={face} className="rounded-full w-9 h-9" alt="Profile" /> {/* Increased profile image size */}
            </div>
          </div>


        

        <div className="bg-white  backdrop-blur-md  md:bg-opacity-100 rounded-b-2xl fixed top-14 left-0 right-0 p-4 md:p-6 font-raleway md:rounded-2xl font-bold text-lg md:text-xl lg:text-2xl flex flex-col md:flex-row md:items-center gap-3 mb-10 md:static">
        <div className="flex items-center gap-3 text-[#222361]">
          <SiManageiq color="#222361" size={28} className="md:text-[32px]" />
          <span>RBAC Management System</span>
        </div>
        <div className="flex-1 mt-4 md:mt-0 flex justify-end w-full">
          <div className="flex items-center w-full md:w-auto border-[1px] border-[#2e2194] rounded-lg overflow-hidden">
            <input 
              type="text" 
              placeholder="Search..." 
              className="flex-1 p-2 text-sm text-[#222361] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5154da]"
            />
            <button className="p-2 bg-[#fff] hover:bg-[#f0f0f0] flex items-center justify-center">
              <ImSearch color="#222361" size={20} />
            </button>
          </div>
        </div>
</div>





        <div className="mt-12">
        <Routes>
          <Route path="app" element={<Prime />} />
          <Route path="users" element={<Users />} />
          <Route path="users/adduser" element={<AddUser />} />
          <Route path="roles" element={<Roles />} />
          <Route path="roles/addrole" element={<AddRole />} />
          <Route path="permissions" element={<Permissions />} />
        </Routes>
          
        </div>
        
      </main>



      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      
    </div>
  );
};

export default Dashboard;