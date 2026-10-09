import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CloudRain,
  Layers,
  Maximize2,
  Minus,
  Navigation,
  Pill,
  Plus,
  RotateCcw,
  Search,
  ShieldAlert,
} from "lucide-react";
import { DistrictSurveillance, StatusLevel, ViewTab } from "../types";
import { Sparkline } from "./ui/Sparkline";

interface OutbreakMapProps {
  districts: DistrictSurveillance[];
  selectedDistrictName: string;
  onSelectDistrict: (districtName: string) => void;
  onInspectAlert: (alertId: string) => void;
  onNavigateView: (view: ViewTab) => void;
  onToast: (message: string, type: "info" | "alert" | "success") => void;
}

export const OutbreakMap: React.FC<OutbreakMapProps> = ({
  districts,
  selectedDistrictName,
  onSelectDistrict,
  onInspectAlert,
  onNavigateView,
  onToast,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapFilter, setMapFilter] = useState<"all" | StatusLevel>("all");

  const selectedDistrict =
    districts.find(
      (d) => d.name.toLowerCase() === selectedDistrictName.toLowerCase(),
    ) || districts[0];

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(2.0, Math.max(0.8, prev + delta)));
  };

  const resetMap = () => {
    setZoomLevel(1);
    onSelectDistrict("Mumbai Suburban");
    onToast("Map view reset to default projection", "info");
  };

  const getDistrictShader = (status: StatusLevel, isSelected: boolean) => {
    if (status === "alert") {
      return {
        fill: "#FDF1F0",
        stroke: "#C9574D",
        strokeWidth: isSelected ? 3 : 2,
        textColor: "#C9574D",
      };
    }
    if (status === "watch") {
      return {
        fill: "#FEF7EE",
        stroke: "#C58A35",
        strokeWidth: isSelected ? 2.8 : 1.8,
        textColor: "#C58A35",
      };
    }
    return {
      fill: isSelected ? "#E2EBE5" : "#EEF7F2",
      stroke: isSelected ? "#3E7356" : "#CEE7D8",
      strokeWidth: isSelected ? 2.2 : 1.2,
      textColor: "#4D8B69",
    };
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 custom-scroll bg-[#F4F5F7]">
      {/* Top Map Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 bg-surface-card p-2.5 px-3 rounded-[16px] border border-border-subtle shadow-serene-card">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-semibold text-secondary uppercase font-mono tracking-[0.06em] ml-0.5">
            STATUS FILTER:
          </span>
          <button
            onClick={() => setMapFilter("all")}
            className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors active:scale-[0.98] ${
              mapFilter === "all"
                ? "bg-surface-container text-primary font-semibold"
                : "text-secondary hover:text-primary"
            }`}
          >
            All Districts (36)
          </button>
          <button
            onClick={() => {
              setMapFilter("alert");
              onSelectDistrict("Mumbai Suburban");
            }}
            className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors flex items-center gap-1 active:scale-[0.98] ${
              mapFilter === "alert"
                ? "bg-status-alert text-white font-semibold"
                : "text-status-alert-text hover:bg-status-alert-tint"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-status-alert animate-gentle-pulse" />
            Active Alert (1)
          </button>
          <button
            onClick={() => {
              setMapFilter("watch");
              onSelectDistrict("Thane");
            }}
            className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors flex items-center gap-1 active:scale-[0.98] ${
              mapFilter === "watch"
                ? "bg-status-watch text-white font-semibold"
                : "text-status-watch-text hover:bg-status-watch-tint"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-status-watch" />
            Under Watch (3)
          </button>
          <button
            onClick={() => {
              setMapFilter("normal");
              onSelectDistrict("Pune");
            }}
            className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors flex items-center gap-1 active:scale-[0.98] ${
              mapFilter === "normal"
                ? "bg-status-normal text-white font-semibold"
                : "text-status-normal-text hover:bg-status-normal-tint"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-status-normal" />
            Normal Baseline (32)
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-[10px] font-mono text-secondary tabular-nums">
            Zoom: {(zoomLevel * 100).toFixed(0)}%
          </span>
          <div className="flex items-center p-0.5 rounded-lg bg-surface-container-low border border-border-subtle">
            <button
              onClick={() => handleZoom(0.15)}
              className="p-1 hover:bg-surface-container rounded-md text-secondary hover:text-primary transition-colors"
              title="Zoom In"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom(-0.15)}
              className="p-1 hover:bg-surface-container rounded-md text-secondary hover:text-primary transition-colors"
              title="Zoom Out"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={resetMap}
              className="p-1 hover:bg-surface-container rounded-md text-secondary hover:text-primary transition-colors"
              title="Reset Map Orientation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: 8-col Map Stage + 4-col Geographic Inspector Panel */}
      <div className="grid grid-cols-12 gap-3.5 min-h-[560px]">
        {/* 8-col Map Stage */}
        <div className="col-span-12 xl:col-span-8 bg-surface-card rounded-[16px] border border-border-subtle p-3.5 sm:p-4.5 shadow-serene-card relative flex flex-col justify-between overflow-hidden min-h-[500px]">
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 text-[13px]">
              <span className="font-bold text-primary">
                State Surveillance Grid
              </span>
              <span className="text-secondary">• Western Regional Mission</span>
            </div>
            <div className="text-[11px] font-mono text-secondary bg-surface-container px-2 py-0.5 rounded-md">
              EPSG:4326 · WGS84
            </div>
          </div>

          {/* Interactive SVG Canvas */}
          <div className="relative w-full flex-1 flex items-center justify-center my-3 select-none overflow-hidden">
            <svg
              viewBox="0 0 760 520"
              className="w-full h-full max-h-[480px] transition-transform duration-200 ease-out drop-shadow-sm"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Outer State Geographic Hull */}
              <path
                d="M 140 220 L 220 160 L 320 130 L 440 120 L 580 100 L 690 120 L 720 170 L 670 230 L 590 280 L 470 330 L 380 430 L 290 470 L 240 460 L 210 390 L 150 310 Z"
                fill="#F4F4F2"
                opacity="0.6"
              />

              {/* NAGPUR (NORMAL) */}
              <g
                onClick={() => onSelectDistrict("Nagpur")}
                className="cursor-pointer group"
              >
                <polygon
                  points="560,110 650,95 720,130 690,190 620,210 560,170"
                  {...getDistrictShader(
                    "normal",
                    selectedDistrictName.toLowerCase() === "nagpur",
                  )}
                />
                <text
                  x="630"
                  y="150"
                  textAnchor="middle"
                  fontFamily="Inter"
                  fontSize="11"
                  fontWeight="600"
                  fill="#4D8B69"
                >
                  NAGPUR
                </text>
                <text
                  x="630"
                  y="165"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono"
                  fontSize="9"
                  fill="#4D8B69"
                  opacity="0.8"
                >
                  NORMAL (0.9×)
                </text>
              </g>

              {/* AMRAVATI (NORMAL) */}
              <g
                onClick={() => onSelectDistrict("Amravati")}
                className="cursor-pointer group"
              >
                <polygon
                  points="460,120 560,110 560,170 510,210 440,190"
                  {...getDistrictShader(
                    "normal",
                    selectedDistrictName.toLowerCase() === "amravati",
                  )}
                />
                <text
                  x="500"
                  y="158"
                  textAnchor="middle"
                  fontFamily="Inter"
                  fontSize="10"
                  fontWeight="500"
                  fill="#4D8B69"
                >
                  Amravati
                </text>
              </g>

              {/* JALGAON (NORMAL) */}
              <g
                onClick={() => onSelectDistrict("Jalgaon")}
                className="cursor-pointer group"
              >
                <polygon
                  points="280,140 370,125 460,120 440,190 350,195 280,180"
                  {...getDistrictShader(
                    "normal",
                    selectedDistrictName.toLowerCase() === "jalgaon",
                  )}
                />
                <text
                  x="360"
                  y="162"
                  textAnchor="middle"
                  fontFamily="Inter"
                  fontSize="10"
                  fontWeight="500"
                  fill="#4D8B69"
                >
                  Jalgaon
                </text>
              </g>

              {/* CHHATRAPATI SAMBHAJINAGAR (NORMAL) */}
              <g
                onClick={() => onSelectDistrict("Chhatrapati Sambhajinagar")}
                className="cursor-pointer group"
              >
                <polygon
                  points="340,195 440,190 450,260 360,265"
                  {...getDistrictShader(
                    "normal",
                    selectedDistrictName.toLowerCase() ===
                      "chhatrapati sambhajinagar",
                  )}
                />
                <text
                  x="395"
                  y="228"
                  textAnchor="middle"
                  fontFamily="Inter"
                  fontSize="9.5"
                  fontWeight="500"
                  fill="#4D8B69"
                >
                  Sambhajinagar
                </text>
              </g>

              {/* NANDED (NORMAL) */}
              <g
                onClick={() => onSelectDistrict("Nanded")}
                className="cursor-pointer group"
              >
                <polygon
                  points="450,260 540,240 520,320 440,310"
                  {...getDistrictShader(
                    "normal",
                    selectedDistrictName.toLowerCase() === "nanded",
                  )}
                />
                <text
                  x="480"
                  y="285"
                  textAnchor="middle"
                  fontFamily="Inter"
                  fontSize="9.5"
                  fontWeight="500"
                  fill="#4D8B69"
                >
                  Nanded
                </text>
              </g>

              {/* SOLAPUR (NORMAL) */}
              <g
                onClick={() => onSelectDistrict("Solapur")}
                className="cursor-pointer group"
              >
                <polygon
                  points="320,330 420,320 400,410 320,390"
                  {...getDistrictShader(
                    "normal",
                    selectedDistrictName.toLowerCase() === "solapur",
                  )}
                />
                <text
                  x="360"
                  y="360"
                  textAnchor="middle"
                  fontFamily="Inter"
                  fontSize="10"
                  fontWeight="500"
                  fill="#4D8B69"
                >
                  Solapur
                </text>
              </g>

              {/* KOLHAPUR (NORMAL) */}
              <g
                onClick={() => onSelectDistrict("Kolhapur")}
                className="cursor-pointer group"
              >
                <polygon
                  points="210,390 260,370 270,440 215,445"
                  {...getDistrictShader(
                    "normal",
                    selectedDistrictName.toLowerCase() === "kolhapur",
                  )}
                />
                <text
                  x="240"
                  y="410"
                  textAnchor="middle"
                  fontFamily="Inter"
                  fontSize="9.5"
                  fontWeight="500"
                  fill="#4D8B69"
                >
                  Kolhapur
                </text>
              </g>

              {/* NASHIK (WATCH) */}
              <g
                onClick={() => onSelectDistrict("Nashik")}
                className="cursor-pointer group"
              >
                <polygon
                  points="210,170 280,140 280,220 220,235"
                  {...getDistrictShader(
                    "watch",
                    selectedDistrictName.toLowerCase() === "nashik",
                  )}
                />
                <circle cx="248" cy="188" r="3" fill="#C58A35" />
                <text
                  x="250"
                  y="202"
                  textAnchor="middle"
                  fontFamily="Inter"
                  fontSize="11"
                  fontWeight="600"
                  fill="#C58A35"
                >
                  NASHIK
                </text>
                <text
                  x="250"
                  y="215"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono"
                  fontSize="9"
                  fontWeight="600"
                  fill="#C58A35"
                >
                  WATCH (1.6×)
                </text>
              </g>

              {/* PALGHAR (WATCH) */}
              <g
                onClick={() => onSelectDistrict("Palghar")}
                className="cursor-pointer group"
              >
                <polygon
                  points="160,165 210,170 200,215 155,205"
                  {...getDistrictShader(
                    "watch",
                    selectedDistrictName.toLowerCase() === "palghar",
                  )}
                />
                <text
                  x="180"
                  y="190"
                  textAnchor="middle"
                  fontFamily="Inter"
                  fontSize="9"
                  fontWeight="600"
                  fill="#C58A35"
                >
                  Palghar
                </text>
              </g>

              {/* THANE (WATCH) */}
              <g
                onClick={() => onSelectDistrict("Thane")}
                className="cursor-pointer group"
              >
                <polygon
                  points="175,215 220,225 210,268 165,255"
                  {...getDistrictShader(
                    "watch",
                    selectedDistrictName.toLowerCase() === "thane",
                  )}
                />
                <circle cx="192" cy="240" r="3" fill="#C58A35" />
                <text
                  x="192"
                  y="244"
                  textAnchor="middle"
                  fontFamily="Inter"
                  fontSize="10"
                  fontWeight="600"
                  fill="#C58A35"
                >
                  THANE
                </text>
                <text
                  x="192"
                  y="256"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono"
                  fontSize="9"
                  fontWeight="600"
                  fill="#C58A35"
                >
                  WATCH (1.8×)
                </text>
              </g>

              {/* PUNE (NORMAL) */}
              <g
                onClick={() => onSelectDistrict("Pune")}
                className="cursor-pointer group"
              >
                <polygon
                  points="210,268 290,260 320,330 260,370 200,320"
                  {...getDistrictShader(
                    "normal",
                    selectedDistrictName.toLowerCase() === "pune",
                  )}
                />
                <text
                  x="255"
                  y="310"
                  textAnchor="middle"
                  fontFamily="Inter"
                  fontSize="11"
                  fontWeight="600"
                  fill="#4D8B69"
                >
                  PUNE
                </text>
                <text
                  x="255"
                  y="325"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono"
                  fontSize="9"
                  fill="#4D8B69"
                >
                  NORMAL (1.0×)
                </text>
              </g>

              {/* MUMBAI SUBURBAN (ALERT) - Prominently highlighted */}
              <g
                onClick={() => onSelectDistrict("Mumbai Suburban")}
                className="cursor-pointer group"
              >
                <polygon
                  points="146,242 165,240 170,255 156,264 145,255"
                  {...getDistrictShader(
                    "alert",
                    selectedDistrictName.toLowerCase() === "mumbai suburban",
                  )}
                />
                <circle cx="156" cy="250" r="4.5" fill="#C9574D" />
                <circle
                  cx="156"
                  cy="250"
                  r="10"
                  fill="none"
                  stroke="#C9574D"
                  strokeWidth="1.5"
                  className="animate-beacon-pulse"
                />

                {/* Annotation Callout Leader line */}
                <path
                  d="M 156 250 L 115 210 L 45 210"
                  fill="none"
                  stroke="#C9574D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="45" cy="210" r="3" fill="#C9574D" />

                {/* Callout Card */}
                <g transform="translate(10, 150)">
                  <rect
                    width="145"
                    height="52"
                    rx="10"
                    fill="#FFFFFF"
                    stroke="#F8D4D0"
                    strokeWidth="1.5"
                    filter="drop-shadow(0 6px 14px rgba(201,87,77,0.15))"
                  />
                  <rect
                    x="8"
                    y="10"
                    width="6"
                    height="6"
                    rx="3"
                    fill="#C9574D"
                  />
                  <text
                    x="20"
                    y="16"
                    fontFamily="Inter"
                    fontSize="9"
                    fontWeight="700"
                    fill="#C9574D"
                    letterSpacing="0.05em"
                  >
                    MUMBAI SUBURBAN
                  </text>
                  <text
                    x="12"
                    y="32"
                    fontFamily="Inter"
                    fontSize="13"
                    fontWeight="700"
                    fill="#1E1E1E"
                  >
                    3× Usual Baseline
                  </text>
                  <text
                    x="12"
                    y="44"
                    fontFamily="JetBrains Mono"
                    fontSize="9"
                    fill="#757570"
                  >
                    ALERT · SYNDROMIC
                  </text>
                </g>
              </g>
            </svg>
          </div>

          {/* Bottom Map Legend */}
          <div className="bg-surface-card/95 backdrop-blur-md rounded-2xl border border-border-subtle p-3.5 shadow-serene-sm max-w-[420px] z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[13px] text-primary">
                Surveillance Legend
              </span>
              <span className="font-mono text-[10px] text-secondary bg-surface-container px-2 py-0.5 rounded-md">
                36 Active Jurisdictions
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-border-subtle">
              <div
                className="flex items-center gap-1.5 cursor-pointer"
                onClick={() => onSelectDistrict("Mumbai Suburban")}
              >
                <div className="w-3 h-3 rounded-md bg-status-alert shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-primary">
                    Alert (1)
                  </span>
                  <span className="text-[9px] text-secondary truncate">
                    Mumbai Sub.
                  </span>
                </div>
              </div>
              <div
                className="flex items-center gap-1.5 cursor-pointer"
                onClick={() => onSelectDistrict("Thane")}
              >
                <div className="w-3 h-3 rounded-md bg-status-watch shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-primary">
                    Watch (3)
                  </span>
                  <span className="text-[9px] text-secondary truncate">
                    Thane, Nashik...
                  </span>
                </div>
              </div>
              <div
                className="flex items-center gap-1.5 cursor-pointer"
                onClick={() => onSelectDistrict("Pune")}
              >
                <div className="w-3 h-3 rounded-md bg-status-normal shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-primary">
                    Normal (32)
                  </span>
                  <span className="text-[9px] text-secondary truncate">
                    Pune, Nagpur...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-col Geographic Inspector Panel (Right 30%) */}
        <div className="col-span-12 xl:col-span-4 bg-surface-card rounded-[16px] border border-border-subtle p-3.5 sm:p-4 shadow-serene-card flex flex-col justify-between h-full min-h-[500px] gap-3">
          <div className="flex flex-col gap-2.5">
            {/* Header with status badge */}
            <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
              <span className="text-[9px] font-semibold tracking-[0.06em] text-secondary uppercase font-mono">
                SELECTED JURISDICTION
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold font-mono flex items-center gap-1 border tabular-nums ${
                  selectedDistrict.status === "alert"
                    ? "bg-status-alert-tint text-status-alert-text border-status-alert-border"
                    : selectedDistrict.status === "watch"
                      ? "bg-status-watch-tint text-status-watch-text border-status-watch-border"
                      : "bg-status-normal-tint text-status-normal-text border-status-normal-border"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    selectedDistrict.status === "alert"
                      ? "bg-status-alert animate-gentle-pulse"
                      : selectedDistrict.status === "watch"
                        ? "bg-status-watch"
                        : "bg-status-normal"
                  }`}
                />
                {selectedDistrict.status === "alert"
                  ? "Active Alert"
                  : selectedDistrict.status === "watch"
                    ? "Under Watch"
                    : "Normal Baseline"}
              </span>
            </div>

            {/* Title & Demographics */}
            <div>
              <h3 className="text-[18px] font-bold text-primary tracking-tight">
                {selectedDistrict.name.toUpperCase()}
              </h3>
              <div className="flex items-center gap-1.5 text-secondary text-[11px] mt-0.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>
                  {selectedDistrict.marathiName} · {selectedDistrict.division}{" "}
                  Division · Pop ~
                  <span className="font-mono tabular-nums">
                    {selectedDistrict.population}
                  </span>
                </span>
              </div>
            </div>

            {/* Key Signal Highlight Box */}
            <div
              className={`rounded-xl p-3 flex flex-col gap-1 border ${
                selectedDistrict.status === "alert"
                  ? "bg-status-alert-tint/60 border-status-alert-border"
                  : selectedDistrict.status === "watch"
                    ? "bg-status-watch-tint/60 border-status-watch-border"
                    : "bg-surface-container-low border-border-subtle"
              }`}
            >
              <div className="text-[9px] font-semibold text-secondary uppercase font-mono tracking-[0.06em]">
                PRIMARY EPIDEMIOLOGICAL SIGNAL
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-[22px] font-bold font-mono tabular-nums leading-none ${
                    selectedDistrict.status === "alert"
                      ? "text-status-alert-text"
                      : selectedDistrict.status === "watch"
                        ? "text-status-watch-text"
                        : "text-status-normal-text"
                  }`}
                >
                  {selectedDistrict.multiplier}×
                </span>
                <span className="text-[11px] font-semibold text-primary">
                  {selectedDistrict.status === "alert"
                    ? "above Farrington baseline ceiling"
                    : selectedDistrict.status === "watch"
                      ? "moderate syndromic variance"
                      : "within normal σ bounds"}
                </span>
              </div>
              <p className="text-[10px] text-secondary/80 leading-relaxed mt-0.5">
                {selectedDistrict.signalSummary}
              </p>
            </div>

            {/* Telemetry Stream Breakdown: Flattened Precision Instrument Layout */}
            <div className="space-y-1 pt-0.5">
              <span className="text-[9px] font-semibold tracking-[0.06em] text-secondary uppercase font-mono">
                LOCAL TELEMETRY CONVERGENCE
              </span>

              <div className="divide-y divide-border-subtle rounded-xl bg-surface-container-low/60 border border-border-subtle overflow-hidden text-[11px]">
                <div className="p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-secondary">
                      Clinic OPD Presentations:
                    </span>
                  </div>
                  <span className="font-semibold text-primary font-mono tabular-nums text-right">
                    {selectedDistrict.clinicCount} cases (
                    {selectedDistrict.clinicChange})
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-secondary">
                      Search Query Velocity:
                    </span>
                  </div>
                  <span className="font-semibold text-primary font-mono tabular-nums text-right">
                    {selectedDistrict.searchVelocity}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CloudRain className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-secondary">
                      Precipitation Accumulation:
                    </span>
                  </div>
                  <span className="font-semibold text-primary font-mono tabular-nums text-right">
                    {selectedDistrict.rainfallMm} mm
                  </span>
                </div>
              </div>
            </div>

            {/* 7-Day Sparkline */}
            <div className="pt-1.5 border-t border-border-subtle flex items-center justify-between">
              <span className="text-[10px] font-medium text-secondary">
                7-Day Trajectory:
              </span>
              <Sparkline
                data={selectedDistrict.historySparkline}
                status={selectedDistrict.status}
                width={110}
                height={22}
              />
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-2.5 border-t border-border-subtle">
            {selectedDistrict.activeAlertId ? (
              <button
                onClick={() => onInspectAlert(selectedDistrict.activeAlertId!)}
                className="w-full flex items-center justify-center gap-1.5 h-[34px] rounded-lg bg-primary text-on-primary text-[11px] font-semibold hover:bg-black transition-all active:scale-[0.98] shadow-sm"
              >
                <span>
                  Open Alert Dossier ({selectedDistrict.activeAlertId})
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="p-2 rounded-lg bg-surface-container-low text-center text-[10px] text-secondary">
                No active threshold breach. Continuous surveillance active.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
