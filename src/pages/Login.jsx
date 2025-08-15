// src/pages/Login.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const newUser = { email, password };
    console.log(newUser);
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      localStorage.setItem('role', data.role);   // Store the user's role

      if (!response.ok) {

        throw new Error(data.message || "Failed to add user");
      
      }
    
      if (data.message == "Login successful"){
    
        localStorage.setItem("token", data.token); 

       if (data.user.role === "admin") {
         navigate("/admin-dashboard");
              } else {
                navigate("/user-dashboard");
                 }

       
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>

      <div className="rounded-lg w-[350px] min-h-[70vh] max-w-3xl mx-auto mt-10 p-10 flex items-center justify-center bg-teal-500 px-2">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">Login</h2>

          {error && (
            <div className="mb-4 text-red-600 bg-red-100 p-2 rounded-md text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-envelope" />
              </span>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Email"
                required
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-user-tag" />
              </span>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-center">
            New user? <Link to="/register" className="text-teal-600 hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

