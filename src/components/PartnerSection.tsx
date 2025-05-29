"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const PartnerSection = () => {
  const partners = [
    { src: "/partners/udemy.svg", alt: "Udemy", width: 120, height: 40 },
    { src: "/partners/coursera.svg", alt: "Coursera", width: 140, height: 40 },
    {
      src: "/partners/freeCodeCamp.png",
      alt: "FreeCodeCamp",
      width: 160,
      height: 40,
    },
    {
      src: "/partners/hackerRank.svg",
      alt: "HackerRank",
      width: 140,
      height: 40,
    },
    {
      src: "/partners/codeLearn.png",
      alt: "CodeLearn",
      width: 120,
      height: 40,
    },
    { src: "/partners/cyfrin.png", alt: "Cyfrin", width: 120, height: 40 },
    { src: "/partners/VBI.png", alt: "VBI Academy", width: 100, height: 40 },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-4">
            Trusted Partner Platforms
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We aggregate reviews from the most popular learning platforms to
            give you comprehensive insights
          </p>
        </div>

        <div className="relative h-32 overflow-hidden">
          <motion.div
            className="flex space-x-12 w-max absolute top-4"
            animate={{ x: "-50%" }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex space-x-12 items-center">
                {partners.map((partner, index) => (
                  <div
                    key={`${i}-${index}`}
                    className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center border border-indigo-100"
                    style={{ width: 180, height: 80 }}
                  >
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={partner.width}
                      height={partner.height}
                      className={
                        partner.alt === "CodeLearn"
                          ? "object-contain transition-all duration-300 filter grayscale hover:grayscale-0"
                          : "object-contain transition-all duration-300 filter brightness-0 hover:brightness-100"
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-indigo-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-purple-50 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
