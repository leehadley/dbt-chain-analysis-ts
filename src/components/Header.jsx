import React from 'react';
import { 
  Wand2, 
  GitCommitHorizontal, 
  FileText, 
  BookOpen, 
  FolderOpen, 
  Plus, 
  Download,
  Brain
} from 'lucide-react';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  chainTitle, 
  onNewChain, 
  onOpenSaved, 
  onOpenSkills,
  onExportJSON
}) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-100 tracking-tight">DBT Chain Analysis</h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/30">
                  7-Step Protocol
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono truncate max-w-[200px] sm:max-w-xs">
                {chainTitle || 'Untitled Analysis'}
              </p>
            </div>
          </div>

          {/* Center Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentTab('wizard')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'wizard'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span>Guided Wizard</span>
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
              <span>Visual Flowchart</span>
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
              <span>Printable Report</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenSkills}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Open DBT Coping Skills Reference Library"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Skills</span>
            </button>

            <button
              onClick={onOpenSaved}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Saved Chain Analyses"
            >
              <FolderOpen className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">Saved</span>
            </button>

            <button
              onClick={onExportJSON}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
              title="Export JSON"
            >
              <Download className="w-4 h-4" />
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
      </div>
    </header>
  );
}
