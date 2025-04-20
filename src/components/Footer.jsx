
import React from "react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">BlueSole Business</h3>
            <ul className="space-y-2">
              <li><Link to="/partner" className="text-gray-300 hover:text-white">Partner with BlueSole</Link></li>
              <li><Link to="/collection" className="text-gray-300 hover:text-white">Explore our Collection</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Shipment</h3>
            <ul className="space-y-2">
              <li><Link to="/returns" className="text-gray-300 hover:text-white">Returns and Cancellations</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-white">Help and Support</Link></li>
              <li><Link to="/retailers" className="text-gray-300 hover:text-white">Retailers & Partners</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms and Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-300 hover:text-white">Cookie settings</Link></li>
            </ul>
          </div>
          
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 rounded hover:bg-blue-700">
              <Globe className="h-5 w-5" />
              <span>English</span>
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-blue-800 text-sm text-gray-300">
          ©2025 BlueSole, Inc.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
