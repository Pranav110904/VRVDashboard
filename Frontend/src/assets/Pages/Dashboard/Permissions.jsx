// src/components/Permissions.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setRoles,
  setPermissionsList,
  setSearchQuery,
  setSelectedRole,
  togglePermission,
  closeModal,
  updateRoles,
} from "../../redux/Slices/permissionSlice";

const Permissions = () => {
  const dispatch = useDispatch();
  const {
    searchQuery,
    roles,
    permissionsList,
    selectedRole,
    updatedPermissions,
    showModal,
  } = useSelector((state) => state.permissions);

 
  useEffect(() => {
    const fetchRolesAndPermissions = async () => {
      try {
        const rolesResponse = await axios.get("/api/roles");
        const permissionsResponse = await axios.get("/api/permissions");
        dispatch(setRoles(rolesResponse.data));
        dispatch(setPermissionsList(permissionsResponse.data));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchRolesAndPermissions();
  }, [dispatch]);

  
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

 
  const handleOpenModal = (role) => {
    dispatch(setSelectedRole(role));
  };

  
  const handleTogglePermission = (permissionId) => {
    dispatch(togglePermission(permissionId));
  };

  
  const handleUpdatePermissions = () => {
    if (selectedRole) {
      axios
        .put(`/api/roles/${selectedRole._id}`, {
          permissions: updatedPermissions,
        })
        .then(() => {
          dispatch(updateRoles({ _id: selectedRole._id, permissions: permissionsList.filter((permission) => updatedPermissions.includes(permission._id)) }));
        })
        .catch((err) => {
          console.error("Error updating permissions:", err);
        });
    }
  };

  return (
    <div className="container font-poppins mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search role..."
          className="p-2 border border-gray-300 rounded-md w-full max-w-md"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      <table className="min-w-full border-2 border-[#222361] rounded-lg">
        <thead>
          <tr className="border-b-2 border-[#222361]">
            <th className="p-4 text-left">Role Name</th>
            <th className="p-4 text-left">Permissions</th>
            <th className="p-4 text-left">Created Date</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role) => (
            <tr key={role._id} className="border-b">
              <td className="p-4">{role.name}</td>
              <td className="p-4">
                <div className="flex flex-wrap text-[#504f4f] space-x-2">
                  {role.permissions.map((permission) => (
                    <span
                      key={permission._id}
                      className="bg-gray-200 text-sm px-2 py-1 rounded-md"
                    >
                      {permission.name}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-4">{new Date(role.createdDate).toLocaleDateString()}</td>
              <td className="p-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleOpenModal(role)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Update Permissions for {selectedRole.name}
            </h2>
            <div className="space-y-4">
              {permissionsList.map((permission) => (
                <div key={permission._id} className="flex items-center justify-between">
                  <span>{permission.name}</span>
                  <div
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${updatedPermissions.includes(permission._id) ? "bg-green-500" : "bg-gray-300"}`}
                    onClick={() => handleTogglePermission(permission._id)}
                  >
                    <div
                      className={`h-4 w-4 bg-white rounded-full shadow-md transform ${updatedPermissions.includes(permission._id) ? "translate-x-6" : "translate-x-0"} transition-transform`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => dispatch(closeModal())}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleUpdatePermissions}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Permissions;
