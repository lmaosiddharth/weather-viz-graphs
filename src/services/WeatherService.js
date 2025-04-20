
const API_KEY = "12be25b4dd18b3223edd48babb51439a";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch weather data");
    }
    
    const data = await response.json();
    
    if (!data.list || !Array.isArray(data.list) || data.list.length === 0) {
      console.error("Invalid API response format:", data);
      throw new Error("Invalid data from weather API");
    }
    
    console.log("Raw API response:", data);
    
    return {
      city: data.city?.name || city,
      country: data.city?.country || "",
      list: data.list.map((item) => ({
        dt: item.dt,
        temp: item.main.temp,
        humidity: item.main.humidity,
        description: item.weather[0]?.description || "",
        icon: item.weather[0]?.icon || "",
      }))
    };
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
};
