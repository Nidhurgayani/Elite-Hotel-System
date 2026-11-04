import { useState } from "react";
import Button from "../../components/ui/Button";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Call backend login API
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        const { token, user } = res.data;

        // ✅ Save token in localStorage
        localStorage.setItem("token", token);

        // ✅ Save user in authStore
        login(user);

        // ✅ Redirect based on role
        if (user.role === "admin") navigate("/admin");
        else if (user.role === "staff") navigate("/staff");
        else navigate("/customer");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-40 p-6 rounded border w-full max-w-md space-y-4 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Elite Hotel System</h2>

        {/* Email */}
        <div>
          <label className="text-sm text-black">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-black">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Buttons */}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Sign In
        </Button>
        <Button
          variant="secondary"
          type="button"
          className="w-full mt-2"
          onClick={() => navigate("/register")}
        >
          Create Account
        </Button>
        {/* Demo credentials */}
        <div className="text-xs text-black border-t pt-3">
          <p className="font-semibold">Demo Credentials:</p>
          <div>Admin → admin@elitehotel.com / admin123</div>
          <div>Staff → sarah@elitehotel.com / staff123</div>
          <div>Customer → emma@email.com  / customer123</div>
        </div>

      </form>
    </div>
  );
}

