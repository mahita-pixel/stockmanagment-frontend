import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../Api/api";
import { getProducts } from "../Api/api"; // replace with your products API

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  // Users state
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);

  // Products state
  const [products, setProducts] = useState([]);

  // Load data when page changes
  useEffect(() => {
    if (activePage === "users") loadUsers();
    if (activePage === "products") loadProducts();
  }, [activePage]);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data || res);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data || res);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  // User handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) await updateUser(editingUser._id, formData);
      else await addUser(formData);
      setFormData({ name: "", email: "", password: "" });
      setEditingUser(null);
      loadUsers();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, password: "" });
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setDeletingUserId(id);
    try {
      const result = await deleteUser(id);
      if (result.success) setUsers(users.filter(u => u._id !== id));
      else alert(result.message);
    } catch (err) {
      alert("Error deleting user: " + err.message);
    }
    setDeletingUserId(null);
  };

  // Summary stats
  const totalUsers = users.length;
  const totalProducts = products.length;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200">
         
         
        </div>
        <nav className="p-4 space-y-2 flex-1">
          {["dashboard","users","products","reports"].map(page => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`block w-full text-left py-2 px-4 rounded font-medium ${
                activePage === page ? "bg-blue-100 text-blue-700" : "hover:bg-blue-50"
              }`}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activePage === "dashboard" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white shadow rounded p-6 flex flex-col items-center">
                <span className="text-gray-500">Total Users</span>
                <span className="text-3xl font-bold">{totalUsers}</span>
              </div>
              <div className="bg-white shadow rounded p-6 flex flex-col items-center">
                <span className="text-gray-500">Total Products</span>
                <span className="text-3xl font-bold">{totalProducts}</span>
              </div>
            </div>
          </div>
        )}
          

        {activePage === "users" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <form onSubmit={handleSubmit} className="mb-6 flex gap-2 flex-wrap">
              <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData,name:e.target.value})} required className="border px-3 py-2 rounded" />
              <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData,email:e.target.value})} required className="border px-3 py-2 rounded" />
              <input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({...formData,password:e.target.value})} required={!editingUser} className="border px-3 py-2 rounded" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingUser ? "Update" : "Add"}</button>
            </form>
            <div className="overflow-x-auto bg-white shadow rounded">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="border p-2">{u.name}</td>
                      <td className="border p-2">{u.email}</td>
                      <td className="border p-2 space-x-2">
                        <button onClick={() => handleEdit(u)} disabled={deletingUserId===u._id} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                        {deletingUserId===u._id ? <span className="text-red-500">Deleting...</span> : <button onClick={()=>handleDelete(u._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activePage === "products" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Products List</h2>
            <div className="overflow-x-auto bg-white shadow rounded">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border p-2">Product Name</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="border p-2">{p.name}</td>
                      <td className="border p-2">{p.price}</td>
                      <td className="border p-2">{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activePage === "reports" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Reports</h2>
            <div className="bg-white shadow rounded p-4">
              <p>Display backend report data here with charts or tables.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
