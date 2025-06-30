import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { FiMail, FiLock, FiLogIn, FiArrowLeft } from "react-icons/fi";
import { useUserLoginMutation } from "../redux/features/auth/user.api";
import { authDecode } from "../utils/authDecode";
import { authInfo } from "../redux/features/auth/auth.slice";

const inputBase =
  "block w-full pl-10 pr-3 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
const iconStyle = "h-5 w-5 text-gray-400";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userLogin] = useUserLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    const userData = {
      email,
      password,
    };
    const toastId = toast.loading("login in progress...");
    try {
      const response = await userLogin(userData);

      if (response) {
        console.log(response);
        const userInfo = authDecode(response.data.token);
        dispatch(authInfo({ data: userInfo, token: response.data.token }));

        navigate("/");
        toast.success("login successful", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error(error, {
        id: toastId,
      });
      toastId();
    }
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
            <FiLogIn className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a
              href="/registration"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              create a new account
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className={iconStyle} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete="current-password"
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
            Sign in
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
