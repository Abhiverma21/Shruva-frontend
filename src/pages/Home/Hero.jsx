import React from 'react'
import { Link } from 'react-router-dom'
import hero1Img from '../../assets/hero1.jpg'
import hero2Img from '../../assets/hero2.jpg'

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Content */}
        <div className="flex flex-col gap-8">
          
          {/* Main Heading */}
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 mb-4 leading-tight">
              Where Every Conversation Matters
            </h1>
          </div>

          {/* Sub-Heading */}
          <div>
            <p className="text-xl lg:text-2xl text-purple-700 font-semibold">
              Listen. Connect. Communicate — in real time.
            </p>
          </div>

          {/* Description */}
          <div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Shruva is a modern chat application designed for meaningful conversations. 
              With real-time messaging, a clean interface, and a user-friendly experience, 
              Shruva helps you stay connected — simply and securely.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 pt-4">
            <Link 
              to="/signup"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
            <Link 
              to="/features"
              className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 hover:shadow-lg transition-all duration-300"
            >
              Explore Features
            </Link>
          </div>
        </div>

        {/* Right Side - Image Container */}
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-md h-96">
            
            {/* Image 1 - Top Right */}
            <div className="absolute top-0 right-0 w-3/5 z-20">
              <img 
                src={hero2Img}
                alt="Chat interface"
                className="w-full h-72 object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>

            {/* Image 2 - Bottom Left */}
            <div className="absolute bottom-0 left-0 w-3/4 z-10">
              <img 
                src={hero1Img}
                alt="Chat features"
                className="w-full h-72 object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-300 rounded-full opacity-30 blur-3xl"></div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
