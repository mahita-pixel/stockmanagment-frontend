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
      const response = await fetch("http://localhost:5000/api/users/register", {
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
  };return (
    <div className="min-h-screen flex items-center justify-center bg-teal-500 px-4">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
    <h2 className="mb-6 text-center text-2xl font-bold text-teal-700">Register Here</h2>
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-2 rounded-md text-sm">
            {error}
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-user" />
            </span>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Name"
              required
            />
          </div>
  
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
              name="passsword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="password"
              required
            />
          </div>
  
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-user-clock" />
            </span>
            <input
              name="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="pl-10 w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Age"
              required
            />
          </div>
  
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold text-white transition ${
              loading
                ? "bg-teal-300 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? "Adding..." : "Register"}
          </button>
        </form>
        <br></br>
        <p>
        Already registered? <a href="/login">Login here</a>
      </p>
      </div>
    </div>
  );
}
export default AddUserForm;