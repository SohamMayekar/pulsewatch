/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "canvas-outer": "#F0F2F5",
        "frame-inner": "#F8F9FA",
        "surface-card": "#FFFFFF",
        "surface": "#F4F5F7",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F8F9FB",
        "surface-container": "#F1F3F6",
        "surface-container-high": "#E5E7EB",
        "surface-container-highest": "#D1D5DB",
        "surface-dim": "#D1D5DB",
        "border-subtle": "#EDEFF2",
        "border-muted": "#E2E4E8",
        "primary": "#111827",
        "primary-container": "#111827",
        "on-primary": "#FFFFFF",
        "secondary": "#64748B",
        "secondary-container": "#E2E8F0",
        "status-alert": "#EF4444",
        "status-alert-text": "#E04F5F",
        "status-alert-tint": "#FDF0F2",
        "status-alert-border": "#FBD5DB",
        "status-watch": "#F59E0B",
        "status-watch-text": "#D97706",
        "status-watch-tint": "#FEF7EE",
        "status-watch-border": "#FDE3BE",
        "status-normal": "#10B981",
        "status-normal-text": "#1EB564",
        "status-normal-tint": "#EAF8F0",
        "status-normal-border": "#C7EED8",
        "chart-accent-blue": "#3B82F6",
        "chart-accent-purple": "#8B5CF6",
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          "Inter",
          "system-ui",
          "sans-serif"
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          "ui-monospace",
          "Menlo",
          "monospace"
        ],
      },
      boxShadow: {
        "serene-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        "serene-card": "0 1px 4px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.02)",
        "inspo-card": "0 2px 10px 0 rgba(0, 0, 0, 0.025)",
        "serene-elevated": "0 12px 28px -6px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
        "serene-alert": "0 2px 8px -1px rgba(239, 68, 68, 0.12)",
      },
      keyframes: {
        gentlePulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        beaconPulse: {
          '0%': { transform: 'scale(1)', opacity: '0.85' },
          '70%': { transform: 'scale(2.2)', opacity: '0' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        slideInUp: {
          'from': { transform: 'translateY(100%) scale(0.96)', opacity: '0' },
          'to': { transform: 'translateY(0) scale(1)', opacity: '1' },
        }
      },
      animation: {
        'gentle-pulse': 'gentlePulse 2.6s infinite ease-in-out',
        'beacon-pulse': 'beaconPulse 2.8s infinite cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-in': 'slideInUp 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
}
