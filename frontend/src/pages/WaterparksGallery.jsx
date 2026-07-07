"use client";
import { motion } from "framer-motion";

export default function WaterparksGallery() {
  const templates = [
    { src: "/templates/template1.jpg", name: "Template 1", file: "/templates/template1.jpg" },
    { src: "/templates/template2.jpg", name: "Template 2", file: "/templates/template2.jpg" },
    { src: "/templates/template4.png", name: "Template 3", file: "/templates/template4.png" },
    { src: "/templates/template5.png", name: "Template 4", file: "/templates/template5.png" },
    { src: "/templates/template6.png", name: "Template 5", file: "/templates/template6.png" },
    { src: "/templates/template7.png", name: "Template 6", file: "/templates/template7.png" },
    { src: "/templates/template8.png", name: "Template 7", file: "/templates/template8.png" },
    { src: "/templates/template3.jpg", name: "Template 8", file: "/templates/template3.jpg" },
  ];

  const handleDownload = (file, name) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = name;
    link.click();
  };

  return (
    <section className="py-20 bg-[#FBF8F9]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl font-bold text-[#8F0D4E] mb-4">Nashik Gallery</h2>
        <p className="text-lg text-gray-700">
          "Explore Nashik through these immersive templates. Click any template to download!"
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {templates.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="relative cursor-pointer rounded-2xl overflow-hidden shadow-2xl h-[320px]"
            onClick={() => handleDownload(item.file, item.name)}
          >
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">{item.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
