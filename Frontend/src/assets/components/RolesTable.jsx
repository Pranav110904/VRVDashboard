// src/components/RolesTable.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, deleteRole } from "../../assets/redux/Slices/roleSlice";
import { TiPlusOutline } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
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
      alert("Selected roles deleted successfully");
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
    <div className="container text-[#222361] h-full font-poppins mx-auto px-4 py-8">
      <div className="mb-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search role..."
          className="p-2 border-2 border-[#222361] rounded-md w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          {selectedRoles.length === 0 ? (
            <Link to={"addrole"} className="px-4 py-2 flex items-center justify-center gap-3 bg-[#9e9ff3] text-[#222361] rounded-md">
              Add Role  <TiPlusOutline size={25} />
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
  <div className="overflow-x-auto">
    <table className="min-w-full border-2 border-[#222361] rounded-lg">
      <thead>
        <tr className="border-b-2 border-[#222361]">
          <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
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
          <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">Name</th>
          <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">Active</th>
          <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">Permissions</th>
          <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">Created Date</th>
          <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">Action</th>
        </tr>
      </thead>
      <tbody>
        {paginatedRoles.map((role) => (
          <tr key={role._id} className="border-b">
            <td className="p-2 sm:p-4 text-xs sm:text-sm">
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
            <td className="p-2 sm:p-4 text-xs sm:text-sm">{role.name}</td>
            <td className="p-2 sm:p-4 text-xs sm:text-sm">
              <span
                className={`px-2 py-1 text-xs sm:text-sm rounded-md ${
                  role.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {role.active ? "Active" : "Inactive"}
              </span>
            </td>
            <td className="p-2 sm:p-4 text-xs sm:text-sm">
              {role.permissions.map((perm) => perm.name).join(", ")}
            </td>
            <td className="p-2 sm:p-4 text-xs sm:text-sm">
              {new Date(role.createdDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </td>
            <td className="p-2 sm:p-4 text-xs sm:text-sm">
              <button
                onClick={() => dispatch(deleteRole(role._id))}
                className="px-4 py-2 text-red-500 rounded-md"
              >
                <RiDeleteBin6Line size={30} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


     
<div className="flex flex-col sm:flex-row justify-between mt-4">
  <div className="flex justify-start gap-2 items-center w-full mb-4 sm:mb-0">
    <span>Rows per page</span>
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
  <div className="flex justify-between w-full sm:justify-end">
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
