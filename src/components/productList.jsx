import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { getProducts } from "../Api/api";

const ProductList = () => {
  const [products, setProducts] = useState([]); // ✅ State to store products
  const [error, setError] = useState(null); // ✅ State to handle errors

  // ✅ Function to fetch products from backend
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data); // ✅ Store products in state
    } catch (error) {
      setError("Error fetching products");
    }
  };

  // ✅ Fetch products when component mounts
  useEffect(() => {
    getProducts();

  }, []);

  return (
    <div>
      <h1></h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProductList;
