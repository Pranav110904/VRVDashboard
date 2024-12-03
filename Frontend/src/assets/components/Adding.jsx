import React, { useState } from 'react';
import axios from 'axios';

const Adding = () => {
  const [permission, setPermission] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/permissions', {
        permission,
      });

      if (response.status === 201) {
        console.log('Permission added successfully');
        setPermission(''); // Clear the input field after successful submission
      } else {
        console.error('Error adding permission:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} action='/add/permissions'  method='POST' className="bg-gray-100 p-6 rounded shadow-lg">
        <label htmlFor="permission" className="block text-lg font-medium mb-2">
          Add Permission:
        </label>
        <input
          type="text"
          id="permission"
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Enter permission"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Adding;
