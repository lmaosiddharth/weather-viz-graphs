
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDay = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
  });
};

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const getTemperatureColor = (temp: number): string => {
  if (temp <= 0) return 'text-weather-freezing';
  if (temp <= 10) return 'text-weather-cold';
  if (temp <= 20) return 'text-weather-cool';
  if (temp <= 25) return 'text-weather-mild';
  if (temp <= 30) return 'text-weather-warm';
  return 'text-weather-hot';
};

export const getTemperatureGradient = (temp: number): string => {
  if (temp <= 0) return 'from-weather-freezing/50 to-weather-cold/30';
  if (temp <= 10) return 'from-weather-cold/50 to-weather-cool/30';
  if (temp <= 20) return 'from-weather-cool/50 to-weather-mild/30';
  if (temp <= 25) return 'from-weather-mild/50 to-weather-warm/30';
  if (temp <= 30) return 'from-weather-warm/50 to-weather-hot/30';
  return 'from-weather-hot/60 to-weather-hot/30';
};

export const groupForecastByDay = (forecastList: any[]): any[] => {
  const grouped = forecastList.reduce((acc: any, item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
  
  return Object.values(grouped);
};
