import React, { useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import AI2 from '../Images/AI2.jpg';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mockAdmin = {
    email: "test@gmail.com",
    password: "test@123"
  };

  const handleLogin = async () => {
    // Clear previous error state
    setError("");

    // Validation with enhanced toast notifications
    if (!email || !password) {
      toast.error("Please enter both email and password.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      toast.warn("Email must end with @gmail.com", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Login logic
    if (email === mockAdmin.email && password === mockAdmin.password) {
      try {
        const response = {
          data: {
            message: "Login successful",
            status: 200
          }
        };
    
        console.log("Login Response:", response.data);
        
        // Success toast with custom styling
        toast.success("Login Successful! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-green-500 text-white",
        });
    
        // Delayed navigation to allow toast to show
        setTimeout(() => {
          localStorage.setItem("token", "fake-token");
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
        console.error("Login Error:", error);
        
        toast.error("Error logging in. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      toast.error("Invalid email or password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="w-full h-screen bg-[#29292f] flex flex-col md:flex-row font-raleway">
      <section className="w-full md:w-[50%] bg-white p-6 md:p-12 order-2 overflow-y-auto flex-shrink-0">
        <div className="w-full">
          <div className="w-full h-full flex flex-col 2xl:p-20 gap-6 md:gap-8">
            <h2 className="font-bold text-[#222c61] text-3xl md:text-4xl">LOGIN </h2>
            <div className="w-full h-full">
              <p className="text-sm md:text-base">EMAIL</p>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 border-2 border-[#222c61] mb-4 p-2 text-sm md:text-base"
              />
              <p className="text-sm md:text-base">PASSWORD</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 border-2 border-[#222c61] mb-4 p-2 text-sm md:text-base"
              />
              {error && <p className="text-red-500 text-sm md:text-base">{error}</p>}
              <a
                target="_blank"
                href="https://www.instagram.com/prnv_1109/"
                className="text-[#525DE0] text-xs md:text-sm text-left block mb-4"
              >
                FORGET PASSWORD?
              </a>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-24 md:w-60 h-[1px] bg-[#000]"></div>
              <div className="mx-2 text-xs md:text-sm">OR</div>
              <div className="w-24 md:w-60 h-[1px] bg-[#000]"></div>
            </div>

            <button
              onClick={handleLogin}
              className="bg-[#222c61] text-white w-full h-12 mb-4 text-sm md:text-base"
            >
              LOGIN
            </button>
            <a href="https://www.instagram.com/prnv.design/"
            target="_blank"
              className="text-center text-xs md:text-sm"
            >
              DON'T HAVE AN ACCOUNT? SIGN UP
            </a>
          </div>
        </div>
      </section>

      <section
        className="w-full md:w-[50%] h-full order:1 relative overflow-hidden flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${AI2})` }}
      >
        <div className="w-full font-bold text-5xl h-full flex items-end mb-2 text-white justify-center">Hello,Join Us</div>
        <div className="bg-white w-20 h-[3px] rounded-full mb-10"></div>
      </section>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}