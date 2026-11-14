// No React import needed for React 17+ JSX transform
import { useState } from 'react';
import {
  Wand2,
  GitCommitHorizontal,
  FileText,
  BookOpen,
  FolderOpen,
  Plus,
  Download,
  Brain,
  HelpCircle,
  RotateCcw,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  currentTab: 'wizard' | 'canvas' | 'report';
  setCurrentTab: (tab: 'wizard' | 'canvas' | 'report') => void;
  chainTitle: string;
  onNewChain: () => void;
  onOpenSaved: () => void;
  onOpenSkills: () => void;
  onOpenGuide: () => void;
  onReset: () => void;
  onExportJSON: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  chainTitle,
  onNewChain,
  onOpenSaved,
  onOpenSkills,
  onOpenGuide,
  onReset,
  onExportJSON
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo & Title */}
          <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
              <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <h1 className="text-sm md:text-lg font-bold text-slate-100 tracking-tight truncate">DBT Chain</h1>
                <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/30">
                  7-Step
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-slate-400 font-mono truncate max-w-[150px] md:max-w-xs">
                {chainTitle || 'Untitled Analysis'}
              </p>
            </div>
          </div>

          {/* Desktop Tabs - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentTab('wizard')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'wizard'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span>Wizard</span>
            </button>

            <button
              onClick={() => setCurrentTab('canvas')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'canvas'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <GitCommitHorizontal className="w-4 h-4" />
              <span>Flowchart</span>
            </button>

            <button
              onClick={() => setCurrentTab('report')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'report'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Report</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            title="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Desktop Action Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={onOpenGuide}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition"
              title="Guide"
            >
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Guide</span>
            </button>

            <button
              onClick={onOpenSkills}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Skills"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Skills</span>
            </button>

            <button
              onClick={onOpenSaved}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Saved"
            >
              <FolderOpen className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">Saved</span>
            </button>

            <button
              onClick={onExportJSON}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
              title="Export"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={onReset}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onNewChain}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Shown only on small screens */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 py-3 space-y-2">
            {/* Tab Selection */}
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCurrentTab('wizard');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'wizard'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Wand2 className="w-4 h-4" />
                <span>Guided Wizard</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('canvas');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'canvas'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <GitCommitHorizontal className="w-4 h-4" />
                <span>Visual Flowchart</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('report');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'report'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Printable Report</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-slate-800 pt-2 space-y-1">
              <button
                onClick={() => {
                  onOpenGuide();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Guide</span>
              </button>

              <button
                onClick={() => {
                  onOpenSkills();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Skills Library</span>
              </button>

              <button
                onClick={() => {
                  onOpenSaved();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              >
                <FolderOpen className="w-4 h-4 text-purple-400" />
                <span>Saved Chains</span>
              </button>

              <button
                onClick={onExportJSON}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={onReset}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-red-400 border border-slate-700 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset App</span>
              </button>
            </div>

            {/* New Chain Button */}
            <button
              onClick={() => {
                onNewChain();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>New Chain Analysis</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
