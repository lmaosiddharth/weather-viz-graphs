
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingCart, User, CloudSun } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherForecast } from "../services/WeatherService";

const Header = () => {
  const [city] = useState("New York");
  
  const { data: weather } = useQuery({
    queryKey: ["currentWeather", city],
    queryFn: () => fetchWeatherForecast(city),
    select: (data) => data?.list?.[0] || null,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/a4e85645-1862-4c44-91a7-3d8ce0ba3490.png" alt="BlueSole Logo" className="h-12" />
            <span className="text-2xl font-bold text-blue-900 ml-2">BlueSole</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for anything"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link to="/brands" className="text-gray-700 hover:text-blue-600">Brands</Link>
            <Link to="/plans" className="text-gray-700 hover:text-blue-600">Plans & Pricing</Link>
            <Link to="/faqs" className="text-gray-700 hover:text-blue-600">FAQs</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact US</Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4 ml-6">
            <button className="px-4 py-2 text-gray-700 hover:text-blue-600 border border-gray-300 rounded">
              Log in
            </button>
            <button className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
              Sign up
            </button>
            <Heart className="h-6 w-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
            <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
            <User className="h-6 w-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
            <div className="flex items-center gap-1">
              <CloudSun className="h-5 w-5 text-blue-500" />
              {weather && (
                <span className="text-sm font-medium text-gray-700">
                  {Math.round(weather.temp)}°C
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="bg-blue-900 text-white py-2 overflow-hidden">
        <div className="whitespace-nowrap animate-scroll">
          <span className="inline-block">BEST SALES ON THE ENTIRE COLLECTION</span>
          <span className="inline-block mx-8">BlueSole</span>
          <span className="inline-block">BEST SALES ON THE ENTIRE COLLECTION</span>
          <span className="inline-block mx-8">BlueSole</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
