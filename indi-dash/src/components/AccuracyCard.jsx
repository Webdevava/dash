import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import Image from "next/image";

const AccuracyCard = ({
  logoSrc,
  name,
  id,
  accuracy,
  audioMatching,
  logoDetection,
}) => {
  const data = [
    { name: "Accuracy", value: accuracy },
    { name: "Remaining", value: 100 - accuracy },
  ];

  const COLORS = ["#4ade80", "#e5e7eb"];

  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="flex items-center mb-4 border-b">
        <Image
          src={logoSrc}
          alt={name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-4">
          <h2 className="font-bold text-xl">{name}</h2>
          <p className="text-gray-600 text-sm">{id}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative">
          <PieChart width={120} height={120}>
            <Pie
              data={data}
              cx={60}
              cy={60}
              innerRadius={40}
              outerRadius={55}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h3 className="text-2xl font-bold text-green-500">{accuracy}%</h3>
            <p className="text-xs text-gray-600">Accuracy</p>
          </div>
        </div>

        <div className="mt-4 w-full p-3">
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="text-gray-700">Audio</span>
              <span className="text-gray-700">{audioMatching}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-400 h-2 rounded-full"
                style={{ width: `${audioMatching}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-700">Logo</span>
              <span className="text-gray-700">{logoDetection}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-400 h-2 rounded-full"
                style={{ width: `${logoDetection}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccuracyCard;
