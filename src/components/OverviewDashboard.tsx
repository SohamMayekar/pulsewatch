import React, { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CloudRain,
  MapPin,
  Search,
  ShieldAlert,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  AlertDossierType,
  DistrictSurveillance,
  StatusLevel,
  ViewTab,
} from "../types";
import { FarringtonChart } from "./ui/FarringtonChart";
import { Sparkline } from "./ui/Sparkline";

interface OverviewDashboardProps {
  districts: DistrictSurveillance[];
  alertDossier: AlertDossierType;
  onNavigateView: (view: ViewTab) => void;
  onSelectDistrictOnMap: (districtName: string) => void;
  onInspectAlert: (alertId: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  districts,
  alertDossier,
  onNavigateView,
  onSelectDistrictOnMap,
  onInspectAlert,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | StatusLevel>("all");

  const alertDistricts = districts.filter((d) => d.status === "alert");
  const watchDistricts = districts.filter((d) => d.status === "watch");
  const normalDistricts = districts.filter((d) => d.status === "normal");
  const totalPresentations = districts.reduce(
    (sum, d) => sum + d.clinicCount,
    0,
  );
  const highestMultiplier = Math.max(...districts.map((d) => d.multiplier));
  const avgConfidence =
    districts.reduce((sum, d) => sum + d.confidenceScore, 0) / districts.length;

  const filteredDistricts = districts.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.marathiName.includes(searchQuery) ||
      d.division.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const divisionBreakdown = (() => {
    const map: Record<
      string,
      { alert: number; watch: number; normal: number; total: number }
    > = {};
    districts.forEach((d) => {
      if (!map[d.division])
        map[d.division] = { alert: 0, watch: 0, normal: 0, total: 0 };
      map[d.division][d.status]++;
      map[d.division].total++;
    });
    return Object.entries(map).map(([div, counts]) => ({
      division: div,
      ...counts,
    }));
  })();

  const signalSources = [
    { label: "OPD Sentinel Clinics", pct: 44, color: "#E04F5F" },
    { label: "Search Velocity", pct: 25, color: "#3B82F6" },
    { label: "Meteorological Grid", pct: 15, color: "#06B6D4" },
    { label: "OTC Pharmacies", pct: 10, color: "#F59E0B" },
    { label: "IDSP Baseline", pct: 4, color: "#8B5CF6" },
    { label: "WHO DON Stream", pct: 2, color: "#1EB564" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 custom-scroll bg-[#F4F5F7]">
      {/* ROW 1: 5 KPI STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-xl p-4 border border-[#EDEFF2] shadow-inspo-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-secondary">
              Active Outbreak
            </span>
            <span className="pill-red">Critical</span>
          </div>
          <div className="my-2.5">
            <div className="flex items-end gap-1.5">
              <span className="text-[26px] font-bold text-primary tracking-tight font-sans tabular-nums">
                {alertDistricts.length}
              </span>
              <span className="text-[#E04F5F] font-bold text-[14px] mb-0.5">
                ↑
              </span>
            </div>
            <p className="text-[11px] text-[#8E95A5] font-medium mt-1">
              Mumbai Suburban — Farrington 3×
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#EDEFF2] shadow-inspo-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-secondary">
              OPD Presentations
            </span>
            <span className="pill-red">+11%</span>
          </div>
          <div className="my-2.5">
            <div className="flex items-end gap-1.5">
              <span className="text-[26px] font-bold text-primary tracking-tight font-sans tabular-nums">
                {totalPresentations.toLocaleString()}
              </span>
              <span className="text-[#E04F5F] font-bold text-[14px] mb-0.5">
                ↑
              </span>
            </div>
            <p className="text-[11px] text-[#8E95A5] font-medium mt-1">
              Week-on-week across 36 districts
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#EDEFF2] shadow-inspo-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-secondary">
              Peak Multiplier
            </span>
            <span className="pill-red">Breach</span>
          </div>
          <div className="my-2.5">
            <div className="flex items-end gap-1.5">
              <span className="text-[26px] font-bold text-primary tracking-tight font-sans tabular-nums">
                {highestMultiplier.toFixed(1)}×
              </span>
              <span className="text-[#E04F5F] font-bold text-[14px] mb-0.5">
                ↑
              </span>
            </div>
            <p className="text-[11px] text-[#8E95A5] font-medium mt-1">
              Farrington baseline ceiling: 1.0×
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#EDEFF2] shadow-inspo-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-secondary">
              Watch Zone
            </span>
            <span className="pill-amber">Elevated</span>
          </div>
          <div className="my-2.5">
            <div className="flex items-end gap-1.5">
              <span className="text-[26px] font-bold text-primary tracking-tight font-sans tabular-nums">
                {watchDistricts.length}
              </span>
              <span className="text-[#D97706] font-bold text-[14px] mb-0.5">
                ↑
              </span>
            </div>
            <p className="text-[11px] text-[#8E95A5] font-medium mt-1">
              Thane, Nashik, Palghar elevated
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#EDEFF2] shadow-inspo-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-secondary">
              Model Confidence
            </span>
            <span className="pill-green">High</span>
          </div>
          <div className="my-2.5">
            <div className="flex items-end gap-1.5">
              <span className="text-[26px] font-bold text-primary tracking-tight font-sans tabular-nums">
                {avgConfidence.toFixed(1)}%
              </span>
              <span className="text-[#1EB564] font-bold text-[14px] mb-0.5">
                ↑
              </span>
            </div>
            <p className="text-[11px] text-[#8E95A5] font-medium mt-1">
              Concordance across 6 live streams
            </p>
          </div>
        </div>
      </div>

      {/* ROW 2: FARRINGTON CURVE + EVIDENCE CONCORDANCE */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-5 border border-[#EDEFF2] shadow-inspo-card flex flex-col">
          <FarringtonChart
            data={alertDossier.farringtonTimeline}
            currentSigma={alertDossier.anomalyThreshold}
          />
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl p-5 border border-[#EDEFF2] shadow-inspo-card flex flex-col gap-0">
          <div className="pb-3 border-b border-border-subtle">
            <h3 className="text-[15px] font-semibold text-primary tracking-tight">
              Signal concordance
            </h3>
            <p className="text-[12px] text-secondary mt-0.5">
              Corroborating evidence — {alertDossier.id}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3.5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[12px]">
                <span className="flex items-center gap-1.5 text-secondary font-medium">
                  <Activity className="w-3.5 h-3.5 text-[#E04F5F]" />
                  OPD Presentations
                </span>
                <span className="font-bold text-primary tabular-nums font-sans">
                  {alertDossier.evidence.opdVisits.count}
                  <span className="text-[#E04F5F] font-bold ml-1">
                    +{alertDossier.evidence.opdVisits.changePct.toFixed(0)}%
                  </span>
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#F1F3F6] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#E04F5F]"
                  style={{ width: "96%" }}
                />
              </div>
              <div className="text-[10px] text-secondary">
                {alertDossier.evidence.opdVisits.clinicsReporting}/
                {alertDossier.evidence.opdVisits.totalClinics} sentinel clinics
                reporting
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[12px]">
                <span className="flex items-center gap-1.5 text-secondary font-medium">
                  <TrendingUp className="w-3.5 h-3.5 text-[#3B82F6]" />
                  Search velocity
                </span>
                <span className="font-bold text-primary tabular-nums font-sans">
                  +{alertDossier.evidence.searchVelocity.velocityPct}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#F1F3F6] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#3B82F6]"
                  style={{ width: "42%" }}
                />
              </div>
              <div className="text-[10px] text-secondary truncate">
                "{alertDossier.evidence.searchVelocity.query}"
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[12px]">
                <span className="flex items-center gap-1.5 text-secondary font-medium">
                  <CloudRain className="w-3.5 h-3.5 text-[#06B6D4]" />
                  Precipitation (72h)
                </span>
                <span className="font-bold text-primary tabular-nums font-sans">
                  {alertDossier.evidence.precipitation.mmAccumulated}mm
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#F1F3F6] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#06B6D4]"
                  style={{ width: "82%" }}
                />
              </div>
              <div className="text-[10px] text-secondary">
                Stagnation index:{" "}
                {alertDossier.evidence.precipitation.stagnationScore} ·{" "}
                {alertDossier.evidence.precipitation.riskDelta}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[12px]">
                <span className="flex items-center gap-1.5 text-secondary font-medium">
                  <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
                  OTC antipyretic surge
                </span>
                <span className="font-bold text-primary tabular-nums font-sans">
                  +{alertDossier.evidence.otcAntipyretic.salesSurgePct}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#F1F3F6] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#F59E0B]"
                  style={{ width: "89%" }}
                />
              </div>
              <div className="text-[10px] text-secondary">
                {alertDossier.evidence.otcAntipyretic.pharmacyNetworkUnits}{" "}
                pharmacies · {alertDossier.evidence.otcAntipyretic.topMolecule}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dashed border-border-subtle flex items-center justify-between text-[12px]">
            <span className="text-secondary font-medium">
              Multi-stream confidence
            </span>
            <span className="font-bold text-primary font-sans tabular-nums text-[14px]">
              {alertDossier.confidenceScore}%
            </span>
          </div>
        </div>
      </div>

      {/* ROW 3: JURISDICTION STATUS GAUGE + INGESTION SOURCES + DIVISION BREAKDOWN */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4 bg-white rounded-xl p-5 border border-[#EDEFF2] shadow-inspo-card flex flex-col">
          <h3 className="text-[15px] font-semibold text-secondary tracking-tight">
            Jurisdiction status
          </h3>

          <div className="relative flex flex-col items-center justify-center my-4">
            <svg
              className="w-[180px] h-[100px] overflow-visible"
              viewBox="0 0 180 100"
            >
              <path
                d="M 15 90 A 75 75 0 0 1 165 90"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 15 90 A 75 75 0 0 1 145 38"
                fill="none"
                stroke="#1EB564"
                strokeWidth="12"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center -mt-6">
              <div className="text-[26px] font-bold text-primary font-sans tabular-nums leading-none">
                {normalDistricts.length}
              </div>
              <div className="text-[12px] font-medium text-secondary mt-1">
                Clear jurisdictions
              </div>
            </div>
          </div>

          <div className="flex items-center justify-around text-center text-[12px] mt-auto pt-3 border-t border-dashed border-border-subtle">
            <div>
              <div className="text-[18px] font-bold tabular-nums font-sans text-[#E04F5F]">
                {alertDistricts.length}
              </div>
              <div className="text-secondary font-medium text-[11px]">
                Alert
              </div>
            </div>
            <div className="w-px h-7 bg-border-subtle" />
            <div>
              <div className="text-[18px] font-bold tabular-nums font-sans text-[#D97706]">
                {watchDistricts.length}
              </div>
              <div className="text-secondary font-medium text-[11px]">
                Watch
              </div>
            </div>
            <div className="w-px h-7 bg-border-subtle" />
            <div>
              <div className="text-[18px] font-bold tabular-nums font-sans text-[#1EB564]">
                {normalDistricts.length}
              </div>
              <div className="text-secondary font-medium text-[11px]">
                Normal
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 bg-white rounded-xl p-5 border border-[#EDEFF2] shadow-inspo-card flex flex-col">
          <div>
            <h3 className="text-[15px] font-semibold text-secondary tracking-tight">
              Ingestion sources
            </h3>

            <div className="grid grid-cols-3 gap-2 my-3 text-left">
              <div>
                <div className="text-[10px] text-secondary font-medium">
                  Active Streams
                </div>
                <div className="text-[14px] font-bold text-primary font-sans tabular-nums">
                  6 / 6
                </div>
              </div>
              <div>
                <div className="text-[10px] text-secondary font-medium">
                  Mean Latency
                </div>
                <div className="text-[14px] font-bold text-primary font-sans tabular-nums">
                  84ms
                </div>
              </div>
              <div>
                <div className="text-[10px] text-secondary font-medium">
                  Throughput
                </div>
                <div className="text-[14px] font-bold text-primary font-sans tabular-nums">
                  1,480/d
                </div>
              </div>
            </div>

            <div className="w-full h-2.5 rounded-full overflow-hidden flex gap-0.5 my-3">
              {signalSources.map((s) => (
                <div
                  key={s.label}
                  className="h-full rounded-full"
                  style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                  title={`${s.label}: ${s.pct}%`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-[12px]">
              {signalSources.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5 text-secondary">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="truncate text-[11px]">{s.label}</span>
                  </span>
                  <span className="font-bold text-primary font-sans tabular-nums text-[11px]">
                    {s.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 bg-white rounded-xl p-5 border border-[#EDEFF2] shadow-inspo-card flex flex-col">
          <div>
            <h3 className="text-[15px] font-semibold text-secondary tracking-tight mb-3">
              Surveillance by division
            </h3>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle text-[11px] font-medium text-secondary">
                  <th className="pb-2 font-medium">Division</th>
                  <th className="pb-2 text-center font-medium">Alert</th>
                  <th className="pb-2 text-center font-medium">Watch</th>
                  <th className="pb-2 text-right font-medium">Normal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-[12px]">
                {divisionBreakdown.map((div) => (
                  <tr
                    key={div.division}
                    className="hover:bg-[#F8F9FA] transition-colors cursor-pointer"
                    onClick={() => {
                      const d = districts.find(
                        (x) => x.division === div.division,
                      );
                      if (d) {
                        onSelectDistrictOnMap(d.name);
                        onNavigateView("map");
                      }
                    }}
                  >
                    <td className="py-2.5 font-medium text-primary">
                      {div.division}
                    </td>
                    <td className="py-2.5 text-center font-bold font-sans tabular-nums">
                      {div.alert > 0 ? (
                        <span className="text-[#E04F5F]">{div.alert}</span>
                      ) : (
                        <span className="text-secondary/40">—</span>
                      )}
                    </td>
                    <td className="py-2.5 text-center font-bold font-sans tabular-nums">
                      {div.watch > 0 ? (
                        <span className="text-[#D97706]">{div.watch}</span>
                      ) : (
                        <span className="text-secondary/40">—</span>
                      )}
                    </td>
                    <td className="py-2.5 text-right font-bold font-sans tabular-nums text-[#1EB564]">
                      {div.normal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ROW 4: COMPLETE DISTRICT SURVEILLANCE ROSTER */}
      <div className="bg-white rounded-xl p-5 border border-[#EDEFF2] shadow-inspo-card flex flex-col gap-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-bold text-primary tracking-tight">
                Surveillance by district
              </h2>
              <span className="text-[12px] font-semibold text-secondary tabular-nums">
                ({filteredDistricts.length} of {districts.length})
              </span>
            </div>
            <p className="text-[12px] text-secondary mt-0.5">
              Continuous district-level anomaly tracking · Maharashtra State,
              India
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search district or division..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[32px] pl-8 pr-3 rounded-xl bg-[#F8F9FB] border border-[#EDEFF2] text-[12px] text-primary placeholder:text-secondary/60 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex items-center p-0.5 rounded-xl bg-[#F8F9FB] border border-[#EDEFF2] text-[11px] font-medium">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${statusFilter === "all" ? "bg-white text-primary font-semibold shadow-sm" : "text-secondary hover:text-primary"}`}
              >
                All ({districts.length})
              </button>
              <button
                onClick={() => setStatusFilter("alert")}
                className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${statusFilter === "alert" ? "bg-[#EF4444] text-white font-semibold shadow-sm" : "text-[#E04F5F] hover:bg-[#FDF0F2]"}`}
              >
                Alert ({alertDistricts.length})
              </button>
              <button
                onClick={() => setStatusFilter("watch")}
                className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${statusFilter === "watch" ? "bg-[#F59E0B] text-white font-semibold shadow-sm" : "text-[#D97706] hover:bg-[#FEF7EE]"}`}
              >
                Watch ({watchDistricts.length})
              </button>
              <button
                onClick={() => setStatusFilter("normal")}
                className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${statusFilter === "normal" ? "bg-[#10B981] text-white font-semibold shadow-sm" : "text-[#1EB564] hover:bg-[#EAF8F0]"}`}
              >
                Normal ({normalDistricts.length})
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle text-[11px] font-medium text-secondary">
                <th className="py-2 px-3 font-medium">District</th>
                <th className="py-2 px-3 font-medium">Status</th>
                <th className="py-2 px-3 font-medium">7-day trajectory</th>
                <th className="py-2 px-3 text-right font-medium">OPD volume</th>
                <th className="py-2 px-3 text-right font-medium">
                  Search velocity
                </th>
                <th className="py-2 px-3 text-right font-medium">Confidence</th>
                <th className="py-2 px-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-[12px]">
              {filteredDistricts.map((district) => {
                const isAlert = district.status === "alert";
                const isWatch = district.status === "watch";

                return (
                  <tr
                    key={district.id}
                    className="hover:bg-[#F8F9FA] transition-colors group cursor-pointer"
                    onClick={() => {
                      if (district.activeAlertId) {
                        onInspectAlert(district.activeAlertId);
                      } else {
                        onSelectDistrictOnMap(district.name);
                        onNavigateView("map");
                      }
                    }}
                  >
                    <td className="py-2 px-3">
                      <div>
                        <div className="font-semibold text-primary">
                          {district.name}
                          <span className="text-[11px] font-normal text-secondary ml-1.5">
                            ({district.marathiName})
                          </span>
                        </div>
                        <div className="text-[10px] text-secondary">
                          {district.division} Division · Pop:{" "}
                          {district.population}
                        </div>
                      </div>
                    </td>

                    <td className="py-2 px-3">
                      {isAlert ? (
                        <span className="pill-red">
                          Alert ({district.multiplier}×)
                        </span>
                      ) : isWatch ? (
                        <span className="pill-amber">
                          Watch ({district.multiplier}×)
                        </span>
                      ) : (
                        <span className="pill-green">Normal</span>
                      )}
                    </td>

                    <td className="py-2 px-3">
                      <Sparkline
                        data={district.historySparkline}
                        status={district.status}
                        width={80}
                        height={18}
                      />
                    </td>

                    <td className="py-2 px-3 text-right font-sans font-semibold text-primary tabular-nums">
                      {district.clinicCount}
                      <span
                        className={`text-[11px] ml-1.5 ${isAlert ? "text-[#E04F5F] font-bold" : isWatch ? "text-[#D97706] font-semibold" : "text-secondary"}`}
                      >
                        {district.clinicChange}
                      </span>
                    </td>

                    <td className="py-2 px-3 text-[12px] text-secondary text-right font-sans tabular-nums">
                      {district.searchVelocity}
                    </td>

                    <td className="py-2 px-3 font-sans text-[12px] text-primary text-right tabular-nums font-semibold">
                      {district.confidenceScore.toFixed(1)}%
                    </td>

                    <td
                      className="py-2 px-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {district.activeAlertId ? (
                        <button
                          onClick={() =>
                            onInspectAlert(district.activeAlertId!)
                          }
                          className="px-2.5 py-1 rounded-lg bg-primary text-white text-[11px] font-semibold hover:bg-black transition-all active:scale-[0.98] inline-flex items-center gap-1 shadow-sm"
                        >
                          <span>Dossier</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            onSelectDistrictOnMap(district.name);
                            onNavigateView("map");
                          }}
                          className="px-2 py-1 rounded-lg text-secondary hover:text-primary hover:bg-[#F1F3F6] text-[11px] font-medium transition-all inline-flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3" />
                          <span>Map</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
