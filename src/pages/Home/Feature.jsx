import React from 'react'
import { Link } from 'react-router-dom'
import { FaComments, FaLock, FaPalette } from 'react-icons/fa'

const Feature = () => {
  const topFeatures = [
    {
      title: "Real-Time Chat",
      description: "Instant conversations, zero delay. Messages are delivered instantly without refreshing the page.",
      icon: FaComments,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Secure & Private",
      description: "Your chats stay protected. Secure login and private one-to-one conversations.",
      icon: FaLock,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Clean & Simple UI",
      description: "Focus on conversations. Minimal design that keeps chatting smooth and distraction-free.",
      icon: FaPalette,
      color: "from-teal-500 to-teal-600"
    }
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-purple-50" id='home-feature'>
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 mb-4">
           Features That Make Conversations Better
          </h2>
          <p className="text-xl text-gray-700">
            Everything you need for smooth, secure, and meaningful chatting.


          </p>
        </div>

        {/* Top 3 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {topFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
              >
                {/* Icon Container */}
                <div className={`mb-6 w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform`}>
                  <IconComponent />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* View All Features Button */}
        <div className="flex justify-center">
          <Link
            to="/features"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            View All Features
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default Feature