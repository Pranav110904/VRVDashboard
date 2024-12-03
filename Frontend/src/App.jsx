import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './assets/Pages/Home';
import Login from './assets/Pages/Login';
import Dashboard from './assets/Pages/Dashboard/Dashboard';
import Users from './assets/Pages/Dashboard/Users';
import Roles from './assets/Pages/Dashboard/Roles';
import Permissions from './assets/Pages/Dashboard/Permissions';
import Prime from './assets/Pages/Dashboard/Prime';
import ActivityLogs from './assets/Pages/Dashboard/ActivityLogs';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import AddUser from './assets/Pages/Dashboard/AddUser';
import AddRole from './assets/Pages/Dashboard/AddRole';
import Adding from './assets/components/Adding';


function App() {
  return (
    <>
       <div className="" id="style-2">

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/add/permissions" element={<Adding/>} />

        <Route path="/login" element={<Login />} />


        <Route path="/dashboard" element={<Dashboard />}>

          <Route path="users" element={<Users />} />
          <Route path="users/adduser" element={<AddUser />} />
          <Route path="roles" element={<Roles />} />
          <Route path="roles/addrole" element={<AddRole />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="app" element={<Prime />} />
          <Route path="activity-logs" element={<ActivityLogs />} />
          
          
        </Route>


        <Route path="*" element={<div className="text-center text-white">Page Not Found</div>} />
      </Routes>

      </div>
    
      
      
    </>
  );
}

export default App;
