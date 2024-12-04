import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false); // Loading state
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

  const handleUpdatePermissions = async () => {
    if (selectedRole) {
      setLoading(true); // Start loading
      try {
        // Simulate a 2-second loading time
        await new Promise((resolve) => setTimeout(resolve, 2000));
  
        await axios.put(`/api/roles/${selectedRole._id}`, {
          permissions: updatedPermissions,
        });
        alert("Permissions updated successfully");
        dispatch(
          updateRoles({
            _id: selectedRole._id,
            permissions: permissionsList.filter((permission) =>
              updatedPermissions.includes(permission._id)
            ),
          })
        );
        dispatch(closeModal());
      } catch (err) {
        console.error("Error updating permissions:", err);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };
  


  return (
    <div className="container font-poppins bg-white rounded-2xl text-[#222361] mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search role..."
          className="p-2 border-2 border-[#222361] rounded-md w-full max-w-md"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      <div className="overflow-x-auto">
  <table className="min-w-full border-2 border-[#222361] rounded-lg text-xs sm:text-base">
    <thead>
      <tr className="border-b-2 border-[#222361]">
        <th className="p-2 sm:p-4 text-left">Role Name</th>
        <th className="p-2 sm:p-4 text-left">Permissions</th>
        <th className="p-2 sm:p-4 text-left hidden sm:table-cell">
          Created Date
        </th>
        <th className="p-2 sm:p-4 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredRoles.map((role) => (
        <tr key={role._id} className="border-b">
          <td className="p-2 sm:p-4">{role.name}</td>
          <td className="p-2 sm:p-4">
            <div className="flex items-center justify-start gap-1 px-2 py-1 flex-wrap text-[#222361] space-x-1">
              {role.permissions.map((permission) => (
                <span
                  key={permission._id}
                  className="border-2 border-[#222361] text-xs sm:text-sm px-2 py-1 rounded-md"
                >
                  {permission.name}
                </span>
              ))}
            </div>
          </td>
          <td className="p-2 sm:p-4 hidden sm:table-cell">
            {new Date(role.createdDate).toLocaleDateString()}
          </td>
          <td className="p-2 sm:p-4">
            <button
              className="bg-[#8789ff] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm"
              onClick={() => handleOpenModal(role)}
            >
              Update
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {showModal && (
        <div className="fixed inset-0 bg-black text-black bg-opacity-50 mx-5 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Update Permissions for {selectedRole.name}
            </h2>
            <div className="space-y-4">
              {permissionsList.map((permission) => (
                <div
                  key={permission._id}
                  className="flex items-center justify-between"
                >
                  <span>{permission.name}</span>
                  <div
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                      updatedPermissions.includes(permission._id)
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                    onClick={() => handleTogglePermission(permission._id)}
                  >
                    <div
                      className={`h-4 w-4 bg-white rounded-full shadow-md transform ${
                        updatedPermissions.includes(permission._id)
                          ? "translate-x-6"
                          : "translate-x-0"
                      } transition-transform`}
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
              className="bg-[#9e9ff3] text-white px-4 py-2 rounded-md flex items-center justify-center"
              onClick={handleUpdatePermissions}
              disabled={loading}
            >
              
                "Save"
            </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Permissions;
