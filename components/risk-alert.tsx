"use client";
import { RiskData } from "./riskClassification";
import { AlertTriangle, Shield, AlertCircle } from "lucide-react";

interface RiskAlertProps {
  riskData: RiskData | null;
  isLoading: boolean;
  fireCount: number;
}

export function RiskAlert({ riskData, isLoading, fireCount }: RiskAlertProps) {
  if (isLoading) {
    return (
      <div className="w-full rounded-md p-3 mb-4 bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse flex items-center space-x-2">
          <div className="h-4 w-4 rounded-full bg-gray-300"></div>
          <div className="h-3 w-32 rounded bg-gray-300"></div>
        </div>
      </div>
    );
  }

  if (!riskData) {
    return null;
  }

  const { level, description, color, bgColor, recommendation } = riskData;

  return (
    <div
      className={`w-full rounded-md p-3 mb-4 ${bgColor} border flex items-start`}
    >
      <div className="mr-3 mt-0.5">
        {level === "segura" && <Shield className={`${color} h-5 w-5`} />}
        {level === "atenção" && (
          <AlertTriangle className={`${color} h-5 w-5`} />
        )}
        {level === "perigo" && <AlertCircle className={`${color} h-5 w-5`} />}
      </div>
      <div>
        <h3 className={`font-semibold ${color} text-sm`}>
          {description} - {fireCount} {fireCount === 1 ? "foco" : "focos"} de
          queimada detectados
        </h3>
        <p className="text-sm mt-1 text-gray-700">{recommendation}</p>
      </div>
    </div>
  );
}
