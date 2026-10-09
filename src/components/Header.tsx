import React, { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Menu,
  Plus,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
import { ViewTab } from "../types";

interface HeaderProps {
  currentView: ViewTab;
  onOpenMobileMenu: () => void;
  onOpenNewAlertModal: () => void;
  dateRange: string;
  onSelectDateRange: (range: string) => void;
  onRefreshData: () => void;
  activeAlertId?: string;
  onNavigateView: (view: ViewTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onOpenMobileMenu,
  onOpenNewAlertModal,
  dateRange,
  onSelectDateRange,
  onRefreshData,
  activeAlertId = "PW-2026-1042",
  onNavigateView,
}) => {
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  const getBreadcrumbs = () => {
    switch (currentView) {
      case "overview":
        return (
          <>
            <span
              className="cursor-pointer hover:text-primary transition-colors"
              onClick={() => onNavigateView("overview")}
            >
              Public Health Command
            </span>
            <span className="text-[11px] text-border-muted font-mono">/</span>
            <span className="text-primary font-medium">District Overview</span>
          </>
        );
      case "alerts":
        return (
          <>
            <span
              className="cursor-pointer hover:text-primary transition-colors"
              onClick={() => onNavigateView("overview")}
            >
              Public Health Command
            </span>
            <span className="text-[11px] text-border-muted font-mono">/</span>
            <span
              className="cursor-pointer hover:text-primary transition-colors"
              onClick={() => onNavigateView("alerts")}
            >
              Alerts
            </span>
            <span className="text-[11px] text-border-muted font-mono">/</span>
            <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-surface-container text-primary font-medium">
              {activeAlertId}
            </span>
          </>
        );
      case "map":
        return (
          <>
            <span
              className="cursor-pointer hover:text-primary transition-colors"
              onClick={() => onNavigateView("overview")}
            >
              Public Health Command
            </span>
            <span className="text-[11px] text-border-muted font-mono">/</span>
            <span className="text-primary font-medium">
              Maharashtra Outbreak Map
            </span>
          </>
        );
      case "signals":
        return (
          <>
            <span
              className="cursor-pointer hover:text-primary transition-colors"
              onClick={() => onNavigateView("overview")}
            >
              Public Health Command
            </span>
            <span className="text-[11px] text-border-muted font-mono">/</span>
            <span className="text-primary font-medium">
              Signals & Ingestion Feeds
            </span>
          </>
        );
      case "reports":
        return (
          <>
            <span
              className="cursor-pointer hover:text-primary transition-colors"
              onClick={() => onNavigateView("overview")}
            >
              Public Health Command
            </span>
            <span className="text-[11px] text-border-muted font-mono">/</span>
            <span className="text-primary font-medium">
              Epidemiological Reports
            </span>
          </>
        );
    }
  };

  const getTitles = () => {
    switch (currentView) {
      case "overview":
        return {
          title: "District Overview",
          subtitle:
            "Early signals. Clear decisions. · Maharashtra, India · Updated today, 09:30 IST",
        };
      case "alerts":
        return {
          title: `Alert Dossier — ${activeAlertId}`,
          subtitle:
            "Syndromic Aberrance · Mumbai Suburban · Severity: Priority 1 (Critical)",
        };
      case "map":
        return {
          title: "Maharashtra Spatial Outbreak Map",
          subtitle:
            "Spatial Surveillance · WGS84 Vector Grid · 36 Active Jurisdictions",
        };
      case "signals":
        return {
          title: "Signals & Ingestion Feeds",
          subtitle:
            "Multi-Stream Health Telemetry · 6 Realtime Ingestion Pipelines Active",
        };
      case "reports":
        return {
          title: "Epidemiological Intelligence Reports",
          subtitle:
            "Weekly Verification & Action Synthesis · Week 41 Synthesis",
        };
    }
  };

  const titles = getTitles();

  const dateOptions = [
    "Past 7 Days (Standard Surveillance)",
    "Past 14 Days (Incubation Window)",
    "Past 30 Days (Monthly Trend)",
    "Epi Week 41 (IDSP Official Cycle)",
  ];

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-6 py-3 border-b border-border-subtle bg-white/95 backdrop-blur-md gap-3 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden text-secondary hover:text-primary p-1.5 rounded-xl border border-border-subtle"
          aria-label="Open navigation menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[12px] text-secondary mb-0.5">
            {getBreadcrumbs()}
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] md:text-[24px] font-bold text-primary tracking-tight font-sans">
              {titles.title}
            </h1>
            {currentView === "overview" && (
              <span className="hidden sm:inline-flex pill-green">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span>6 feeds active</span>
              </span>
            )}
          </div>
          <p className="text-[12px] text-secondary font-medium mt-0.5">
            {titles.subtitle}
          </p>
        </div>
      </div>

      {/* Action Controls matching Inspo Header */}
      <div className="flex items-center gap-2 flex-wrap self-stretch md:self-auto justify-end">
        {/* Date Selector Pill ("Last 7 days ∨") */}
        <div className="relative">
          <button
            onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
            className="flex items-center gap-2 h-[34px] px-3 rounded-xl bg-white border border-[#EDEFF2] text-primary hover:bg-[#F8F9FB] text-[12px] font-medium transition-all shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-secondary" />
            <span className="font-sans tabular-nums font-semibold">
              Last 7 days
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-secondary" />
          </button>

          {dateDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl border border-[#EDEFF2] shadow-serene-elevated p-1.5 z-30">
              {dateOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onSelectDateRange(opt);
                    setDateDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[12px] transition-colors ${
                    dateRange === opt
                      ? "bg-[#F1F3F6] text-primary font-semibold"
                      : "text-secondary hover:bg-[#F8F9FB] hover:text-primary"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Region / Brand Selector Pill ("Redondo Brand ∨") */}
        <div className="flex items-center gap-1.5 h-[34px] px-3 rounded-xl bg-white border border-[#EDEFF2] text-primary text-[12px] font-medium shadow-sm">
          <span className="font-semibold">Maharashtra State</span>
          <ChevronDown className="w-3.5 h-3.5 text-secondary" />
        </div>

        {/* Refresh telemetry */}
        <button
          onClick={onRefreshData}
          className="flex items-center justify-center w-[34px] h-[34px] rounded-xl bg-white border border-[#EDEFF2] text-secondary hover:text-primary hover:bg-[#F8F9FB] transition-colors shadow-sm active:scale-[0.98]"
          title="Force refresh telemetry feeds"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        {/* Log new alert */}
        <button
          onClick={onOpenNewAlertModal}
          className="flex items-center gap-1.5 h-[34px] px-3.5 rounded-xl bg-primary text-white text-[12px] font-semibold hover:bg-black transition-all active:scale-[0.98] shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log signal</span>
        </button>
      </div>
    </header>
  );
};
