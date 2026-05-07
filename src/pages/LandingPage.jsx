import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Only handle loading (NO redirect here)
  useEffect(() => {
    setLoading(false);
  }, []);

  // ✅ Prevent blank screen
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-teal-600 text-white">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }

  const features = [
    {
      title: "Role-Based Access",
      short: "Super admin assigns roles securely.",
      detail:
        "Admins and users see only what they need. Super admins can manage roles to ensure safety and clarity in your team workflow.",
    },
    {
      title: "Secure Authentication",
      short: "Token-based login protects your data.",
      detail:
        "Only authorized users can access the dashboard. Token-based authentication keeps your inventory system secure.",
    },
    {
      title: "Real-Time Inventory Tracking",
      short: "Monitor stock levels and prevent shortages.",
      detail:
        "Track products in real-time, know what’s running low, and avoid stockouts with instant notifications.",
    },
    {
      title: "Dashboard Analytics",
      short: "Visual insights at a glance.",
      detail:
        "View stock trends, total products, and user activity to make smarter business decisions.",
    },
    {
      title: "Admin Management",
      short: "Super admins control the system.",
      detail:
        "Create, manage, and revoke admin accounts for complete control and security.",
    },
    {
      title: "Scalable & Expandable",
      short: "Grow without limits.",
      detail:
        "Built with modern architecture. Add products, users, and features easily as your business grows.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 text-white">

      {/* HEADER */}
      <header className="flex justify-between items-center px-10 py-6 bg-teal-600/80 backdrop-blur-md">
        <h1 className="text-2xl font-bold tracking-wide">StockManager</h1>
        <div className="flex items-center space-x-6">
          <Link to="/login" className="hover:text-teal-200 transition">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-teal-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Register
          </Link>
        </div>
      </header>

      {/* HERO */}
      <main className="flex-1 flex flex-col items-center justify-center text-center mt-24 px-6">
        <h2 className="text-5xl font-bold mb-6">
          Smart & Secure Stock Management
        </h2>
        <p className="text-lg text-teal-100 max-w-2xl mx-auto mb-12">
          Take control of your inventory effortlessly. Track stock levels,
          assign roles, and monitor activity in real-time.
        </p>

        <div className="flex justify-center gap-6 mb-24">
          <Link
            to="/register"
            className="bg-white text-teal-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-teal-700 transition"
          >
            Login
          </Link>
        </div>

        {/* FEATURES */}
        <section className="w-full max-w-6xl mt-24 px-6 pb-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-teal-600 p-8 rounded-2xl shadow-lg hover:scale-105 transition cursor-pointer"
                onClick={() => setSelectedFeature(feature)}
              >
                <h4 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h4>
                <p className="text-teal-100">{feature.short}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-20 w-full px-6">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Take Control of Your Inventory?
          </h3>
          <p className="text-teal-100 mb-8 max-w-xl mx-auto">
            Start managing your stock efficiently today and grow your business with confidence.
          </p>
          <Link
            to="/register"
            className="bg-white text-teal-700 px-8 py-4 rounded-xl hover:bg-gray-200 transition"
          >
            Create Your Account
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-teal-600/80 py-6 text-center text-teal-100">
        &copy; {new Date().getFullYear()} StockManager
      </footer>

      {/* MODAL */}
      {selectedFeature && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setSelectedFeature(null)}
        >
          <div
            className="bg-white text-teal-700 p-6 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-3">
              {selectedFeature.title}
            </h3>
            <p>{selectedFeature.detail}</p>
            <button
              onClick={() => setSelectedFeature(null)}
              className="mt-4 bg-teal-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;