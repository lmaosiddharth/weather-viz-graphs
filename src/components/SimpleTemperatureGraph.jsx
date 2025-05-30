
import React, { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const SimpleTemperatureGraph = ({ data }) => {
  useEffect(() => {
    console.log("SimpleTemperatureGraph rendered with data:", data);
  }, [data]);

  // Check if data exists and has items
  if (!data || !data.length) {
    return <div className="h-[300px] w-full flex items-center justify-center bg-gray-100 rounded-lg">No data available</div>;
  }

  console.log("Graph data:", data); // Add logging to debug

  // Make sure we're working with valid data
  const validData = data.filter(item => item && typeof item.dt === 'number' && typeof item.temp === 'number');
  
  if (validData.length === 0) {
    console.error("No valid data points found in:", data);
    return <div className="h-[300px] w-full flex items-center justify-center bg-gray-100 rounded-lg">Invalid data format</div>;
  }

  const chartData = validData.map((item) => ({
    time: formatTime(item.dt),
    temperature: Math.round(item.temp),
  }));

  console.log("Processed chart data:", chartData);

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
            label={{ value: '°C', position: 'insideTopLeft', offset: 0 }}
          />
          <Tooltip 
            formatter={(value) => [`${value}°C`, 'Temperature']}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#2196F3"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            isAnimationActive={false} // Try disabling animation to see if that helps
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleTemperatureGraph;
