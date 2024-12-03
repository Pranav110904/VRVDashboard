import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    role: "",
    status: false,
    createdDate: "",
  });
  const [rolesList, setRolesList] = useState([]); // State for storing roles list
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching roles from the backend
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/api/roles");
        setRolesList(response.data);// Assuming the response data is an array of roles
       
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();

    // Automatically set the current date in the format YYYY-MM-DD
    const currentDate = new Date().toISOString().slice(0, 10);
    setFormData((prevData) => ({
      ...prevData,
      createdDate: currentDate,
    }));
  }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      // Set the URL of your backend API endpoint
      const apiUrl = '/api/users/adduser'; // Replace with your API endpoint
    
      try {
        const response = await axios.post(apiUrl, formData);
        console.log('Form submitted successfully:', response.data);
        // Navigate to home page (you might have different route logic)
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

  const toggleStatus = () => {
    setFormData((prevData) => ({ ...prevData, status: !prevData.status }));
  };

  return (
    <div className="container text-black font-poppins mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-[#222361]">Add New User</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 border-2 border-[#222361]"
      >
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.name}
            onChange={(e) =>
              setFormData((prevData) => ({ ...prevData, name: e.target.value }))
            }
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.email}
            onChange={(e) =>
              setFormData((prevData) => ({ ...prevData, email: e.target.value }))
            }
            required
          />
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter phone number"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prevData) => ({ ...prevData, phone: e.target.value }))
            }
            required
          />
        </div>

        {/* Date of Birth Field */}
        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.dob}
            onChange={(e) =>
              setFormData((prevData) => ({ ...prevData, dob: e.target.value }))
            }
            required
          />
        </div>

        {/* Role Dropdown */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            id="role"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.role}
            onChange={(e) =>
              setFormData((prevData) => ({ ...prevData, role: e.target.value }))
            }
            required
          >
            <option value="">Select Role</option>
            {rolesList.length > 0 ? (
              rolesList.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No roles available
              </option>
            )}
          </select>
        </div>

        {/* Status Toggle */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <div className="flex items-center">
            <div
              className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                formData.status ? "bg-green-500" : "bg-gray-300"
              }`}
              onClick={toggleStatus}
            >
              <div
                className={`h-4 w-4 bg-white rounded-full shadow-md transform ${
                  formData.status ? "translate-x-6" : "translate-x-0"
                } transition-transform`}
              />
            </div>
            <span className="ml-3">{formData.status ? "Active" : "Inactive"}</span>
          </div>
        </div>

        {/* Created Date (Read-Only) */}
        <div className="mb-4">
          <label htmlFor="createdDate" className="block text-sm font-medium text-gray-700 mb-1">
            Created Date
          </label>
          <input
            type="date"
            id="createdDate"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.createdDate}
            readOnly
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add User
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
