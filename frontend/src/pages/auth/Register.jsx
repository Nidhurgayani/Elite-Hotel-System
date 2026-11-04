import { useState } from "react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // ✅ Use backend response correctly
      login({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
      });

      // ✅ Redirect based on role
      navigate(
        data.user.role === "admin"
          ? "/admin"
          : data.user.role === "staff"
          ? "/staff"
          : "/customer"
      );
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded border w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Create Account</h2>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            className="mt-1 w-full border rounded px-3 py-2"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Email Address</label>
          <input
            className="mt-1 w-full border rounded px-3 py-2"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            className="mt-1 w-full border rounded px-3 py-2"
            value={form.password}
            onChange={(e) => onChange("password", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Phone Number</label>
          <input
            className="mt-1 w-full border rounded px-3 py-2"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Account Type</label>
          <select
            className="mt-1 w-full border rounded px-3 py-2"
            value={form.role}
            onChange={(e) => onChange("role", e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Button type="submit">Create Account</Button>

        <div className="text-xs text-gray-500">Already have an account?</div>
        <Button variant="secondary" type="button" onClick={() => navigate("/login")}>
          Sign in instead
        </Button>
      </form>
    </div>
  );
}
