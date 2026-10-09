import React, { useState } from "react";
import { Download, FileSpreadsheet, FileText, X } from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmExport: (format: "pdf" | "csv" | "json") => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onConfirmExport,
}) => {
  const [format, setFormat] = useState<"pdf" | "csv" | "json">("pdf");

  if (!isOpen) return null;

  const handleExport = () => {
    onConfirmExport(format);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-surface-card rounded-[20px] max-w-md w-full p-5 border border-border-subtle shadow-serene-elevated space-y-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2.5 border-b border-border-subtle">
          <div>
            <h3 className="text-[15px] font-bold text-primary tracking-tight">
              Export Epidemiological Dossier
            </h3>
            <p className="text-[11px] text-secondary/80 mt-0.5">
              Automated surveillance intelligence package
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-secondary/70 hover:text-primary p-1 rounded-md hover:bg-surface-container-low transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 text-[12px]">
          <label
            onClick={() => setFormat("pdf")}
            className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${
              format === "pdf"
                ? "border-primary bg-surface-container-low shadow-sm"
                : "border-border-subtle bg-surface-card hover:bg-surface-container-low"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-status-alert-tint border border-status-alert-border flex items-center justify-center text-status-alert shrink-0">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-[12px] text-primary">
                  Executive Summary Dossier (PDF)
                </div>
                <div className="text-[10px] text-secondary/80">
                  Formatted for District Magistrate & State DGHS review
                </div>
              </div>
            </div>
            <input
              type="radio"
              name="export-fmt"
              value="pdf"
              checked={format === "pdf"}
              onChange={() => setFormat("pdf")}
              className="text-primary focus:ring-0 w-3.5 h-3.5"
            />
          </label>

          <label
            onClick={() => setFormat("csv")}
            className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${
              format === "csv"
                ? "border-primary bg-surface-container-low shadow-sm"
                : "border-border-subtle bg-surface-card hover:bg-surface-container-low"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-status-watch-tint border border-status-watch-border flex items-center justify-center text-status-watch shrink-0">
                <FileSpreadsheet className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-[12px] text-primary">
                  Tabular Telemetry Dataset (CSV)
                </div>
                <div className="text-[10px] text-secondary/80">
                  36-district Farrington V3 weekly counts & sparklines
                </div>
              </div>
            </div>
            <input
              type="radio"
              name="export-fmt"
              value="csv"
              checked={format === "csv"}
              onChange={() => setFormat("csv")}
              className="text-primary focus:ring-0 w-3.5 h-3.5"
            />
          </label>

          <label
            onClick={() => setFormat("json")}
            className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${
              format === "json"
                ? "border-primary bg-surface-container-low shadow-sm"
                : "border-border-subtle bg-surface-card hover:bg-surface-container-low"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-surface-container border border-border-subtle flex items-center justify-center text-primary shrink-0">
                <Download className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-[12px] text-primary">
                  Raw Anonymized Telemetry (JSON)
                </div>
                <div className="text-[10px] text-secondary/80">
                  Complete multi-source schema with time-series
                </div>
              </div>
            </div>
            <input
              type="radio"
              name="export-fmt"
              value="json"
              checked={format === "json"}
              onChange={() => setFormat("json")}
              className="text-primary focus:ring-0 w-3.5 h-3.5"
            />
          </label>
        </div>

        <div className="pt-2.5 border-t border-border-subtle flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-[32px] px-3.5 rounded-lg text-[12px] font-medium text-secondary/80 hover:text-primary hover:bg-surface-container-low transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="h-[32px] px-4 rounded-lg bg-primary text-on-primary text-[12px] font-semibold hover:bg-black transition-all active:scale-[0.98] shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate & Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
