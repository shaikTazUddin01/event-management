import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { FiUser, FiMail, FiLock, FiArrowLeft } from "react-icons/fi";
import { useUserRegistrationMutation } from "../redux/features/auth/user.api";
import { toast, Toaster } from "sonner";
import { Navigate, useNavigate } from "react-router-dom";

const inputBase =
  "block w-full pl-10 pr-3 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
const iconStyle = "h-5 w-5 text-gray-400";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [userRegistration] = useUserRegistrationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !imageUrl) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const userData = { name, email, password, imageUrl };
    const toastId = toast.loading("Registration On Processing...");

    try {
      const response = await userRegistration(userData);

      if (response.error) {
        toast.error(response.error.data || "Registration failed", {
          id: toastId,
        });
        return;
      }

      if (response) {
        toast.success("Registration Successful", {
          id: toastId,
          duration: 500,
        });
        navigate("/login");
      }
    } catch (err) {
      toast.error(err, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-2xl shadow-2xl space-y-8 animate-fade-in-down">
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
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                type="text"
                placeholder="Image URL"
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
      <Toaster />
    </div>
  );
};

export default Registration;
