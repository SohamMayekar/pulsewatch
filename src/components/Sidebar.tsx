import React from "react";
import {
  Activity,
  BellRing,
  Download,
  FileText,
  LayoutDashboard,
  Map as MapIcon,
  ShieldCheck,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { ViewTab } from "../types";

interface SidebarProps {
  currentView: ViewTab;
  onSelectView: (view: ViewTab) => void;
  activeAlertsCount: number;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onOpenExportModal: () => void;
  onOpenOfficerModal: () => void;
  onApplyPreset: (presetId: string) => void;
  activePreset: string;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  activeAlertsCount,
  audioEnabled,
  onToggleAudio,
  onOpenExportModal,
  onOpenOfficerModal,
  onApplyPreset,
  activePreset,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    {
      id: "overview" as ViewTab,
      label: "District Overview",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "alerts" as ViewTab,
      label: "Alert Dossier",
      icon: BellRing,
      badge: null,
    },
    {
      id: "map" as ViewTab,
      label: "Outbreak Map",
      icon: MapIcon,
      badge: null,
    },
    {
      id: "signals" as ViewTab,
      label: "Signals & Sources",
      icon: Activity,
    },
    {
      id: "reports" as ViewTab,
      label: "Executive Reports",
      icon: FileText,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop — closes nav when tapping outside */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Desktop: sticky sidebar column | Mobile: fixed slide-in overlay */}
      <aside
        className={`
        md:sticky md:top-0 md:flex md:h-screen md:w-[240px] md:shrink-0
        md:flex-col md:justify-between md:bg-white md:border-r md:border-[#EDEFF2]
        md:p-4 md:overflow-y-auto md:custom-scroll md:z-auto
        fixed inset-y-0 left-0 z-50 w-[240px] flex flex-col justify-between
        bg-white border-r border-[#EDEFF2] p-4 overflow-y-auto custom-scroll
        transition-transform duration-200 ease-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="flex flex-col gap-4">
          {/* Brand Header matching Skymetrics */}
          <div className="flex items-center justify-between px-1 pt-1">
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => {
                onSelectView("overview");
                onCloseMobile();
              }}
            >
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[17px] font-bold tracking-tight text-primary leading-tight flex items-center gap-1.5 font-sans">
                  PulseWatch
                  <span
                    className="inline-block w-2 h-2 rounded-full bg-[#EF4444]"
                    title="Real-time multi-signal stream connected"
                  />
                </div>
                <div className="text-[11px] font-medium text-secondary leading-none mt-0.5">
                  Public health operations
                </div>
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              className="md:hidden text-secondary hover:text-primary p-1 rounded-lg"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links matching Inspo Sidebar */}
          <nav
            className="flex flex-col gap-1 mt-1"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectView(item.id);
                    onCloseMobile();
                  }}
                  className={`
                    w-full flex items-center justify-between h-[36px] px-3 rounded-xl text-[13px] font-medium 
                    transition-all duration-150 active:scale-[0.99] cursor-pointer text-left
                    ${
                      isActive
                        ? "bg-[#F1F3F6] text-primary font-bold shadow-sm"
                        : "text-secondary hover:bg-[#F8F9FB] hover:text-primary"
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-primary" : "text-secondary"}`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && <span className="pill-red">{item.badge}</span>}

                  {item.statusDot && (
                    <span
                      className="w-2 h-2 rounded-full bg-[#10B981]"
                      title="All 6 pipelines active"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Presets & Filter Clusters (Sentence Case, Zero All-Caps) */}
          <div className="pt-3 border-t border-border-subtle flex flex-col gap-1">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-semibold text-secondary">
                Surveillance presets
              </span>
              <span className="text-[10px] text-secondary/70">Geo-filters</span>
            </div>

            <button
              onClick={() => onApplyPreset("maharashtra-priority")}
              className={`flex items-center justify-between h-[30px] px-2.5 rounded-lg text-[12px] font-medium transition-colors text-left ${
                activePreset === "maharashtra-priority"
                  ? "bg-[#F1F3F6] text-primary font-bold"
                  : "text-secondary hover:bg-[#F8F9FB] hover:text-primary"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                <span>Maharashtra priority</span>
              </span>
              <span className="text-[11px] text-secondary tabular-nums">
                36 dist
              </span>
            </button>

            <button
              onClick={() => onApplyPreset("western-ghats")}
              className={`flex items-center justify-between h-[30px] px-2.5 rounded-lg text-[12px] font-medium transition-colors text-left ${
                activePreset === "western-ghats"
                  ? "bg-[#F1F3F6] text-primary font-bold"
                  : "text-secondary hover:bg-[#F8F9FB] hover:text-primary"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                <span>Western Ghats vector</span>
              </span>
              <span className="text-[11px] text-secondary tabular-nums">
                18 dist
              </span>
            </button>

            <button
              onClick={() => onApplyPreset("vidarbha-baseline")}
              className={`flex items-center justify-between h-[30px] px-2.5 rounded-lg text-[12px] font-medium transition-colors text-left ${
                activePreset === "vidarbha-baseline"
                  ? "bg-[#F1F3F6] text-primary font-bold"
                  : "text-secondary hover:bg-[#F8F9FB] hover:text-primary"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span>Vidarbha baseline</span>
              </span>
              <span className="text-[11px] text-secondary tabular-nums">
                11 dist
              </span>
            </button>
          </div>
        </div>

        {/* Footer Actions: Audio cue toggle, Export, Officer profile */}
        <div className="mt-4 pt-3 border-t border-border-subtle flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <button
              onClick={onToggleAudio}
              className="flex items-center gap-1.5 text-[11px] text-secondary hover:text-primary font-medium py-1 px-1.5 rounded-lg hover:bg-[#F8F9FB] transition-colors"
              title={
                audioEnabled ? "Mute auditory cues" : "Enable auditory cues"
              }
            >
              {audioEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-primary" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-secondary" />
              )}
              <span>{audioEnabled ? "Telemetry audio" : "Audio muted"}</span>
            </button>

            <span className="text-[11px] font-sans text-secondary tabular-nums">
              v2.4.0
            </span>
          </div>

          <button
            onClick={onOpenExportModal}
            className="w-full flex items-center justify-center gap-2 h-[34px] rounded-xl bg-[#F8F9FB] hover:bg-[#F1F3F6] text-primary text-[12px] font-semibold border border-[#EDEFF2] transition-all active:scale-[0.98] shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-primary" />
            <span>Export intelligence</span>
          </button>

          {/* Officer Identity Pill */}
          <div
            onClick={onOpenOfficerModal}
            className="flex items-center justify-between p-2 rounded-xl bg-[#F8F9FB] border border-[#EDEFF2] cursor-pointer hover:bg-[#F1F3F6] transition-colors"
            title="Click to view officer credentials and jurisdiction"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-white border border-[#EDEFF2] flex items-center justify-center text-primary text-[11px] font-bold shrink-0">
                AS
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-semibold text-primary truncate leading-tight">
                  Dr. Ananya Shah
                </span>
                <span className="text-[10px] text-secondary truncate leading-tight">
                  District Health Officer
                </span>
              </div>
            </div>
            <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
};
