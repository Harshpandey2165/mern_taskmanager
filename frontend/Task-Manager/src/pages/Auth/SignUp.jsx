import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import Input from '../../components/inputs/Input';  // Ensure the case matches the file name
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadimage";
import { UserContext } from "../../context/userContext";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);
  
  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  
  // Handle Signup Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = '';

    if(!fullName) {
      setError("Please enter your full name");
      return;
    }
    if(!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if(!password) {
      setError("Password is required");
      return;
    }

    setError("");

    // SignUp API Call 
    try {
    
      // Upload Profile Image if present
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken,
      });

      const {token, role} = response.data;
      if(token) {
        localStorage.setItem('token', token);
        updateUser(response.data);

        // Redirect to Dashboard based on role 
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

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image = {profilePic} setImage= {setProfilePic}/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Enter your full name"
              />
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

      <Input type="text" 
      value={adminInviteToken} 
      onChange={({target})=> setAdminInviteToken(target.value)} 
      label="Admin Invite Token" 
      placeholder='6 Digit Code' />
      </div>

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

<button type="submit" className='btn-primary'>Sign Up</button>
<p className="text-[13px] text-slate-800 mt-3">
  Already a user?
  <Link className="font-medium text-primary underline" to="/Login">
    Login</Link>
</p>
          
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;