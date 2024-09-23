'use client'
import React, { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UCL = 210;
const LCL = 190;
const PREDICTION_POINTS = 5;
const DATA_POINTS = 20;

const roundToTwo = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

const formatTime = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString();
};

const predictFuturePoints = (data) => {
  if (data.length < 2) return [];

  const lastTwo = data.slice(-2);
  const slope =
    (lastTwo[1].Temperature - lastTwo[0].Temperature) /
    (new Date(lastTwo[1].Timestamp).getTime() -
      new Date(lastTwo[0].Timestamp).getTime());
  const intercept =
    lastTwo[1].Temperature - slope * new Date(lastTwo[1].Timestamp).getTime();

  const lastTimestamp = new Date(data[data.length - 1].Timestamp).getTime();

  return Array.from({ length: PREDICTION_POINTS }, (_, i) => {
    const time = lastTimestamp + (i + 1) * 1000;
    const predictedTemp = roundToTwo(
      slope * time + intercept + (Math.random() - 0.5) * 2
    );
    return {
      Timestamp: time,
      Temperature: null,
      prediction: predictedTemp,
    };
  });
};

const getControlStatus = (data) => {
  const outOfControl = data.some(
    (point) => point.Temperature > UCL || point.Temperature < LCL
  );
  return outOfControl ? "Out of Control" : "In Control";
};

export default function TemperaturePredictionChart() {
  const [data, setData] = useState([]);
  const [controlStatus, setControlStatus] = useState("In Control");
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/data?limit=20`);
      const result = await response.json();
      const newData = result.data.map((item) => ({
        ...item,
        Timestamp: new Date(item.Timestamp).getTime(),
        prediction: null,
      }));
      const predictedData = predictFuturePoints(newData);
      setData([...newData, ...predictedData]);
      setControlStatus(getControlStatus(newData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const startDataGeneration = async () => {
    try {
      await fetch(`${API_URL}/data/generate`, { method: "POST" });
      setIsGenerating(true);
    } catch (error) {
      console.error("Error starting data generation:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-background p-2 border border-border rounded shadow-md">
          <p className="label">{`Time: ${formatTime(label)}`}</p>
          {payload[0] && payload[0].value && (
            <p className="temp">{`Temperature: ${payload[0].value}`}</p>
          )}
          {payload[1] && payload[1].value && (
            <p className="pred">{`Prediction: ${payload[1].value}`}</p>
          )}
          {payload[2] && payload[2].value && (
            <p className="speed">{`Conveyor Speed: ${payload[2].value}`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Real-time Temperature Chart with Prediction</CardTitle>
        <div className="flex justify-between items-center">
          <Badge
            variant={controlStatus === "In Control" ? "default" : "destructive"}
          >
            {controlStatus}
          </Badge>
          <Button onClick={startDataGeneration} disabled={isGenerating}>
            {isGenerating ? "Generating Data..." : "Start Data Generation"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="Timestamp"
              tickFormatter={formatTime}
              label={{
                value: "Time",
                position: "insideBottomRight",
                offset: -10,
              }}
              reversed={true}
              domain={["dataMin", "dataMax"]}
            />
            <YAxis
              domain={[LCL - 10, UCL + 10]}
              tickFormatter={(value) => roundToTwo(value)}
              label={{
                value: "Temperature",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine
              y={UCL}
              label="UCL"
              stroke="hsl(var(--destructive))"
              strokeDasharray="3 3"
            />
            <ReferenceLine
              y={LCL}
              label="LCL"
              stroke="hsl(var(--destructive))"
              strokeDasharray="3 3"
            />
            <Line
              type="monotone"
              dataKey="Temperature"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
              isAnimationActive={false}
              connectNulls={true}
            />
            <Line
              type="monotone"
              dataKey="prediction"
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive={false}
              connectNulls={true}
            />
            
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}