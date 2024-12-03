import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissions, addRole } from "../../redux/Slices/roleSlice";
import axios from "axios";

const AddRoleForm = () => {
  const dispatch = useDispatch();
  const { permissions, status, error } = useSelector((state) => state.roles);

  const [formData, setFormData] = useState({
    name: "",
    active: false,
    permissions: [],
    createdDate: "",
  });

  useEffect(() => {
    dispatch(fetchPermissions()); 
    const currentDate = new Date().toISOString().slice(0, 10);
    setFormData((prevData) => ({
      ...prevData,
      createdDate: currentDate,
    }));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addRole(formData)); 
      alert("Role added successfully!");
      setFormData({
        name: "",
        active: false,
        permissions: [],
        createdDate: new Date().toISOString().slice(0, 10),
      });
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

        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
          <div className="grid grid-cols-2 gap-2">
            {status === 'loading' ? (
              <div>Loading permissions...</div>
            ) : error ? (
              <div>Error loading permissions: {error}</div>
            ) : (
              permissions.map((permission) => (
                <div key={permission._id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span>{permission.name}</span>
                  </div>
                  <div
                    className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${formData.permissions.includes(permission._id) ? "bg-green-500" : "bg-gray-300"}`}
                    onClick={() => handlePermissionToggle(permission._id)}
                  >
                    <div
                      className={`h-4 w-4 bg-white rounded-full shadow-md transform ${formData.permissions.includes(permission._id) ? "translate-x-6" : "translate-x-0"} transition-transform`}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

       
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
