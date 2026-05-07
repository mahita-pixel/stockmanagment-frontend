import { useState } from "react";

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const newUser = { name, email, password, age };
    console.log(newUser)
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add user");
      }

      setName("");
      setEmail("");
      setPassword("");
      setAge("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }; return (
  <div className="relative min-h-screen flex items-center justify-center bg-teal-900">

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Card */}
    <div className="relative z-10 w-full max-w-md bg-gray-200 rounded-3xl shadow-2xl p-10">

      <h2 className="text-3xl font-bold text-center text-teal-900 mb-6">
        Create Account
      </h2>

      {error && (
        <div className="mb-4 text-red-700 bg-red-100 p-3 rounded-md text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-400 text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-800"
          placeholder="Full Name"
          required
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-400 text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-800"
          placeholder="Email Address"
          required
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-400 text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-800"
          placeholder="Password"
          required
        />

        {/* Age */}
        <input
          name="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-400 text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-800"
          placeholder="Age"
          required
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-teal-500 cursor-not-allowed"
              : "bg-teal-900 text-white hover:bg-teal-800"
          }`}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

      </form>

      <p className="mt-6 text-center text-gray-700">
        Already registered?{" "}
        <a
          href="/login"
          className="text-teal-900 font-semibold hover:underline"
        >
          Login here
        </a>
      </p>

    </div>
  </div>
);

};
export default AddUserForm;