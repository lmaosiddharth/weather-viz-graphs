
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForecastItem } from "@/services/WeatherService";
import { formatDay, formatTime } from "@/utils/weatherUtils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Droplets, Wind, Gauge } from "lucide-react";

interface WeatherMetricsProps {
  data: ForecastItem[];
  metricType: "humidity" | "wind" | "pressure";
}

const WeatherMetrics: React.FC<WeatherMetricsProps> = ({ data, metricType }) => {
  // Prepare data for the chart
  const chartData = data.map((item) => ({
    time: formatTime(item.dt),
    day: formatDay(item.dt),
    value: metricType === "humidity" ? item.humidity : 
           metricType === "wind" ? item.wind_speed : 
           item.pressure,
    timestamp: item.dt,
  }));

  const metricConfig = {
    humidity: {
      title: "Humidity Forecast",
      color: "#8884d8",
      unit: "%",
      icon: <Droplets className="h-5 w-5" />,
      domain: [0, 100],
    },
    wind: {
      title: "Wind Speed Forecast",
      color: "#82ca9d",
      unit: "m/s",
      icon: <Wind className="h-5 w-5" />,
      domain: [0, 'auto'],
    },
    pressure: {
      title: "Pressure Forecast",
      color: "#ffc658",
      unit: "hPa",
      icon: <Gauge className="h-5 w-5" />,
      domain: [980, 1040],
    }
  };

  const config = metricConfig[metricType];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border">
          <p className="font-semibold">{`${data.day} ${label}`}</p>
          <div className="flex items-center gap-2">
            {config.icon}
            <span>
              {data.value} {config.unit}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          <div className="flex items-center gap-2">
            {config.icon}
            <span>{config.title}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
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
                domain={config.domain}
                tick={{ fontSize: 12 }}
                label={{ value: config.unit, position: 'insideTopLeft', offset: 0 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={config.color}
                strokeWidth={2}
                dot={{ r: 1 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherMetrics;
