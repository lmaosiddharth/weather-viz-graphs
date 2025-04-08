
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForecastItem } from "@/services/WeatherService";
import { formatDay, formatTime, getTemperatureColor } from "@/utils/weatherUtils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ForecastChartProps {
  data: ForecastItem[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  // Prepare data for the chart
  const chartData = data.map((item) => ({
    time: formatTime(item.dt),
    day: formatDay(item.dt),
    Temperature: Math.round(item.temp),
    "Feels Like": Math.round(item.feels_like),
    Humidity: item.humidity,
    timestamp: item.dt,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border">
          <p className="font-semibold">{`${data.day} ${label}`}</p>
          <p className={`${getTemperatureColor(data.Temperature)}`}>
            Temperature: {data.Temperature}°C
          </p>
          <p>Feels Like: {data["Feels Like"]}°C</p>
          <p>Humidity: {data.Humidity}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value, index) => {
                  // Show every 4th tick or when day changes
                  const currentDay = chartData[index].day;
                  const prevDay = index > 0 ? chartData[index - 1].day : null;
                  
                  if (index % 4 === 0 || currentDay !== prevDay) {
                    return `${chartData[index].day} ${value}`;
                  }
                  return '';
                }}
              />
              <YAxis 
                yAxisId="left" 
                tick={{ fontSize: 12 }} 
                domain={['auto', 'auto']}
                label={{ value: '°C', position: 'insideTopLeft', offset: 0 }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                label={{ value: '%', position: 'insideTopRight', offset: 0 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Temperature"
                stroke="#2196F3"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Feels Like"
                stroke="#03A9F4"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Humidity"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastChart;
