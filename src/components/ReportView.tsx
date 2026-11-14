// No React import needed for React 17+ JSX transform
import { Printer, Calendar, Clock, Target, ShieldAlert, Zap, GitCommitHorizontal, Scale, Sparkles, HeartHandshake, Download } from 'lucide-react';
import { ChainAnalysis } from '../constants/dbtSkills';
import { generatePDF } from '../utils/pdfExport';

interface ReportViewProps {
  chain: ChainAnalysis;
}

export default function ReportView({ chain }: ReportViewProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    await generatePDF(chain, 'report-sheet');
  };

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Action Bar */}
      <div className="no-print bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-100">Printable Clinical Report Summary</h2>
          <p className="text-xs text-slate-400">Formatted for therapy sessions or personal record</p>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {!isMobile && (
            <button
              onClick={handleExportPDF}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg transition"
              title="Download as PDF (Desktop only)"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          )}
          <button
            onClick={handlePrint}
            className={`${isMobile ? 'flex-1' : 'flex-1 sm:flex-none'} flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold ${isMobile ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'} text-white shadow-lg transition`}
            title={isMobile ? 'Open Print dialog to save as PDF' : 'Print or print to PDF'}
          >
            <Printer className="w-4 h-4" />
            <span>{isMobile ? 'Print / Save as PDF' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet */}
      <div id="report-sheet" className="bg-slate-900 print:bg-white text-slate-100 print:text-black border border-slate-800 print:border-none rounded-3xl p-8 shadow-2xl space-y-8 font-sans">

        {/* Document Header */}
        <div className="border-b border-slate-800 print:border-slate-300 pb-6 flex items-start justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-indigo-400 print:text-indigo-700 uppercase tracking-wider mb-1">
              DBT Behavioral Chain Analysis
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 print:text-black">
              {chain.title || 'Untitled Chain Analysis'}
            </h1>
          </div>

          <div className="text-right text-xs text-slate-400 print:text-slate-600 space-y-1">
            <div className="flex items-center justify-end space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{chain.date || 'No Date'}</span>
            </div>
            <div className="flex items-center justify-end space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{chain.time || 'No Time'}</span>
            </div>
          </div>
        </div>

        {/* Step 1: Target Behavior */}
        <section className="bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 print:border-slate-200 pb-2">
            <div className="flex items-center space-x-2 font-bold text-red-400 print:text-red-600 text-sm">
              <Target className="w-4 h-4" />
              <span>1. Target Behavior</span>
            </div>
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-red-500/20 print:bg-red-100 text-red-300 print:text-red-700">
              Severity: {chain.targetBehavior.intensity}/10
            </span>
          </div>
          <p className="text-sm font-medium leading-relaxed">
            {chain.targetBehavior.description || 'Not specified'}
          </p>
          {(chain.targetBehavior.location || chain.targetBehavior.context) && (
            <div className="text-xs text-slate-400 print:text-slate-600 pt-1">
              Location: {chain.targetBehavior.location || 'N/A'} | Setting/Context: {chain.targetBehavior.context || 'N/A'}
            </div>
          )}
        </section>

        {/* Step 2 & 3: Vulnerabilities & Trigger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 font-bold text-amber-400 print:text-amber-700 text-sm border-b border-slate-800 print:border-slate-200 pb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>2. Vulnerability Factors</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300 print:text-slate-800">
              {chain.vulnerabilities.length > 0 ? (
                chain.vulnerabilities.map((v) => (
                  <li key={v.id} className="flex items-start space-x-1.5">
                    <span className="font-bold text-amber-500">•</span>
                    <span>{v.text} <span className="text-slate-500">({v.category})</span></span>
                  </li>
                ))
              ) : (
                <li className="italic text-slate-500">None specified</li>
              )}
            </ul>
          </section>

          <section className="bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 font-bold text-yellow-400 print:text-yellow-700 text-sm border-b border-slate-800 print:border-slate-200 pb-2">
              <Zap className="w-4 h-4" />
              <span>3. Prompting Event (Trigger)</span>
            </div>
            <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed font-medium">
              {chain.promptingEvent.text || 'Not specified'}
            </p>
            {chain.promptingEvent.type && (
              <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-yellow-500/10 print:bg-yellow-100 text-yellow-400 print:text-yellow-800 border border-yellow-500/20">
                Type: {chain.promptingEvent.type}
              </span>
            )}
          </section>
        </div>

        {/* Step 4 & 6: The Chain Sequence & Coping Skills */}
        <section className="bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 font-bold text-indigo-400 print:text-indigo-700 text-sm border-b border-slate-800 print:border-slate-200 pb-2">
            <GitCommitHorizontal className="w-4 h-4" />
            <span>4 & 6. Sequence of Links & DBT Skill Circuit Breakers</span>
          </div>

          <div className="space-y-3">
            {chain.links.map((link, idx) => {
              const linkSkills = chain.skills.filter(s => s.linkId === link.id);
              return (
                <div key={link.id} className="bg-slate-900 print:bg-white border border-slate-800 print:border-slate-300 rounded-xl p-3 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-200 print:text-black">
                      Link #{idx + 1}: <span className="text-indigo-300 print:text-indigo-700 font-mono">[{link.type}]</span>
                    </span>
                    <span className="text-slate-400 print:text-slate-600 font-mono">
                      Intensity: {link.intensity}/10
                    </span>
                  </div>
                  <p className="text-slate-300 print:text-slate-800 leading-relaxed">
                    {link.text}
                  </p>

                  {linkSkills.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-800 print:border-slate-200 space-y-1">
                      <span className="text-[11px] font-bold text-emerald-400 print:text-emerald-700 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Inserted Coping Skill:</span>
                      </span>
                      {linkSkills.map(sk => (
                        <div key={sk.id} className="bg-emerald-950/40 print:bg-emerald-50 border border-emerald-500/30 print:border-emerald-200 rounded p-1.5 text-[11px] text-emerald-300 print:text-emerald-900 font-medium">
                          <strong>{sk.customSkillName}</strong> {sk.note ? `— "${sk.note}"` : ''}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Step 5: Consequences */}
        <section className="bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 font-bold text-purple-400 print:text-purple-700 text-sm border-b border-slate-800 print:border-slate-200 pb-2">
            <Scale className="w-4 h-4" />
            <span>5. Consequences</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <strong className="text-emerald-400 print:text-emerald-700 block mb-1">Short-term Immediate:</strong>
              <p className="text-slate-300 print:text-slate-800">{chain.consequences.shortTerm || 'None specified'}</p>
            </div>
            <div>
              <strong className="text-rose-400 print:text-rose-700 block mb-1">Long-term Impact:</strong>
              <p className="text-slate-300 print:text-slate-800">{chain.consequences.longTerm || 'None specified'}</p>
            </div>
          </div>
        </section>

        {/* Step 7: Prevention & Repair */}
        <section className="bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 font-bold text-pink-400 print:text-pink-700 text-sm border-b border-slate-800 print:border-slate-200 pb-2">
            <HeartHandshake className="w-4 h-4" />
            <span>7. Prevention & Harm Repair Plan</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <strong className="text-pink-300 print:text-pink-800 block mb-1">🛡️ Vulnerability Prevention Plan:</strong>
              <p className="text-slate-300 print:text-slate-800">{chain.preventionPlan || 'None specified'}</p>
            </div>
            <div>
              <strong className="text-pink-300 print:text-pink-800 block mb-1">🩹 Harm Repair & Amends:</strong>
              <p className="text-slate-300 print:text-slate-800">{chain.repairPlan || 'None specified'}</p>
            </div>
          </div>
        </section>

        {chain.therapistNotes && (
          <section className="border-t border-slate-800 print:border-slate-300 pt-4 text-xs">
            <strong className="text-slate-400 print:text-slate-600 block mb-1">Notes:</strong>
            <p className="text-slate-300 print:text-slate-800 italic">{chain.therapistNotes}</p>
          </section>
        )}

      </div>
    </div>
  );
}
