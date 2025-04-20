
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ShoppingBag, Heart, Share2, Star } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  // Mock product data - in a real app, this would come from an API
  const products = [
    { 
      id: "1", 
      name: "Air Flow Pro", 
      price: 129.99, 
      description: "Experience ultimate comfort with the Air Flow Pro. These lightweight running shoes feature our patented air cushioning system, breathable mesh upper, and durable rubber outsole for maximum performance.",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        "https://images.unsplash.com/photo-1607522370275-f14206abe5d3",
        "https://images.unsplash.com/photo-1595341888016-a392ef81b7de",
      ],
      colors: ["Black", "Blue", "Red"],
      sizes: [6, 7, 8, 9, 10, 11, 12],
      rating: 4.8,
      reviews: 124,
      brand: "SportX",
      category: "men"
    },
    // Add more products as needed
  ];
  
  const product = products.find(p => p.id === id) || products[0]; // Fallback to first product if not found
  
  const [mainImage, setMainImage] = useState(product.images[0]);
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    toast.success(`${product.name} added to your cart!`);
    // In a real app, this would update the cart state or call an API
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button 
                  key={index} 
                  onClick={() => setMainImage(image)}
                  className={`p-1 rounded-md ${mainImage === image ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-24 object-cover rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/shop" className="hover:text-blue-600">Shop</Link>
              <span className="mx-2">/</span>
              <span>{product.name}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            
            <p className="text-2xl font-bold text-blue-600 mb-6">${product.price}</p>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border rounded-md transition-colors ${
                      selectedSize === size 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'border-gray-300 hover:border-blue-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <input 
                  type="text" 
                  value={quantity} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val > 0) {
                      setQuantity(val);
                    }
                  }}
                  className="w-12 h-10 border-t border-b border-gray-300 text-center"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Heart size={18} />
              </button>
              <button className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col gap-2">
                <div className="flex">
                  <span className="font-medium w-24">Brand:</span>
                  <span className="text-gray-600">{product.brand}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-24">Category:</span>
                  <span className="text-gray-600">{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
