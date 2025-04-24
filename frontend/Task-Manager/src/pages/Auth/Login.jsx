import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosinstance';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();
  

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if(!password) {
      setError("Password is required");
      return;
    }

    setError("");

    // Login API Call 
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password
      });
      const {token, role} = response.data;
      if(token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        if(role === 'admin') {
          navigate('/admin/dashboard'); 
        }else {
          navigate('/user/dashboard');
        }
      }
    }catch(error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message); 
      }
      else {
        setError("An error occurred. Please try again later.");
      }
    }
  };
  return <AuthLayout>
    <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
    <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
    <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to log in</p>

    <form onSubmit={handleLogin}>
      <Input type="text" 
      value={email} 
      onChange={({target})=> setEmail(target.value)} 
      label="Email Address" 
      placeholder='harshpandey00009@gmail.com' />

      <Input type="password" 
      value={password} 
      onChange={({target})=> setPassword(target.value)} 
      label="Password" 
      placeholder='MIn 8 character' />

      {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

      <button type="submit" className='btn-primary'>Login</button>
      <p className="text-[13px] text-slate-800 mt-3">
        Don't have an account?
        <Link className="font-medium text-primary underline" to="/SignUp">
          SignUp</Link>
      </p>
      </form>
    </div>
  </AuthLayout>
}

export default Login
