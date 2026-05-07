import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../Api/api";
import axios from "axios";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", stock: "" });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => { const res = await getProducts(); setProducts(res?.data || res || []); };
  const handleSubmit = async (e) => { e.preventDefault(); if (editing) await updateProduct(editing._id, formData); else await addProduct(formData); setFormData({ name: "", price: "", stock: "" }); setEditing(null); setShowForm(false); loadProducts(); };
  const handleEdit = (p) => { setFormData({ name: p.name, price: p.price, stock: p.stock }); setEditing(p); setShowForm(true); };
  const handleDelete = async (p) => { if (window.confirm("Delete product?")) { await deleteProduct(p._id); loadProducts(); } };
 


  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-teal-800">Products</h2>
            <button
  onClick={() => {
    setShowForm(v => !v);                   // toggle form visibility
    setEditing(null);                    // reset editing state
    setFormData({ name: "", email: "", password: "" }); // clear form inputs
  }}
  className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full"
>
  {showForm ? "Cancel" : "Add Products"}
</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow max-w-lg mx-auto space-y-4">
          <input placeholder="Name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full border px-4 py-2 rounded" required />
          <input placeholder="Price" type="number" value={formData.price} onChange={e => setFormData(p => ({ ...p, price: e.target.value }))} className="w-full border px-4 py-2 rounded" required />
          <input placeholder="Stock" type="number" value={formData.stock} onChange={e => setFormData(p => ({ ...p, stock: e.target.value }))} className="w-full border px-4 py-2 rounded" required />
          <button className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded-full">{editing ? "Update" : "Add"} Product</button>
        </form>
      )}

      <div className="grid gap-4">
        {products.map(p => (
          <div key={p._id} className="bg-white p-4 rounded-2xl shadow flex justify-between items-center hover:shadow-xl transition">
            <div>
              <p className="font-semibold text-teal-800">{p.name}</p>
              <p className="text-gray-600">Price: ${p.price}</p>
              <p className="text-gray-600">Stock: {p.stock}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-1.5 rounded-full">Edit</button>
              <button onClick={() => handleDelete(p)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
