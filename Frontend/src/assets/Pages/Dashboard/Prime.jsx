import React from 'react';
import image from '../../Images/illus.svg';

const Prime = () => {
  return (
    <div className="bg-[#f4f6fb] rounded-2xl flex font-poppins items-center justify-center p-4">
      <section className="max-w-6xl mx-auto text-center sm:text-left flex flex-col-reverse md:flex-row items-center gap-8">

        {/* Text Section */}
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#222361] leading-tight mb-4">
            Hi, Welcome to the Future of Management
          </h1>

          <p className="text-lg sm:text-xl text-[#5154da] font-medium mb-6">
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
    </div>
  );
};

export default Prime;
