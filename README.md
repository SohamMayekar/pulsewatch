# PulseWatch 🛡️
**Early Outbreak Detection & Clinical Intelligence Platform**

> Developed for **CodeAstra 2.0** by **Team Syntory**

## 👥 Team Syntory
- **Soham Mayekar** — Team Lead
- **Devesh Kushe** — Team Member
- **Rudraksha Patil** — Team Member
- **Manya Taleshra** — Team Member

---

## 📖 Overview
PulseWatch is a decision-support and early-warning layer for local public-health surveillance. It combines signals that are usually scattered across different sources—clinic counts, public news, search trends, and weather—to identify unusual patterns sooner than traditional weekly reporting workflows.

**Collect → Detect → Explain → Alert → Improve**

## 🎯 The Problem
- **Fragmented Information:** Clinics, labs, and news sources operate in separate systems.
- **Delayed Official Reports:** Weekly reporting rhythms often fail to reveal fast-moving local clusters.
- **Unexplained Alerts:** Traditional dashboards often provide arbitrary numbers without explaining *why* they matter or what triggered them.

## 💡 Our Solution
PulseWatch brings multiple telemetry sources into a unified pipeline, scores district-level signals daily, and provides clear, human-readable explanations alongside every alert.

- **Multi-Signal Detection:** Sentinel clinic counts, localized news NLP, search velocity, and meteorological grid data.
- **Explainable Alerts:** Plain-language reasons for warnings with corroborating evidence and confidence scores.
- **Human-in-the-Loop:** Health officers review anomalies and add field notes before public advisories are released.
- **Privacy by Design:** DPDPA 2023 compliant, utilizing exclusively aggregated district-level counts ($k \ge 50$) with zero PII exposure.

## 🚀 Technical Architecture
- **Client & Dashboard:** React, Vite, Tailwind CSS, Lucide Icons, MapLibre GL
- **Data Ingestion & Pipeline (Proposed):** Python, FastAPI, Celery
- **Intelligence & NLP (Proposed):** scikit-learn, statsmodels, spaCy
- **Storage & Infrastructure (Proposed):** PostgreSQL, PostGIS, Redis, Docker

## 💻 Getting Started
To run the PulseWatch dashboard locally:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the platform at `http://localhost:3001`
