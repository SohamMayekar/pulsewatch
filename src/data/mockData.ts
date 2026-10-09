import { AlertDossierType, DistrictSurveillance, IngestionFeed, OfficerNote } from '../types';

export const INITIAL_ALERT_DOSSIER: AlertDossierType = {
  id: 'PW-2026-1042',
  district: 'Mumbai Suburban',
  syndrome: 'Acute Febrile Illness / Dengue Cluster',
  severity: 'Priority 1 (Critical)',
  stage: 'Stage 1: Triaged',
  multiplier: '3.0×',
  plainLanguageReason:
    'Syndromic fever presentations exceeded 3× Farrington baseline ceiling across 14 peripheral clinics. Corroborated by search velocity (+42%) and OTC pharmacy antipyretics (+88%) following 68mm rainfall.',
  confidenceScore: 94.8,
  anomalyThreshold: 2.8,
  detectedAt: 'Today, 06:15 IST (Farrington V3 Daily Batch)',
  jurisdiction: 'Mumbai Suburban (Wards L, M-West, N, S)',
  officerAssigned: 'Dr. Ananya Shah (DHO ID: MH-DHO-0842)',
  evidence: {
    opdVisits: {
      count: 142,
      changePct: 195.8,
      clinicsReporting: 14,
      totalClinics: 14
    },
    searchVelocity: {
      query: 'fever paracetamol dosage pediatric',
      velocityPct: 42.4,
      searchVolumeIndex: 86
    },
    precipitation: {
      mmAccumulated: 68.4,
      riskDelta: '+34mm vs historical Oct norm',
      stagnationScore: 0.82
    },
    otcAntipyretic: {
      salesSurgePct: 88.5,
      pharmacyNetworkUnits: 118,
      topMolecule: 'Paracetamol 650mg / Mefenamic Acid'
    }
  },
  farringtonTimeline: [
    { day: 'Day 1', date: '03 Oct', observed: 42, baselineCeiling: 48, lowerBand: 32, upperBand: 52 },
    { day: 'Day 2', date: '04 Oct', observed: 46, baselineCeiling: 47, lowerBand: 31, upperBand: 51 },
    { day: 'Day 3', date: '05 Oct', observed: 51, baselineCeiling: 49, lowerBand: 33, upperBand: 53 },
    { day: 'Day 4', date: '06 Oct', observed: 69, baselineCeiling: 48, lowerBand: 32, upperBand: 54 },
    { day: 'Day 5', date: '07 Oct', observed: 98, baselineCeiling: 48, lowerBand: 32, upperBand: 55 },
    { day: 'Day 6', date: '08 Oct', observed: 124, baselineCeiling: 47, lowerBand: 31, upperBand: 55 },
    { day: 'Day 7', date: 'Today', observed: 142, baselineCeiling: 48, lowerBand: 32, upperBand: 56 }
  ],
  directives: [
    {
      id: 'DIR-01',
      title: 'Mobilize ASHA Community Health Workers for Larval Inspections',
      department: 'Vector Control & Community Health Cell',
      status: 'pending',
      eta: 'Immediate (within 4h)',
      detail: 'Deploy 45 ASHA pairs across Kurla, Ghatkopar, and Chembur for breeding site abating. Dispatches operational directives to peripheral public health units.'
    },
    {
      id: 'DIR-02',
      title: 'Pre-position 5,000 NS1 Antigen & IgM/IgG Rapid Diagnostic Kits',
      department: 'Medical Stores & Logistics Depot',
      status: 'pending',
      eta: 'T+6 Hours',
      detail: 'Reallocate buffer inventory to 14 sentinel peripheral dispensaries in Wards L and M.'
    },
    {
      id: 'DIR-03',
      title: 'Issue Clinical Advisory to Indian Medical Association (Local Chapter)',
      department: 'Epidemiology Surveillance Wing',
      status: 'pending',
      eta: 'T+12 Hours',
      detail: 'Remind general practitioners on platelet monitoring protocols and early hydration therapy.'
    },
    {
      id: 'DIR-04',
      title: 'Provision 60 Supplemental Pediatric Observation Beds at Rajawadi Hospital',
      department: 'Tertiary Hospital Administration',
      status: 'pending',
      eta: 'T+24 Hours',
      detail: 'Convert reserve step-down ward into dedicated acute febrile monitoring cluster.'
    }
  ]
};

