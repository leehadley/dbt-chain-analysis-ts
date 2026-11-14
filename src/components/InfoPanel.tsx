import { X, BookOpen, Target, Lightbulb, Shield } from 'lucide-react';

interface InfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoPanel({ isOpen, onClose }: InfoPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full my-8 shadow-2xl">

        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">What is DBT Chain Analysis?</h2>
              <p className="text-xs text-slate-400">Learn how to understand and change problem behaviors</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(85vh-120px)]">

          {/* Overview */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <Target className="w-5 h-5 text-red-400" />
              <span>Overview</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              A <span className="font-semibold text-indigo-300">Behavioral Chain Analysis</span> is a structured, 7-step clinical tool from Dialectical Behavior Therapy (DBT) that helps you understand how a problem behavior develops. It maps the sequence of thoughts, emotions, body sensations, and urges that lead to a targeted behavior—and where to insert coping skills to interrupt the chain.
            </p>
          </section>

          {/* Why Use It */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <span>Why Use Chain Analysis?</span>
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start space-x-2">
                <span className="text-indigo-400 font-bold">→</span>
                <span><span className="font-semibold">Understand triggers:</span> Identify the real events that set off emotional reactions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-indigo-400 font-bold">→</span>
                <span><span className="font-semibold">Break automatic patterns:</span> See the thought-emotion-action link and where to intervene</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-indigo-400 font-bold">→</span>
                <span><span className="font-semibold">Plan alternatives:</span> Develop coping strategies for next time</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-indigo-400 font-bold">→</span>
                <span><span className="font-semibold">Reduce shame:</span> Normalize struggles and build self-compassion</span>
              </li>
            </ul>
          </section>

          {/* The 7 Steps */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span>The 7-Step Process</span>
            </h3>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="bg-slate-800/60 p-3 rounded-lg border-l-2 border-red-500">
                <span className="font-semibold text-red-400">1. Target Behavior:</span> The specific problem behavior or emotional reaction you want to understand (e.g., yelled at partner, avoided social event)
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border-l-2 border-amber-500">
                <span className="font-semibold text-amber-400">2. Vulnerability Factors:</span> Pre-existing conditions that made you more susceptible (sleep loss, hunger, stress, sensory overload, trauma responses)
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border-l-2 border-yellow-500">
                <span className="font-semibold text-yellow-400">3. Prompting Event:</span> The actual trigger or situation that occurred right before the behavior
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border-l-2 border-indigo-500">
                <span className="font-semibold text-indigo-400">4. Chain of Links:</span> The sequence of thoughts, emotions, body sensations, and urges that unfolded in response to the trigger
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border-l-2 border-purple-500">
                <span className="font-semibold text-purple-400">5. Consequences:</span> Both short-term relief/outcomes and long-term impacts of the behavior
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border-l-2 border-emerald-500">
                <span className="font-semibold text-emerald-400">6. Skill Interventions:</span> Where could you have inserted a DBT coping skill to break the chain?
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border-l-2 border-pink-500">
                <span className="font-semibold text-pink-400">7. Prevention & Repair:</span> Plans to reduce future vulnerabilities and repair any damage from the behavior
              </div>
            </div>
          </section>

          {/* Neurodivergent Focus */}
          <section className="space-y-3 bg-slate-800/40 p-4 rounded-xl border border-slate-700">
            <h3 className="text-base font-bold text-slate-100">🧠 Neurodivergent-Informed</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              This tool includes specialized vulnerability presets and coping strategies for ADHD (rejection sensitivity, executive fatigue), ASD (masking exhaustion, routine disruption, sensory overload), and CPTSD (emotional flashbacks, hypervigilance, threat perception). Chain analysis honors your nervous system's unique needs.
            </p>
          </section>

          {/* How to Use This App */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-100">How to Use This App</h3>
            <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
              <li><span className="font-semibold">Start the Wizard:</span> Follow the guided 7-step process</li>
              <li><span className="font-semibold">View the Flowchart:</span> See your chain visually with intensity curves</li>
              <li><span className="font-semibold">Reference Skills:</span> Browse 12+ evidence-based DBT coping skills</li>
              <li><span className="font-semibold">Print or Export:</span> Save your analysis as PDF or JSON</li>
              <li><span className="font-semibold">Track Progress:</span> Build a library of your personal analyses</li>
            </ol>
          </section>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition"
          >
            Got it, let's start
          </button>
        </div>
      </div>
    </div>
  );
}
