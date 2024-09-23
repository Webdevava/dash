"use client";
import React, { useState, useEffect } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

const UCL = 210;
const LCL = 190;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="font-bold">{`Time: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const checkTemperatureFluctuation = (data) => {
  const windowSize = 5;
  for (let i = 0; i < data.length - windowSize; i += windowSize) {
    const window = data.slice(i, i + windowSize);
    const range =
      Math.max(...window.map((d) => d.Temperature)) -
      Math.min(...window.map((d) => d.Temperature));
    if (range >= 2) {
      const nextWindow = data.slice(i + windowSize, i + 2 * windowSize);
      const nextRange =
        Math.max(...nextWindow.map((d) => d.Temperature)) -
        Math.min(...nextWindow.map((d) => d.Temperature));
      if (nextRange >= 1) return true;
    }
  }
  return false;
};

const TemperatureFluctuationChart = ({ realData, predictionData }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alertStatus = checkTemperatureFluctuation(realData);
    setShowAlert(alertStatus);
    if (alertStatus) {
      toast.error("Alert: Continuous temperature range increase detected!");
    }
  }, [realData]);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Timestamp" />
          <YAxis domain={[LCL - 10, UCL + 10]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine
            y={UCL}
            label="UCL"
            stroke="red"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={LCL}
            label="LCL"
            stroke="red"
            strokeDasharray="3 3"
          />
          <Line
            type="monotone"
            data={realData}
            dataKey="Temperature"
            stroke="#82ca9d"
            name="Real Temperature"
            dot={{ fill: "#82ca9d" }}
          />
          <Line
            type="monotone"
            data={predictionData}
            dataKey="Temperature"
            stroke="#8884d8"
            name="Predicted Temperature"
            dot={{ fill: "#8884d8" }}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
      {showAlert && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>
            Continuous temperature range increase detected!
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default TemperatureFluctuationChart;
