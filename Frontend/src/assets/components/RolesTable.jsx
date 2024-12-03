// src/components/RolesTable.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, deleteRole } from "../../assets/redux/Slices/roleSlice";

const RolesTable = () => {
  const dispatch = useDispatch();
  const { roles, status, error } = useSelector((state) => state.roles);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);


  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const deleteSelectedRoles = async () => {
    try {
      await Promise.all(
        selectedRoles.map((id) => dispatch(deleteRole(id)))
      );
      setSelectedRoles([]);
    } catch (error) {
      console.error("Error deleting selected roles:", error);
    }
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const paginatedRoles = filteredRoles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container font-poppins mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search role..."
          className="p-2 border border-gray-300 rounded-md w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          {selectedRoles.length === 0 ? (
            <Link to={"addrole"} className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Add Role
            </Link>
          ) : (
            <button
              onClick={deleteSelectedRoles}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete Selected
            </button>
          )}
        </div>
      </div>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "failed" ? (
        <p>Error: {error}</p>
      ) : (
        <table className="min-w-full border-2 border-[#222361] rounded-lg">
          <thead>
            <tr className="border-b-2 border-[#222361]">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  onChange={() => {
                    if (selectedRoles.length === filteredRoles.length) {
                      setSelectedRoles([]);
                    } else {
                      setSelectedRoles(filteredRoles.map((role) => role._id));
                    }
                  }}
                  checked={selectedRoles.length === filteredRoles.length && filteredRoles.length > 0}
                />
              </th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Active</th>
              <th className="p-4 text-left">Permissions</th>
              <th className="p-4 text-left">Created Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRoles.map((role) => (
              <tr key={role._id} className="border-b">
                <td className="p-4">
                  <input
                    type="checkbox"
                    onChange={() =>
                      setSelectedRoles((prev) =>
                        prev.includes(role._id)
                          ? prev.filter((id) => id !== role._id)
                          : [...prev, role._id]
                      )
                    }
                    checked={selectedRoles.includes(role._id)}
                  />
                </td>
                <td className="p-4">{role.name}</td>
                <td className="p-4">{role.active ? "Yes" : "No"}</td>
                <td className="p-4">
                  {role.permissions.map((perm) => perm.name).join(", ")}
                </td>
                <td className="p-4">
                  {new Date(role.createdDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => dispatch(deleteRole(role._id))}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

     
      <div className="flex justify-between mt-4">
        
        <div className="flex justify-start w-full">
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <div className="flex justify-end">
          
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-black rounded-md"
          >
            Prev
          </button>
          <span className="px-4 py-2">{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-black rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolesTable;
