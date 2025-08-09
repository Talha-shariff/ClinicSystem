import { useState } from "react";
import { useRouter } from "next/router";
import API from "../utils/api";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      if (res.data && res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
        router.push("/dashboard");
      } else {
        setError("Login failed");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Front Desk Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
