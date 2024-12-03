// src/components/AddUserForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/Slices/userSlice';
import axios from 'axios';

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    role: '',
    status: false,
    createdDate: '',
  });
  const [rolesList, setRolesList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('/api/roles');
        setRolesList(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();

    const currentDate = new Date().toISOString().slice(0, 10);
    setFormData((prevData) => ({
      ...prevData,
      createdDate: currentDate,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    try {
      await dispatch(addUser(formData));
      alert('User added successfully!');
      navigate('/dashboard/users');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const toggleStatus = () => {
    setFormData((prevData) => ({ ...prevData, status: !prevData.status }));
  };

  return (
    <div className="container text-black font-poppins rounded-2xl mx-auto">
      <h2 className="text-2xl font-bold  text-[#222361] text-center md:text-left">
        Add New User
      </h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 border-2 border-[#222361]">
        
        {/* Name Input */}
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Email Input */}
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
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        {/* Phone Input */}
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
            onChange={(e) => {
              const value = e.target.value;

              // Ensure that the phone number starts with +91 and contains exactly 13 characters (2 for +91, 10 digits)
              if (value.startsWith('+91')) {
                // Remove any non-digit characters after +91 and limit to 13 characters
                e.target.value = '+91' + value.slice(3).replace(/\D/g, '').slice(0, 10);
              } else {
                e.target.value = '+91' + value.replace(/\D/g, '').slice(0, 10);
              }

              setFormData({ ...formData, phone: e.target.value });
            }}
            pattern="^\+91\d{10}$"  // Regex to ensure the phone number starts with +91 and has exactly 10 digits
            title="Phone number must start with +91 and contain 10 digits"
            required
          />
</div>


        {/* Date of Birth Input */}
        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            required
          />
        </div>

        {/* Role Select */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            id="role"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
                formData.status ? 'bg-green-500' : 'bg-gray-300'
              }`}
              onClick={toggleStatus}
            >
              <div
                className={`h-4 w-4 bg-white rounded-full shadow-md transform ${
                  formData.status ? 'translate-x-6' : 'translate-x-0'
                } transition-transform`}
              />
            </div>
            <span className="ml-3">{formData.status ? 'Active' : 'Inactive'}</span>
          </div>
        </div>

        {/* Created Date Input */}
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
        <div className="flex flex-col sm:flex-row items-center sm:justify-between">
          <button type="submit" className="px-6 py-2  text-white bg-[#9e9ff3] rounded-md hover:bg-[#6265fe] w-full sm:w-auto mb-2 sm:mb-0">
            Add User
          </button>
          <button
            type="button"
            
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
