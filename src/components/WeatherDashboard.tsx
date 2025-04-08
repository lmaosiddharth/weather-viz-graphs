
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherForecast } from "@/services/WeatherService";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CloudRain } from "lucide-react";
import SimpleTemperatureGraph from "@/components/SimpleTemperatureGraph";

const WeatherDashboard: React.FC = () => {
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
  
  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
    refetch();
  };
  
  return (
    <div className="container mx-auto py-6 px-4 space-y-6 max-w-5xl">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CloudRain className="h-8 w-8 text-primary" />
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
            <Skeleton className="w-full h-[300px] rounded-lg" />
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
