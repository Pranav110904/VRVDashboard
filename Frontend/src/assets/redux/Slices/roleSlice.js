
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async () => {
    const response = await axios.get('/api/roles');
    return response.data;
  }
);

export const fetchPermissions = createAsyncThunk(
  'roles/fetchPermissions',
  async () => {
    const response = await axios.get('/api/permissions');
    return response.data;
  }
);

export const addRole = createAsyncThunk(
  'roles/addRole',
  async (roleData) => {
    const response = await axios.post('/api/roles/addrole', roleData);
    return response.data.role; 
  }
);

export const deleteRole = createAsyncThunk(
  'roles/deleteRole',
  async (id) => {
    await axios.delete(`/api/roles/roles/${id}`);
    return id; 
  }
);

export const roleSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    permissions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPermissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roles.push(action.payload);
      })
      .addCase(addRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roles = state.roles.filter((role) => role._id !== action.payload);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default roleSlice.reducer;
