import { useEffect, useState } from "react";
import axios from "axios";
import AddUserForm from "./AddUserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/users",
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error("Fetch users error:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">

      <h2 className="text-xl font-bold mb-4">User Management</h2>

      {/* Add User Form */}
      <AddUserForm />

      {/* Loading */}
      {loading && <p className="text-gray-500 mt-4">Loading users...</p>}

      {/* Error */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* User List */}
      {!loading && !error && (
        <ul className="mt-4 space-y-2">
          {users.map((user) => (
            <li
              key={user._id}
              className="p-3 border rounded flex justify-between"
            >
              <span>{user.name}</span>
              <span className="text-gray-500">{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;