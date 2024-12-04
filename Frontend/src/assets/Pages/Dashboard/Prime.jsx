import React from 'react';
import image from '../../Images/illus.svg';

const Prime = () => {
  return (
    <div className="bg-[#f4f6fb] rounded-2xl flex flex-col font-poppins items-center justify-center p-4 gap-4">
  <h1 className="text-sm text-center bg-[#fffae6] text-[#222361] font-bold p-3 rounded-md shadow-md">
    I AM RENDERING THE BACKEND ON RENDER'S FREE INSTANCE. PLEASE WAIT FOR SOME TIME. IT WILL SHOW THE POP-UP FOR EVERY FEEDBACK.
  </h1>

  <section className="max-w-6xl mx-auto text-center sm:text-left flex flex-col-reverse md:flex-row items-center gap-8">
    {/* Text Section */}
    <div className="flex-1">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-[#222361] leading-tight mb-4">
        Hi, Welcome to the Future of Management
      </h1>

      <p className="text-base sm:text-xl text-[#5154da] font-medium mb-6">
        This is an advanced <span className="font-bold text-[#2e2194]">RBAC (Role-Based Access Control)</span> Management System.
      </p>

      <p className="text-sm sm:text-base text-[#444] mb-6">
        RBAC is a security mechanism that restricts system access based on the user's role. In this system, access rights are assigned according to roles rather than individuals.
        This helps organizations manage permissions efficiently, ensuring that users only have access to the resources they need to perform their job.
      </p>
    </div>

    {/* Image Section */}
    <div className="flex-1">
      <img src={image} alt="RBAC Management" className="w-full h-auto rounded-lg shadow-lg object-cover" />
    </div>
  </section>

  <h1 className="text-sm text-center bg-[#fffae6] text-[#222361] font-bold p-3 rounded-md shadow-md">
    I AM RENDERING THE BACKEND ON RENDER'S FREE INSTANCE. PLEASE WAIT FOR SOME TIME. IT WILL SHOW THE POP-UP FOR EVERY FEEDBACK.
  </h1>
</div>

  );
};

export default Prime;
