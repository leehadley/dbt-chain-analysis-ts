import React, { useState } from 'react';
import {
  ShieldAlert,
  Zap,
  Target,
  Scale,
  Sparkles,
  HeartHandshake,
  Plus,
  Trash2,
  ArrowRight,
  ArrowDown,
  Activity,
  Layers,
  ChevronRight,
  X,
  Info
} from 'lucide-react';
import { DEFAULT_DBT_SKILLS, ChainAnalysis } from '../constants/dbtSkills';

interface VisualCanvasProps {
  chain: ChainAnalysis;
  setChain: (updater: ChainAnalysis | ((prev: ChainAnalysis) => ChainAnalysis)) => void;
}

interface LinkStyle {
  border: string;
  bg: string;
  text: string;
  icon: string;
}

interface GraphPoint {
  label: string;
  intensity: number;
  type?: string;
}

export default function VisualCanvas({ chain, setChain }: VisualCanvasProps) {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [showIntensityGraph, setShowIntensityGraph] = useState(true);
  const [selectedLinkForSkill, setSelectedLinkForSkill] = useState<string | null>(null);

  const addLink = (type = 'Thought') => {
    const newLink = {
      id: `link-${Date.now()}`,
      type,
      text: 'New chain step',
      intensity: 5
    };
    setChain(prev => ({ ...prev, links: [...prev.links, newLink] }));
  };

  const removeLink = (linkId: string) => {
    setChain(prev => ({
      ...prev,
      links: prev.links.filter(l => l.id !== linkId),
      skills: prev.skills.filter(s => s.linkId !== linkId)
    }));
  };

  const attachSkillToLink = (linkId: string, skillId: string) => {
    const skillObj = DEFAULT_DBT_SKILLS.find(s => s.id === skillId);
    const newSkill = {
      id: `sk-${Date.now()}`,
      linkId,
      skillId,
      customSkillName: skillObj ? skillObj.name : 'Coping Skill',
      note: ''
    };
    setChain(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
    setSelectedLinkForSkill(null);
  };

  const removeSkill = (skillId: string) => {
    setChain(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== skillId) }));
  };

  const graphPoints: GraphPoint[] = [
    { label: 'Trigger', intensity: 4 },
    ...chain.links.map((l, i) => ({ label: `L${i + 1}`, intensity: l.intensity || 5, type: l.type })),
    { label: 'Target', intensity: chain.targetBehavior.intensity || 8 }
  ];

  const getLinkStyle = (type: string): LinkStyle => {
    switch (type) {
      case 'Thought':
        return { border: 'border-cyan-500/50', bg: 'bg-cyan-950/40', text: 'text-cyan-300', icon: '🧠' };
      case 'Emotion':
        return { border: 'border-rose-500/50', bg: 'bg-rose-950/40', text: 'text-rose-300', icon: '❤️' };
      case 'Body Sensation':
        return { border: 'border-amber-500/50', bg: 'bg-amber-950/40', text: 'text-amber-300', icon: '🫀' };
      default:
        return { border: 'border-purple-500/50', bg: 'bg-purple-950/40', text: 'text-purple-300', icon: '🚶' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

      {/* Canvas Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">Interactive Flowchart Canvas</h2>
            <p className="text-xs text-slate-400">Visualizing the 7-step sequence & skill circuit breakers</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setOrientation('horizontal')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                orientation === 'horizontal' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Horizontal
            </button>
            <button
              onClick={() => setOrientation('vertical')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                orientation === 'vertical' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Vertical
            </button>
          </div>

          <button
            onClick={() => setShowIntensityGraph(!showIntensityGraph)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
              showIntensityGraph
                ? 'bg-purple-600/20 text-purple-300 border-purple-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Activity className="w-4 h-4 text-purple-400" />
            <span>Intensity Curve</span>
          </button>

          <button
            onClick={() => addLink('Thought')}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Link</span>
          </button>
        </div>
      </div>
      {/* Beginner Explanation Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-start space-x-3 text-xs">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-slate-300">
          <strong className="text-indigo-300 font-semibold block">How to read this flowchart:</strong>
          <span className="text-[11px] text-slate-400">
            The flowchart traces how pre-existing vulnerabilities and the spark trigger cascaded into thoughts (🧠), emotions (❤️), body sensations (🫀), and urges (🚶). The <strong>shield icons (🛡️)</strong> show coping circuit breakers attached directly to specific links to stop future dominoes.
          </span>
        </div>
      </div>

      {/* Main Visual Flowchart Area */}

      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-2xl overflow-x-auto min-h-[440px] relative">
        <div className={`flex ${orientation === 'horizontal' ? 'flex-row items-center space-x-6 min-w-max pb-6' : 'flex-col items-center space-y-6 max-w-xl mx-auto'}`}>

          {/* NODE 1: VULNERABILITIES */}
          <div className="w-72 bg-amber-950/30 border-2 border-amber-500/40 rounded-2xl p-4 shadow-xl shrink-0">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-2 mb-3">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                <ShieldAlert className="w-4 h-4" />
                <span>Vulnerabilities</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Step 2</span>
            </div>
            <div className="space-y-1.5">
              {chain.vulnerabilities.length > 0 ? (
                chain.vulnerabilities.map(v => (
                  <div key={v.id} className="text-xs bg-slate-900/90 border border-slate-800 rounded-lg p-2 text-amber-200/90 font-medium flex items-start justify-between gap-1">
                    <span>• {v.text || 'Unspecified vulnerability'}</span>
                    {v.category && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold shrink-0">
                        {v.category}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No vulnerabilities listed</p>
              )}
            </div>
          </div>

          {/* Arrow */}
          {orientation === 'horizontal' ? (
            <ArrowRight className="w-6 h-6 text-slate-600 shrink-0" />
          ) : (
            <ArrowDown className="w-6 h-6 text-slate-600 shrink-0" />
          )}

          {/* NODE 2: PROMPTING EVENT */}
          <div className="w-72 bg-yellow-950/30 border-2 border-yellow-500/40 rounded-2xl p-4 shadow-xl shrink-0">
            <div className="flex items-center justify-between border-b border-yellow-500/30 pb-2 mb-3">
              <div className="flex items-center space-x-2 text-yellow-400 font-bold text-xs">
                <Zap className="w-4 h-4" />
                <span>Prompting Event</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300">Step 3</span>
            </div>
            <p className="text-xs text-yellow-100/90 leading-relaxed font-medium">
              {chain.promptingEvent.text || 'Add prompting event in wizard...'}
            </p>
          </div>

          {/* Arrow */}
          {orientation === 'horizontal' ? (
            <ArrowRight className="w-6 h-6 text-slate-600 shrink-0" />
          ) : (
            <ArrowDown className="w-6 h-6 text-slate-600 shrink-0" />
          )}

          {/* LINKS SEQUENCE */}

          {chain.links.map((link, idx) => {
            const linkSkills = chain.skills.filter(s => s.linkId === link.id);
            const style = getLinkStyle(link.type);

            return (
              <React.Fragment key={link.id}>
                <div className={`w-72 ${style.bg} border-2 ${style.border} rounded-2xl p-4 shadow-xl shrink-0 relative group`}>

                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 mb-2">
                    <div className="flex items-center space-x-1.5 font-bold text-xs">
                      <span>{style.icon}</span>
                      <span className={style.text}>Link #{idx + 1}: {link.type}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-indigo-300 font-mono font-bold">
                        Int: {link.intensity}/10
                      </span>
                      <button
                        onClick={() => removeLink(link.id)}
                        className="text-slate-500 hover:text-red-400 p-0.5 rounded transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-xs text-slate-200 leading-relaxed min-h-[36px] font-medium mb-3">
                    {link.text || 'Unspecified link description'}
                  </p>

                  {/* Intercepting Skill Shields */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    {linkSkills.map(sk => (
                      <div key={sk.id} className="bg-emerald-950/80 border border-emerald-500/60 rounded-xl p-2 flex items-center justify-between text-xs text-emerald-200 shadow-md">
                        <div className="flex items-center space-x-1.5 overflow-hidden">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="font-bold truncate text-[11px]">{sk.customSkillName}</span>
                        </div>
                        <button
                          onClick={() => removeSkill(sk.id)}
                          className="text-emerald-400/60 hover:text-red-400 ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() => setSelectedLinkForSkill(link.id)}
                      className="w-full py-1 rounded-lg border border-dashed border-emerald-500/40 hover:border-emerald-400 text-[11px] text-emerald-400 hover:bg-emerald-950/30 flex items-center justify-center space-x-1 font-semibold transition"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>+ Skill Circuit Breaker</span>
                    </button>
                  </div>
                </div>

                {/* Arrow */}
                {orientation === 'horizontal' ? (
                  <ArrowRight className="w-6 h-6 text-slate-600 shrink-0" />
                ) : (
                  <ArrowDown className="w-6 h-6 text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            );
          })}

          {/* NODE 3: TARGET BEHAVIOR */}

          <div className="w-72 bg-red-950/40 border-2 border-red-500/60 rounded-2xl p-4 shadow-2xl shrink-0">
            <div className="flex items-center justify-between border-b border-red-500/40 pb-2 mb-3">
              <div className="flex items-center space-x-2 text-red-400 font-bold text-xs">
                <Target className="w-4 h-4" />
                <span>Target Behavior</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/30 text-red-300 font-mono font-bold">
                {chain.targetBehavior.intensity}/10
              </span>
            </div>
            <p className="text-xs text-red-100 font-bold leading-relaxed">
              {chain.targetBehavior.description || 'Target behavior not set'}
            </p>
          </div>

          {/* Arrow */}
          {orientation === 'horizontal' ? (
            <ArrowRight className="w-6 h-6 text-slate-600 shrink-0" />
          ) : (
            <ArrowDown className="w-6 h-6 text-slate-600 shrink-0" />
          )}

          {/* NODE 4: CONSEQUENCES */}
          <div className="w-72 bg-purple-950/30 border-2 border-purple-500/40 rounded-2xl p-4 shadow-xl shrink-0">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-2 mb-3">
              <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs">
                <Scale className="w-4 h-4" />
                <span>Consequences</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Step 5</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="font-bold text-emerald-400 block text-[11px]">Short-term:</span>
                <p className="text-slate-300 text-[11px]">{chain.consequences.shortTerm || 'Not specified'}</p>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="font-bold text-rose-400 block text-[11px]">Long-term:</span>
                <p className="text-slate-300 text-[11px]">{chain.consequences.longTerm || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          {orientation === 'horizontal' ? (
            <ArrowRight className="w-6 h-6 text-slate-600 shrink-0" />
          ) : (
            <ArrowDown className="w-6 h-6 text-slate-600 shrink-0" />
          )}

          {/* NODE 5: PREVENTION & REPAIR */}
          <div className="w-72 bg-pink-950/30 border-2 border-pink-500/40 rounded-2xl p-4 shadow-xl shrink-0">
            <div className="flex items-center justify-between border-b border-pink-500/30 pb-2 mb-3">
              <div className="flex items-center space-x-2 text-pink-400 font-bold text-xs">
                <HeartHandshake className="w-4 h-4" />
                <span>Prevention & Repair</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300">Step 7</span>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-pink-300 block text-[11px]">🛡️ Prevention:</span>
                <p className="text-slate-300 text-[11px] line-clamp-2">{chain.preventionPlan || 'Not specified'}</p>
              </div>
              <div>
                <span className="font-bold text-pink-300 block text-[11px]">🩹 Repair:</span>
                <p className="text-slate-300 text-[11px] line-clamp-2">{chain.repairPlan || 'Not specified'}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* EMOTIONAL INTENSITY CURVE GRAPH */}

      {showIntensityGraph && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-400">
              <Activity className="w-4 h-4" />
              <span>Emotional Arousal & Intensity Progression</span>
            </div>
            <span className="text-[11px] text-slate-400">Scale: 1 (Calm) to 10 (Crisis Peak)</span>
          </div>

          <div className="h-28 flex items-end justify-between space-x-2 bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
            <div className="absolute inset-x-0 top-1/2 border-t border-slate-800/60 pointer-events-none" />

            {graphPoints.map((pt, i) => {
              const heightPercent = Math.max(15, (pt.intensity / 10) * 100);
              const isPeak = pt.intensity >= 8;
              return (
                <div key={i} className="flex-1 flex flex-col items-center group relative">
                  <span className="text-[10px] font-bold text-indigo-300 mb-1 font-mono">
                    {pt.intensity}
                  </span>

                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${
                      isPeak
                        ? 'bg-gradient-to-t from-rose-600 to-red-400 shadow-lg'
                        : 'bg-gradient-to-t from-indigo-600 to-purple-400'
                    }`}
                  />
                  <span className="text-[10px] text-slate-400 mt-1 font-mono truncate max-w-full">
                    {pt.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* QUICK SKILL ATTACHMENT MODAL */}
      {selectedLinkForSkill && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Attach DBT Coping Skill</span>
              </h3>
              <button
                onClick={() => setSelectedLinkForSkill(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Select a DBT skill to insert as a circuit breaker at this step:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {DEFAULT_DBT_SKILLS.map(skill => (
                <button
                  key={skill.id}
                  onClick={() => attachSkillToLink(selectedLinkForSkill, skill.id)}
                  className="w-full text-left bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-xl p-2.5 transition group flex items-start justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-100 group-hover:text-emerald-300">
                      {skill.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {skill.summary}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0 ml-2 mt-1" />
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLinkForSkill(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
