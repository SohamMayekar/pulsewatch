import React from "react";
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { ToastMessage } from "../types";

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const isAlert = toast.type === "alert";
        const isSuccess = toast.type === "success";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl shadow-serene-card border text-[12px] font-medium transition-all animate-toast-in ${
              isAlert
                ? "bg-status-alert-tint border-status-alert-border text-status-alert"
                : isSuccess
                  ? "bg-status-normal-tint border-status-normal-border text-status-normal"
                  : "bg-surface-card border-border-subtle text-primary"
            }`}
          >
            {isAlert ? (
              <AlertTriangle className="w-4 h-4 shrink-0 text-status-alert mt-0.5" />
            ) : isSuccess ? (
              <CheckCircle className="w-4 h-4 shrink-0 text-status-normal mt-0.5" />
            ) : (
              <Info className="w-4 h-4 shrink-0 text-secondary mt-0.5" />
            )}

            <div className="flex-1 leading-snug">{toast.message}</div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-secondary/60 hover:text-primary p-0.5 rounded transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
