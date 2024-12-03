

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  roles: [],
  permissionsList: [],
  searchQuery: '',
  selectedRole: null,
  updatedPermissions: [],
  showModal: false,
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setPermissionsList: (state, action) => {
      state.permissionsList = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
      const rolePermissions = action.payload.permissions.map(
        (permission) => permission._id
      );
      state.updatedPermissions = rolePermissions;
      state.showModal = true;
    },
    setUpdatedPermissions: (state, action) => {
      state.updatedPermissions = action.payload;
    },
    togglePermission: (state, action) => {
      const permissionId = action.payload;
      state.updatedPermissions = state.updatedPermissions.includes(permissionId)
        ? state.updatedPermissions.filter((id) => id !== permissionId)
        : [...state.updatedPermissions, permissionId];
    },
    closeModal: (state) => {
      state.showModal = false;
    },
    updateRoles: (state, action) => {
      state.roles = state.roles.map((role) =>
        role._id === action.payload._id
          ? { ...role, permissions: action.payload.permissions }
          : role
      );
      state.showModal = false;
    },
  },
});

export const {
  setRoles,
  setPermissionsList,
  setSearchQuery,
  setSelectedRole,
  setUpdatedPermissions,
  togglePermission,
  closeModal,
  updateRoles,
} = permissionsSlice.actions;

export default permissionsSlice.reducer;

