import { useState } from 'react'
import { FaApple, FaGoogle } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi"
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../services/authThunks.js';
import { clearError } from '../store/slices/authSlice.js';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [pwdhide, setPwdhide] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const handleChange = () => {
    setPwdhide(prevState => !prevState)
  };
  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) dispatch(clearError());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      Navigate('/dashboard', { replace: true })
    }
  };

  return (
    <div className='flex justify-center min-h-screen items-center'>
      <form action="" className='shadow-[0_0_1px_rgba(0,0,0,0.5)] border border-gray-400 rounded-2xl w-full sm:w-6/12 h-full p-6 mx-5' onSubmit={handleSubmit}>
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
          <label htmlFor="" className="text-ml font-semibold">Email address</label>
          <input type="text" placeholder='Enter your email address' className='border rounded-lg border-gray-300 py-2 px-2' onChange={handleInput} value={formData.email} name='email' />
        </div>
        <div className='flex flex-col mb-4 relative'>
          <div className='flex justify-between'>
            <label htmlFor="" className="text-ml font-semibold">Password</label>
            <label htmlFor="" className="text-ml font-semibold">Forget password?</label>
          </div>
          <input type="text" placeholder='Enter your password' className='border-gray-300 border rounded-lg py-2 px-2' onChange={handleInput} value={formData.password} name='password' />
          <span className='absolute right-3 translate-y-9 cursor-pointer' onClick={handleChange}>{pwdhide ? <PiEyeBold /> : <PiEyeClosedBold />}  </span>
        </div>
        <button className='bg-black w-full text-white py-2 rounded-lg cursor-pointer' type='submit' disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
        <div className='flex justify-around items-center my-5'>
          <hr className="w-5/12 border-gray-400" />
          <span className="text-gray-400 text-xs">OR</span>
          <hr className="w-5/12 border-gray-400" />
        </div>
        <div className='flex flex-col gap-3'>
          <button className='flex justify-center items-center gap-2 border-gray-300 border py-2 rounded-lg font-semibold cursor-pointer'><FaGoogle />Continue with Google</button>
          <button className='flex justify-center items-center gap-2 border-gray-300 border py-2 rounded-lg font-semibold cursor-pointer'><FaApple />Continue with Apple</button>

        </div>
        <div className='flex justify-center mt-4'>
          <span className='text-md'>Don't have an account yet? <NavLink to="/signup" className='cursor-pointer font-semibold underline'>Signup</NavLink></span>
        </div>
      </form>
    </div>
  )
}

export default Login