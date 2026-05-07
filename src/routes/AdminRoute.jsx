import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/admin/dashboard", {
      credentials: "include",
    })
      .then(async (res) => {
        setStatus(res.status);

        // avoid crash if response is not JSON
        try {
          await res.json();
        } catch (err) {
          // ignore json error
        }
      })
      .catch(() => setStatus(500))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Checking admin access...</p>;

  if (status === 401) return <Navigate to="/login" replace />;

  if (status === 403)
    return (
      <ErrorPage message="You don’t have permission to view this page." />
    );

  if (status !== 200)
    return (
      <ErrorPage message="Something went wrong. Try again later." />
    );

  return children;
}