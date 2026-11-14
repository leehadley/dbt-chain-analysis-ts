import { useState } from 'react';
import {
  X,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Target,
  ShieldAlert,
  Zap,
  GitCommitHorizontal,
  Scale,
  Sparkles,
  HeartHandshake,
  BookOpen
} from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartWizard: () => void;
  onLoadNDDemo: () => void;
}

export default function GuideModal({
  isOpen,
  onClose,
  onStartWizard,
  onLoadNDDemo
}: GuideModalProps) {
  const [activeTab, setActiveTab] = useState<'concept' | 'anatomy' | 'how-to' | 'examples'>('concept');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-slate-100">What is a Chain Analysis?</h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  Beginner Guide
                </span>
              </div>
              <p className="text-xs text-slate-400">Understanding and building DBT Behavioral Chain Analyses</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 pt-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('concept')}
            className={`px-3 py-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'concept' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10 rounded-t-lg' : 'border-transparent text-slate-400'
            }`}
          >
            1. Domino Concept 🧩
          </button>
          <button
            onClick={() => setActiveTab('anatomy')}
            className={`px-3 py-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'anatomy' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10 rounded-t-lg' : 'border-transparent text-slate-400'
            }`}
          >
            2. The 7 Steps 🧭
          </button>
          <button
            onClick={() => setActiveTab('how-to')}
            className={`px-3 py-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'how-to' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10 rounded-t-lg' : 'border-transparent text-slate-400'
            }`}
          >
            3. How to Build 🛠️
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`px-3 py-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'examples' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10 rounded-t-lg' : 'border-transparent text-slate-400'
            }`}
          >
            4. Examples 💡
          </button>
        </div>

        {/* Content Placeholder */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-slate-200 text-xs">
          {activeTab === 'concept' && (
            <div className="space-y-4">
              <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-indigo-300 font-bold text-sm">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>The Core Idea: Behaviors are domino sequences</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  A <strong>DBT Behavioral Chain Analysis</strong> breaks down a specific problematic reaction (outburst, shut-down, urge, or avoidance) into tiny domino steps from pre-conditions to aftermath.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Instead of blaming yourself, you uncover the exact sequence of <strong>Thoughts 🧠, Emotions ❤️, Body Sensations 🫀, and Actions 🚶</strong> so you can insert <em>coping circuit breakers</em> next time.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">The Chain Anatomy</span>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-[11px]">
                  <div className="p-2 bg-amber-950/40 border border-amber-500/30 rounded-lg">
                    <strong className="text-amber-400 block">Vulnerability</strong>
                    <span className="text-slate-400">Poor sleep / overload</span>
                  </div>
                  <div className="p-2 bg-yellow-950/40 border border-yellow-500/30 rounded-lg">
                    <strong className="text-yellow-400 block">Spark Trigger</strong>
                    <span className="text-slate-400">Critical remark</span>
                  </div>
                  <div className="p-2 bg-cyan-950/40 border border-cyan-500/30 rounded-lg">
                    <strong className="text-cyan-400 block">Chain Links</strong>
                    <span className="text-slate-400">Thoughts &amp; Sensations</span>
                  </div>
                  <div className="p-2 bg-red-950/40 border border-red-500/30 rounded-lg">
                    <strong className="text-red-400 block">Target Behavior</strong>
                    <span className="text-slate-400">Outburst / Panic</span>
                  </div>
                  <div className="p-2 bg-purple-950/40 border border-purple-500/30 rounded-lg">
                    <strong className="text-purple-400 block">Aftermath</strong>
                    <span className="text-slate-400">Short relief / Long cost</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-3 space-y-1">
                  <span className="font-bold text-slate-200 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Why Build One?</span>
                  </span>
                  <p className="text-[11px] text-slate-300">
                    It replaces shame with understanding, identifies early warning signs, and shows exactly where to use coping skills.
                  </p>
                </div>
                <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-3 space-y-1">
                  <span className="font-bold text-slate-200 flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>What it is NOT</span>
                  </span>
                  <p className="text-[11px] text-slate-300">
                    It is not self-punishment or an excuse; it is an objective, non-judgmental problem-solving tool.
                  </p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'anatomy' && (
            <div className="space-y-2">
              <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl space-y-1">
                <strong className="text-red-400 flex items-center space-x-1.5"><Target className="w-3.5 h-3.5" /> <span>Step 1: Target Behavior</span></strong>
                <p className="text-slate-300">The specific action or reaction you want to analyze and replace.</p>
              </div>
              <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl space-y-1">
                <strong className="text-amber-400 flex items-center space-x-1.5"><ShieldAlert className="w-3.5 h-3.5" /> <span>Step 2: Vulnerability Factors</span></strong>
                <p className="text-slate-300">Pre-existing states (poor sleep, hunger, ADHD overload, CPTSD threat state) that made you fragile beforehand.</p>
              </div>
              <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl space-y-1">
                <strong className="text-yellow-400 flex items-center space-x-1.5"><Zap className="w-3.5 h-3.5" /> <span>Step 3: Prompting Event</span></strong>
                <p className="text-slate-300">The specific trigger spark that ignited the domino sequence.</p>
              </div>
              <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl space-y-1">
                <strong className="text-cyan-400 flex items-center space-x-1.5"><GitCommitHorizontal className="w-3.5 h-3.5" /> <span>Step 4: Chain of Links</span></strong>
                <p className="text-slate-300">The micro-dominoes: Thoughts 🧠, Emotions ❤️, Body Sensations 🫀, and Impulses 🚶.</p>
              </div>
              <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl space-y-1">
                <strong className="text-purple-400 flex items-center space-x-1.5"><Scale className="w-3.5 h-3.5" /> <span>Step 5: Consequences</span></strong>
                <p className="text-slate-300">Short-term relief (why the brain picked the behavior) vs. long-term negative impact.</p>
              </div>
              <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl space-y-1">
                <strong className="text-emerald-400 flex items-center space-x-1.5"><Sparkles className="w-3.5 h-3.5" /> <span>Step 6: Skill Interventions</span></strong>
                <p className="text-slate-300">Attaching DBT skills (STOP, TIPP, Check Facts) directly to links to break the sequence.</p>
              </div>
              <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl space-y-1">
                <strong className="text-pink-400 flex items-center space-x-1.5"><HeartHandshake className="w-3.5 h-3.5" /> <span>Step 7: Prevention &amp; Repair</span></strong>
                <p className="text-slate-300">Future vulnerability reduction and how to make amends for harm done.</p>
              </div>
            </div>
          )}
          {activeTab === 'how-to' && (
            <div className="space-y-2.5">
              <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-3">
                <strong className="text-indigo-300 font-bold flex items-center space-x-1.5"><BookOpen className="w-4 h-4" /> <span>5 Tips for Your First Chain Analysis</span></strong>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 flex space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                <p className="text-slate-300"><strong>Pick ONE specific incident:</strong> Choose a specific date/time (e.g., "Tuesday at 4 PM when I slammed my door") rather than a general mood.</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 flex space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                <p className="text-slate-300"><strong>Work backwards from the behavior:</strong> Ask "What was I thinking 10 seconds before?" to trace the chain step-by-step.</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 flex space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                <p className="text-slate-300"><strong>Separate Thoughts vs. Sensations:</strong> 🧠 Thought = "They're mad at me", ❤️ Emotion = Fear, 🫀 Sensation = Chest tightness.</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 flex space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
                <p className="text-slate-300"><strong>Attach skills early:</strong> Coping skills work best when emotion intensity is under 7/10 before panic sets in.</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 flex space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">5</span>
                <p className="text-slate-300"><strong>Be non-judgmental:</strong> Frame it as scientific curiosity about how your nervous system reacted.</p>
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-3">
              <p className="text-slate-400">Try loading a pre-filled template to explore how a finished chain analysis looks:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
                  <strong className="text-emerald-400 flex items-center space-x-1.5"><Sparkles className="w-3.5 h-3.5" /> <span>ASD/ADHD/CPTSD Avoidance</span></strong>
                  <p className="text-slate-400 text-[11px]">Maps sensory overload, masking burnout, RSD, and post-event internal audit.</p>
                  <button onClick={() => { onLoadNDDemo(); onClose(); }} className="w-full py-1.5 bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-lg font-semibold hover:bg-emerald-600/30 transition text-center">
                    Load ASD/ADHD Template
                  </button>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
                  <strong className="text-indigo-400 flex items-center space-x-1.5"><Sparkles className="w-3.5 h-3.5" /> <span>Workplace Conflict Outburst</span></strong>
                  <p className="text-slate-400 text-[11px]">Maps deadline stress, ambiguous feedback trigger, physiological arousal, and repair.</p>
                  <button onClick={() => { onStartWizard(); onClose(); }} className="w-full py-1.5 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-lg font-semibold hover:bg-indigo-600/30 transition text-center">
                    Start Guided Wizard
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* MORE TABS */}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-slate-400 text-xs">Ready to try?</span>
          <div className="flex items-center space-x-2">
            <button onClick={onClose} className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
              Close
            </button>
            <button onClick={() => { onStartWizard(); onClose(); }} className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow flex items-center space-x-1">
              <span>Start 7-Step Wizard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
