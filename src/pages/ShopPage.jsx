
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "all";
  
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  
  // Mock product data
  const products = [
    { id: 1, name: "Air Flow Pro", price: 129.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", category: "men", brand: "SportX" },
    { id: 2, name: "Runner's Elite", price: 159.99, image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2", category: "men", brand: "SportX" },
    { id: 3, name: "Urban Stepper", price: 89.99, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519", category: "women", brand: "UrbanFit" },
    { id: 4, name: "Classic Canvas", price: 79.99, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77", category: "men", brand: "Classico" },
    { id: 5, name: "Cloud Walker", price: 119.99, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86", category: "women", brand: "UrbanFit" },
    { id: 6, name: "Street Style", price: 99.99, image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f", category: "women", brand: "Trendy" },
    { id: 7, name: "Kiddy Bounce", price: 59.99, image: "https://images.unsplash.com/photo-1507464098880-e367bc5d2c08", category: "kids", brand: "KidZone" },
    { id: 8, name: "Little Runner", price: 49.99, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86", category: "kids", brand: "KidZone" },
  ];
  
  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Filter by category
    if (categoryFilter !== "all" && product.category !== categoryFilter) {
      return false;
    }
    
    // Filter by price
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Filter by brand
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    
    return true;
  });
  
  const brands = [...new Set(products.map(product => product.brand))];
  
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {categoryFilter === "all" ? "All Products" : `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}'s Collection`}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Filters</h3>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Category</h4>
                <div className="space-y-2">
                  <Link to="/shop" className={`block ${categoryFilter === 'all' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                    All Products
                  </Link>
                  <Link to="/shop?category=men" className={`block ${categoryFilter === 'men' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                    Men
                  </Link>
                  <Link to="/shop?category=women" className={`block ${categoryFilter === 'women' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                    Women
                  </Link>
                  <Link to="/shop?category=kids" className={`block ${categoryFilter === 'kids' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                    Kids
                  </Link>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Price Range</h4>
                <Slider
                  defaultValue={[0, 200]}
                  max={200}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-6"
                />
                <div className="flex justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Brands</h4>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input 
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="mr-2"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="group">
                    <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <Link 
                          to={`/product/${product.id}`}
                          className="bg-white text-blue-600 px-4 py-2 rounded font-medium translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-blue-600 font-bold">${product.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShopPage;
