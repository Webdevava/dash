"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  ReferenceLine,
} from "recharts";
import { Toaster, toast } from "sonner";
import { Alert, AlertDescription } from "./ui/alert";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UCL = 210;
const LCL = 190;

// Utility functions for chart logic
const checkMeanTemperatureShift = (data) => {
  let consecutiveIncrease = 0;
  let consecutiveDecrease = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i].Temperature > data[i - 1].Temperature) {
      consecutiveIncrease++;
      consecutiveDecrease = 0;
      if (consecutiveIncrease >= 8) return true;
    } else if (data[i].Temperature < data[i - 1].Temperature) {
      consecutiveDecrease++;
      consecutiveIncrease = 0;
      if (consecutiveDecrease >= 6) return true;
    } else {
      consecutiveIncrease = 0;
      consecutiveDecrease = 0;
    }
  }
  return false;
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

const checkGradualIncrease = (data) => {
  let consecutiveIncreases = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i].Temperature - data[i - 1].Temperature === 0.5) {
      consecutiveIncreases++;
      if (consecutiveIncreases >= 5) return true;
    } else {
      consecutiveIncreases = 0;
    }
  }
  return false;
};

const checkFluctuatingPatterns = (data) => {
  for (let i = 0; i < data.length - 5; i++) {
    if (
      data[i + 1].Temperature - data[i].Temperature === 0.3 &&
      data[i + 2].Temperature - data[i + 1].Temperature === 0.3 &&
      data[i + 3].Temperature - data[i + 2].Temperature === -0.1 &&
      data[i + 4].Temperature - data[i + 3].Temperature === 0.3 &&
      data[i + 5].Temperature - data[i + 4].Temperature === 0.3
    ) {
      return true;
    }
  }
  return false;
};

const checkCombinedEffect = (data) => {
  for (let i = 1; i < data.length; i++) {
    if (
      data[i].Temperature > data[i - 1].Temperature &&
      data[i].Conveyor_Speed < data[i - 1].Conveyor_Speed
    ) {
      return true;
    }
  }
  return false;
};

// Custom Tooltip Component
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

