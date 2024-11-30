import { Routes, Route } from 'react-router-dom';
import Home from './assets/Pages/Home';
import Login from './assets/Pages/Login';
import Dashboard from './assets/Pages/Dashboard/Dashboard';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';


function App() {
  return (
    <>
    
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        {/* Dashboard Sub-Routes */}
        {/* <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="project" element={<Project />} />
        <Route path="developer" element={<Developer />} />
        <Route path="tech-stack" element={<TechStack />} />
        <Route path="users/manage" element={<ManageUsers />} />
        <Route path="users/add" element={<AddUser />} />
        <Route path="roles/manage" element={<ManageRoles />} />
        <Route path="roles/add" element={<AddRole />} />
        <Route path="rbac" element={<RBACManagement />} /> */}
      </Route>
    </Routes>
   
    </>
  );
}

export default App;
