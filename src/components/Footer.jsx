
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ShoeCraft</h3>
            <p className="text-blue-100">
              Premium quality shoes for every occasion. Style meets comfort.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/shop?category=men" className="text-blue-100 hover:text-white">Men</Link></li>
              <li><Link to="/shop?category=women" className="text-blue-100 hover:text-white">Women</Link></li>
              <li><Link to="/shop?category=kids" className="text-blue-100 hover:text-white">Kids</Link></li>
              <li><Link to="/shop?category=sport" className="text-blue-100 hover:text-white">Sport</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-blue-100 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-blue-100 hover:text-white">Contact</Link></li>
              <li><Link to="/careers" className="text-blue-100 hover:text-white">Careers</Link></li>
              <li><Link to="/stores" className="text-blue-100 hover:text-white">Stores</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <h5 className="font-medium mb-2">Subscribe to our newsletter</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 text-gray-800 w-full rounded-l-md focus:outline-none"
                />
                <button className="bg-white text-blue-600 px-4 py-2 rounded-r-md font-medium hover:bg-blue-50">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-400 mt-8 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-blue-100">© 2025 ShoeCraft. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-blue-100 hover:text-white text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-blue-100 hover:text-white text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
