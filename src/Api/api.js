import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// 🔐 Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ================= USERS =================
export const getUsers = () => API.get("/users");
export const addUser = (data) => API.post("users/register", data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);

// ================= PRODUCTS =================
export const getProducts = () => API.get("/products");
export const addProduct = (data) => API.post("/products/add", data);
export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data);

// ================= DELETE =================
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
