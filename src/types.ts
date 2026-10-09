export type ViewTab = 'overview' | 'alerts' | 'map' | 'signals' | 'reports';

export type StatusLevel = 'alert' | 'watch' | 'normal';

export interface DistrictSurveillance {
  id: string;
  name: string;
  marathiName: string;
  division: string;
  population: string;
  status: StatusLevel;
  signalSummary: string;
  multiplier: number;
  clinicCount: number;
  clinicChange: string;
  searchVelocity: string;
  rainfallMm: number;
  confidenceScore: number;
  activeAlertId: string | null;
  historySparkline: number[];
  coordinates: { x: number; y: number };
}

export interface FarringtonDayPoint {
  day: string;
  date: string;
  observed: number;
  baselineCeiling: number;
  lowerBand: number;
  upperBand: number;
}

export interface DirectiveItem {
  id: string;
  title: string;
  department: string;
  status: 'dispatched' | 'pending' | 'completed';
  eta: string;
  detail: string;
}

export interface AlertEvidence {
  opdVisits: { count: number; changePct: number; clinicsReporting: number; totalClinics: number };
  searchVelocity: { query: string; velocityPct: number; searchVolumeIndex: number };
  precipitation: { mmAccumulated: number; riskDelta: string; stagnationScore: number };
  otcAntipyretic: { salesSurgePct: number; pharmacyNetworkUnits: number; topMolecule: string };
}

export interface AlertDossierType {
  id: string;
  district: string;
  syndrome: string;
  severity: 'Priority 1 (Critical)' | 'Priority 2 (Elevated)' | 'Priority 3 (Monitoring)';
  stage: 'Stage 1: Triaged' | 'Stage 2: Dispatched' | 'Stage 3: Resolved';
  multiplier: string;
  plainLanguageReason: string;
  confidenceScore: number;
  anomalyThreshold: number;
  detectedAt: string;
  jurisdiction: string;
  officerAssigned: string;
  evidence: AlertEvidence;
  farringtonTimeline: FarringtonDayPoint[];
  directives: DirectiveItem[];
}

export interface IngestionFeed {
  id: string;
  name: string;
  category: 'Clinical' | 'Digital' | 'Meteorological' | 'Official' | 'Commercial' | 'Global';
  provider: string;
  status: 'Healthy' | 'Syncing' | 'Degraded';
  lastPing: string;
  recordRate: string;
  privacySpec: string;
  endpoint: string;
  description: string;
  samplePayload: Record<string, any>;
}

export interface OfficerNote {
  id: string;
  author: string;
  role: string;
  officerId: string;
  timestamp: string;
  content: string;
  actionTaken?: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'info' | 'alert' | 'success';
}
