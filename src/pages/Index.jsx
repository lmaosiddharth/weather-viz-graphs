
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturedProduct = ({ image, name, price, id }) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Link 
            to={`/product/${id}`}
            className="bg-white text-blue-600 px-4 py-2 rounded font-medium translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
      <h3 className="font-medium text-lg">{name}</h3>
      <p className="text-blue-600 font-bold">${price}</p>
    </div>
  );
};

const Category = ({ name, image }) => {
  return (
    <div className="relative overflow-hidden rounded-lg group">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-white text-2xl font-bold mb-2">{name}</h3>
        <Link to={`/shop?category=${name.toLowerCase()}`} className="inline-flex items-center text-white font-medium">
          Shop Now <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

const Index = () => {
  const featuredProducts = [
    { id: 1, name: "Air Flow Pro", price: 129.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
    { id: 2, name: "Runner's Elite", price: 159.99, image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2" },
    { id: 3, name: "Urban Stepper", price: 89.99, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519" },
    { id: 4, name: "Classic Canvas", price: 79.99, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77" },
  ];

  const categories = [
    { name: "Men", image: "https://images.unsplash.com/photo-1527010154944-f2241763d806" },
    { name: "Women", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2" },
    { name: "Kids", image: "https://images.unsplash.com/photo-1555009393-f20bdb245c4d" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container mx-auto px-4 py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Step Into Comfort and Style</h1>
            <p className="text-xl mb-8 text-blue-100">Discover our new collection of premium footwear designed for every occasion.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="bg-white text-blue-600 px-6 py-3 rounded-md font-bold hover:bg-blue-50 transition">
                Shop Collection
              </Link>
              <Link to="/shop?category=new" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-bold hover:bg-white/10 transition">
                New Arrivals
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <img 
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519" 
              alt="Featured Shoes" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Shop by Category</h2>
          <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">Find the perfect shoes for every style and occasion</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Category key={index} {...category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Featured Products</h2>
          <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">Our most popular styles that customers love</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <FeaturedProduct key={product.id} {...product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/shop" className="inline-flex items-center text-blue-600 font-bold">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">What Our Customers Say</h2>
          <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">Read reviews from our satisfied customers</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="text-blue-600">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="mb-4">"These are the most comfortable shoes I've ever owned. Worth every penny!"</p>
              <p className="font-bold">— Michael J.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="text-blue-600">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="mb-4">"Fast shipping, great quality, and they look exactly like the pictures. Will definitely buy again."</p>
              <p className="font-bold">— Sarah T.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="text-blue-600">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="mb-4">"I've received so many compliments on these shoes. They're stylish and durable."</p>
              <p className="font-bold">— David R.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
