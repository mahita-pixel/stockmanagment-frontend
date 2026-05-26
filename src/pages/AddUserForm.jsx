import { useState } from "react";

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!/^[A-Za-z\s]+$/.test(name)) {
      return "Name must contain letters only";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (!age || age < 1 || age > 120) {
      return "Please enter a valid age";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      age: Number(age),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create user");
      }

      setSuccess("User created successfully");

      setName("");
      setEmail("");
      setPassword("");
      setAge("");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setAge("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-cyan-900 to-teal-700 p-6">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-900">
            Add New User
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new account for your system
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value.replace(/[^A-Za-z\s]/g, "")
                )
              }
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <div className="flex gap-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="flex-1 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="px-4 rounded-xl bg-gray-200 hover:bg-gray-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Age
            </label>

            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="1"
              max="120"
              placeholder="Enter age"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">

            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                loading
                  ? "bg-cyan-400 cursor-not-allowed"
                  : "bg-cyan-900 text-white hover:bg-cyan-800"
              }`}
            >
              {loading
                ? "Creating User..."
                : "Create User"}
            </button>

            <button
              type="button"
              onClick={clearForm}
              className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-medium"
            >
              Reset
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddUserForm;