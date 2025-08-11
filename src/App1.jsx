import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProductList from './components/ProductList';  // Import the ProductList component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
    
        <Route path="/login" element={<Login />} />
        <ProductList></ProductList>
      </Routes>
    </Router>
  );
}
 console.log("server is running");


export default App;

