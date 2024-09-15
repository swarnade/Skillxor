import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import { Header } from "../../components/Header";

export const Signup = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      console.log(name, mobileNumber, email, password, confirmPassword);
      await axios.post("http://localhost:1234/freelancer/signup", {
        Name: name,
        Mobile_Number: mobileNumber,
        Email: email,
        Create_Password: password,
        Confirm_Password: confirmPassword,
      });
      setPassword("");
      setEmail("");
      setMobileNumber("");
      setName("");
      setConfirmPassword("");
      alert("Signup Successfully Done");
      navigate("/freelancer/login");
    } catch (error) {
      alert("Signup not successful");
      console.error(error);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return "";
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    return "strong";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
      {/* Fixed Header */}
      <Header className="fixed top-0 left-0 w-full z-10" />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center pt-16"> {/* Adjust padding top to make space for the fixed header */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
          <h1 className="text-3xl font-extrabold text-center dark:text-indigo-900">Sign up</h1>
          <p className="text-center text-gray-500">Enter your details below to create an account</p>

          <div className="space-y-5">
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-12"
              />
              <User className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            </div>

            {/* Mobile Number Input */}
            <div className="relative">
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-12"
              />
              <Phone className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-12"
              />
              <Mail className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-12 pr-12"
              />
              <Lock className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-400 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-12 pr-12"
              />
              <Lock className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3 text-gray-400 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="flex items-center space-x-2">
                <div
                  className={`h-2 flex-grow rounded-full transition-all duration-300 ease-in-out ${
                    getPasswordStrength(password) === "weak"
                      ? "bg-red-500"
                      : getPasswordStrength(password) === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                ></div>
                <span className="text-sm text-gray-600 capitalize">{getPasswordStrength(password)} password</span>
              </div>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSignup}
            className="w-full dark:bg-indigo-900 text-white rounded-lg py-3 px-4 font-bold "
          >
            Sign up
          </button>

          {/* Login Redirect */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <NavLink to="/freelancer/login" className="text-indigo-600 hover:underline">
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
