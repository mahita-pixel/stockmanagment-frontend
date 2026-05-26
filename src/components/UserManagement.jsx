import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../Api/api";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  // ================= LOAD USERS =================
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res?.data || []);
    } catch (err) {
      console.error("GET USERS ERROR:", err);
      setError(err.response?.data?.message || "Failed to load users");
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingUser) {
        await updateUser(editingUser._id, formData);
      } else {
        await addUser({
          ...formData,
          age: Number(formData.age),
        });
      }

      setFormData({ name: "", email: "", password: "", age: "" });
      setEditingUser(null);
      setShowForm(false);

      loadUsers();
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (u) => {
    try {
      if (window.confirm("Delete user?")) {
        await deleteUser(u._id);
        loadUsers();
      }
    } catch (err) {
      console.error("DELETE ERROR:", err);
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = (u) => {
    setFormData({
      name: u.name,
      email: u.email,
      password: "",
      age: u.age,
    });

    setEditingUser(u);
    setShowForm(true);
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-cyan-900">
          Users
        </h2>

        <button
          onClick={() => {
            setShowForm((v) => !v);
            setEditingUser(null);
            setFormData({
              name: "",
              email: "",
              password: "",
              age: "",
            });
          }}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full"
        >
          {showForm ? "Cancel" : "Add User"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow max-w-lg mx-auto space-y-4"
        >
          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                name: e.target.value,
              }))
            }
            required
          />

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                email: e.target.value,
              }))
            }
            required
          />

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Age"
            value={formData.age}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                age: e.target.value,
              }))
            }
            required
          />

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder={
              editingUser
                ? "Leave blank to keep password"
                : "Password"
            }
            value={formData.password}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                password: e.target.value,
              }))
            }
            required={!editingUser}
          />

          <button className="bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-full">
            {editingUser ? "Update" : "Add"} User
          </button>
        </form>
      )}

      {/* LIST */}
      <div className="grid gap-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white p-4 rounded-2xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-cyan-900">
                {u.name}
              </p>
              <p className="text-gray-600">{u.email}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(u)}
                className="bg-cyan-700 text-white px-4 py-1.5 rounded-full"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(u)}
                className="bg-red-600 text-white px-4 py-1.5 rounded-full"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}