import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const EnhancedTable = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {

    const fetchRoles = async () => {
      try {
        const roleResponse = await axios.get('/api/roles');
        console.log(roleResponse.data);
        setRoles(roleResponse.data);
        console.log(roleResponse.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
}, []); 

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const userResponse = await axios.get('/api/users');
      setUsers(userResponse.data);
      console.log(userResponse.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  fetchUsers();
  
}, []); 

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [editUser, setEditUser] = useState(null); 
  const toggleUserSelection = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const deleteUser = (userId) => {
    axios
      .delete(`/api/users/${userId}`) 
      .then((response) => {
        console.log('User deleted:', response.data);
        setUsers(users.filter((u) => u._id !== userId));
        console.log(users);
      
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };


  const isUserSelected = (id) => selectedUsers.includes(id);

  const deleteSelectedUsers = async () => {
    try {
     
      await axios.delete('/api/users/deleteMany', {
        data: { ids: selectedUsers }  
      });
      setUsers((prevUsers) => prevUsers.filter((user) => !selectedUsers.includes(user._id)));
      setSelectedUsers([]);  
    } catch (error) {
      console.error("Error deleting selected users:", error);
    }
  };
  
  

  const sortUsers = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  const renderSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? " ↑" : " ↓";
    }
    return "";
  };


  const totalPages = Math.ceil(users.length / rowsPerPage);
  const paginatedUsers = users
    .filter((user) =>

      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    console.log(user);
 
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
  
    const dob = event.target.dob.value;
    const formattedDob = dob ? new Date(dob).toISOString() : editUser.dob;
  
    const updatedUser = {
      ...editUser,
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      dob: formattedDob, 
      role: event.target.role.value,
      status: editUser.status, 
    };
  
    try {
      console.log(updatedUser);
      const response = await axios.put(`/api/users/edit/${editUser._id}`, updatedUser);
      if (response) {
       
        const role = roles.find(role => role._id === updatedUser.role); 

        if (role) {
          
          const updatedUserWithRole = {
            ...updatedUser, 
            role: role, 
          };

          
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === updatedUser._id ? updatedUserWithRole : user 
            )
          );

          console.log('Updated user with role:', updatedUserWithRole);
        } else {
          console.error('Role not found');
        }
        console.log('hello',users);
        setEditUser(null);
         
      } else {
        console.error('Failed to update user:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error updating user:', error);
    }
    
  };
  

  return (
    <div className="container  font-poppins mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search user..."
          className="p-2 border border-gray-300 rounded-md w-full max-w-md"
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        
        {selectedUsers==0 ? <span className="text-gray-500 text-sm">No users selected</span>:<span className="text-gray-500 text-sm">{selectedUsers.length} users selected</span>}
        {selectedUsers.length === 0 ? (
          <Link to={"adduser"} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Add User
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
      <table className="min-w-full border-2 border-[#222361] rounded-lg">
        <thead>
          <tr className="border-b-2 border-[#222361]">
            <th className="p-4  text-left">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelectedUsers(
                    e.target.checked ? users.map((user) => user._id) : []
                  )
                }
                checked={selectedUsers.length === users.length && users.length > 0}
              />
            </th>
            <th className="p-4 text-left" onClick={() => sortUsers("name")}>
              Name {renderSortIndicator("name")}
            </th>
            <th className="p-4 text-left" onClick={() => sortUsers("email")}>
              Email {renderSortIndicator("email")}
            </th>
            <th className="p-4 text-left" onClick={() => sortUsers("phone")}>
              Phone {renderSortIndicator("phone")}
            </th>
            <th className="p-4 text-left" onClick={() => sortUsers("dob")}>
              DOB {renderSortIndicator("dob")}
            </th>
            <th className="p-4 text-left" onClick={() => sortUsers("role")}>
              Role {renderSortIndicator("role")}
            </th>
            <th className="p-4 text-left" onClick={() => sortUsers("status")}>
              Status {renderSortIndicator("status")}
            </th>
            <th
              className="p-4 text-left"
              onClick={() => sortUsers("createdDate")}
            >
              Created Date {renderSortIndicator("createdDate")}
            </th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr
              key={user._id}
              className={`${
                isUserSelected(user._id) ? "bg-gray-100" : ""
              } border-b`}
            >
              <td className="p-4">
                <input
                  type="checkbox"
                  onChange={() => toggleUserSelection(user._id)}
                  checked={isUserSelected(user._id)}
                />
              </td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.phone}</td>
              <td className="p-4">{new Date(user.dob).toLocaleDateString()}</td>
              <td className="p-4">{user.role.name}</td>
              <td className="p-4">
              <span
                  className={`px-2 py-1 text-sm rounded-md ${
                    user.status === true
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status === true ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="p-4">{new Date(user.createdDate).toLocaleDateString()}</td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    
                    deleteUser(user._id);; 
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div>
          <span>Rows per page: </span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border rounded-md p-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Previous
          </button>
          <span className="px-4">{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Next
          </button>
        </div>
      </div>


  
      {editUser && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div className="bg-black p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-xl text-white mb-4">Edit User: {editUser.name}</h2>
      <form onSubmit={handleSaveChanges}>
        <div className="mb-4">
          <label className="text-white block">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={editUser.name}
            className="border p-2 w-full rounded-md"
            placeholder="Enter name"
          />
        </div>
        <div className="mb-4">
          <label className="text-white block">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={editUser.email}
            className="border p-2 w-full rounded-md"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <label className="text-white block">Phone</label>
          <input
            type="text"
            name="phone"
            defaultValue={editUser.phone}
            className="border p-2 w-full rounded-md"
            placeholder="Enter phone number"
          />
        </div>
        <div className="mb-4">
          <label className="text-white block">Date of Birth</label>
          <input
            type="date"
            name="dob"
            defaultValue={editUser.dob ? editUser.dob.split('T')[0] : ""} 
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="text-white block">Role</label>
          <select
            name="role"
            defaultValue={editUser.role} 
            className="border p-2 w-full rounded-md"
          >
            {roles.map((role) => (
              <option key={role._id} value={role._id}>{role.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <div className="flex items-center">
            <div
              className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${editUser.status ? 'bg-green-500' : 'bg-gray-300'}`}
              onClick={() => setEditUser({ ...editUser, status: !editUser.status })}
            >
              <div
                className={`h-4 w-4 bg-white rounded-full shadow-md transform ${editUser.status ? 'translate-x-6' : 'translate-x-0'} transition-transform`}
              />
            </div>
            <span className="ml-3">{editUser.status ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => setEditUser(null)}
          className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
)}



    </div>
  );
};

export default EnhancedTable;
