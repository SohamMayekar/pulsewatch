import React from "react";
import { CheckCircle2, ShieldCheck, User, X } from "lucide-react";

interface OfficerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficerModal: React.FC<OfficerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className="bg-surface-card rounded-[20px] max-w-sm w-full p-5 border border-border-subtle shadow-serene-elevated space-y-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <div className="w-11 h-11 rounded-xl bg-surface-container border border-border-subtle flex items-center justify-center text-primary text-[16px] font-bold shadow-sm">
            AS
          </div>
          <button
            onClick={onClose}
            className="text-secondary/70 hover:text-primary p-1 rounded-md hover:bg-surface-container-low transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h3 className="text-[15px] font-bold text-primary tracking-tight">
            Dr. Ananya Shah
          </h3>
          <p className="text-[11px] text-secondary/80">
            District Health Officer (DHO) · Public Health Operations
          </p>
          <span className="inline-flex items-center gap-1.5 text-[10px] ui-label-caps text-status-normal-text font-medium mt-1.5 px-2 py-0.5 rounded-md bg-status-normal-tint border border-status-normal-border">
            <ShieldCheck className="w-3 h-3 text-status-normal" />
            <span>Credentials Verified · ID: MH-DHO-0842</span>
          </span>
        </div>

        <div className="p-3 rounded-lg bg-surface-container-low border border-border-subtle text-[11px] text-secondary space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-secondary/70 ui-label-caps text-[10px]">
              Jurisdiction
            </span>
            <span className="font-medium text-primary">
              Mumbai Suburban (Wards A–T)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary/70 ui-label-caps text-[10px]">
              Clearance Level
            </span>
            <span className="font-medium text-primary">
              Level 4 (State Health Authority)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary/70 ui-label-caps text-[10px]">
              Surveillance Role
            </span>
            <span className="font-medium text-primary">
              Human-in-the-Loop Signoff
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary/70 ui-label-caps text-[10px]">
              Last Signoff
            </span>
            <span className="font-mono text-primary font-medium tabular-nums text-[11px]">
              Today, 07:10 IST (PW-2026-1042)
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-[32px] bg-primary text-on-primary rounded-lg text-[12px] font-semibold hover:bg-black transition-all active:scale-[0.98]"
        >
          Close Officer Profile
        </button>
      </div>
    </div>
  );
};
