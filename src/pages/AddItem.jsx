import { useState } from "react";
import { addProduct } from "../Api/api";

export default function AddItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name,
        quantity,
        price,
      };

      // 🔥 Send to backend
      const res = await addProduct(productData);

      console.log("Saved:", res.data);

      alert("Product added successfully!");

      // Clear form
      setName("");
      setQuantity("");
      setPrice("");

    } catch (error) {
      console.error("Add product error:", error);

      alert("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Add Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            className="w-full border p-3 rounded"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            className="w-full border p-3 rounded"
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            className="w-full border p-3 rounded"
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Save Product
          </button>

        </form>

      </div>

    </div>
  );
}