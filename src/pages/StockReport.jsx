import { useEffect, useState } from "react";
import { getProducts } from "../Api/api";

export default function StockReport() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const res = await getProducts();
      console.log("REPORT RESPONSE:", res);

      setProducts(res?.data || []);
    } catch (err) {
      console.log("REPORT ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load report data"
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    window.open(
      "http://localhost:5000/reports/inventory/pdf",
      "_blank"
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Stock Report
        </h1>

        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4 font-medium">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <p className="text-gray-700 font-medium">
          Loading report...
        </p>
      )}

      {/* EMPTY */}
      {!loading && products.length === 0 && !error && (
        <p className="text-gray-700 font-medium">
          No products found in database.
        </p>
      )}

      {/* TABLE */}
      {!loading && products.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow">

          <table className="w-full text-gray-800">

            <thead className="bg-gray-200 text-gray-900">
              <tr>
                <th className="text-left p-3">Product</th>
                <th className="text-left p-3">Quantity</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Total</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 font-medium text-gray-900">
                    {p.name}
                  </td>

                  <td className="p-3 text-gray-700">
                    {p.quantity}
                  </td>

                  <td className="p-3 text-gray-700">
                    ${p.price}
                  </td>

                  <td className="p-3 font-semibold text-gray-900">
                    ${p.quantity * p.price}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}