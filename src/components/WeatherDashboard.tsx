
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather, fetchWeatherForecast } from "@/services/WeatherService";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastChart from "@/components/ForecastChart";
import WeatherMetrics from "@/components/WeatherMetrics";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { CloudRain } from "lucide-react";

const WeatherDashboard: React.FC = () => {
  const [city, setCity] = useState("London");
  
  const { 
    data: currentWeather, 
    isLoading: isLoadingCurrent,
    isError: isErrorCurrent,
    refetch: refetchCurrent
  } = useQuery({
    queryKey: ["currentWeather", city],
    queryFn: () => fetchCurrentWeather(city),
    enabled: city !== "",
  });
  
  const { 
    data: forecast, 
    isLoading: isLoadingForecast,
    isError: isErrorForecast,
    refetch: refetchForecast
  } = useQuery({
    queryKey: ["forecast", city],
    queryFn: () => fetchWeatherForecast(city),
    enabled: city !== "",
  });
  
  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
    refetchCurrent();
    refetchForecast();
  };
  
  const isLoading = isLoadingCurrent || isLoadingForecast;
  const isError = isErrorCurrent || isErrorForecast;
  
  return (
    <div className="container mx-auto py-6 px-4 space-y-6 max-w-7xl">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CloudRain className="h-8 w-8 text-primary" />
          <span>Weather Visualization</span>
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
        <div className="space-y-6 animate-fade-in">
          {isLoading ? (
            <>
              <Skeleton className="w-full h-40 rounded-lg" />
              <Skeleton className="w-full h-[300px] rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="w-full h-[200px] rounded-lg" />
                <Skeleton className="w-full h-[200px] rounded-lg" />
                <Skeleton className="w-full h-[200px] rounded-lg" />
              </div>
            </>
          ) : (
            currentWeather && forecast && (
              <>
                <CurrentWeather data={currentWeather} />
                
                <ForecastChart data={forecast.list.slice(0, 40)} />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <WeatherMetrics data={forecast.list.slice(0, 40)} metricType="humidity" />
                  <WeatherMetrics data={forecast.list.slice(0, 40)} metricType="wind" />
                  <WeatherMetrics data={forecast.list.slice(0, 40)} metricType="pressure" />
                </div>
              </>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
