import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchRoles = createAsyncThunk('users/fetchRoles', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/roles`);
  return response.data;
});


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`);
  return response.data;
});


export const addUser = createAsyncThunk('users/addUser', async (userData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/adduser`, userData);
  return response.data;
});


export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`);
  return userId;
});


const initialState = {
  users: [],
  roles: [],
  loading: false,
  error: null,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
   
    builder.addCase(fetchRoles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.roles = action.payload;
    });
    builder.addCase(fetchRoles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload);
    });
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
