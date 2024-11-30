import { Routes, Route } from 'react-router-dom';
import Home from './assets/Pages/Home';
import Login from './assets/Pages/Login';
import Dashboard from './assets/Pages/Dashboard/Dashboard';
import Users from './assets/Pages/Dashboard/Users';
import Roles from './assets/Pages/Dashboard/Roles';
import Permissions from './assets/Pages/Dashboard/Permissions';
import Analytics from './assets/Pages/Dashboard/Analytics';
import ActivityLogs from './assets/Pages/Dashboard/ActivityLogs';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';

function App() {
  return (
    <>
      

      {/* Main Routes */}
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Sub-Routes for Dashboard */}
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="activity-logs" element={<ActivityLogs />} />
        </Route>

        {/* Catch-All Route (404 Page) */}
        <Route path="*" element={<div className="text-center text-white">Page Not Found</div>} />
      </Routes>

      
    </>
  );
}

export default App;