export const MAHARASHTRA_DISTRICTS: DistrictSurveillance[] = [
  {
    id: 'mumbai-suburban',
    name: 'Mumbai Suburban',
    marathiName: 'मुंबई उपनगर',
    division: 'Konkan',
    population: '9.35M',
    status: 'alert',
    signalSummary: 'Syndromic fever presentations exceeded 3× Farrington baseline ceiling across 14 peripheral clinics. Corroborated by search velocity (+42%) and OTC pharmacy antipyretics (+88%) following 68mm rainfall.',
    multiplier: 3.0,
    clinicCount: 142,
    clinicChange: '+195%',
    searchVelocity: '+42% query velocity',
    rainfallMm: 68.4,
    confidenceScore: 94.8,
    activeAlertId: 'PW-2026-1042',
    historySparkline: [42, 46, 51, 69, 98, 124, 142],
    coordinates: { x: 156, y: 250 }
  },
  {
    id: 'thane',
    name: 'Thane',
    marathiName: 'ठाणे',
    division: 'Konkan',
    population: '11.06M',
    status: 'watch',
    signalSummary: 'Moderate syndromic fever surge in municipal OPDs with OTC antipyretic sales uptake. Converging toward watch threshold.',
    multiplier: 1.8,
    clinicCount: 64,
    clinicChange: '+45%',
    searchVelocity: '+38% velocity',
    rainfallMm: 42.1,
    confidenceScore: 88.2,
    activeAlertId: 'PW-2026-1044',
    historySparkline: [32, 34, 38, 41, 48, 56, 64],
    coordinates: { x: 192, y: 240 }
  },
  {
    id: 'nashik',
    name: 'Nashik',
    marathiName: 'नाशिक',
    division: 'Nashik',
    population: '6.10M',
    status: 'watch',
    signalSummary: 'High localized rainfall accumulation with early fever notices from rural PHCs',
    multiplier: 1.6,
    clinicCount: 38,
    clinicChange: '+25%',
    searchVelocity: '+18% velocity',
    rainfallMm: 74.2,
    confidenceScore: 84.6,
    activeAlertId: 'PW-2026-1045',
    historySparkline: [22, 24, 25, 27, 30, 34, 38],
    coordinates: { x: 248, y: 188 }
  },
  {
    id: 'palghar',
    name: 'Palghar',
    marathiName: 'पालघर',
    division: 'Konkan',
    population: '3.00M',
    status: 'watch',
    signalSummary: 'Tribal block syndromic surveillance reporting slight diarrhea/fever elevation',
    multiplier: 1.4,
    clinicCount: 29,
    clinicChange: '+22%',
    searchVelocity: '+12% velocity',
    rainfallMm: 58.0,
    confidenceScore: 81.3,
    activeAlertId: 'PW-2026-1048',
    historySparkline: [18, 19, 20, 22, 24, 26, 29],
    coordinates: { x: 170, y: 180 }
  },
  {
    id: 'pune',
    name: 'Pune',
    marathiName: 'पुणे',
    division: 'Pune',
    population: '9.43M',
    status: 'normal',
    signalSummary: 'All 84 sentinel health centers reporting within Farrington 95% historical confidence interval',
    multiplier: 1.0,
    clinicCount: 42,
    clinicChange: '-2%',
    searchVelocity: 'Normal seasonal baseline',
    rainfallMm: 12.0,
    confidenceScore: 97.4,
    activeAlertId: null,
    historySparkline: [44, 43, 45, 41, 42, 43, 42],
    coordinates: { x: 255, y: 310 }
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    marathiName: 'नागपूर',
    division: 'Nagpur',
    population: '4.65M',
    status: 'normal',
    signalSummary: 'Vidarbha regional surveillance stable. Clinical presentations within expected baseline',
    multiplier: 0.9,
    clinicCount: 24,
    clinicChange: '-6%',
    searchVelocity: 'Stable baseline velocity',
    rainfallMm: 4.5,
    confidenceScore: 98.1,
    activeAlertId: null,
    historySparkline: [27, 26, 25, 25, 24, 25, 24],
    coordinates: { x: 630, y: 150 }
  },
  {
    id: 'chhatrapati-sambhajinagar',
    name: 'Chhatrapati Sambhajinagar',
    marathiName: 'छत्रपती संभाजीनगर',
    division: 'Marathwada',
    population: '3.70M',
    status: 'normal',
    signalSummary: 'Marathwada dry corridor. Zero abnormal viral clusters detected in 48h ingestion stream',
    multiplier: 0.95,
    clinicCount: 21,
    clinicChange: '+1%',
    searchVelocity: 'Nominal velocity',
    rainfallMm: 8.2,
    confidenceScore: 96.8,
    activeAlertId: null,
    historySparkline: [20, 21, 22, 20, 21, 20, 21],
    coordinates: { x: 380, y: 240 }
  },
  {
    id: 'kolhapur',
    name: 'Kolhapur',
    marathiName: 'कोल्हापूर',
    division: 'Pune',
    population: '3.87M',
    status: 'normal',
    signalSummary: 'Panchganga river basin surveillance active. Waterborne indices within sanitary norms',
    multiplier: 1.05,
    clinicCount: 19,
    clinicChange: '+3%',
    searchVelocity: 'Expected seasonal index',
    rainfallMm: 18.5,
    confidenceScore: 96.2,
    activeAlertId: null,
    historySparkline: [18, 18, 17, 19, 18, 19, 19],
    coordinates: { x: 240, y: 440 }
  },
  {
    id: 'amravati',
    name: 'Amravati',
    marathiName: 'अमरावती',
    division: 'Amravati',
    population: '2.89M',
    status: 'normal',
    signalSummary: 'District hospitals report nominal OPD volumes. No vector surge flags',
    multiplier: 0.92,
    clinicCount: 16,
    clinicChange: '-4%',
    searchVelocity: 'Stable baseline',
    rainfallMm: 6.0,
    confidenceScore: 97.5,
    activeAlertId: null,
    historySparkline: [18, 17, 16, 17, 16, 16, 16],
    coordinates: { x: 500, y: 158 }
  },
  {
    id: 'jalgaon',
    name: 'Jalgaon',
    marathiName: 'जळगाव',
    division: 'Nashik',
    population: '4.23M',
    status: 'normal',
    signalSummary: 'Tapi valley sentinel units report zero excess syndromes above statistical ceiling (σ = 2.0)',
    multiplier: 0.98,
    clinicCount: 22,
    clinicChange: '+0%',
    searchVelocity: 'Baseline range',
    rainfallMm: 14.1,
    confidenceScore: 96.9,
    activeAlertId: null,
    historySparkline: [21, 22, 23, 21, 22, 22, 22],
    coordinates: { x: 360, y: 162 }
  },
  {
    id: 'solapur',
    name: 'Solapur',
    marathiName: 'सोलापूर',
    division: 'Pune',
    population: '4.32M',
    status: 'normal',
    signalSummary: 'Southern border belt syndromic records clear of anomalies',
    multiplier: 0.94,
    clinicCount: 18,
    clinicChange: '-2%',
    searchVelocity: 'Baseline range',
    rainfallMm: 5.2,
    confidenceScore: 97.2,
    activeAlertId: null,
    historySparkline: [19, 18, 19, 18, 18, 18, 18],
    coordinates: { x: 330, y: 390 }
  },
  {
    id: 'nanded',
    name: 'Nanded',
    marathiName: 'नांदेड',
    division: 'Marathwada',
    population: '3.36M',
    status: 'normal',
    signalSummary: 'Godavari belt surveillance data normal. 100% clinic sync integrity',
    multiplier: 1.01,
    clinicCount: 15,
    clinicChange: '+1%',
    searchVelocity: 'Baseline range',
    rainfallMm: 9.8,
    confidenceScore: 96.5,
    activeAlertId: null,
    historySparkline: [14, 15, 14, 15, 15, 15, 15],
    coordinates: { x: 470, y: 290 }
  }
];

