import React from "react";
import {
  CheckCircle,
  Download,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Printer,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface IntelligenceReportsProps {
  onOpenExportModal: () => void;
  onToast: (message: string, type: "info" | "alert" | "success") => void;
}

export const IntelligenceReports: React.FC<IntelligenceReportsProps> = ({
  onOpenExportModal,
  onToast,
}) => {
  const reports = [
    {
      id: "REP-2026-W41-MUM",
      title:
        "Weekly Epidemiological Synthesis: Mumbai Metropolitan Region (Week 41)",
      type: "Executive Dossier",
      date: "09 Oct 2026",
      author: "Dr. Ananya Shah (DHO)",
      status: "Officer Verified",
      summary:
        "Syndromic fever presentations in Mumbai Suburban reached 142 cases against baseline ceiling 48. NS1 testing ramped across 14 sentinel clinics. Corroborated with Google Trends and OTC chemist antipyretic sales.",
      fileSize: "1.8 MB (PDF)",
    },
    {
      id: "REP-2026-W41-STATE",
      title: "Maharashtra State Outbreak Surveillance Bulletin (IDSP Form S/P)",
      type: "Official Bulletin",
      date: "08 Oct 2026",
      author: "Directorate of Health Services, Pune",
      status: "Published",
      summary:
        "36 districts evaluated under Farrington V3 algorithm. Mumbai Suburban elevated to Priority 1; Thane and Nashik placed under active observation. Rest of state within normal seasonal limits.",
      fileSize: "3.4 MB (PDF)",
    },
    {
      id: "REP-2026-W40-SYNTH",
      title:
        "Post-Monsoon Vector-Borne Threat Assessment & Hydrological Review",
      type: "Technical Monograph",
      date: "02 Oct 2026",
      author: "State Vector Borne Disease Control Programme",
      summary:
        "Rainfall accumulation analysis across Western Ghats belt. High correlation observed between &gt;60mm precipitation events and subsequent 5-day fever presentations.",
      status: "Archived",
      fileSize: "2.1 MB (PDF)",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 custom-scroll bg-[#F4F5F7]">
      {/* Executive Summary Card */}
      <div className="bg-surface-card rounded-[16px] border border-border-subtle p-3.5 sm:p-4 shadow-serene-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] font-bold text-primary tracking-tight">
              Epidemiological Intelligence & Reports
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary text-[10px] font-semibold font-mono uppercase tracking-[0.05em] tabular-nums">
              Epi Week 41
            </span>
          </div>
          <p className="text-[11px] text-secondary/80 mt-0.5">
            Peer-reviewed syndromic intelligence dossiers, IDSP official
            submissions, and executive decision summaries
          </p>
        </div>

        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 h-[32px] px-3 rounded-lg bg-primary text-on-primary text-[11px] font-semibold hover:bg-black transition-all active:scale-[0.98] shadow-sm shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Generate Custom Dossier</span>
        </button>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 gap-3">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="bg-surface-card rounded-[16px] p-3.5 sm:p-4 border border-border-subtle shadow-serene-card flex flex-col gap-2.5 hover:border-border-muted transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-2.5">
              <div className="flex items-start sm:items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-[10px] font-semibold text-secondary tabular-nums">
                      {rep.id}
                    </span>
                    <span className="text-[9px] text-secondary font-mono">
                      •
                    </span>
                    <span className="text-[9px] uppercase font-bold text-secondary font-mono tracking-[0.06em]">
                      {rep.type}
                    </span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-status-normal-tint text-status-normal-text border border-status-normal-border text-[9px] font-semibold font-mono uppercase tracking-[0.05em]">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      {rep.status}
                    </span>
                  </div>
                  <h3 className="text-[14px] font-bold text-primary tracking-tight mt-0.5">
                    {rep.title}
                  </h3>
                </div>
              </div>

              <div className="text-right text-[10px] font-mono text-secondary self-end sm:self-auto tabular-nums">
                <div>Date: {rep.date}</div>
                <div className="text-secondary/70">{rep.author}</div>
              </div>
            </div>

            <p className="text-[11px] text-secondary/80 leading-relaxed">
              {rep.summary}
            </p>

            <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[10px]">
              <span className="font-mono text-secondary tabular-nums">
                Format: {rep.fileSize}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onToast(`Downloading ${rep.title}...`, "success")
                  }
                  className="flex items-center gap-1.5 h-[28px] px-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-semibold transition-colors active:scale-[0.98] text-[10px]"
                >
                  <Download className="w-3 h-3" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
