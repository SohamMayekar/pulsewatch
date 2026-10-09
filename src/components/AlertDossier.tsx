import React, { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  CloudRain,
  MapPin,
  Pill,
  Search,
  Send,
  Share2,
  ShieldAlert,
  Sliders,
  UserCheck,
} from "lucide-react";
import { AlertDossierType, DirectiveItem, OfficerNote } from "../types";
import { FarringtonChart } from "./ui/FarringtonChart";

interface AlertDossierProps {
  dossier: AlertDossierType;
  officerNotes: OfficerNote[];
  onAddOfficerNote: (content: string, action?: string) => void;
  onBackToOverview: () => void;
  onNavigateToMap: (districtName: string) => void;
  onToast: (message: string, type: "info" | "alert" | "success") => void;
}

export const AlertDossier: React.FC<AlertDossierProps> = ({
  dossier,
  officerNotes,
  onAddOfficerNote,
  onBackToOverview,
  onNavigateToMap,
  onToast,
}) => {
  const [anomalySigma, setAnomalySigma] = useState(dossier.anomalyThreshold);
  const [reviewStage, setReviewStage] = useState<
    "triage" | "investigating" | "observation" | "escalated"
  >("triage");
  const [directives, setDirectives] = useState<DirectiveItem[]>(
    dossier.directives,
  );
  const [noteInput, setNoteInput] = useState("");

  const calculatedConfidence = Math.min(
    99.2,
    Math.max(78.5, 94.8 - (anomalySigma - 2.8) * 5.8),
  ).toFixed(1);

  const handleMarkForInvestigation = () => {
    setReviewStage("investigating");
    onAddOfficerNote(
      "Investigation dispatched. Medical Officers in Kurla, Chembur, and Ghatkopar alerted for active fever verification.",
      "Dispatched to Field",
    );
    onToast(
      "Protocol Dispatched: Directives sent to Municipal Health Officers.",
      "success",
    );
  };

  const handleKeepUnderObservation = () => {
    setReviewStage("observation");
    onAddOfficerNote(
      "Alert placed under 24h observation window. Next automated scoring scheduled at 18:00 IST.",
      "Observation Active",
    );
    onToast(
      "Alert held under observation. Continuous monitoring active.",
      "info",
    );
  };

  const handleEscalateToState = () => {
    setReviewStage("escalated");
    onAddOfficerNote(
      "Escalated to State Epidemiology Cell (DGHS Pune). Rapid diagnostic replenishment requested.",
      "Escalated to State",
    );
    onToast("Escalated to State Directorate of Health Services.", "alert");
  };

  const toggleDirective = (id: string) => {
    setDirectives((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const nextStatus = d.status === "completed" ? "pending" : "completed";
          onToast(
            `${d.title}: ${nextStatus === "completed" ? "Marked complete" : "Marked pending"}`,
            nextStatus === "completed" ? "success" : "info",
          );
          return { ...d, status: nextStatus };
        }
        return d;
      }),
    );
  };

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    onAddOfficerNote(noteInput.trim(), "Clinical Signoff");
    setNoteInput("");
    onToast("Field note added to audit trail.", "success");
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 custom-scroll bg-[#F4F5F7]">
      {/* Top Navigation & Fast Actions */}
      <div className="flex items-center justify-between pb-0.5">
        <button
          onClick={onBackToOverview}
          className="flex items-center gap-1.5 text-[11px] font-medium text-secondary hover:text-primary py-1 px-2 rounded-lg hover:bg-surface-container transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onNavigateToMap(dossier.district)}
            className="flex items-center gap-1.5 text-[11px] font-medium text-primary h-[28px] px-2.5 rounded-lg bg-surface-card border border-border-subtle hover:bg-surface-container-low transition-colors shadow-serene-sm"
          >
            <MapPin className="w-3 h-3 text-secondary" />
            <span>Map View</span>
          </button>
          <button
            onClick={() => onToast("Alert link copied to clipboard.", "info")}
            className="flex items-center gap-1.5 text-[11px] font-medium text-secondary hover:text-primary h-[28px] px-2.5 rounded-lg bg-surface-card border border-border-subtle hover:bg-surface-container-low transition-colors shadow-serene-sm"
          >
            <Share2 className="w-3 h-3" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Hero Dossier Card: Clean, Authoritative, High Signal-to-Noise */}
      <div className="bg-surface-card rounded-[16px] border border-border-subtle p-3.5 sm:p-4.5 shadow-serene-card flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-border-subtle pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-status-alert-tint border border-status-alert-border flex items-center justify-center text-status-alert shrink-0">
              <ShieldAlert className="w-4.5 h-4.5 text-status-alert" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-[10px] font-semibold text-status-alert-text tabular-nums">
                  {dossier.id}
                </span>
                <span className="text-[10px] text-secondary font-mono">•</span>
                <span className="font-bold text-[12px] text-primary">
                  {dossier.district}
                </span>
                <span className="text-[10px] font-mono text-secondary tabular-nums">
                  · {dossier.multiplier} Farrington Baseline Ceiling Breach
                </span>
              </div>
              <h2 className="text-[18px] font-bold text-primary tracking-tight mt-0.5">
                {dossier.syndrome}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-right">
              <div className="text-[11px] font-medium text-secondary">
                Model confidence
              </div>
              <div className="text-[20px] font-bold text-primary font-sans tabular-nums leading-none">
                {calculatedConfidence}%
              </div>
            </div>
            <div className="pill-red font-semibold">Priority 1 (Critical)</div>
          </div>
        </div>

        {/* Clear Plain-Language Summary Box */}
        <div className="p-3.5 rounded-xl bg-surface-container-low border border-border-subtle">
          <div className="text-[11px] font-semibold text-secondary mb-1">
            Clinical situation summary
          </div>
          <p className="text-[12px] text-primary leading-relaxed font-medium">
            "{dossier.plainLanguageReason}"
          </p>
          <div className="flex items-center gap-2.5 mt-2 pt-1.5 border-t border-border-subtle/60 text-[11px] text-secondary font-sans">
            <span>
              Detected:{" "}
              <span className="tabular-nums font-semibold">
                {dossier.detectedAt}
              </span>
            </span>
            <span>•</span>
            <span>Jurisdiction: {dossier.jurisdiction}</span>
            <span>•</span>
            <span>Officer: {dossier.officerAssigned}</span>
          </div>
        </div>
      </div>

      {/* 4 Clean Evidence Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* OPD Presentations */}
        <div className="bg-surface-card rounded-[18px] p-4 border border-border-subtle shadow-inspo-card flex flex-col justify-between">
          <div className="flex items-center justify-between text-[12px] font-semibold text-secondary">
            <span>Clinic OPD surge</span>
            <Building2 className="w-3.5 h-3.5 text-status-alert" />
          </div>
          <div className="my-2">
            <div className="text-[24px] font-bold text-status-alert-text font-sans tabular-nums leading-none">
              +{dossier.evidence.opdVisits.changePct.toFixed(0)}%
            </div>
            <div className="text-[12px] font-semibold text-primary mt-1">
              {dossier.evidence.opdVisits.count} presentations today
            </div>
            <div className="text-[11px] text-secondary/70 mt-0.5">
              14/14 peripheral dispensaries reporting
            </div>
          </div>
          <div className="pt-1.5 border-t border-border-subtle text-[11px] text-secondary tabular-nums font-medium">
            Ceiling: 48 cases / day
          </div>
        </div>

        {/* Pharmacy Sales */}
        <div className="bg-surface-card rounded-[18px] p-4 border border-border-subtle shadow-inspo-card flex flex-col justify-between">
          <div className="flex items-center justify-between text-[12px] font-semibold text-secondary">
            <span>OTC pharmacy index</span>
            <Pill className="w-3.5 h-3.5 text-chart-accent-purple" />
          </div>
          <div className="my-2">
            <div className="text-[24px] font-bold text-primary font-sans tabular-nums leading-none">
              +{dossier.evidence.otcAntipyretic.salesSurgePct.toFixed(0)}%
            </div>
            <div className="text-[12px] font-semibold text-primary mt-1">
              Antipyretics acceleration
            </div>
            <div className="text-[11px] text-secondary/70 mt-0.5">
              118 member chemists reporting
            </div>
          </div>
          <div className="pt-1.5 border-t border-border-subtle text-[11px] text-secondary tabular-nums font-medium">
            SKU: Paracetamol 650mg
          </div>
        </div>

        {/* Precipitation */}
        <div className="bg-surface-card rounded-[18px] p-4 border border-border-subtle shadow-inspo-card flex flex-col justify-between">
          <div className="flex items-center justify-between text-[12px] font-semibold text-secondary">
            <span>Weather context</span>
            <CloudRain className="w-3.5 h-3.5 text-chart-accent-blue" />
          </div>
          <div className="my-2">
            <div className="text-[24px] font-bold text-primary font-sans tabular-nums leading-none">
              {dossier.evidence.precipitation.mmAccumulated}mm
            </div>
            <div className="text-[12px] font-semibold text-primary mt-1">
              Rainfall accumulation (72h)
            </div>
            <div className="text-[11px] text-secondary/70 mt-0.5">
              Vector stagnation score: 0.82 (High)
            </div>
          </div>
          <div className="pt-1.5 border-t border-border-subtle text-[11px] text-secondary tabular-nums font-medium">
            Humidity mean &gt;85%
          </div>
        </div>

        {/* Search Queries */}
        <div className="bg-surface-card rounded-[18px] p-4 border border-border-subtle shadow-inspo-card flex flex-col justify-between">
          <div className="flex items-center justify-between text-[12px] font-semibold text-secondary">
            <span>Search velocity</span>
            <Search className="w-3.5 h-3.5 text-status-watch" />
          </div>
          <div className="my-2">
            <div className="text-[24px] font-bold text-status-watch-text font-sans tabular-nums leading-none">
              +{dossier.evidence.searchVelocity.velocityPct.toFixed(0)}%
            </div>
            <div className="text-[12px] font-semibold text-primary mt-1">
              Symptom query velocity
            </div>
            <div className="text-[11px] text-secondary/70 mt-0.5">
              Google Trends health index: 86/100
            </div>
          </div>
          <div className="pt-1.5 border-t border-border-subtle text-[11px] text-secondary tabular-nums font-medium">
            Vernacular: Marathi / English
          </div>
        </div>
      </div>

      {/* Main Grid: Farrington Waveform + Decision Protocol Console */}
      <div className="grid grid-cols-12 gap-3.5">
        {/* Left (7 cols): Farrington Curve */}
        <div className="col-span-12 lg:col-span-7 bg-surface-card rounded-[16px] border border-border-subtle p-3.5 sm:p-4.5 shadow-serene-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-border-subtle">
              <div>
                <h3 className="text-[14px] font-bold text-primary">
                  Farrington V3 Aberrance Curve
                </h3>
                <p className="text-[11px] text-secondary/80 mt-0.5">
                  Observed case trajectory vs. historical baseline ceiling with
                  dynamic tolerance corridor
                </p>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container text-secondary tabular-nums">
                7 Days
              </span>
            </div>

            <div className="my-2.5">
              <FarringtonChart
                data={dossier.farringtonTimeline}
                currentSigma={anomalySigma}
              />
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container-low text-[10px] text-secondary border border-border-subtle font-mono tabular-nums">
            Quasi-Poisson model inflection detected on Day 4; Day 7 demonstrates
            acute surge (z = 3.42, p &lt; 0.001).
          </div>
        </div>

        {/* Right (5 cols): Officer Decision Console (Human-in-the-Loop) */}
        <div className="col-span-12 lg:col-span-5 bg-surface-card rounded-[16px] border border-border-subtle p-3.5 sm:p-4.5 shadow-serene-card flex flex-col justify-between gap-3.5">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-primary" />
                <h3 className="text-[14px] font-bold text-primary">
                  Officer Decision Console
                </h3>
              </div>
              <span
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                  reviewStage === "investigating"
                    ? "pill-green"
                    : reviewStage === "observation"
                      ? "pill-amber"
                      : reviewStage === "escalated"
                        ? "pill-red"
                        : "bg-surface-container text-secondary"
                }`}
              >
                {reviewStage === "investigating"
                  ? "Dispatched"
                  : reviewStage === "observation"
                    ? "Observation active"
                    : reviewStage === "escalated"
                      ? "Escalated to state"
                      : "Triage pending"}
              </span>
            </div>

            {/* Protocol Action Buttons with Explicit Consequence Labeling */}
            <div>
              <span className="text-[11px] text-secondary font-semibold">
                Protocol actions & consequence dispatch
              </span>
              <div className="space-y-1.5 mt-1.5">
                {/* Action 1: Mark for Investigation */}
                <button
                  onClick={handleMarkForInvestigation}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all active:scale-[0.98] ${
                    reviewStage === "investigating"
                      ? "bg-status-normal-tint border-status-normal text-status-normal-text ring-1 ring-status-normal"
                      : "bg-surface-card border-border-subtle hover:bg-surface-container-low text-primary"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold">
                      Mark for Investigation
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F1F3F6] text-secondary">
                      Field directive
                    </span>
                  </div>
                  <p className="text-[11px] text-secondary mt-0.5 leading-snug">
                    Dispatches directives to Ward L peripheral dispensaries &
                    activates ASHA larval survey units.
                  </p>
                </button>

                {/* Action 2: Keep Under Observation (24h) */}
                <button
                  onClick={handleKeepUnderObservation}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all active:scale-[0.98] ${
                    reviewStage === "observation"
                      ? "bg-status-watch-tint border-status-watch text-status-watch-text ring-1 ring-status-watch"
                      : "bg-surface-card border-border-subtle hover:bg-surface-container-low text-primary"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold">
                      Keep Under Observation (24h)
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F1F3F6] text-secondary">
                      Telemetry hold
                    </span>
                  </div>
                  <p className="text-[11px] text-secondary mt-0.5 leading-snug">
                    Maintains 24h telemetry watch with automated 18:00 IST
                    Farrington model rescoring.
                  </p>
                </button>

                {/* Action 3: Escalate to State */}
                <button
                  onClick={handleEscalateToState}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all active:scale-[0.98] ${
                    reviewStage === "escalated"
                      ? "bg-status-alert-tint border-status-alert text-status-alert-text ring-1 ring-status-alert"
                      : "bg-surface-card border-border-subtle hover:bg-surface-container-low text-primary"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold">
                      Escalate to State
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F1F3F6] text-secondary">
                      State DGHS
                    </span>
                  </div>
                  <p className="text-[11px] text-secondary mt-0.5 leading-snug">
                    Transmits urgent outbreak briefing to Directorate of Health
                    Services (DGHS Pune) for diagnostic buffer release.
                  </p>
                </button>
              </div>
            </div>

            {/* Sensitivity Slider */}
            <div className="p-3 rounded-xl bg-surface-container-low border border-border-subtle space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-primary">
                  Sensitivity Threshold (σ)
                </span>
                <span className="font-bold text-primary bg-white px-2 py-0.5 rounded-md border border-border-subtle tabular-nums">
                  σ = {anomalySigma.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="1.5"
                max="4.0"
                step="0.05"
                value={anomalySigma}
                onChange={(e) => setAnomalySigma(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex items-center justify-between text-[10px] text-secondary tabular-nums">
                <span>1.50σ (Sensitive)</span>
                <span>4.00σ (Conservative)</span>
              </div>
            </div>

            {/* Directives Checklist - Clean Sentence Case */}
            <div>
              <span className="text-[11px] text-secondary font-semibold">
                Recommended directives
              </span>
              <div className="divide-y divide-border-subtle/80 rounded-xl bg-surface-container-low/50 border border-border-subtle overflow-hidden mt-1.5">
                {directives.map((dir) => (
                  <div
                    key={dir.id}
                    onClick={() => toggleDirective(dir.id)}
                    className="p-2.5 hover:bg-surface-container-low cursor-pointer transition-colors flex items-start gap-2.5 text-[11px]"
                  >
                    <input
                      type="checkbox"
                      checked={
                        dir.status === "completed" ||
                        dir.status === "dispatched"
                      }
                      onChange={() => {}}
                      className="mt-0.5 rounded text-primary focus:ring-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-primary leading-snug">
                        {dir.title}
                      </div>
                      <div className="text-[10px] text-secondary mt-0.5 tabular-nums">
                        {dir.department} · {dir.eta}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Audit Notes Log */}
          <div className="pt-2.5 border-t border-border-subtle space-y-1.5">
            <span className="text-[11px] text-secondary font-semibold">
              Field notes & clinical audit trail
            </span>

            <div className="max-h-20 overflow-y-auto space-y-1 custom-scroll pr-1 text-[10px]">
              {officerNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-1.5 rounded-md bg-surface-container-low text-[10px]"
                >
                  <div className="flex justify-between font-mono text-secondary mb-0.5">
                    <span className="font-semibold text-primary">
                      {note.author}
                    </span>
                    <span className="tabular-nums">{note.timestamp}</span>
                  </div>
                  <p className="text-primary">{note.content}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handlePostNote} className="flex gap-1.5">
              <input
                type="text"
                placeholder="Add clinical observation note..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                className="flex-1 h-[28px] px-2 rounded-lg bg-surface-container-low border border-border-subtle text-[11px] text-primary focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="h-[28px] px-2.5 rounded-lg bg-primary text-on-primary hover:bg-black transition-colors active:scale-[0.98] flex items-center justify-center text-[10px] font-semibold"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
