import { useRef, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

const ResetPassword = () => {
  const { passwordReset } = useContext(AuthContext);
  const emailRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const prefilledEmail = location.state?.email || "";

  const handleReset = () => {
    const email = emailRef.current.value;
    if (!email) return toast.error("Please enter your email");

    passwordReset(email)
      .then(() => {
        toast.success("Password reset email sent! Check your Gmail.");
        navigate("/signin");
      })
      .catch((err) => {
        toast.error(err.message)
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-800 px-4">
      <title>PawMart - Reset Password</title>

      <div className="card w-full max-w-md backdrop-blur-lg bg-white dark:bg-gray-700 shadow-2xl border border-gray-700 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
          Reset Your Password
        </h2>
        <p className="text-gray-700 dark:text-gray-200 text-sm mb-6">
          Enter your email address below and we’ll send you a password reset
          link.
        </p>

        <input
          ref={emailRef}
          defaultValue={prefilledEmail}
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full mb-5 text-gray-700 dark:text-gray-200 bg-white/20 focus:ring-2 focus:ring-pink-400"
          required
        />

        <button
          onClick={handleReset}
          className="btn btn-primary w-full bg-blue-600 border-none  transition-all duration-300 text-white font-semibold hover:scale-105"
        >
          Send Reset Link
        </button>

        <div className="mt-6 text-sm text-gray-700 dark:text-gray-200">
          <p>
            Remembered your password?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
