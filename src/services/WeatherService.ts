
import { toast } from "sonner";

const API_KEY = "12be25b4dd18b3223edd48babb51439a";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface CurrentWeather {
  city: string;
  country: string;
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  description: string;
  icon: string;
  dt: number;
}

export interface ForecastItem {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  description: string;
  icon: string;
}

export interface WeatherForecast {
  city: string;
  country: string;
  list: ForecastItem[];
}

export const fetchCurrentWeather = async (city: string): Promise<CurrentWeather> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch weather data");
    }
    
    const data = await response.json();
    
    return {
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      dt: data.dt
    };
  } catch (error) {
    console.error("Error fetching current weather:", error);
    toast.error(error instanceof Error ? error.message : "Failed to fetch weather data");
    throw error;
  }
};

export const fetchWeatherForecast = async (city: string): Promise<WeatherForecast> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch forecast data");
    }
    
    const data = await response.json();
    
    return {
      city: data.city.name,
      country: data.city.country,
      list: data.list.map((item: any) => ({
        dt: item.dt,
        temp: item.main.temp,
        feels_like: item.main.feels_like,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        wind_speed: item.wind.speed,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      }))
    };
  } catch (error) {
    console.error("Error fetching forecast:", error);
    toast.error(error instanceof Error ? error.message : "Failed to fetch forecast data");
    throw error;
  }
};