export const INGESTION_FEEDS: IngestionFeed[] = [
  {
    id: 'feed-opd',
    name: 'Municipal & Sentinel Dispensary OPD Feed',
    category: 'Clinical',
    provider: 'BMC Public Health Dept & DHS Maharashtra',
    status: 'Healthy',
    lastPing: '2 mins ago',
    recordRate: '284 records/hour',
    privacySpec: 'Zero PII · Aggregated Ward & District Counts Only',
    endpoint: 'https://api.dhs.mh.gov.in/v2/sentinel-syndromic',
    description: 'Daily electronic outpatient register counts for fever, cough, rash, and acute watery diarrhea across 1,840 government and municipal clinics.',
    samplePayload: {
      timestamp: '2026-10-09T09:28:14Z',
      jurisdiction_code: 'MH-27-MUM',
      reporting_clinics: 14,
      syndrome_category: 'acute_febrile_illness',
      cases_reported: 142,
      anonymization_standard: 'DPDPA_2023_COMPLIANT'
    }
  },
  {
    id: 'feed-trends',
    name: 'Google Health Trends Velocity API',
    category: 'Digital',
    provider: 'Google Health Trends (Research Partner API)',
    status: 'Healthy',
    lastPing: '6 mins ago',
    recordRate: '36 district signals/day',
    privacySpec: 'Normalized Query Volume (No IP or User Identifiers)',
    endpoint: 'https://healthtrends.googleapis.com/v1/signals:query',
    description: 'Rolling 7-day velocity of high-correlation vernacular symptom queries (English, Marathi, Hindi) per 100k population.',
    samplePayload: {
      timestamp: '2026-10-09T09:24:00Z',
      geo: 'IN-MH-MUM',
      query_cluster: ['tap', 'dengue symptoms', 'paracetamol dose'],
      z_score: 2.84,
      relative_velocity_pct: 42.4
    }
  },
  {
    id: 'feed-meteo',
    name: 'Open-Meteo High-Resolution Hydrology & Weather',
    category: 'Meteorological',
    provider: 'Open-Meteo ECMWF / ERA5 Reanalysis',
    status: 'Healthy',
    lastPing: '12 mins ago',
    recordRate: 'Hourly Grid Updates',
    privacySpec: 'Open Environmental Geospatial Telemetry',
    endpoint: 'https://api.open-meteo.com/v1/forecast?latitude=19.07&longitude=72.87',
    description: 'Precipitation accumulation, relative humidity >85%, and vector larval habitat stagnation index.',
    samplePayload: {
      latitude: 19.076,
      longitude: 72.877,
      precipitation_accumulation_72h_mm: 68.4,
      humidity_mean_pct: 88.2,
      vector_stagnation_index: 0.82
    }
  },
  {
    id: 'feed-idsp',
    name: 'IDSP Form S/P Weekly Outbreak Feed',
    category: 'Official',
    provider: 'Integrated Disease Surveillance Programme (NCDC / MoHFW)',
    status: 'Healthy',
    lastPing: '1 hour ago',
    recordRate: 'Weekly Synthesized / Daily Rapid Form S',
    privacySpec: 'District Administrative Statistical Units Only',
    endpoint: 'https://idsp.nic.in/api/v1/outbreak-bulletins',
    description: 'Official national surveillance baseline ceiling and laboratory-verified pathogen culture records.',
    samplePayload: {
      week: 41,
      year: 2026,
      state: 'Maharashtra',
      verified_clusters: 2,
      historical_5yr_median_fever: 48
    }
  },
  {
    id: 'feed-otc',
    name: 'Chemist Retail Network OTC Antipyretic Sales Index',
    category: 'Commercial',
    provider: 'Maharashtra Retail Chemists & Druggists Surveillance',
    status: 'Healthy',
    lastPing: '18 mins ago',
    recordRate: 'Daily Consolidated Batches',
    privacySpec: 'Aggregated SKU Units by Postal Sub-Division',
    endpoint: 'https://surveillance.mrcda.org/telemetry/v1/index',
    description: 'Antipyretic (paracetamol, ibuprofen, mefenamic acid) and oral rehydration salt velocity across 4,200 member pharmacies.',
    samplePayload: {
      district: 'Mumbai Suburban',
      reporting_stores: 118,
      antipyretic_sales_surge_pct: 88.5,
      ors_sales_surge_pct: 34.2
    }
  },
  {
    id: 'feed-who',
    name: 'WHO Disease Outbreak News (DON & EIOS)',
    category: 'Global',
    provider: 'World Health Organization Epidemic Intelligence',
    status: 'Healthy',
    lastPing: '25 mins ago',
    recordRate: 'Continuous Event Stream',
    privacySpec: 'Global Public Health Bulletins',
    endpoint: 'https://www.who.int/emergencies/disease-outbreak-news/rss.xml',
    description: 'International pathogen alerts, cross-border arbovirus transmissions, and global diagnostic directives.',
    samplePayload: {
      source: 'WHO_DON_ALERT',
      region: 'SEARO',
      event: 'Arboviral Surge Assessment Monsoon 2026',
      advisory_level: 'STANDARD_VIGILANCE'
    }
  }
];

export const INITIAL_OFFICER_NOTES: OfficerNote[] = [
  {
    id: 'NOTE-01',
    author: 'Dr. Ananya Shah',
    role: 'District Health Officer',
    officerId: 'MH-DHO-0842',
    timestamp: 'Today, 07:10 IST',
    content:
      'Reviewed Farrington V3 ceiling breach (142 cases vs ceiling 48). Corroborated with Ward L Medical Officer regarding Kurla West fever presentations. Initiating pre-positioning of NS1 rapid kits.',
    actionTaken: 'Flagged for Human Verification'
  },
  {
    id: 'NOTE-02',
    author: 'Dr. R. K. Sawant',
    role: 'State Epidemiologist (DGHS Pune)',
    officerId: 'MH-EPI-0104',
    timestamp: 'Yesterday, 18:40 IST',
    content:
      'High rainfall in coastal Thane and Mumbai Suburban creating potential stagnant pools. Advised local DHOs to tighten Farrington sensitivity threshold from 3.0σ to 2.8σ.',
    actionTaken: 'Threshold Tuned to σ = 2.80'
  }
];
