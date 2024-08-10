"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    month: "January",
    deviceA: 120,
    deviceB: 150,
    deviceC: 180,
    deviceD: 90,
  },
  {
    month: "February",
    deviceA: 160,
    deviceB: 180,
    deviceC: 200,
    deviceD: 110,
  },
  {
    month: "March",
    deviceA: 140,
    deviceB: 190,
    deviceC: 160,
    deviceD: 100,
  },
  {
    month: "April",
    deviceA: 180,
    deviceB: 200,
    deviceC: 170,
    deviceD: 120,
  },
  {
    month: "May",
    deviceA: 160,
    deviceB: 210,
    deviceC: 190,
    deviceD: 130,
  },
  {
    month: "June",
    deviceA: 200,
    deviceB: 220,
    deviceC: 210,
    deviceD: 140,
  },
];

const chartConfig = {
  deviceA: {
    label: "deviceA",
    color: "hsl(var(--chart-1))",
  },
  deviceB: {
    label: "deviceB",
    color: "hsl(var(--chart-2))",
  },
  deviceC: {
    label: "deviceC",
    color: "hsl(var(--chart-3))",
  },
  deviceD: {
    label: "deviceD",
    color: "hsl(var(--chart-4))",
  },
}; 

export function MyLineChart() {
  return (
    <Card className="bg-[#fefefe] rounded-3xl w-full h-[28rem] ">
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="deviceA"
                type="monotone"
                stroke="var(--color-deviceA)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="deviceB"
                type="monotone"
                stroke="var(--color-deviceB)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="deviceC"
                type="monotone"
                stroke="var(--color-deviceC)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="deviceD"
                type="monotone"
                stroke="var(--color-deviceD)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
