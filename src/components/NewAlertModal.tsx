import React, { useState } from "react";
import { AlertCircle, Plus, X } from "lucide-react";
import { DistrictSurveillance } from "../types";

interface NewAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  districts: DistrictSurveillance[];
  onAddAlert: (newAlert: {
    district: string;
    syndrome: string;
    caseCount: number;
    multiplier: number;
    notes: string;
  }) => void;
}

export const NewAlertModal: React.FC<NewAlertModalProps> = ({
  isOpen,
  onClose,
  districts,
  onAddAlert,
}) => {
  const [district, setDistrict] = useState(
    districts[0]?.name || "Mumbai Suburban",
  );
  const [syndrome, setSyndrome] = useState("Acute Febrile Illness (AFI)");
  const [caseCount, setCaseCount] = useState(45);
  const [multiplier, setMultiplier] = useState(2.2);
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAlert({
      district,
      syndrome,
      caseCount,
      multiplier,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className="bg-surface-card rounded-[20px] max-w-md w-full p-5 border border-border-subtle shadow-serene-elevated space-y-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2.5 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-status-alert-tint border border-status-alert-border flex items-center justify-center text-status-alert">
              <Plus className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-primary tracking-tight">
                Log Sentinel Outbreak Signal
              </h3>
              <p className="text-[11px] text-secondary/80">
                Manual epidemiological ingest into surveillance pipeline
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-secondary/70 hover:text-primary p-1 rounded-md hover:bg-surface-container-low transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-[12px]">
          <div>
            <label className="block text-[11px] ui-label-caps text-secondary/80 mb-1">
              Target District
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full h-[32px] px-2.5 rounded-lg bg-surface-container-low border border-border-subtle text-primary text-[12px] font-medium focus:outline-none focus:border-primary cursor-pointer"
            >
              {districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name} ({d.division} Division)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] ui-label-caps text-secondary/80 mb-1">
              Syndrome Category
            </label>
            <select
              value={syndrome}
              onChange={(e) => setSyndrome(e.target.value)}
              className="w-full h-[32px] px-2.5 rounded-lg bg-surface-container-low border border-border-subtle text-primary text-[12px] font-medium focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="Acute Febrile Illness (AFI)">
                Acute Febrile Illness (AFI)
              </option>
              <option value="Acute Diarrheal Disease (ADD)">
                Acute Diarrheal Disease (ADD)
              </option>
              <option value="Respiratory Tract Anomaly">
                Respiratory Tract Anomaly
              </option>
              <option value="Dengue-Like Illness (DLI)">
                Dengue-Like Illness (DLI)
              </option>
              <option value="Leptospirosis Cluster">
                Leptospirosis Post-Rain Cluster
              </option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] ui-label-caps text-secondary/80 mb-1">
                Reported Cases (24h)
              </label>
              <input
                type="number"
                min="1"
                value={caseCount}
                onChange={(e) => setCaseCount(parseInt(e.target.value) || 0)}
                className="w-full h-[32px] px-2.5 rounded-lg bg-surface-container-low border border-border-subtle text-primary font-mono tabular-nums text-[12px] font-medium focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] ui-label-caps text-secondary/80 mb-1">
                Estimated Ceiling Multiple
              </label>
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="10.0"
                value={multiplier}
                onChange={(e) =>
                  setMultiplier(parseFloat(e.target.value) || 1.0)
                }
                className="w-full h-[32px] px-2.5 rounded-lg bg-surface-container-low border border-border-subtle text-primary font-mono tabular-nums text-[12px] font-medium focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] ui-label-caps text-secondary/80 mb-1">
              Clinical Context / Sentinel Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Cluster observed at primary health center dispensaries following heavy local showers..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 rounded-lg bg-surface-container-low border border-border-subtle text-primary text-[12px] placeholder:text-secondary/50 focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="pt-2 border-t border-border-subtle flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-[32px] px-3.5 rounded-lg text-[12px] font-medium text-secondary/80 hover:text-primary hover:bg-surface-container-low transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[32px] px-4 rounded-lg bg-primary text-on-primary text-[12px] font-semibold hover:bg-black transition-all active:scale-[0.98] shadow-sm"
            >
              Ingest Into Surveillance Queue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
