import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { FiUser, FiMail, FiLock, FiArrowLeft } from "react-icons/fi";

const inputBase =
  "block w-full pl-10 pr-3 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
const iconStyle = "h-5 w-5 text-gray-400";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !imageUrl) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    console.log("Registration attempt:", {
      username,
      email,
      password,
      imageUrl,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-2xl shadow-2xl space-y-8 animate-fade-in-down">
        {/* Back Button */}
        <a href="/">
          <button
            type="button"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          >
            <FiArrowLeft className="mr-2 h-5 w-5" />
            Home
          </button>
        </a>

        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
            <FiUser className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              sign in to your account
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className={iconStyle} />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`${inputBase} border-gray-300`}
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className={iconStyle} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputBase} border-gray-300`}
                required
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaImage className={iconStyle} />
              </div>
              <input
                id="imageUrl"
                name="imageUrl"
                type="imageUrl"
                placeholder="Image Url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={`${inputBase} border-gray-300`}
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className={iconStyle} />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputBase} border-gray-300`}
                required
              />
            </div>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong className="font-bold">Error!</strong>
              <span className="ml-2">{error}</span>
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 cursor-pointer rounded-xl"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
