const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#303a51] to-[#1f2738] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 sm:grid-cols-2 md:grid-cols-4">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-extrabold text-pink-400 mb-4 drop-shadow-lg">
            Nashik Sangham
          </h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Discover destinations, plan trips, and experience travel
            in a calm, meaningful, and unforgettable way.
          </p>
        </div>

        {/* EXPLORE */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white/90">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-blue-400 transition">Home</a>
            </li>
            <li>
              <a href="/explore" className="hover:text-blue-400 transition">Destinations</a>
            </li>
            <li>
              <a href="/trip-planner" className="hover:text-blue-400 transition">Trip Planner</a>
            </li>
            <li>
              <a href="/inspiration" className="hover:text-blue-400 transition">Inspiration</a>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white/90">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/contact" className="hover:text-blue-400 transition">Contact Us</a></li>
            <li><a href="/faq" className="hover:text-blue-400 transition">FAQs</a></li>
            <li><a href="/help" className="hover:text-blue-400 transition">Help Center</a></li>
            <li><a href="/terms" className="hover:text-blue-400 transition">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white/90">
            Newsletter
          </h3>
          <p className="text-sm mb-4 text-white/70">
            Travel inspiration & destination updates — no spam.
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-2xl bg-white/20 backdrop-blur-md text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-lg">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20 text-center py-4 text-sm text-white/50">
        © 2025 Nashik Sangham. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;