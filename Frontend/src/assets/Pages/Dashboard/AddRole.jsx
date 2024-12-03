import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls

const AddRoleForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    active: false,
    permissions: [],
    createdDate: "",
  });

  const [permissionsList, setPermissionsList] = useState([]); // State for storing permissions

  useEffect(() => {
    // Fetch permissions from the backend when the component mounts
    const fetchPermissions = async () => {
      try {
        const response = await axios.get("/api/permissions"); // Replace with the correct endpoint
        
        setPermissionsList(response.data); // Assuming the permissions are in response.data.data
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };
   
    fetchPermissions();
    
   
    // Set current date for createdDate field
    const currentDate = new Date().toISOString().slice(0, 10);
    setFormData((prevData) => ({
      ...prevData,
      createdDate: currentDate,
    }));
  }, []);
  // Log the permissions after they have been fetched
  useEffect(() => {
    if (permissionsList.length > 0) {
      
    }
  }, [permissionsList]); // This effect will run whenever permissionsList changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      const response = await axios.post(
        '/api/roles/addRole', // Replace with the correct endpoint
        formData,
      );
      if (response.status === 201) {
        alert("Role added successfully!");
        // Optionally reset the form after successful submission
        setFormData({
          name: "",
          active: false,
          permissions: [],
          createdDate: new Date().toISOString().slice(0, 10),
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error adding role:", error);
      alert("Error adding role. Please check the console for details.");
    }
  };
  
  const toggleActive = () => {
    setFormData((prevData) => ({ ...prevData, active: !prevData.active }));
  };

  const handlePermissionToggle = (permission) => {
    setFormData((prevData) => ({
      ...prevData,
      permissions: prevData.permissions.includes(permission)
        ? prevData.permissions.filter((p) => p !== permission)
        : [...prevData.permissions, permission],
    }));
  };

  return (
    <div className="container text-black font-poppins mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-[#222361]">Add New Role</h2>
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

        {/* Active Status Toggle */}
        <div className="mb-4">
          <label htmlFor="active" className="block text-sm font-medium text-gray-700 mb-1">
            Active Status
          </label>
          <div className="flex items-center">
            <div
              className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${formData.active ? "bg-green-500" : "bg-gray-300"}`}
              onClick={toggleActive}
            >
              <div
                className={`h-4 w-4 bg-white rounded-full shadow-md transform ${formData.active ? "translate-x-6" : "translate-x-0"} transition-transform`}
              />
            </div>
            <span className="ml-3">{formData.active ? "Active" : "Inactive"}</span>
          </div>
        </div>

        {/* Permissions Section with Toggle */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
          <div className="grid grid-cols-2 gap-2">
            {permissionsList.length > 0 ? (
              permissionsList.map((permission) => (
                <div key={permission._id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span>{permission.name}</span>
                  </div>
                  <div
                    className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${formData.permissions.includes(permission) ? "bg-green-500" : "bg-gray-300"}`}
                    onClick={() => handlePermissionToggle(permission)}
                  >
                    <div
                      className={`h-4 w-4 bg-white rounded-full shadow-md transform ${formData.permissions.includes(permission) ? "translate-x-6" : "translate-x-0"} transition-transform`}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div>Loading permissions...</div>
            )}
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
            Add Role
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoleForm;
