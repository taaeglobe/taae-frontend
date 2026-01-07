import React from "react";
import { motion } from "framer-motion";

const images = [
  {
    src: "../mountain.jpg",
    alt: "Himalayan mountain trekking adventure in Nepal",
  },
  {
    src: "../treeking.jpg",
    alt: "Scenic trekking routes and trails in Nepal",
  },
  {
    src: "../pokhara.jpg",
    alt: "Pokhara lakeside and popular tourist destination in Nepal",
  },
  {
    src: "../adventure.jpg",
    alt: "Adventure tourism activities in Nepal",
  },
];

const AboutUsSection = () => {
  return (
    <section
      id="aboutus"
      aria-labelledby="about-us-heading"
      style={{
        maxWidth: "100%",
        background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
        color: "white",
        padding: "4rem 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <motion.div
        style={{
          width: "90%",
          maxWidth: "1200px",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          alignItems: "center",
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 1, type: "spring", stiffness: 70 }}
      >
        {/* Images */}
        <motion.div
          style={{
            flex: "1 1 50%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.1rem",
            borderRadius: "16px",
            overflow: "hidden",
            minHeight: "400px",
          }}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1,
            delay: 0.3,
            type: "spring",
            stiffness: 70,
          }}
        >
          {images.map((img, i) => (
            <motion.img
              key={i}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
                minHeight: "180px",
              }}
              whileHover={{
                scale: 1.1,
                rotate: 3,
                transition: { duration: 0.5 },
              }}
            />
          ))}
        </motion.div>

        {/* Text */}
        <motion.div
          style={{
            flex: "1 1 40%",
            maxWidth: "600px",
            fontSize: "1.2rem",
            lineHeight: "1.6",
            padding: "1rem",
          }}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1,
            delay: 0.5,
            type: "spring",
            stiffness: 70,
          }}
        >
          <h2
            id="about-us-heading"
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              fontWeight: "900",
            }}
          >
            About Us
          </h2>
          <p>
            At Travel Adventure and Explore Globe, we offer the best travel
            experiences across Nepal’s breathtaking landscapes. From Himalayan
            trekking to cultural destinations like Pokhara and Mardi, we provide
            affordable and unforgettable travel packages. Our expert team
            assists with flights, visas, hotels, and tours to ensure a smooth
            and inspiring journey.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUsSection;
