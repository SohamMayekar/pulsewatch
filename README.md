# PulseWatch

**Early Outbreak Detection & Clinical Intelligence Platform**

Developed for CodeAstra 2.0 by Team Syntory.

### Team Syntory
**Soham Mayekar** — Team Lead  
**Devesh Kushe** — Team Member  
**Rudraksha Patil** — Team Member  
**Manya Taleshra** — Team Member

---

## Overview

PulseWatch is a decision-support and early-warning layer for local public-health surveillance. It combines signals that are usually scattered across different sources—clinic counts, public news, search trends, and weather—to identify unusual patterns sooner than traditional weekly reporting workflows.

**Workflow Paradigm:** Collect → Detect → Explain → Alert → Improve

---

## Technical Stack

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![MapLibre](https://img.shields.io/badge/MapLibre-FF4747?style=flat-square)

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

---

## The Problem

* **Fragmented Information:** Clinics, laboratories, and news sources operate in isolated environments.
* **Delayed Official Reports:** Traditional weekly reporting rhythms fail to identify fast-moving local clusters.
* **Unexplained Alerts:** Existing dashboards provide arbitrary metrics without explaining the underlying reasoning.

---

## The Solution

PulseWatch introduces a unified telemetry pipeline that aggregates multiple sources, computes risk levels daily at the district level, and delivers human-readable explanations alongside every generated alert.

* **Multi-Signal Detection:** Integrates sentinel clinic counts, localized news natural language processing (NLP), search velocity, and meteorological grid data.
* **Explainable Alerts:** Translates anomalies into plain-language reasoning with corroborating evidence and confidence scores.
* **Human-in-the-Loop:** Health officers must review anomalies and append field notes before public advisories are authorized.
* **Privacy by Design:** Architected for DPDPA 2023 compliance, utilizing exclusively aggregated district-level counts with zero PII exposure.

---

## System Interfaces

### Executive Dashboard
The centralized operations center for observing real-time signal pipelines, active outbreak locations, and multi-stream confidence scores.

![Dashboard](Screenshots/Dashboard.png)

### Alert Dossier
A detailed investigative view for a specific alert, containing the Farrington statistical curve and contributing evidence.

![Alert Dossier](Screenshots/Alert.png)

### Geospatial Outbreak Map
A district-level mapping interface utilizing MapLibre to visually represent isolated geographic clusters.

![Outbreak Map](Screenshots/Map.png)

---

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/SohamMayekar/pulsewatch.git
   cd pulsewatch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the platform**  
   Navigate to `http://localhost:3001` in your browser.
