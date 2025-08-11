import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api"; // Your backend URL

// Function to fetch products
export const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/products");
    return response.data; // Return the product data
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Throw error so it can be handled in the component
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/users");
    return response.data; // Return the product data
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Throw error so it can be handled in the component
  }
};