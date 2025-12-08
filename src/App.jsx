import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { fetchCart } from "./store/slices/cartsSlice";
import { fetchUserProfile, clearAuthState } from "./store/slices/authSlice";
import { setupApiInterceptors } from "./lib/api/client";
import Home from "./pages/Home";
import CatalogPage from "./pages/CatalogPage";
import SkinCareQuize from "./pages/SkinCareQuize";
import Product from "./pages/ProductDetails";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import WalletPaymentPage from "./pages/WalletPaymentPage.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import About from "./pages/About.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import BrandLanding from "./pages/BrandLanding.jsx";
import RefundPolicy from "./pages/RefundPolicyPage.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import './App.css';

function AppContent() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Validate token and fetch user data on app mount
    const token = localStorage.getItem('auth_token');

    if (token) {
      // Attempt to fetch user profile to validate token
      dispatch(fetchUserProfile())
        .unwrap()
        .then(() => {
          // Token is valid, fetch cart
          dispatch(fetchCart());
        })
        .catch((error) => {
          // Token is invalid or expired, clear auth state
          console.error('Token validation failed:', error);
          dispatch(clearAuthState());
        });
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/quize" element={<SkinCareQuize />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wallet-payment" element={<WalletPaymentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/account" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/brand/:name" element={<BrandLanding />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        {/* <Route path="/collections/:slug" element={<BrandLanding />} /> */}
      </Routes>
    </Router>
  );
}

function App() {
  // Setup API interceptors with store access
  useEffect(() => {
    setupApiInterceptors(store);
  }, []);

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App
