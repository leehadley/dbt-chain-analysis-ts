import { useState } from 'react';
import Header from './components/Header';
import WizardView from './components/WizardView';
import VisualCanvas from './components/VisualCanvas';
import ReportView from './components/ReportView';
import SkillsLibraryModal from './components/SkillsLibraryModal';
import SavedChainsModal from './components/SavedChainsModal';
import InfoPanel from './components/InfoPanel';
import { generateId, downloadJSON } from './utils/storage';
import { EMPTY_CHAIN_ANALYSIS, SAMPLE_CHAIN_ANALYSIS, NEURODIVERGENT_SOCIAL_AVOIDANCE_CHAIN, ChainAnalysis } from './constants/dbtSkills';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'wizard' | 'canvas' | 'report'>('wizard');
  const [chain, setChain] = useState<ChainAnalysis>(EMPTY_CHAIN_ANALYSIS);

  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(true);

  const handleSetChain = (updater: ChainAnalysis | ((prev: ChainAnalysis) => ChainAnalysis)) => {
    setChain(prev => {
      const nextChain = typeof updater === 'function' ? updater(prev) : updater;
      return nextChain;
    });
  };

  const handleNewChain = () => {
    setChain(EMPTY_CHAIN_ANALYSIS);
    setCurrentTab('wizard');
  };

  const handleResetApp = () => {
    if (window.confirm('Start a fresh analysis? All current data will be cleared.')) {
      setChain(EMPTY_CHAIN_ANALYSIS);
      setCurrentTab('wizard');
      setIsInfoPanelOpen(true);
      setIsSkillsModalOpen(false);
      setIsSavedModalOpen(false);
    }
  };

  const handleExportJSON = () => {
    const filename = `${(chain.title || 'dbt-chain').toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`;
    downloadJSON(chain, filename);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">

      {/* Header Bar */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        chainTitle={chain.title}
        onNewChain={handleNewChain}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenSkills={() => setIsSkillsModalOpen(true)}
        onOpenGuide={() => setIsInfoPanelOpen(true)}
        onReset={handleResetApp}
        onExportJSON={handleExportJSON}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'wizard' && (
          <WizardView
            chain={chain}
            setChain={handleSetChain}
            onCompleteToCanvas={() => setCurrentTab('canvas')}
            onOpenSkills={() => setIsSkillsModalOpen(true)}
          />
        )}

        {currentTab === 'canvas' && (
          <VisualCanvas
            chain={chain}
            setChain={handleSetChain}
          />
        )}

        {currentTab === 'report' && (
          <ReportView chain={chain} />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print bg-slate-950 border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        <p>DBT Psychological Chain Analysis • Evidence-Based Behavioral Toolkit</p>
      </footer>

      {/* Modals */}
      <InfoPanel
        isOpen={isInfoPanelOpen}
        onClose={() => setIsInfoPanelOpen(false)}
      />

      <SkillsLibraryModal
        isOpen={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
      />

      <SavedChainsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedChains={[]}
        activeChainId={chain.id}
        onSelectChain={() => {}}
        onDeleteChain={() => {}}
        onImportJSON={(imported) => setChain(imported)}
        onLoadDemo={() => setChain({ ...SAMPLE_CHAIN_ANALYSIS, id: generateId('demo-sample') })}
        onLoadNDDemo={() => setChain({ ...NEURODIVERGENT_SOCIAL_AVOIDANCE_CHAIN, id: generateId('demo-nd') })}
      />

    </div>
  );
}
