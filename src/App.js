import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero-section";
import MapSection from "./components/MapSection";
import ServicesSection from "./components/Service-section";
import AboutUsSection from "./components/About-section";
import DestinationsSection from "./components/Destination-section";
import SpecialOffersSection from "./components/Special-offer";
import TeamSection from "./components/Team-section";
import ChatbotFloatingButton from "./components/ChatFloatingButton";
import ContactUsSection from "./components/Contact-Us";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";

import AdminDashboard from "./components/AdminPanel/AdminDashboard";
import Review from "./components/Review";
import OfferDetail from "./components/pages/OfferDetail";
import DestinationDetail from "./components/pages/DestinationDetail";
import AboutUs from "./components/Section-pages/AboutUs";
import Offer from "./components/Section-pages/Offer";
import Destination from "./components/Section-pages/Destination";
import ReviewForm from "./components/Section-pages/ReviewForm";
import Login from "./components/Section-pages/Login";
import RegisterForm from "./components/Section-pages/RegisterForm";
import ProtectedRoute from "./components/pages/ProtectedRoutes";

function HomePage() {
  return (
    <>
      <HeroSection />
      <SpecialOffersSection />
      <ServicesSection />
      <DestinationsSection />
      <AboutUsSection />
      <TeamSection />
      <FAQ />
      <Review />
      <MapSection />
      <ContactUsSection />
    </>
  );
}

function App() {
  // Initialize user state with saved user if any
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Optional: keep localStorage user in sync when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* Homepage route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/special-offers" element={<Offer />} />
        <Route path="/destinations" element={<Destination />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* Offer detail route */}
        <Route path="/offers/:id" element={<OfferDetail />} />
        <Route
          path="/popular-destinations/:id"
          element={<DestinationDetail />}
        />
        {/* Admin login route */}

         <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute user={user} roles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
      </Routes>
      <ChatbotFloatingButton />
      <Footer />
    </>
  );
}

export default App;
