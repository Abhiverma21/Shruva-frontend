import React from 'react'
import { FaComments, FaLock, FaCircle, FaCheckDouble, FaPalette, FaMoon } from 'react-icons/fa'

const AllFeatures = () => {
  const features = [
    {
      id: 1,
      title: "Real-Time Messaging",
      description: "Send and receive messages instantly with zero delay for seamless conversations.",
      shortDesc: "No reloads, smooth message flow",
      icon: FaComments,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 2,
      title: "Secure Authentication",
      description: "Your chats are protected with secure login and authentication.",
      shortDesc: "Trust + safety feeling",
      icon: FaLock,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50"
    },
    {
      id: 3,
      title: "Online & Offline Status",
      description: "Know when your friends are online and available to chat.",
      shortDesc: "Reduces unnecessary waiting",
      icon: FaCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 4,
      title: "Read Receipts",
      description: "See when messages are delivered and read in real time.",
      shortDesc: "Clear communication feedback",
      icon: FaCheckDouble,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 5,
      title: "Clean & Minimal Interface",
      description: "A distraction-free design focused on readability and comfort.",
      shortDesc: "Less cognitive load, more focus",
      icon: FaPalette,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      id: 6,
      title: "Light & Dark Mode",
      description: "Switch between light and dark themes for comfortable chatting anytime.",
      shortDesc: "Eye-friendly experience",
      icon: FaMoon,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ]

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-b from-slate-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 mb-6">
            All Features
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Shruva comes packed with powerful features designed to make your chatting experience smooth, 
            secure, and enjoyable. Explore everything that makes Shruva the perfect choice for real-time communication.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon
            return (
              <div
                key={feature.id}
                className={`group relative h-full rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-300 border border-gray-100 hover:border-purple-300 bg-white`}
              >
                {/* Top colored border */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${feature.color} rounded-t-3xl`}></div>

                {/* Feature number */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 group-hover:bg-purple-200 group-hover:text-purple-600 transition-all">
                  {feature.id}
                </div>

                {/* Icon */}
                <div className={`mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-3xl group-hover:scale-110 group-hover:rotate-9 transition-transform duration-300 shadow-lg`}>
                  <IconComponent />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Short desc with UX note */}
                <div className={`${feature.bgColor} rounded-lg px-4 py-3 mb-6 border-l-4 border-current`}>
                  <p className="text-sm font-semibold text-gray-700">
                    👉 {feature.shortDesc}
                  </p>
                </div>

                {/* Bottom divider */}
                <div className="border-t border-gray-200 pt-6">
                  <span className="text-purple-600 font-semibold text-sm">✓ Included in Shruva</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <p className="text-xl text-gray-700 mb-8">
            Ready to experience all these amazing features?
          </p>
          <a href='/signup'><button className="px-12 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-lg rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg">
            Get Started Now
          </button></a>
          
        </div>

      </div>
    </section>
  )
}

export default AllFeatures
