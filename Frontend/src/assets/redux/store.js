import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import roleReducer from './Slices/roleSlice';
import permissionsReducer from './Slices/permissionSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    roles: roleReducer,
    permissions: permissionsReducer,
  },
});

export default store;
