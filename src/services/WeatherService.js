
const API_KEY = "12be25b4dd18b3223edd48babb51439a";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    
    const data = await response.json();
    
    return {
      city: data.city.name,
      country: data.city.country,
      list: data.list.map((item) => ({
        dt: item.dt,
        temp: item.main.temp,
        humidity: item.main.humidity,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      }))
    };
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
};
