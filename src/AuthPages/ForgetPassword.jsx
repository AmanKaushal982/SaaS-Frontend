import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [formData, setFormData] = useState({ email: '', otp: '', newPassword: "", confirmPassword: '' });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleInput = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) };
    const handleSendOtp = async () => {
        try {

        }
        catch (err) {

        }
    };
    const handleVerifyOtp = async () => {
        try {

        }
        catch (err) {

        }
    };
    const handleResetPassword = async () => {
        try {
        }
        catch (err) {

        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

                <div>
                    <h1 className="text-2xl flex items-center gap-16 font-bold text-center text-orange-600 mb-6">
                        <Link to="/login" className="text-orange-600">
                            <IoIosArrowRoundBack size={36} />
                        </Link>
                        Forget Password
                    </h1>
                    <div className="mb-5">
                        <label htmlFor="email" className='block text-md font-semibold text-gray-800 mb-3'>
                            Email ID <sup className="text-orange-600 text-[16px]">*</sup>
                        </label>
                        <input type="email" id='email' name='email' value={email.email} onChange={handleInput} placeholder="Enter your email address" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none  focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300" required />
                    </div>
                    <button type='button' className="w-full mt-3 bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 hover:cursor-pointer transition-all duration-300" onClick={handleSendOtp}>Send OTP</button>
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">
                        OTP Verification
                    </h1>
                    <div className="mb-5">
                        <label
                            htmlFor="otp"
                            className="block text-md font-semibold text-gray-800 mb-3"
                        >Enter OTP<sup className="text-orange-600 text-[16px]">*</sup>
                        </label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={otp}
                            onChange={handleInput}
                            placeholder="Enter 6 digit OTP"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none  focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full mt-3 bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 hover:cursor-pointer transition-all duration-300"
                        onClick={handleVerifyOtp}>
                        Verify OTP
                    </button>
                </div>


                <div>
                    <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">
                        Reset Password
                    </h1>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-800 mb-2">New Password
                            <sup className="text-orange-600 text-[16px]">*</sup>
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="newPassword"
                                name="newPassword"
                                value={newPassword}
                                onChange={handleInput}
                                placeholder="Enter password (min 6 characters)"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none  focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                                required
                            />
                            <button
                                type="button"
                                onClick={handleNewPassword}
                                className="absolute top-[50%] right-3 translate-[-50%] cursor-pointer"
                            >
                                {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-semibold text-gray-800 mb-2"
                        >
                            Confirm Password
                            <sup className="text-orange-600 text-[16px]">*</sup>
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleInput}
                                placeholder="Enter password (min 6 characters)"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none  focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                                required
                            />
                            <button
                                type="button"
                                onClick={handleConfirmPassword}
                                className="absolute top-[50%] right-3 translate-[-50%] cursor-pointer"
                            >
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full mt-3 bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 hover:cursor-pointer transition-all duration-300"
                        onClick={handleResetPassword}
                    >
                        Reset Password
                    </button>
                </div>

            </div>
        </div >
    )
}

export default ForgetPassword