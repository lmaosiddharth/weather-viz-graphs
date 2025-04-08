
import React from "react";
import { ForecastItem } from "@/services/WeatherService";
import { formatTime } from "@/utils/weatherUtils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SimpleTemperatureGraphProps {
  data: ForecastItem[];
}

const SimpleTemperatureGraph: React.FC<SimpleTemperatureGraphProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    time: formatTime(item.dt),
    temperature: Math.round(item.temp),
    timestamp: item.dt,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            domain={['auto', 'auto']}
            label={{ value: '°C', position: 'insideTopLeft', offset: 0 }}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}°C`, 'Temperature']}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#2196F3"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleTemperatureGraph;
