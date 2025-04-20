
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, CloudSun } from "lucide-react";
import { fetchWeatherForecast } from "../services/WeatherService";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [city, setCity] = useState("New York");
  const location = useLocation();
  
  const { data: weather } = useQuery({
    queryKey: ["currentWeather", city],
    queryFn: () => fetchWeatherForecast(city),
    select: (data) => data?.list?.[0] || null,
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 bg-white border-b border-blue-100 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ShoeCraft
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`font-medium ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Home
            </Link>
            <Link to="/shop" className={`font-medium ${location.pathname === '/shop' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Shop
            </Link>
            <Link to="/cart" className="relative font-medium text-gray-700 hover:text-blue-600">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </nav>
          
          {/* Weather Widget */}
          <div className="flex items-center gap-2">
            <div className="flex items-center mr-2">
              <CloudSun className="h-5 w-5 text-blue-500" />
              {weather && (
                <span className="ml-1 text-sm font-medium">
                  {Math.round(weather.temp)}°C
                </span>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-blue-600" />
              ) : (
                <Menu className="h-6 w-6 text-blue-600" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="font-medium text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/shop" className="font-medium text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
                Shop
              </Link>
              <Link to="/cart" className="font-medium text-gray-700 hover:text-blue-600 flex items-center" onClick={toggleMenu}>
                <ShoppingBag className="h-5 w-5 mr-2" />
                Cart (0)
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
