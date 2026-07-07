import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="pt-20 min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
