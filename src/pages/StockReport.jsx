import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function StockReport() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // or get token from context/state as appropriate
    axios
      .get("http://localhost:5000/api/report", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(res => setProducts(res.data.data))
      .catch(err => console.error("Error fetching JSON report:", err));
  }, []);
 
  const downloadPDF = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pdf", { responseType: "blob" });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "stock_report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Stock Report</h1>

      <button
        onClick={downloadPDF}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download PDF Report
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Stock Amount</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.stockAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={products}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stockAmount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
