import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import signupImg from '../../assets/signup.jpg';
import logoImg from '../../assets/logo.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const navigate = useNavigate()
  const { login } = useAuth()
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch("https://shruva-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || "Login failed");
        return;
      }

      // Store in auth context and localStorage
      login(data.user, data.token);
      
      alert("Login successful!");
      navigate("/")
      // reset form
      setFormData({
        email: '',
        password: '',
        rememberMe: false
      });
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  }

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Left Side - Image */}
      <div className="hidden lg:flex w-1/2 bg-white items-center justify-center relative overflow-hidden">
        <img 
          src={signupImg}
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-8 md:px-12 py-4 lg:py-0">
        <div className="max-w-md w-full mx-auto">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="text-3xl"><img src={logoImg} className='size-12' /></span>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Shruva
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            
            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              required
            />

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                required
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-gray-700">Remember me</span>
              </label>
              <Link to="#" className="text-purple-600 hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-sm mt-2"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-600 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
              <FaGoogle className="text-red-500" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
              <FaFacebook className="text-blue-600" />
              Facebook
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>

          {/* Terms */}
          <p className="text-center text-gray-500 text-xs mt-6">
            By signing in, you agree to our{' '}
            <Link to="#" className="text-purple-600 hover:underline">
              Terms
            </Link>
            {' '}and{' '}
            <Link to="#" className="text-purple-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
