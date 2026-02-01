import React from 'react'
import { FaComment, FaPalette, FaLock, FaMoon, FaLeaf } from 'react-icons/fa'
import logoImg from '../../assets/logo.png';
import aboutImg from '../../assets/About.jpeg';

const About = () => {
  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-100">
      
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
              About Shruva
            </h1>
            <p className="text-2xl text-gray-700 font-semibold">
              Built for conversations that matter.
            </p>
          </div>

          {/* Main Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What is Shruva?</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Shruva is a modern real‑time chat application designed to make conversations simple, meaningful, and comfortable.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg mt-3">
                  We focus on clarity, speed, and user experience—so users can connect without distractions.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg mt-3">
                  With a clean interface and thoughtfully designed features, Shruva ensures that every message feels natural and every interaction feels smooth.
                </p>
              </div>
            </div>

            {/* Right - Visual Element */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full h-80 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 right-10 w-56 h-56 bg-blue-400 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 text-6xl">
                    <img src={logoImg} alt="Logo Image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Purpose</h2>
            <p className="text-xl text-gray-700">
              In a world full of noisy apps, Shruva is built to prioritize listening, connection, and simplicity.
            </p>
          </div>

          {/* Purpose Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl mb-4">📉</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Less Clutter</h3>
              <p className="text-gray-700">
                Minimalist design that removes distractions and focuses on what matters—your conversations.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">More Focus</h3>
              <p className="text-gray-700">
                Clean interface designed to keep your attention on meaningful conversations, not features.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl mb-4">💭</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Better Conversations</h3>
              <p className="text-gray-700">
                Every interaction is designed to make communication feel natural and effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Shruva Different */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            What Makes Shruva Different
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-3xl">
                <FaComment />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Real‑time Communication</h3>
              <p className="text-gray-700 text-sm">
                Instant messaging without delays
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl">
                <FaPalette />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Minimal & User‑Friendly</h3>
              <p className="text-gray-700 text-sm">
                Clean design that's easy to use
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-3xl">
                <FaLock />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Secure & Reliable</h3>
              <p className="text-gray-700 text-sm">
                Your chats are protected and private
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white text-3xl">
                <FaMoon />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Light & Dark Modes</h3>
              <p className="text-gray-700 text-sm">
                Comfortable viewing anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full h-120 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-20 left-20 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 text-center">
                <img src={aboutImg} alt="Design Image" />
                </div>
              </div>
            </div>

            {/* Right - Text */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Design Philosophy</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Shruva is designed with users at the center.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Every screen, color, and interaction is created to reduce effort and improve clarity—making chatting feel effortless.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that the best design is invisible. It works so well that users don't think about it—they just enjoy the experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-purple-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <FaLeaf className="text-6xl text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Our Vision</h2>
          <p className="text-2xl text-purple-100 leading-relaxed">
            "To create a calm and intuitive space where people can communicate freely and meaningfully."
          </p>
          <div className="mt-12 pt-12 border-t border-purple-400 border-opacity-30">
            <p className="text-purple-100 text-lg">
              Every day, millions of conversations happen on Shruva. We're committed to making each one count.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Shruva?</h2>
          <p className="text-gray-700 text-lg mb-8">
            Experience the difference of meaningful conversations.
          </p>
          <a href="/signup">  <button className="px-10 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all">
            Get Started Today
          </button></a>
        
        </div>
      </section>
    </div>
  )
}

export default About
