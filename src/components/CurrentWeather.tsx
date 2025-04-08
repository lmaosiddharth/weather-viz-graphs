
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrentWeather as CurrentWeatherType } from "@/services/WeatherService";
import { formatDate, getTemperatureColor, getWeatherIcon, getTemperatureGradient } from "@/utils/weatherUtils";
import { Thermometer, Droplets, Wind, Gauge } from "lucide-react";

interface CurrentWeatherProps {
  data: CurrentWeatherType;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <Card className={`bg-gradient-to-br ${getTemperatureGradient(data.temp)} border-none text-white`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{data.city}, {data.country}</h2>
            <p className="text-sm font-normal opacity-80">{formatDate(data.dt)}</p>
          </div>
          <div className="flex items-center">
            <img 
              src={getWeatherIcon(data.icon)} 
              alt={data.description} 
              className="w-16 h-16"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center">
              <p className="text-5xl font-bold">{Math.round(data.temp)}°C</p>
            </div>
            <p className="text-lg capitalize">{data.description}</p>
            <p className="text-sm opacity-80">Feels like: {Math.round(data.feels_like)}°C</p>
          </div>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              <span>{data.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5" />
              <span>{data.wind_speed} m/s</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              <span>{data.pressure} hPa</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
