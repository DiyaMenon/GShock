import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { user, loginWithGoogle, loading } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      // onAuthStateChanged in AuthContext will handle backend sync and redirect
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-xl">
        
        {/* Title */}
        <h1 className="text-4xl font-extralight tracking-[0.15em] uppercase text-onyx/80 mb-16">
          Login
        </h1>

        {/* Email */}
        <div className="mb-10">
          <label className="block text-xs tracking-widest uppercase mb-3 text-onyx/60">
            Email Address
          </label>
          <input
            type="email"
            className="w-full bg-transparent border-b border-onyx/30 py-2 focus:outline-none focus:border-gold transition"
          />
        </div>

        {/* Password */}
        <div className="mb-12">
          <label className="block text-xs tracking-widest uppercase mb-3 text-onyx/60">
            Password
          </label>
          <input
            type="password"
            className="w-full bg-transparent border-b border-onyx/30 py-2 focus:outline-none focus:border-gold transition"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-onyx/15 mb-10" />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="text-left space-y-4 text-sm text-onyx/70">
            <button className="block hover:text-onyx transition">
              Create account
            </button>
            <button className="block hover:text-onyx transition">
              I forgot my password
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                // Add email/password login logic here if needed
              }}
              className="px-12 py-3 border border-onyx uppercase tracking-[0.25em] text-xs hover:bg-onyx hover:text-cream transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="px-12 py-3 border border-onyx uppercase tracking-[0.25em] text-xs hover:bg-onyx hover:text-cream transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
