import { useState } from 'react'
import { FaApple, FaGoogle } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi"
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../services/authThunks.js';
import { clearError } from '../store/slices/authSlice.js';
import authBackground from '../assets/authBackground.png';
import { oauthLogin } from '../services/authThunks.js';
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [validationErrors, setValidationErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleShowPassword = () => { setShowPassword(!showPassword) };
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: '' });

  };
  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    return errors;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) dispatch(clearError());
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard', { replace: true })
    }
  };
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });
        const userInfo = await response.json();
        const result = await dispatch(oauthLogin({
          email: userInfo.email,
          providerId: userInfo.sub,
          authProvider: 'google'
        }));
        if (oauthLogin.fulfilled.match(result)) {
          navigate('/dashboard', { replace: true });
        }
      }
      catch (err) {
        console.log('Failed to fetch user info', err);
      }
    },
    onError: () => console.log('Google Login Failed')
  });
  return (
    <div style={{ backgroundImage: `url(${authBackground})` }} className='flex justify-center min-h-screen items-center'>
      <form className='shadow-[0_0_1px_rgba(0,0,0,0.5)] border border-gray-400 rounded-2xl w-full sm:w-6/12 h-full p-6 mx-5 bg-white' onSubmit={handleSubmit}>
        <div className="flex justify-center gap-3 mb-4">
          <NavLink to="/"
            type="button"
            className='flex justify-center items-center font-semibold  rounded-lg p-1 border-gray-300 border gap-1 cursor-pointer'
          >
            <MdLogin /> Login
          </NavLink>
          <NavLink to="/signup"
            type="button"
            className='flex justify-center items-center rounded-lg p-1 gap-1 border-gray-200 border cursor-pointer'
          >
            <HiOutlineUserAdd /> Sign Up
          </NavLink>
        </div>
        {error && (
          <div className='bg-red-100 text-red-600 text-sm px-3 py-2 rounded-lg mb-4'>
            {error}
          </div>
        )}
        <div className='flex flex-col mb-4'>
          <label htmlFor="email" className="text-ml font-semibold">Email address</label>
          <input type="text" id='email' placeholder='Enter your email address' className={`border rounded-lg py-2 px-2 ${validationErrors.email ? 'border-red-400' : 'border-gray-300'
            }`} onChange={handleInput} value={formData.email} name='email' />
          {validationErrors.email && (
            <span className='text-red-500 text-xs mt-1'>
              {validationErrors.email}
            </span>
          )}
        </div>
        <div className='flex flex-col mb-4 relative'>
          <div className='flex justify-between'>
            <label htmlFor="password" className="text-ml font-semibold">Password</label>
            <label className="text-ml font-semibold"><Link to="/forget-password">Forget password?</Link></label>
          </div>
          <input type={showPassword ? 'text' : 'password'} id='password' autoComplete="new-password" placeholder='Enter your password' className={`border rounded-lg py-2 px-2 ${validationErrors.password ? 'border-red-400' : 'border-gray-300'
            }`} onChange={handleInput} value={formData.password} name='password' />
          <span className='absolute right-3 translate-y-9 cursor-pointer' onClick={handleShowPassword}>{showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}  </span>
          {validationErrors.password && (
            <span className='text-red-500 text-xs mt-1'>
              {validationErrors.password}
            </span>
          )}
        </div>
        <button className='bg-black w-full text-white py-2 rounded-lg cursor-pointer' type='submit' disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
        <div className='flex justify-around items-center my-5'>
          <hr className="w-5/12 border-gray-400" />
          <span className="text-gray-400 text-xs">OR</span>
          <hr className="w-5/12 border-gray-400" />
        </div>
        <div className='flex flex-col gap-3'>
          <button type='button' className='flex justify-center items-center gap-2 border-gray-300 border py-2 rounded-lg font-semibold cursor-pointer' onClick={() => handleGoogleLogin()}><FaGoogle />Continue with Google</button>
        </div>
        <div className='flex justify-center mt-4'>
          <span className='text-md'>Don't have an account yet? <NavLink to="/signup" className='cursor-pointer font-semibold underline'>Signup</NavLink></span>
        </div>
      </form>
    </div>
  )
}

export default Login