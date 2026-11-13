import React, { useRef } from 'react';
import { FolderOpen, X, Trash2, Upload, Download, Sparkles, CheckCircle } from 'lucide-react';
import { downloadJSON, generateId } from '../utils/storage';

export default function SavedChainsModal({ 
  isOpen, 
  onClose, 
  savedChains, 
  activeChainId, 
  onSelectChain, 
  onDeleteChain, 
  onImportJSON,
  onLoadDemo,
  onLoadNDDemo
}) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.targetBehavior && parsed.links) {
          onImportJSON({ ...parsed, id: generateId('chain-imported') });
          onClose();
        } else {
          alert('Invalid JSON structure for DBT chain analysis.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Saved Chain Analyses</h2>
              <p className="text-xs text-slate-400">Manage, export, or import your personal analyses</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onLoadNDDemo}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition"
              title="Load full ASD/ADHD/CPTSD Social Avoidance Chain Analysis"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Load ASD/ADHD/CPTSD Template</span>
            </button>

            <button
              onClick={onLoadDemo}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Load Workplace Demo</span>
            </button>
          </div>
        </div>

        {/* Chain Items List */}

        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {savedChains.map((c) => {
            const isActive = c.id === activeChainId;
            return (
              <div
                key={c.id}
                className={`border rounded-2xl p-4 transition flex items-center justify-between ${
                  isActive
                    ? 'bg-purple-950/40 border-purple-500/50 shadow-lg'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-slate-100">{c.title || 'Untitled Chain'}</h3>
                    {isActive && (
                      <span className="flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                        <CheckCircle className="w-3 h-3 text-purple-400" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    Target: {c.targetBehavior?.description || 'No behavior described'}
                  </p>
                  <div className="text-[10px] text-slate-500 mt-1 font-mono">
                    Date: {c.date} | Links: {c.links?.length || 0} | Skills: {c.skills?.length || 0}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!isActive && (
                    <button
                      onClick={() => {
                        onSelectChain(c);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow transition"
                    >
                      Open
                    </button>
                  )}

                  <button
                    onClick={() => downloadJSON(c, `${(c.title || 'chain').toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800"
                    title="Export JSON"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteChain(c.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-400 bg-slate-900 border border-slate-800"
                    title="Delete Chain"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {savedChains.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-xs">
              No saved chain analyses found. Create a new one or click "Load Demo Sample Chain".
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

