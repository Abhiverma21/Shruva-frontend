import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import logoImg from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
           
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                <img src={logoImg} alt='Logo Image ' className='size-12'/>Shruva
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A modern chat application designed for meaningful conversations. Connect, communicate, and stay secure.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition text-xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition text-xl">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Status
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Community</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Forums
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Contribute
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-purple-100">
                Get the latest news and updates about Shruva delivered to your inbox.
              </p>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none bg-gray-200 text-black"
                required    
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Bottom Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Copyright */}
          <div>
            <p className="text-gray-400 text-sm">
              © 2026 Shruva. All rights reserved.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-6 md:justify-end">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
              Cookie Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
