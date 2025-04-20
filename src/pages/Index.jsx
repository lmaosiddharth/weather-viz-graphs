
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const BrandLogo = ({ src, alt }) => (
  <img src={src} alt={alt} className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
);

const Index = () => {
  const brands = [
    { name: "Palm Angels", logo: "https://example.com/palm-angels.png" },
    { name: "Vans", logo: "https://example.com/vans.png" },
    { name: "Dior", logo: "https://example.com/dior.png" },
    { name: "Yeezy", logo: "https://example.com/yeezy.png" },
    { name: "Louis Vuitton", logo: "https://example.com/lv.png" },
    { name: "Nike", logo: "https://example.com/nike.png" },
    { name: "Jordan", logo: "https://example.com/jordan.png" },
    { name: "New Balance", logo: "https://example.com/new-balance.png" },
    { name: "Adidas", logo: "https://example.com/adidas.png" },
    { name: "Off-White", logo: "https://example.com/off-white.png" },
    { name: "Supreme", logo: "https://example.com/supreme.png" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[500px] bg-blue-100">
        <div className="container mx-auto px-4 py-12 flex items-center">
          <div className="max-w-lg">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h1 className="text-4xl font-bold text-blue-900 mb-4">
                New Customer Offer!
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Get premium sneakers starting at 20% off on your first BlueSole order!
              </p>
              <Link
                to="/shop"
                className="inline-block bg-blue-900 text-white px-8 py-3 rounded-md hover:bg-blue-800 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
          alt="Featured Sneaker"
          className="absolute top-0 right-0 w-1/2 h-full object-cover"
        />
      </section>

      {/* Main Heading */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">
          All the shoes you need in one place
        </h2>
        <p className="text-xl text-gray-600">
          Your Perfect Pair, Just a Click Away!
        </p>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-11 gap-8 items-center">
            {brands.map((brand) => (
              <BrandLogo key={brand.name} src={brand.logo} alt={brand.name} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