// Chart Components
const MeanTemperatureShiftChart = ({ data }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alertStatus = checkMeanTemperatureShift(data);
    setShowAlert(alertStatus);
    if (alertStatus) {
      toast.error("Alert: Significant mean temperature shift detected!");
    }
  }, [data]);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Mean Temperature Shift (X-bar Chart)</CardTitle>
        <p className="text-sm text-gray-500">
          This chart tracks the average temperature over time, helping to identify significant shifts in the process mean.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Timestamp" />
              <YAxis domain={[LCL - 10, UCL + 10]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceLine y={UCL} label="UCL" stroke="red" strokeDasharray="3 3" />
              <ReferenceLine y={LCL} label="LCL" stroke="red" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="Temperature" stroke="#8884d8" dot={{ fill: ({ index }) => checkMeanTemperatureShift(data.slice(0, index + 1)) ? 'red' : '#8884d8' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {showAlert && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>
              Significant mean temperature shift detected!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

const TemperatureFluctuationChart = ({ data }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alertStatus = checkTemperatureFluctuation(data);
    setShowAlert(alertStatus);
    if (alertStatus) {
      toast.error("Alert: Continuous temperature range increase detected!");
    }
  }, [data]);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Temperature Fluctuation (R Chart)</CardTitle>
        <p className="text-sm text-gray-500">
          This chart displays the range of temperature fluctuations, helping to identify changes in process variability.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Timestamp" />
              <YAxis domain={[LCL - 10, UCL + 10]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceLine y={UCL} label="UCL" stroke="red" strokeDasharray="3 3" />
              <ReferenceLine y={LCL} label="LCL" stroke="red" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="Temperature" stroke="#82ca9d" dot={{ fill: ({ index }) => checkTemperatureFluctuation(data.slice(0, index + 1)) ? 'red' : '#82ca9d' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {showAlert && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>
              Continuous temperature range increase detected!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

const GradualIncreaseChart = ({ data }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alertStatus = checkGradualIncrease(data);
    setShowAlert(alertStatus);
    if (alertStatus) {
      toast.error("Alert: Gradual temperature increase detected!");
    }
  }, [data]);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Gradual Increase (CUSUM Chart)</CardTitle>
        <p className="text-sm text-gray-500">
          This cumulative sum chart helps detect small, consistent shifts in the process mean over time.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Timestamp" />
              <YAxis domain={[LCL - 10, UCL + 10]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceLine y={UCL} label="UCL" stroke="red" strokeDasharray="3 3" />
              <ReferenceLine y={LCL} label="LCL" stroke="red" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="Temperature" stroke="#ffc658" dot={{ fill: ({ index }) => checkGradualIncrease(data.slice(0, index + 1)) ? 'red' : '#ffc658' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {showAlert && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>
              Gradual temperature increase detected!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

const FluctuatingPatternsChart = ({ data }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alertStatus = checkFluctuatingPatterns(data);
    setShowAlert(alertStatus);
    if (alertStatus) {
      toast.error("Alert: Fluctuating temperature pattern detected!");
    }
  }, [data]);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Fluctuating Patterns (EWMA Chart)</CardTitle>
        <p className="text-sm text-gray-500">
          This Exponentially Weighted Moving Average chart is sensitive to small shifts in the process mean and helps identify trends.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Timestamp" />
              <YAxis domain={[LCL - 10, UCL + 10]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceLine y={UCL} label="UCL" stroke="red" strokeDasharray="3 3" />
              <ReferenceLine y={LCL} label="LCL" stroke="red" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="Temperature" stroke="#ff7300" dot={{ fill: ({ index }) => checkFluctuatingPatterns(data.slice(0, index + 1)) ? 'red' : '#ff7300' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {showAlert && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>
              Fluctuating temperature pattern detected!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

const CombinedEffectChart = ({ data }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alertStatus = checkCombinedEffect(data);
    setShowAlert(alertStatus);
    if (alertStatus) {
      toast.error("Alert: Combined effect of increasing temperature and decreasing conveyor speed detected!");
    }
  }, [data]);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Combined Effect Chart</CardTitle>
        <p className="text-sm text-gray-500">
          This chart visualizes the relationship between temperature and conveyor speed over time, helping to identify multivariate process shifts.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Timestamp" />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="#8884d8"
                domain={[LCL - 10, UCL + 10]}
                label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#82ca9d"
                label={{ value: 'Conveyor Speed', angle: 90, position: 'insideRight' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceLine yAxisId="left" y={UCL} label="UCL" stroke="red" strokeDasharray="3 3" />
              <ReferenceLine yAxisId="left" y={LCL} label="LCL" stroke="red" strokeDasharray="3 3" />
              <Line yAxisId="left" type="monotone" dataKey="Temperature" stroke="#8884d8" name="Temperature" dot={{ fill: ({ index }) => checkCombinedEffect(data.slice(0, index + 1)) ? 'red' : '#8884d8' }} />
              <Line yAxisId="right" type="monotone" dataKey="Conveyor_Speed" stroke="#82ca9d" name="Conveyor Speed" dot={{ fill: ({ index }) => checkCombinedEffect(data.slice(0, index + 1)) ? 'red' : '#82ca9d' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        {showAlert && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>
              Combined effect of increasing temperature and decreasing conveyor speed detected!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default function ManufacturingDashboard() {
  const [data, setData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/data?limit=50`);
      const result = await response.json();
      setData(
        result.data
          .map((item) => ({
            ...item,
            Timestamp: new Date(item.Timestamp).toLocaleTimeString(),
          }))
          .reverse()
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    try {
      await fetch(`${API_URL}/data/generate`, { method: "POST" });
      setIsGenerating(true);
      toast.success("Data generation started");
    } catch (error) {
      console.error("Error starting data generation:", error);
      toast.error("Failed to start data generation");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Temperature Data Dashboard</h1>
      <div className="flex space-x-4 mb-4">
        <Button onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? "Generating Data..." : "Generate Data"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MeanTemperatureShiftChart data={data} />
        <TemperatureFluctuationChart data={data} />
        <GradualIncreaseChart data={data} />
        <FluctuatingPatternsChart data={data} />
        <CombinedEffectChart data={data} />
      </div>
    </div>
  );
}