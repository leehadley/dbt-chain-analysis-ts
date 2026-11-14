import { useState, useEffect } from 'react';
import Header from './components/Header';
import WizardView from './components/WizardView';
import VisualCanvas from './components/VisualCanvas';
import ReportView from './components/ReportView';
import SkillsLibraryModal from './components/SkillsLibraryModal';
import SavedChainsModal from './components/SavedChainsModal';
import GuideModal from './components/GuideModal';
import {
  getSavedChains,
  saveChainToStorage,
  deleteChainFromStorage,
  generateId,
  downloadJSON
} from './utils/storage';
import { EMPTY_CHAIN_ANALYSIS, SAMPLE_CHAIN_ANALYSIS, NEURODIVERGENT_SOCIAL_AVOIDANCE_CHAIN, ChainAnalysis } from './constants/dbtSkills';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'wizard' | 'canvas' | 'report'>('wizard');
  const [savedChains, setSavedChains] = useState<ChainAnalysis[]>([]);
  const [chain, setChain] = useState<ChainAnalysis>(NEURODIVERGENT_SOCIAL_AVOIDANCE_CHAIN);

  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  useEffect(() => {
    const loaded = getSavedChains();
    if (loaded && loaded.length > 0) {
      setSavedChains(loaded);
      setChain(loaded[0]);
    } else {
      saveChainToStorage(NEURODIVERGENT_SOCIAL_AVOIDANCE_CHAIN);
      saveChainToStorage(SAMPLE_CHAIN_ANALYSIS);
      setSavedChains([NEURODIVERGENT_SOCIAL_AVOIDANCE_CHAIN, SAMPLE_CHAIN_ANALYSIS]);
      setChain(NEURODIVERGENT_SOCIAL_AVOIDANCE_CHAIN);
    }
  }, []);

  const handleSetChain = (updater: ChainAnalysis | ((prev: ChainAnalysis) => ChainAnalysis)) => {
    setChain(prev => {
      const nextChain = typeof updater === 'function' ? updater(prev) : updater;
      saveChainToStorage(nextChain);
      setSavedChains(getSavedChains());
      return nextChain;
    });
  };

  const handleNewChain = () => {
    const newId = generateId('chain');
    const newChainObj: ChainAnalysis = {
      ...EMPTY_CHAIN_ANALYSIS,
      id: newId,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5)
    };
    saveChainToStorage(newChainObj);
    setSavedChains(getSavedChains());
    setChain(newChainObj);
    setCurrentTab('wizard');
  };

  const handleDeleteChain = (id: string) => {
    deleteChainFromStorage(id);
    const updated = getSavedChains();
    setSavedChains(updated);
    if (chain.id === id) {
      if (updated.length > 0) {
        setChain(updated[0]);
      } else {
        handleNewChain();
      }
    }
  };

  const handleLoadDemo = () => {
    const demoWithNewId: ChainAnalysis = {
      ...SAMPLE_CHAIN_ANALYSIS,
      id: generateId('chain-demo'),
      title: 'Demo: Workplace Conflict & Overwhelmed Outburst'
    };
    saveChainToStorage(demoWithNewId);
    setSavedChains(getSavedChains());
    setChain(demoWithNewId);
    setIsSavedModalOpen(false);
  };

  const handleLoadNDDemo = () => {
    const demoWithNewId: ChainAnalysis = {
      ...NEURODIVERGENT_SOCIAL_AVOIDANCE_CHAIN,
      id: generateId('chain-nd-template'),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5)
    };
    saveChainToStorage(demoWithNewId);
    setSavedChains(getSavedChains());
    setChain(demoWithNewId);
    setIsSavedModalOpen(false);
  };


  const handleImportJSON = (importedChain: ChainAnalysis) => {
    saveChainToStorage(importedChain);
    setSavedChains(getSavedChains());
    setChain(importedChain);
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
        onOpenGuide={() => setIsGuideModalOpen(true)}
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
            onOpenGuide={() => setIsGuideModalOpen(true)}
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
      <SkillsLibraryModal
        isOpen={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
      />

      <SavedChainsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedChains={savedChains}
        activeChainId={chain.id}
        onSelectChain={(c) => setChain(c)}
        onDeleteChain={handleDeleteChain}
        onImportJSON={handleImportJSON}
        onLoadDemo={handleLoadDemo}
        onLoadNDDemo={handleLoadNDDemo}
      />

      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onStartWizard={() => {
          handleNewChain();
          setCurrentTab('wizard');
        }}
        onLoadNDDemo={handleLoadNDDemo}
      />

    </div>
  );
}
