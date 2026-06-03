import { useState } from 'react'
import { FaApple, FaGoogle } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi"
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../services/authThunks.js';
import { clearError } from '../store/slices/authSlice.js';
import authBackground from '../assets/authBackground.png';
import { useGoogleLogin } from '@react-oauth/google';
import { oauthLogin } from '../services/authThunks';
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [subscribe, setSubscribe] = useState(false);

  const [validationErrors, setValidationErrors] = useState({ email: '', password: '' });
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowPassword = () => { setShowPassword(!showPassword); };
  const handleInput = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: '' });
    if (error) dispatch(clearError());
  };
  const handleCheck = (e) => { setSubscribe(e.target.checked); }
  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = 'Password must contain at least one number';
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      errors.password = 'Password must contain at least one special character';
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    const finalPayload = { ...formData, subscribe: subscribe };
    const result = await dispatch(registerUser(finalPayload));
    if (registerUser.fulfilled.match(result)) {
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
    <div style={{ backgroundImage: `url(${authBackground})` }} className='flex justify-center min-h-screen items-center w-full'>
      <form className='shadow-[0_0_1px_rgba(0,0,0,0.5)] border border-gray-400 rounded-2xl w-full sm:w-6/12 h-full p-6 mx-5 bg-white' onSubmit={handleSubmit}>
        <div className="flex justify-center gap-3 mb-4">
          <NavLink to="/"
            type="button"
            className='flex justify-center items-center  rounded-lg p-1 border-gray-200 border gap-1 cursor-pointer'
          >
            <MdLogin /> Login
          </NavLink>
          <NavLink to="/signup"
            type="button"
            className='flex justify-center items-center rounded-lg p-1 gap-1 border-gray-300 border cursor-pointer font-semibold'
          >
            <HiOutlineUserAdd /> Sign Up
          </NavLink>
        </div>
        <div className='flex flex-col gap-3'>
          <button type='button' className='flex justify-center items-center gap-2 border-gray-300 border py-2 rounded-lg font-semibold cursor-pointer' onClick={() => handleGoogleLogin()}><FaGoogle />Continue with Google</button>
        </div>
        <div className='flex justify-around items-center my-5'>
          <hr className="w-5/12 border-gray-400" />
          <span className="text-gray-400 text-xs">OR</span>
          <hr className="w-5/12 border-gray-400" />
        </div>
        {error && (
          <div className='bg-red-100 text-red-600 text-sm px-3 py-2 rounded-lg mb-4'>
            {error}
          </div>
        )}
        <div className='flex flex-col mb-4'>
          <label className="text-ml font-semibold">Email address</label>
          <input type="email" placeholder='Enter your email address' className={`border rounded-lg py-2 px-2 ${validationErrors.email ? 'border-red-400' : 'border-gray-300'
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

          </div>
          <input type={showPassword ? "text" : "password"} autoComplete="new-password" id='password' placeholder='Enter your password' className={`border rounded-lg py-2 px-2 ${validationErrors.password ? 'border-red-400' : 'border-gray-300'
            }`} onChange={handleInput} name='password' value={formData.password} />
          <span className='absolute right-3 translate-y-9 cursor-pointer' onClick={handleShowPassword}>
            {showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
          </span>
          {validationErrors.password && (
            <span className='text-red-500 text-xs mt-1'>
              {validationErrors.password}
            </span>
          )}
        </div>
        <button className='bg-black w-full text-white py-2 rounded-lg cursor-pointer mb-4' type='submit' disabled={loading}>{loading ? 'Creating account...' : 'Create an account'}</button>
        <div className='flex items-start gap-2'>
          <input type='checkbox' id='terms' className='w-4 h-4 cursor-pointer' onChange={handleCheck} name='subscribe' checked={subscribe} />
          <label htmlFor="terms" className='cursor-pointer text-sm text-gray-600 leading-tight'>Please keep me updated by email with the latest news, research findings, reward programs, event updates.</label>
        </div>
        <div className='flex justify-center mt-4'>
          <span className='text-md'>Already have an account? <NavLink to="/" className='cursor-pointer underline font-semibold'>Login</NavLink></span>
        </div>
      </form>
    </div>
  )
}

export default Signup