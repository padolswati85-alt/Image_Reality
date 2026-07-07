import { Routes, Route, Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Inspiration from "./pages/Inspiration";
import TripPlanner from "./pages/TripPlanner";
import AboutUs from "./pages/AboutUs";
import Wishlist from "./pages/Wishlist";
import MapPage from "./pages/MapPage";
import Login from "./pages/Login";
import PlaceDetails from "./pages/PlaceDetails";
import WaterparksGallery from "./pages/WaterparksGallery";
import CrowdMap from "./pages/CrowdMap";
import AdminPanel from "./pages/AdminPanel";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function AuthLayout() {
  return <Outlet />;
}

export default function App() {
  const destination = { lat: 21.1458, lng: 79.0882 };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <AuthProvider>
        <WishlistProvider>
          <Toaster
            position="top-center"
            reverseOrder={false}
            containerStyle={{
              zIndex: 9999,          // Forces toast above all elements (navbar)
            }}
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "14px",
                background: "#ffffff",
                color: "#123",
                fontWeight: "600",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                zIndex: 9999,         // Redundant but safe
              },
              success: {
                iconTheme: {
                  primary: "#16a34a",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#dc2626",
                  secondary: "#fff",
                },
              },
            }}
          />

          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminPanel />
                  </AdminRoute>
                }
              />
            </Route>

            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/places/:id" element={<PlaceDetails />} />
              <Route path="/waterparks-gallery" element={<WaterparksGallery />} />
              <Route path="/inspiration" element={<Inspiration />} />
              <Route path="/trip-planner" element={<TripPlanner />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/map" element={<MapPage destination={destination} />} />
              <Route path="/crowd-map" element={<CrowdMap />} />
            </Route>

            <Route path="*" element={<h1>404 Page Not Found</h1>} />
          </Routes>
        </WishlistProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}