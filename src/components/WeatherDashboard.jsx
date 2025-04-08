
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherForecast } from "../services/WeatherService";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { CloudRain } from "lucide-react";
import SimpleTemperatureGraph from "./SimpleTemperatureGraph";

const SearchBar = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-md"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        disabled={isLoading || !city.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 disabled:opacity-50"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

const WeatherDashboard = () => {
  const [city, setCity] = useState("London");
  
  const { 
    data: forecast, 
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["forecast", city],
    queryFn: () => fetchWeatherForecast(city),
    enabled: city !== "",
  });
  
  const handleSearch = (searchCity) => {
    setCity(searchCity);
    refetch();
  };
  
  return (
    <div className="container mx-auto py-6 px-4 space-y-6 max-w-5xl">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CloudRain className="h-8 w-8 text-blue-500" />
          <span>Weather Temperature</span>
        </h1>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>
      
      {isError ? (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6 text-center">
            <p className="text-red-500">Failed to load weather data. Please try again with a valid city name.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {isLoading ? (
            <div className="w-full h-[300px] bg-gray-200 rounded-lg animate-pulse" />
          ) : (
            forecast && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Temperature for {forecast.city}, {forecast.country}</CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleTemperatureGraph data={forecast.list.slice(0, 24)} />
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
