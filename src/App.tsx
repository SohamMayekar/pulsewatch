import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewDashboard } from './components/OverviewDashboard';
import { AlertDossier } from './components/AlertDossier';
import { OutbreakMap } from './components/OutbreakMap';
import { SignalsMatrix } from './components/SignalsMatrix';
import { IntelligenceReports } from './components/IntelligenceReports';
import { ExportModal } from './components/ExportModal';
import { NewAlertModal } from './components/NewAlertModal';
import { OfficerModal } from './components/OfficerModal';
import { Toast } from './components/Toast';

import { 
  INGESTION_FEEDS, 
  INITIAL_ALERT_DOSSIER, 
  INITIAL_OFFICER_NOTES, 
  MAHARASHTRA_DISTRICTS 
} from './data/mockData';
import { 
  AlertDossierType, 
  DistrictSurveillance, 
  OfficerNote, 
  ToastMessage, 
  ViewTab 
} from './types';
import { 
  isAudioEnabled, 
  playActionSuccess, 
  playAlertWarning, 
  playTactileChime, 
  setAudioEnabled 
} from './utils/sound';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewTab>('overview');
  const [districts, setDistricts] = useState<DistrictSurveillance[]>(MAHARASHTRA_DISTRICTS);
  const [alertDossier, setAlertDossier] = useState<AlertDossierType>(INITIAL_ALERT_DOSSIER);
  const [officerNotes, setOfficerNotes] = useState<OfficerNote[]>(INITIAL_OFFICER_NOTES);
  const [selectedDistrictName, setSelectedDistrictName] = useState<string>('Mumbai Suburban');
  const [activePreset, setActivePreset] = useState<string>('maharashtra-priority');
  const [dateRange, setDateRange] = useState<string>('Past 7 Days (Standard)');
  const [audioState, setAudioState] = useState<boolean>(true);

  // Modals & Drawers
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isNewAlertModalOpen, setIsNewAlertModalOpen] = useState(false);
  const [isOfficerModalOpen, setIsOfficerModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Helper
  const showToast = (message: string, type: 'info' | 'alert' | 'success' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    if (type === 'success') {
      playActionSuccess();
    } else if (type === 'alert') {
      playAlertWarning();
    } else {
      playTactileChime(440, 'sine', 0.05);
    }

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSelectView = (view: ViewTab) => {
    setCurrentView(view);
    playTactileChime(520, 'sine', 0.04);
  };

  const handleToggleAudio = () => {
    const next = !audioState;
    setAudioState(next);
    setAudioEnabled(next);
    showToast(next ? 'Auditory telemetry feedback enabled.' : 'Auditory feedback muted.', 'info');
  };

  const handleApplyPreset = (presetId: string) => {
    setActivePreset(presetId);
    if (presetId === 'maharashtra-priority') {
      setCurrentView('overview');
      setSelectedDistrictName('Mumbai Suburban');
      showToast('Switched to Maharashtra Priority Surveillance (36 districts)', 'info');
    } else if (presetId === 'western-ghats') {
      setCurrentView('map');
      setSelectedDistrictName('Nashik');
      showToast('Preset: Western Ghats Vector Belt (18 districts)', 'info');
    } else if (presetId === 'vidarbha-baseline') {
      setCurrentView('map');
      setSelectedDistrictName('Nagpur');
      showToast('Preset: Vidarbha Baseline Surveillance (11 districts)', 'info');
    }
  };

  const handleInspectAlert = (alertId: string) => {
    setCurrentView('alerts');
    showToast(`Loaded epidemiological dossier ${alertId}`, 'info');
  };

  const handleSelectDistrictOnMap = (districtName: string) => {
    setSelectedDistrictName(districtName);
    showToast(`Jurisdiction selected: ${districtName}`, 'info');
  };

  const handleAddOfficerNote = (content: string, action?: string) => {
    const newNote: OfficerNote = {
      id: `NOTE-${Date.now().toString().slice(-4)}`,
      author: 'Dr. Ananya Shah',
      role: 'District Health Officer',
      officerId: 'MH-DHO-0842',
      timestamp: 'Just now',
      content,
      actionTaken: action
    };
    setOfficerNotes((prev) => [newNote, ...prev]);
  };

  const handleAddNewAlert = (newAlertData: {
    district: string;
    syndrome: string;
    caseCount: number;
    multiplier: number;
    notes: string;
  }) => {
    const alertId = `PW-2026-${Math.floor(1050 + Math.random() * 50)}`;

    // Update district in list
    setDistricts((prev) =>
      prev.map((d) => {
        if (d.name.toLowerCase() === newAlertData.district.toLowerCase()) {
          return {
            ...d,
            status: newAlertData.multiplier >= 2.0 ? 'alert' : 'watch',
            multiplier: newAlertData.multiplier,
            clinicCount: newAlertData.caseCount,
            activeAlertId: alertId,
            signalSummary: `Sentinel surge: ${newAlertData.syndrome}. ${newAlertData.notes || 'Under review'}`
          };
        }
        return d;
      })
    );

    // Add officer note to audit trail
    handleAddOfficerNote(
      `Manual Sentinel Ingestion: ${newAlertData.district} (${newAlertData.syndrome}, ${newAlertData.caseCount} cases, ${newAlertData.multiplier}×).`,
      `New Alert Logged (${alertId})`
    );

    showToast(
      `New alert logged: ${newAlertData.district} — ${newAlertData.syndrome}. Dossier generated: ${alertId}`,
      'alert'
    );
  };

  const handleConfirmExport = (format: 'pdf' | 'csv' | 'json') => {
    // Generate browser download dynamically
    let content = '';
    let filename = `PulseWatch_Epidemiological_Dossier_MH.${format}`;
    let mimeType = 'text/plain';

    if (format === 'json') {
      content = JSON.stringify(
        {
          platform: 'PulseWatch',
          state: 'Maharashtra',
          generatedAt: new Date().toISOString(),
          activeAlerts: districts.filter((d) => d.status === 'alert'),
          districtsMonitored: districts.length,
          telemetryFeeds: INGESTION_FEEDS
        },
        null,
        2
      );
      mimeType = 'application/json';
    } else if (format === 'csv') {
      const headers = 'District,Division,Status,Multiplier,Cases,SearchVelocity,RainfallMm,Confidence\n';
      const rows = districts
        .map(
          (d) =>
            `"${d.name}","${d.division}","${d.status}",${d.multiplier},${d.clinicCount},"${d.searchVelocity}",${d.rainfallMm},${d.confidenceScore}`
        )
        .join('\n');
      content = headers + rows;
      mimeType = 'text/csv';
    } else {
      content = `# PULSEWATCH EPIDEMIOLOGICAL SURVEILLANCE DOSSIER
State: Maharashtra, India
Officer: Dr. Ananya Shah (DHO ID: MH-DHO-0842)
Date: ${new Date().toLocaleDateString()}

## EXECUTIVE SUMMARY
- Monitored Districts: 36/36
- Priority 1 Alert: Mumbai Suburban (PW-2026-1042)
- Under Watch: Thane, Nashik, Palghar
- Farrington Algorithm V3 baseline ceiling breach detected across 14 sentinel clinics.

## RECOMMENDATION
Immediate deployment of NS1 rapid diagnostic kits, ASHA vector control, and clinical advisories.
`;
      filename = 'PulseWatch_Executive_Brief.txt';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Dossier package generated: ${filename} downloaded.`, 'success');
  };

  const activeAlertsCount = districts.filter((d) => d.status === 'alert').length;

  return (
    <div className="w-full h-screen overflow-hidden flex flex-row bg-[#F0F2F5]">
      <Sidebar
        currentView={currentView}
        onSelectView={handleSelectView}
        activeAlertsCount={activeAlertsCount}
        audioEnabled={audioState}
        onToggleAudio={handleToggleAudio}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenOfficerModal={() => setIsOfficerModalOpen(true)}
        onApplyPreset={handleApplyPreset}
        activePreset={activePreset}
        isMobileOpen={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />

      {/* Right Panel — sticky header + scrollable content below */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header is sticky — never scrolls */}
        <Header
          currentView={currentView}
          onOpenMobileMenu={() => setIsMobileNavOpen(true)}
          onOpenNewAlertModal={() => setIsNewAlertModalOpen(true)}
          dateRange={dateRange}
          onSelectDateRange={(r) => {
            setDateRange(r);
            showToast(`Surveillance date window updated to: ${r}`, 'info');
          }}
          onRefreshData={() => {
            showToast('Synchronized with all 6 live telemetry streams.', 'success');
          }}
          activeAlertId={alertDossier.id}
          onNavigateView={handleSelectView}
        />

        {/* Scrollable content area — only this scrolls */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scroll">
          {currentView === 'overview' && (
            <OverviewDashboard
              districts={districts}
              alertDossier={alertDossier}
              onNavigateView={handleSelectView}
              onSelectDistrictOnMap={handleSelectDistrictOnMap}
              onInspectAlert={handleInspectAlert}
            />
          )}

          {currentView === 'alerts' && (
            <AlertDossier
              dossier={alertDossier}
              officerNotes={officerNotes}
              onAddOfficerNote={handleAddOfficerNote}
              onBackToOverview={() => handleSelectView('overview')}
              onNavigateToMap={(dist) => {
                setSelectedDistrictName(dist);
                handleSelectView('map');
              }}
              onToast={showToast}
            />
          )}

          {currentView === 'map' && (
            <OutbreakMap
              districts={districts}
              selectedDistrictName={selectedDistrictName}
              onSelectDistrict={handleSelectDistrictOnMap}
              onInspectAlert={handleInspectAlert}
              onNavigateView={handleSelectView}
              onToast={showToast}
            />
          )}

          {currentView === 'signals' && (
            <SignalsMatrix
              feeds={INGESTION_FEEDS}
              onToast={showToast}
            />
          )}

          {currentView === 'reports' && (
            <IntelligenceReports
              onOpenExportModal={() => setIsExportModalOpen(true)}
              onToast={showToast}
            />
          )}
        </div>
      </main>

      {/* Global Modals */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onConfirmExport={handleConfirmExport}
      />

      <NewAlertModal
        isOpen={isNewAlertModalOpen}
        onClose={() => setIsNewAlertModalOpen(false)}
        districts={districts}
        onAddAlert={handleAddNewAlert}
      />

      <OfficerModal
        isOpen={isOfficerModalOpen}
        onClose={() => setIsOfficerModalOpen(false)}
      />

      {/* Toast Notification Stack */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};
