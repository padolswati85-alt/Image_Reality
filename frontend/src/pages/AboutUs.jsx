"use client";
import { motion } from "framer-motion";
import { Camera, MapPin, Compass, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const features = [
    { icon: Camera, title: "Authentic Images", text: "Real visuals, not stock photos." },
    { icon: MapPin, title: "Curated Places", text: "Verified tourist locations." },
    { icon: Compass, title: "Smart Planning", text: "Plan trips intelligently." },
    { icon: Heart, title: "User Focused", text: "Built for clarity & comfort." },
  ];

  const missionVision = [
    { title: "Our Mission", text: "Simplify travel planning with authentic visuals." },
    { title: "Our Vision", text: "Become the most trusted tourism platform based on real experiences." },
  ];

  const teamMembers = [
    { name: "Sneha Sanjay Gaikwad", role: "Team Member" },
    { name: "Tanuja Dyneshwar Kadam", role: "Team Member" },
    { name: "Hemalata Dattaray Chaure", role: "Team Member" },
    { name: "S.B. Patil", role: "Guide" },
  ];

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
  const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

  return (
    <div className="relative min-h-screen bg-amber-50 overflow-hidden pt-20">

      {/* Multi-layer floating blobs */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-[#00aaff]/20 rounded-full blur-[140px] animate-floating"></div>
      <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-[#00aaff]/15 rounded-full blur-[180px] animate-floating delay-2000"></div>
      <div className="absolute bottom-20 -left-36 w-[350px] h-[350px] bg-[#00aaff]/10 rounded-full blur-[160px] animate-floating delay-1000"></div>

      {/* HERO */}
      <section className="px-4 md:px-6 py-16 text-center relative z-10">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#0077aa] via-[#00aaff] to-[#0077aa] animate-gradient-text drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Discover Travel Through Nashik Sangam
        </motion.h1>
        <motion.p
          className="text-[#005f8a] text-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
        >
          Real images. Real destinations. Real travel planning.
        </motion.p>
        <Link to="/explore">
          <motion.button
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 px-9 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#0077aa] to-[#00aaff] text-white shadow-lg hover:shadow-[#00aaff]/50 transition-all duration-300"
          >
            Explore Destinations
          </motion.button>
        </Link>
      </section>

      {/* WHO WE ARE */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="relative bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-lg hover:scale-105 hover:rotate-1 hover:shadow-[#00aaff]/30 transition-transform duration-500">
            <h2 className="text-2xl font-bold mb-4 text-[#0077aa] text-center">Who We Are</h2>
            <p className="text-[#005f8a] text-center">
              Nashik Sangam is a smart tourism planning platform that removes uncertainty by showing authentic visuals and reliable destination data.
            </p>
          </div>
        </motion.div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10 text-[#0077aa] drop-shadow-md">What Makes Us Different</h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            {features.map((item, i) => (
              <motion.div key={i} variants={cardVariants}>
                <div className="relative group bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center shadow-lg hover:scale-105 hover:rotate-1 hover:shadow-[#00aaff]/30 transition-transform duration-500 cursor-pointer">
                  <item.icon className="w-10 h-10 mx-auto mb-3 text-[#00aaff] transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#005f8a] text-sm">{item.text}</p>
                  <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#00aaff]/80 to-[#0077aa]/80 text-white text-xs rounded-full shadow-md">
                    FEATURE
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missionVision.map((item, i) => (
            <motion.div key={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="relative group bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center shadow-lg hover:scale-105 hover:rotate-1 hover:shadow-[#00aaff]/30 transition-transform duration-500">
                <h2 className="text-xl font-bold mb-2 text-[#0077aa]">{item.title}</h2>
                <p className="text-[#005f8a]">{item.text}</p>
                <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#00aaff]/80 to-[#0077aa]/80 text-white text-xs rounded-full shadow-md">
                  INFO
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#0077aa] drop-shadow-md">Our Team</h2>
          <p className="text-[#005f8a] mb-10 max-w-3xl mx-auto">The people behind Nashik Sangam.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div key={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="relative group bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center shadow-lg hover:scale-105 hover:rotate-1 hover:shadow-[#00aaff]/30 transition-transform duration-500 cursor-pointer">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#0077aa] to-[#00aaff] mb-3 shadow-md group-hover:scale-110 transition-transform duration-500 relative">
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 flex items-center justify-center text-white text-xs">
                      Follow
                    </div>
                  </div>
                  <h3 className="font-semibold text-[#0077aa]">{member.name}</h3>
                  <p className="text-[#005f8a] text-sm">{member.role}</p>
                  <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#00aaff]/80 to-[#0077aa]/80 text-white text-xs rounded-full shadow-md">
                    TEAM
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .animate-floating {
          animation: floatAnim 15s ease-in-out infinite;
        }
        @keyframes floatAnim {
          0%,100%{ transform: translateY(0) translateX(0);}
          25%{ transform: translateY(-15px) translateX(10px);}
          50%{ transform: translateY(10px) translateX(-10px);}
          75%{ transform: translateY(-5px) translateX(5px);}
        }
        .animate-gradient-text{
          background-size: 200% 200%;
          animation: gradientShift 5s ease infinite;
        }
        @keyframes gradientShift{
          0%{background-position:0% 50%;}
          50%{background-position:100% 50%;}
          100%{background-position:0% 50%;}
        }
      `}</style>
    </div>
  );
}