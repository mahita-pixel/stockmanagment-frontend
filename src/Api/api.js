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

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change if deployed
  withCredentials: true // If using cookies/session auth
});

// User APIs
export const getUser = () => API.get("/users");
export const addUser = (data) => API.post("/users", data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const addProduct = (data) => axios.post("http://localhost:5000/api/products", data);

export const updateProduct = (id, data) =>
  axios.put(`http://localhost:5000/api/products/${id}`, data);

export const deleteProduct = (id) =>
  axios.delete(`http://localhost:5000/api/products/${id}`);


// frontend/src/Api/api.js
export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
};

   // Product APIs
export const getProduct = () => axios.get("http://localhost:5000/api/products");



