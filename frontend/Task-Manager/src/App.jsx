import React, { useContext } from 'react'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
}  from "react-router-dom";
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Admin/Dashboard';
import ManageTask from './pages/Admin/ManageTask';
import CreateTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/ManageUsers';

import UserDashboard from './pages/User/UserDashboard';
import Mytasks from './pages/User/Mytasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';

import PrivateRoute from './routes/PrivateRoute';
import UserProvider, { UserContext } from './context/userContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/signUp' element={<SignUp />}/>

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path='/admin/dashboard' element={<Dashboard />}/>
              <Route path='/admin/tasks' element={<ManageTask />}/>
              <Route path='/admin/create-task' element={<CreateTask />}/>
              <Route path='/admin/users' element={<ManageUsers />}/>
            </Route>

            {/* User Routes */}
            <Route element={<PrivateRoute allowedRoles={["user"]} />}>
              <Route path='/user/dashboard' element={<UserDashboard />}/>
              <Route path='/user/tasks' element={<Mytasks />}/>
              <Route path='/user/tasks-details/:id' element={<ViewTaskDetails />}/>
            </Route>

            {/* Default Route */}
            <Route path='/' element={<Root />}/>
          </Routes>
        </Router>
      </div>

      <Toaster toastOptions={{className: "", style: {
        fontSize: "13px",
      }}}  />
    </UserProvider>
  );
};

export default App;

const Root = ()=>{
  const {user, loading} = useContext(UserContext);

  if(loading)return <Outlet/>

  if(!user) return <Navigate to="/login" />

  return user.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />
}
