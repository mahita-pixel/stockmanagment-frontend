import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../Api/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", stock: "" });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products
  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res?.data || res || []);
      setError(null);
    } catch (err) {
      setError("Error fetching products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
        setProducts(prev => prev.map(p => p._id === editingProduct._id ? { ...p, ...formData } : p));
      } else {
        const created = await addProduct(formData);
        setProducts(prev => [...prev, created?.data || created]);
      }
      setFormData({ name: "", price: "", stock: "" });
      setEditingProduct(null);
      setShowForm(false);
    } catch (err) {
      setError("Error saving product: " + err.message);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setFormData({ name: product.name, price: product.price, stock: product.stock });
    setEditingProduct(product);
    setShowForm(true);
  };

  // Delete product
  const handleDelete = async (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      try {
        await deleteProduct(product._id);
        setProducts(prev => prev.filter(p => p._id !== product._id));
      } catch (err) {
        setError("Error deleting product: " + err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-teal-800">Manage Products</h2>
        <button
          onClick={() => setShowForm(v => !v)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full shadow transition transform hover:scale-105"
        >
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {/* Add/Edit Form */}
      {showForm && (
        <form
          className="bg-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto transition-all duration-300"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Product Name"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={formData.name}
              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={formData.price}
              onChange={e => setFormData(p => ({ ...p, price: e.target.value }))}
              required
            />
            <input
              type="number"
              placeholder="Stock"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={formData.stock}
              onChange={e => setFormData(p => ({ ...p, stock: e.target.value }))}
              required
            />
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded-full shadow transition transform hover:scale-105"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      )}

      {/* Products List */}
      <div className="grid gap-4">
        {products.map(p => (
          <div
            key={p._id}
            className="bg-white rounded-2xl shadow p-4 flex justify-between items-center transition hover:shadow-xl hover:scale-[1.01]"
          >
            <div>
              <p className="font-semibold text-teal-800">{p.name}</p>
              <p className="text-gray-600">Price: ${p.price}</p>
              <p className="text-gray-600">Stock: {p.stock}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-1.5 rounded-full shadow transition transform hover:scale-105"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full shadow transition transform hover:scale-105"
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
