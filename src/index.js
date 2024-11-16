import React from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Navbar } from './components/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProductList from './pages/admin/products/ProductList';
import CreateProduct from './pages/admin/products/CreateProduct';
import EditProduct from './pages/admin/products/EditProduct';
import Home from './pages/Home/Home';
import Profile from './pages/admin/Profile/Profile';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/admin/products' element={<ProductList />} />
        <Route path='/admin/products/create' element={<CreateProduct />} />
        <Route path='/admin/products/edit/:id' element={<EditProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isLandingPage && <Footer />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
