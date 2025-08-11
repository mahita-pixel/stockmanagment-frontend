import { useEffect, useState } from "react";
import axios from "axios";
import AddUserForm from "./AddUserForm"; // Import the Add User Form
const UserList = () => {
  const [users, setUsers] = useState([]); // State for users
  const [error, setError] = useState(null); // State for errors
  const [loading, setLoading] = useState(true); // Loading state

  // ✅ Function to fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data); // ✅ Store users in state
      setLoading(false);
    } catch (error) {
      setError("Error fetching users");
    }
  };

  // ✅ Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex justify-center  max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4"></h2>

     

      {/* ✅ Add User Form - Refreshes List After Adding */}
      <AddUserForm/>
    
      {/* ✅ Loading State */}
      
    </div>
  );
};

export default UserList;
