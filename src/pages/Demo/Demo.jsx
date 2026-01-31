import React from "react";
import { Link } from "react-router-dom";
import {
  FiMessageCircle,
  FiCheck,
  FiCheckCircle,
  FiLayout,
  FiGithub,
  FiPlay,
  FiArrowRight,
  FiLogIn,
  FiLogOut,
  FiUserPlus,
} from "react-icons/fi";
import { BsCircleFill } from "react-icons/bs";

const Demo = () => {
  const features = [
    {
      icon: <FiMessageCircle className="text-3xl text-purple-600" />,
      title: "Real-Time Chat Interface",
      description:
        "Messages are delivered instantly with smooth animations and clean chat bubbles.",
    },
    {
      icon: <BsCircleFill className="text-3xl text-green-500" />,
      title: "Online Status",
      description:
        "See who is online and available for real-time conversations.",
    },
    {
      icon: <FiCheckCircle className="text-3xl text-blue-500" />,
      title: "Read Receipts",
      description:
        "Know when your messages are sent and read for better clarity.",
    },
    {
      icon: <FiLayout className="text-3xl text-pink-500" />,
      title: "Clean & Minimal UI",
      description:
        "A distraction-free interface designed for comfort and readability.",
    },
  ];

  const steps = [
    {
      icon: <FiUserPlus />,
      title: "Sign Up",
      desc: "Create your account using email and password to get started.",
    },
    {
      icon: <FiLogIn />,
      title: "Login",
      desc: "Securely log in and access your chat dashboard instantly.",
    },
    {
      icon: <FiMessageCircle />,
      title: "Start Chatting",
      desc: "Search users, open conversations, and chat in real time.",
    },
    {
      icon: <FiLogOut />,
      title: "Logout",
      desc: "Safely log out anytime from your profile menu.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* HERO */}
      <section className="pt-24 pb-20 max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          How to Use{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">
            Shruva
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A simple demo guide to help you understand how Shruva works — from
          signing up to real-time chatting.
        </p>
      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-purple-600">
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold text-purple-600">Shruva</span> is a
            real-time chat application designed with a strong focus on clarity,
            speed, and user experience. This demo explains how users can easily
            sign up, log in, start chatting, and log out securely.
          </p>
        </div>
      </section>

      {/* STEP BY STEP GUIDE */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-14">
          Step-by-Step Demo Flow
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-2xl mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          What You’ll Experience
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-8"
            >
              <div className="flex gap-4">
                {feature.icon}
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-6xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-14 text-white">
          <h3 className="text-4xl font-bold mb-6">
            Try the Shruva Demo Now
          </h3>
          <p className="text-lg text-purple-100 mb-10 max-w-2xl mx-auto">
            Explore the complete chat experience with real-time messaging and a
            clean, user-friendly interface.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link
              to="/chat"
              className="bg-white text-purple-600 font-bold py-4 px-10 rounded-full shadow-lg hover:scale-105 transition"
            >
              Launch Live Demo
            </Link>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="border-2 border-white py-4 px-10 rounded-full font-bold hover:bg-white hover:text-purple-600 transition"
            >
              View Source Code
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="py-12 text-center text-gray-600 text-sm">
        This demo explains the complete usage flow of Shruva — Signup, Login,
        Chat, and Logout — in a simple and user-friendly way.
      </section>
    </div>
  );
};

export default Demo;
