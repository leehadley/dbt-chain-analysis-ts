import { useState } from 'react';
import { BookOpen, Search, X, ShieldCheck, OctagonAlert, Thermometer, ArrowLeftRight, Compass, MessageSquare, Sparkles, Waves, HeartPulse } from 'lucide-react';
import { DEFAULT_DBT_SKILLS, DBT_SKILL_CATEGORIES } from '../constants/dbtSkills';
import type { ElementType } from 'react';

const ICON_MAP: Record<string, ElementType> = {
  OctagonAlert, Thermometer, Search, ShieldCheck, ArrowLeftRight, Compass, MessageSquare, Sparkles, Waves, HeartPulse
} as const;

interface SkillsLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SkillsLibraryModal({ isOpen, onClose }: SkillsLibraryModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  if (!isOpen) return null;

  const filteredSkills = DEFAULT_DBT_SKILLS.filter(skill => {
    const matchesCategory = selectedCategory === 'ALL' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.bestFor.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">

        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">DBT Coping Skills Library</h2>
              <p className="text-xs text-slate-400">Evidence-based dialectical behavioral skills reference</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (e.g. TIPP, STOP, urge, anger, sleep)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${selectedCategory === 'ALL' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              All Skills
            </button>
            {Object.values(DBT_SKILL_CATEGORIES).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Cards List */}

        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {filteredSkills.map(skill => {
            const IconComponent = (ICON_MAP[skill.icon] as unknown as ElementType) || Sparkles;
            return (
              <div key={skill.id} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{skill.name}</h3>
                    <span className="text-[10px] text-emerald-400 font-mono font-medium">{skill.category}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{skill.summary}</p>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-1 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    How to practice:
                  </span>
                  {skill.steps.map((st, i) => (
                    <div key={i} className="text-slate-200 text-[11px] flex items-start space-x-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skill.bestFor.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredSkills.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              No coping skills matched your search.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
          >
            Close Reference
          </button>
        </div>
      </div>
    </div>
  );
}
