import { useState } from 'react'
import { FaApple, FaGoogle } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi"
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../services/authThunks.js';
import { clearError } from '../store/slices/authSlice.js';
const Signup = () => {
  const [pwdhide, setPwdhide] = useState(false);
  const [formData, setFormData] = useState(
    {
      email: '',
      password: ''
    }
  );
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });
  const { loading, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = () => {
    setPwdhide(prevState => !prevState);
  };
  const handleInput = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setValidationErrors({ ...validationErrors, [e.target.name]: '' });
    if (error) dispatch(clearError());
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
    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      navigate('/dashboard', { replace: true })
    }
  };
  return (
    <div className='flex justify-center min-h-screen items-center'>
      <form action="" className='shadow-[0_0_1px_rgba(0,0,0,0.5)] border border-gray-400 rounded-2xl w-full sm:w-6/12 h-full p-6 mx-5' onSubmit={handleSubmit}>
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
          <button className='flex justify-center items-center gap-2 border-gray-300 border py-2 rounded-lg font-semibold cursor-pointer'><FaGoogle />Continue with Google</button>
          <button className='flex justify-center items-center gap-2 border-gray-300 border py-2 rounded-lg font-semibold cursor-pointer'><FaApple />Continue with Apple</button>
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
          <label htmlFor="" className="text-ml font-semibold">Email address</label>
          <input type="text" placeholder='Enter your email address' className={`border rounded-lg py-2 px-2 ${validationErrors.email ? 'border-red-400' : 'border-gray-300'
            }`} onChange={handleInput} value={formData.email} name='email' />
          {validationErrors.email && (
            <span className='text-red-500 text-xs mt-1'>
              {validationErrors.email}
            </span>
          )}
        </div>
        <div className='flex flex-col mb-4 relative'>
          <div className='flex justify-between'>
            <label htmlFor="" className="text-ml font-semibold">Password</label>
            <label htmlFor="" className="text-ml font-semibold">Forget password?</label>
          </div>
          <input type="text" placeholder='Enter your password' className={`border rounded-lg py-2 px-2 ${validationErrors.password ? 'border-red-400' : 'border-gray-300'
            }`} onChange={handleInput} name='password' value={formData.password} />
          <span className='absolute right-3 translate-y-9 cursor-pointer' onClick={handleChange}>{pwdhide ? <PiEyeBold /> : <PiEyeClosedBold />}  </span>
          {validationErrors.password && (
            <span className='text-red-500 text-xs mt-1'>
              {validationErrors.password}
            </span>
          )}
        </div>
        <button className='bg-black w-full text-white py-2 rounded-lg cursor-pointer mb-4' type='submit' disabled={loading}>{loading ? 'Creating account...' : 'Create an account'}</button>
        <div className='flex items-start gap-2'>
          <input type='checkbox' id='terms' className='w-4 h-4 cursor-pointer' />
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