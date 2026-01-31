import React from 'react'
import { FaUserPlus, FaSearch, FaComments, FaBolt } from 'react-icons/fa'

const HowWork = () => {
  const steps = [
    {
      title: "Create Your Account",
      description: "Sign up using your email and create a secure profile to get started on Shruva.",
      icon: FaUserPlus,
    },
    {
      title: "Discover & Connect",
      description: "Find friends, see who's online, and start new conversations effortlessly.",
      icon: FaSearch,
    },
    {
      title: "Chat in Real Time",
      description: "Send messages instantly with a clean, distraction-free chat experience.",
      icon: FaComments,
    },
    {
      title: "Stay Connected",
      description: "Track online status, receive messages instantly, and enjoy smooth conversations.",
      icon: FaBolt,
    },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 mb-4">
            How Shruva Works
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Getting started with Shruva is simple, fast, and intuitive.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon
            return (
              <div 
                key={step.title}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
              >
                {/* Icon */}
                <div className="mb-6 text-5xl text-purple-600 group-hover:text-teal-500 transition-colors flex justify-center">
                  <IconComponent />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Bottom Accent */}
                <div className="mt-6 h-1 w-12 bg-gradient-to-r from-purple-600 to-teal-500 rounded-full mx-auto"></div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default HowWork