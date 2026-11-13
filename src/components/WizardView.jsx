import React, { useState } from 'react';
import { 
  Target, ShieldAlert, Zap, GitCommitHorizontal, Scale, 
  Sparkles, HeartHandshake, Plus, Trash2, ArrowRight, ArrowLeft,
  ChevronRight, Lightbulb, Check
} from 'lucide-react';
import { DEFAULT_DBT_SKILLS, VULNERABILITY_PRESETS } from '../constants/dbtSkills';

const STEPS = [
  { id: 1, name: 'Target Behavior', icon: Target },
  { id: 2, name: 'Vulnerabilities', icon: ShieldAlert },
  { id: 3, name: 'Prompting Event', icon: Zap },
  { id: 4, name: 'Chain of Links', icon: GitCommitHorizontal },
  { id: 5, name: 'Consequences', icon: Scale },
  { id: 6, name: 'Skill Interventions', icon: Sparkles },
  { id: 7, name: 'Prevention & Repair', icon: HeartHandshake }
];

export default function WizardView({ chain, setChain, onCompleteToCanvas, onOpenSkills }) {
  const [activeStep, setActiveStep] = useState(1);

  const updateTargetBehavior = (field, val) => {
    setChain(prev => ({
      ...prev,
      targetBehavior: { ...prev.targetBehavior, [field]: val }
    }));
  };

  const updatePromptingEvent = (field, val) => {
    setChain(prev => ({
      ...prev,
      promptingEvent: { ...prev.promptingEvent, [field]: val }
    }));
  };

  const addVulnerability = () => {
    const newVuln = { id: `v-${Date.now()}`, text: '', category: 'General' };
    setChain(prev => ({ ...prev, vulnerabilities: [...prev.vulnerabilities, newVuln] }));
  };

  const updateVulnerability = (id, text, category) => {
    setChain(prev => ({
      ...prev,
      vulnerabilities: prev.vulnerabilities.map(v => v.id === id ? { ...v, text, category } : v)
    }));
  };

  const removeVulnerability = (id) => {
    setChain(prev => ({
      ...prev,
      vulnerabilities: prev.vulnerabilities.filter(v => v.id !== id)
    }));
  };

  const addLink = (type = 'Thought') => {
    const newLink = { id: `link-${Date.now()}`, type, text: '', intensity: 5 };
    setChain(prev => ({ ...prev, links: [...prev.links, newLink] }));
  };

  const updateLink = (id, field, val) => {
    setChain(prev => ({
      ...prev,
      links: prev.links.map(l => l.id === id ? { ...l, [field]: val } : l)
    }));
  };

  const removeLink = (id) => {
    setChain(prev => ({
      ...prev,
      links: prev.links.filter(l => l.id !== id),
      skills: prev.skills.filter(s => s.linkId !== id)
    }));
  };

  const addSkillIntervention = (linkId, skillId) => {
    const skillObj = DEFAULT_DBT_SKILLS.find(s => s.id === skillId);
    const newSkill = {
      id: `sk-${Date.now()}`,
      linkId,
      skillId,
      customSkillName: skillObj ? skillObj.name : 'Custom Skill',
      note: ''
    };
    setChain(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const removeSkillIntervention = (id) => {
    setChain(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
  };

  const updateSkillNote = (id, note) => {
    setChain(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, note } : s)
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Title & Date bar */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 mb-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full">
          <label className="text-xs font-semibold text-indigo-400 uppercase block mb-1">
            Analysis Title
          </label>
          <input
            type="text"
            value={chain.title}
            onChange={(e) => setChain(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g. Workplace Conflict..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 font-semibold focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Date</label>
            <input
              type="date"
              value={chain.date}
              onChange={(e) => setChain(prev => ({ ...prev, date: e.target.value }))}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Time</label>
            <input
              type="time"
              value={chain.time}
              onChange={(e) => setChain(prev => ({ ...prev, time: e.target.value }))}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Steps Nav */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 mb-6 shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isDone = activeStep > step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                  isActive ? 'bg-indigo-600 text-white font-medium' : isDone ? 'bg-slate-800 text-indigo-300' : 'text-slate-400 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center space-x-1 mb-1">
                  <span className="text-[11px] font-bold">Step {step.id}</span>
                  {isDone && <Check className="w-3 h-3 text-emerald-400" />}
                </div>
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-[11px] text-center leading-tight line-clamp-1">{step.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: TARGET BEHAVIOR */}

      {activeStep === 1 && (
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-start justify-between border-b border-slate-700 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-red-400" />
                <h2 className="text-xl font-bold text-slate-100">Step 1: Target Behavior</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Describe the specific problematic behavior or emotional reaction.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30">
              The Target
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1">
                Target Behavior Description <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={3}
                value={chain.targetBehavior.description}
                onChange={(e) => updateTargetBehavior('description', e.target.value)}
                placeholder="Be non-judgmental and specific (e.g. Slammed door and shouted...)"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Behavior Category</label>
                <select
                  value={chain.targetBehavior.category}
                  onChange={(e) => updateTargetBehavior('category', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200"
                >
                  <option value="Anger Outburst">Anger / Emotional Outburst</option>
                  <option value="Urge / Action">Impulsive Action / Slip</option>
                  <option value="Avoidance">Avoidance / Shutdown</option>
                  <option value="Self-Harm Urge">Self-Harm / Urge</option>
                  <option value="Substance Use">Substance / Bingeing</option>
                  <option value="Interpersonal Escalation">Interpersonal Argument</option>
                  <option value="Other">Other Problem Behavior</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">Intensity (1 to 10)</label>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400">
                    {chain.targetBehavior.intensity} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={chain.targetBehavior.intensity}
                  onChange={(e) => updateTargetBehavior('intensity', parseInt(e.target.value))}
                  className="w-full accent-red-500 bg-slate-700 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Location / Setting</label>
                <input
                  type="text"
                  value={chain.targetBehavior.location || ''}
                  onChange={(e) => updateTargetBehavior('location', e.target.value)}
                  placeholder="e.g. Home, office, car"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Who was present?</label>
                <input
                  type="text"
                  value={chain.targetBehavior.context || ''}
                  onChange={(e) => updateTargetBehavior('context', e.target.value)}
                  placeholder="e.g. Alone, partner, coworkers"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: VULNERABILITY FACTORS */}

      {activeStep === 2 && (
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-start justify-between border-b border-slate-700 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-bold text-slate-100">Step 2: Vulnerability Factors</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                What pre-existing conditions made you susceptible before the trigger?
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Pre-Conditions
            </span>
          </div>

          {/* Quick-add presets bar */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 space-y-2">
            <span className="text-xs font-bold text-slate-300 block">
              ⚡ Quick-Add Presets (ADHD, ASD, CPTSD & Physical):
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {VULNERABILITY_PRESETS.map((preset, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => {
                    const newVuln = { id: `v-${Date.now()}-${pIdx}`, text: preset.text, category: preset.category };
                    setChain(prev => ({ ...prev, vulnerabilities: [...prev.vulnerabilities, newVuln] }));
                  }}
                  className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-amber-500/40 transition text-left"
                  title={`Click to add: ${preset.text}`}
                >
                  + {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {chain.vulnerabilities.map((vuln, idx) => (
              <div key={vuln.id} className="flex items-center space-x-2 bg-slate-900 border border-slate-700 p-2 rounded-xl">
                <span className="text-xs font-mono font-bold text-slate-500 px-2">{idx + 1}.</span>
                <input
                  type="text"
                  value={vuln.text}
                  onChange={(e) => updateVulnerability(vuln.id, e.target.value, vuln.category)}
                  placeholder="Describe vulnerability factor..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                />
                <select
                  value={vuln.category}
                  onChange={(e) => updateVulnerability(vuln.id, vuln.text, e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-300"
                >
                  <option value="CPTSD">🛡️ CPTSD / Trauma</option>
                  <option value="ASD">🧩 ASD / Neurodivergent</option>
                  <option value="ADHD">⚡ ADHD / Executive Dysfunction</option>
                  <option value="Physical">Physical / Health</option>
                  <option value="Sleep">Sleep / Fatigue</option>
                  <option value="Emotional">Emotional Stress</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Workload">Work / School</option>
                </select>
                <button
                  onClick={() => removeVulnerability(vuln.id)}
                  className="p-1.5 text-slate-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              onClick={addVulnerability}
              className="w-full py-2 border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl text-xs font-semibold text-slate-300 hover:text-amber-400 flex items-center justify-center space-x-2 bg-slate-900/40"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vulnerability Factor</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PROMPTING EVENT */}

      {activeStep === 3 && (
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-start justify-between border-b border-slate-700 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold text-slate-100">Step 3: Prompting Event (Trigger)</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                What exact event started the reaction? (The spark).
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
              The Spark
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1">
                Prompting Event Description
              </label>
              <textarea
                rows={3}
                value={chain.promptingEvent.text}
                onChange={(e) => updatePromptingEvent('text', e.target.value)}
                placeholder="e.g. Received a critical email from boss..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Trigger Type</label>
                <div className="flex items-center space-x-4 bg-slate-900 p-2 rounded-lg border border-slate-700">
                  <label className="flex items-center space-x-2 text-xs text-slate-200 cursor-pointer">
                    <input
                      type="radio"
                      name="eventType"
                      value="External"
                      checked={chain.promptingEvent.type === 'External'}
                      onChange={(e) => updatePromptingEvent('type', e.target.value)}
                      className="accent-yellow-500"
                    />
                    <span>External</span>
                  </label>
                  <label className="flex items-center space-x-2 text-xs text-slate-200 cursor-pointer">
                    <input
                      type="radio"
                      name="eventType"
                      value="Internal"
                      checked={chain.promptingEvent.type === 'Internal'}
                      onChange={(e) => updatePromptingEvent('type', e.target.value)}
                      className="accent-yellow-500"
                    />
                    <span>Internal</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Time of Trigger</label>
                <input
                  type="text"
                  value={chain.promptingEvent.time}
                  onChange={(e) => updatePromptingEvent('time', e.target.value)}
                  placeholder="e.g. 10 minutes prior"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: CHAIN OF LINKS */}

      {activeStep === 4 && (
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-start justify-between border-b border-slate-700 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <GitCommitHorizontal className="w-6 h-6 text-indigo-400" />
                <h2 className="text-xl font-bold text-slate-100">Step 4: Chain of Links</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Unpack thoughts, feelings, sensations, and urges in sequence.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              Sequence ({chain.links.length} links)
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs text-slate-400 self-center mr-2">Quick Add:</span>
            <button
              onClick={() => addLink('Thought')}
              className="px-2.5 py-1 rounded-lg text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>🧠 Thought</span>
            </button>
            <button
              onClick={() => addLink('Emotion')}
              className="px-2.5 py-1 rounded-lg text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>❤️ Emotion</span>
            </button>
            <button
              onClick={() => addLink('Body Sensation')}
              className="px-2.5 py-1 rounded-lg text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>🫀 Sensation</span>
            </button>
            <button
              onClick={() => addLink('Action / Impulse')}
              className="px-2.5 py-1 rounded-lg text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>🚶 Impulse</span>
            </button>
          </div>

          <div className="space-y-3">
            {chain.links.map((link, idx) => (
              <div key={link.id} className="bg-slate-900 border border-slate-700 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <select
                      value={link.type}
                      onChange={(e) => updateLink(link.id, 'type', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200"
                    >
                      <option value="Thought">🧠 Thought</option>
                      <option value="Emotion">❤️ Emotion</option>
                      <option value="Body Sensation">🫀 Body Sensation</option>
                      <option value="Action / Impulse">🚶 Action / Impulse</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-[11px] text-slate-400">Intensity:</span>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={link.intensity}
                        onChange={(e) => updateLink(link.id, 'intensity', parseInt(e.target.value))}
                        className="w-16 accent-indigo-400"
                      />
                      <span className="text-xs font-bold font-mono w-4">{link.intensity}</span>
                    </div>
                    <button
                      onClick={() => removeLink(link.id)}
                      className="p-1 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={link.text}
                  onChange={(e) => updateLink(link.id, 'text', e.target.value)}
                  placeholder={`Describe this ${link.type.toLowerCase()}...`}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
                />
              </div>
            ))}

            {chain.links.length === 0 && (
              <div className="text-center py-6 text-slate-400 border border-dashed border-slate-700 rounded-xl text-xs">
                No links added yet. Click any quick add button above.
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 5: CONSEQUENCES */}

      {activeStep === 5 && (
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-start justify-between border-b border-slate-700 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <Scale className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-slate-100">Step 5: Consequences</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Analyze both immediate outcomes and longer-term impacts.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
              Outcomes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-2">
              <label className="text-xs font-bold text-emerald-400 block">⚡ Short-term Consequences (Immediate)</label>
              <textarea
                rows={4}
                value={chain.consequences.shortTerm}
                onChange={(e) => setChain(prev => ({
                  ...prev,
                  consequences: { ...prev.consequences, shortTerm: e.target.value }
                }))}
                placeholder="Immediate relief, tension release, temporary escape..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none"
              />
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-2">
              <label className="text-xs font-bold text-rose-400 block">📉 Long-term Consequences (Later Impact)</label>
              <textarea
                rows={4}
                value={chain.consequences.longTerm}
                onChange={(e) => setChain(prev => ({
                  ...prev,
                  consequences: { ...prev.consequences, longTerm: e.target.value }
                }))}
                placeholder="Regret, strained trust, physical aftermath..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: SKILL INTERVENTIONS */}

      {activeStep === 6 && (
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-start justify-between border-b border-slate-700 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-emerald-400" />
                <h2 className="text-xl font-bold text-slate-100">Step 6: Skill Interventions</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Where could you insert a coping skill to break the chain next time?
              </p>
            </div>
            <button
              onClick={onOpenSkills}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
            >
              Skills Library
            </button>
          </div>

          <div className="space-y-4">
            {chain.links.map((link, idx) => {
              const linkSkills = chain.skills.filter(s => s.linkId === link.id);
              return (
                <div key={link.id} className="bg-slate-900 border border-slate-700 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">
                      Link #{idx + 1} [{link.type}]: <span className="font-normal italic text-slate-400">"{link.text || 'Untitled'}"</span>
                    </span>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          addSkillIntervention(link.id, e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-emerald-300"
                    >
                      <option value="">+ Attach DBT Skill...</option>
                      {DEFAULT_DBT_SKILLS.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.category})</option>
                      ))}
                    </select>
                  </div>

                  {linkSkills.map(sk => (
                    <div key={sk.id} className="bg-emerald-950/40 border border-emerald-500/40 rounded-lg p-2.5 flex items-start space-x-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="text-xs font-bold text-emerald-300">{sk.customSkillName}</span>
                        <input
                          type="text"
                          value={sk.note}
                          onChange={(e) => updateSkillNote(sk.id, e.target.value)}
                          placeholder="How exactly would you use this skill at this link?"
                          className="w-full mt-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100"
                        />
                      </div>
                      <button
                        onClick={() => removeSkillIntervention(sk.id)}
                        className="text-slate-400 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}

            {chain.links.length === 0 && (
              <p className="text-xs text-amber-400 italic">
                Please add chain links in Step 4 first before attaching coping skills!
              </p>
            )}
          </div>
        </div>
      )}

      {/* STEP 7: PREVENTION & REPAIR */}

      {activeStep === 7 && (
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-start justify-between border-b border-slate-700 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <HeartHandshake className="w-6 h-6 text-pink-400" />
                <h2 className="text-xl font-bold text-slate-100">Step 7: Prevention & Harm Repair Plan</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Plan actions to reduce future vulnerabilities and repair any long-term damage.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/30">
              Future Plan
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                🛡️ Prevention Plan (Reducing Vulnerabilities)
              </label>
              <textarea
                rows={3}
                value={chain.preventionPlan}
                onChange={(e) => setChain(prev => ({ ...prev, preventionPlan: e.target.value }))}
                placeholder="e.g. Set consistent bedtime (PLEASE skill), prepare meals in advance..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                🩹 Harm Repair & Amends Plan
              </label>
              <textarea
                rows={3}
                value={chain.repairPlan}
                onChange={(e) => setChain(prev => ({ ...prev, repairPlan: e.target.value }))}
                placeholder="e.g. Write a sincere apology note, offer to assist with project..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                📝 Additional Notes / Insights (Optional)
              </label>
              <textarea
                rows={2}
                value={chain.therapistNotes || ''}
                onChange={(e) => setChain(prev => ({ ...prev, therapistNotes: e.target.value }))}
                placeholder="Notes for therapy session discussion..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800">
        <button
          disabled={activeStep === 1}
          onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        {activeStep < 7 ? (
          <button
            onClick={() => setActiveStep(prev => Math.min(7, prev + 1))}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onCompleteToCanvas}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transition"
          >
            <span>View Interactive Flowchart</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}


