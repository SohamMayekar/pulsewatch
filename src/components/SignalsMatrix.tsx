import React, { useState } from "react";
import {
  Activity,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code2,
  Database,
  Globe2,
  Lock,
  Radio,
  Server,
  ShieldCheck,
} from "lucide-react";
import { IngestionFeed } from "../types";

interface SignalsMatrixProps {
  feeds: IngestionFeed[];
  onToast: (message: string, type: "info" | "alert" | "success") => void;
}

export const SignalsMatrix: React.FC<SignalsMatrixProps> = ({
  feeds,
  onToast,
}) => {
  const [expandedFeedId, setExpandedFeedId] = useState<string | null>(
    "feed-opd",
  );

  const toggleFeed = (id: string) => {
    setExpandedFeedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 custom-scroll bg-[#F4F5F7]">
      {/* Privacy-by-Design Banner */}
      <div className="bg-surface-card rounded-[16px] border border-status-normal-border p-3.5 sm:p-4 shadow-serene-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-status-normal-tint border border-status-normal-border flex items-center justify-center text-status-normal shrink-0">
            <Lock className="w-4.5 h-4.5 text-status-normal" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-bold text-primary">
                Privacy-by-Design & Governance Architecture
              </h3>
              <span className="pill-green">DPDPA 2023 compliant</span>
            </div>
            <p className="text-[12px] text-secondary mt-0.5">
              DPDPA 2023 Compliant · Aggregated District Counts Only (k ≥ 50) ·
              Zero PII stored, processed, or queried across any pipeline.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-[11px] text-secondary font-medium">
              Encryption protocol
            </div>
            <div className="text-[12px] font-bold text-primary font-sans tabular-nums">
              TLS 1.3 / AES-256-GCM
            </div>
          </div>
          <div className="w-px h-7 bg-border-subtle" />
          <div className="text-right">
            <div className="text-[11px] text-secondary font-medium">
              PII exposure rate
            </div>
            <div className="text-[12px] font-bold text-status-normal-text font-sans tabular-nums">
              0.00% (Strict)
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline High-Level Health Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-surface-card p-4 rounded-[18px] border border-border-subtle shadow-inspo-card">
          <span className="text-[12px] font-medium text-secondary">
            Active pipelines
          </span>
          <div className="text-[22px] font-bold text-primary font-sans tabular-nums mt-1 leading-none">
            6 / 6 Streams Live
          </div>
          <div className="text-[11px] text-status-normal-text flex items-center gap-1 mt-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Zero degraded connections</span>
          </div>
        </div>

        <div className="bg-surface-card p-4 rounded-[18px] border border-border-subtle shadow-inspo-card">
          <span className="text-[12px] font-medium text-secondary">
            Ingestion throughput
          </span>
          <div className="text-[22px] font-bold text-primary font-sans tabular-nums mt-1 leading-none">
            1,480 pts / 24h
          </div>
          <div className="text-[11px] text-secondary mt-1">
            Mean latency:{" "}
            <strong className="text-primary font-semibold tabular-nums">
              84ms
            </strong>
          </div>
        </div>

        <div className="bg-surface-card p-4 rounded-[18px] border border-border-subtle shadow-inspo-card">
          <span className="text-[12px] font-medium text-secondary">
            Surveillance cycle
          </span>
          <div className="text-[22px] font-bold text-primary font-sans mt-1 leading-none">
            Daily Farrington Batch
          </div>
          <div className="text-[11px] text-secondary mt-1">
            Next scheduled scoring:{" "}
            <strong className="text-primary font-semibold tabular-nums">
              18:00 IST
            </strong>
          </div>
        </div>
      </div>

      {/* 6 Ingestion Feeds Matrix */}
      <div className="bg-surface-card rounded-[16px] border border-border-subtle p-3.5 sm:p-4.5 shadow-serene-card flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-border-subtle">
          <div>
            <h2 className="text-[14px] font-bold text-primary tracking-tight">
              Telemetry Ingestion Pipelines & Feed Health
            </h2>
            <p className="text-[11px] text-secondary/80 mt-0.5">
              Multi-source data ingestion specification and live API health
              telemetry
            </p>
          </div>
          <button
            onClick={() =>
              onToast(
                "All 6 telemetry pipelines pinged successfully.",
                "success",
              )
            }
            className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-[11px] font-medium transition-colors active:scale-[0.98]"
          >
            Ping All Endpoints
          </button>
        </div>

        <div className="space-y-2">
          {feeds.map((feed) => {
            const isExpanded = expandedFeedId === feed.id;

            return (
              <div
                key={feed.id}
                className="rounded-xl border border-border-subtle bg-surface-card overflow-hidden transition-all shadow-serene-sm"
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleFeed(feed.id)}
                  className="p-3 flex flex-col md:flex-row md:items-center justify-between gap-2.5 cursor-pointer hover:bg-surface-container-low/70 transition-colors"
                >
                  <div className="flex items-start md:items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                      <Server className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[12px] text-primary">
                          {feed.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#F1F3F6] text-secondary text-[11px] font-medium">
                          {feed.category}
                        </span>
                        <span className="pill-green">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          {feed.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-secondary mt-0.5">
                        Provider: {feed.provider} · Last sync:{" "}
                        <span className="tabular-nums font-semibold">
                          {feed.lastPing}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 text-[11px] self-end md:self-auto">
                    <div className="text-right hidden sm:block">
                      <div className="text-secondary text-[10px] font-medium">
                        Rate
                      </div>
                      <div className="font-semibold text-primary tabular-nums font-sans">
                        {feed.recordRate}
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-secondary" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-secondary" />
                    )}
                  </div>
                </div>

                {/* Expanded Inspection Drawer (Anti-Slop: Flattened Key-Value List) */}
                {isExpanded && (
                  <div className="p-3.5 bg-[#F8F9FB] border-t border-border-subtle space-y-2.5">
                    <p className="text-[12px] text-secondary leading-relaxed">
                      {feed.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-white border border-border-subtle">
                        <span className="text-[10px] text-secondary font-semibold">
                          Ingestion endpoint
                        </span>
                        <div className="text-primary truncate mt-0.5 select-all font-mono">
                          {feed.endpoint}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-border-subtle">
                        <span className="text-[10px] text-secondary font-semibold">
                          Privacy specification
                        </span>
                        <div className="text-status-normal-text font-semibold truncate mt-0.5">
                          {feed.privacySpec}
                        </div>
                      </div>
                    </div>

                    {/* Sample JSON Payload */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-semibold text-secondary flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5" />
                          <span>Sample telemetry payload (aggregated)</span>
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              JSON.stringify(feed.samplePayload, null, 2),
                            );
                            onToast("Payload copied to clipboard.", "info");
                          }}
                          className="text-[9px] text-secondary hover:text-primary font-mono active:scale-[0.98]"
                        >
                          Copy JSON
                        </button>
                      </div>

                      <pre className="p-2.5 rounded-lg bg-surface-card border border-border-subtle text-[10px] font-mono text-primary overflow-x-auto custom-scroll leading-relaxed tabular-nums">
                        {JSON.stringify(feed.samplePayload, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
