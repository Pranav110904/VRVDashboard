import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RolesTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  // Fetching user data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/roles");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Delete a user
  const deleteUser = async (id) => {
    try {
      console.log(id);
      await axios.delete(`/api/roles/roles/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setSelectedUsers((prev) => prev.filter((selectedId) => selectedId !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Delete selected users
  const deleteSelectedUsers = async () => {
    try {
      await Promise.all(
        selectedUsers.map((id) => axios.delete(`/api/roles/roles/${id}`))
      );

      setUsers((prevUsers) => prevUsers.filter((user) => !selectedUsers.includes(user._id)));
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error deleting selected users:", error);
    }
  };

  // Toggle individual user selection
  const toggleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  // Toggle select all users
  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user._id));
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  return (
    <div className="container font-poppins mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search user..."
          className="p-2 border border-gray-300 rounded-md w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          {selectedUsers.length === 0 ? (
            <Link to={"addrole"} className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Add Role
            </Link>
          ) : (
            <button
              onClick={deleteSelectedUsers}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete Selected
            </button>
          )}
        </div>
      </div>

      <table className="min-w-full border-2 border-[#222361] rounded-lg">
        <thead>
          <tr className="border-b-2 border-[#222361]">
            <th className="p-4 text-left">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
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
          {paginatedUsers.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-4">
                <input
                  type="checkbox"
                  onChange={() => toggleSelectUser(user._id)}
                  checked={selectedUsers.includes(user._id)}
                />
              </td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.active ? "Yes" : "No"}</td>
              <td className="p-4">
                {user.permissions.map((perm) => perm.name).join(", ")}
              </td>
              <td className="p-4">
                {new Date(user.createdDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="p-4">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination and items per page */}
      <div className="flex justify-between mt-4">
        {/* Items per page dropdown */}
        <div className="flex justify-start w-full">
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
          </select>
        </div>

        {/* Pagination buttons */}
        <div className="flex justify-end">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md mr-2"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md mx-1 ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolesTable;
