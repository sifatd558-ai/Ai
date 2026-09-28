import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Flame, 
  Zap, 
  Sliders, 
  FileText,
  RotateCcw,
  Languages
} from 'lucide-react';
import { ToolDefinition, Language } from '../types';

interface ToolFormProps {
  tool: ToolDefinition;
  language: Language;
  onGenerate: (prompt: string, targetLanguage: Language, options: any) => void;
  isLoading: boolean;
  initialPrompt?: string;
}

export const ToolForm: React.FC<ToolFormProps> = ({
  tool,
  language,
  onGenerate,
  isLoading,
  initialPrompt = ''
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [targetLang, setTargetLang] = useState<Language>(language);
  const [tone, setTone] = useState<'high-converting' | 'professional' | 'viral-catchy' | 'storytelling'>('high-converting');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customKeyword, setCustomKeyword] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  const isBn = language === 'bn';

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onGenerate(prompt, targetLang, {
      tone,
      customKeyword,
      targetAudience
    });
  };

  const handleSelectSample = (sample: string) => {
    setPrompt(sample);
  };

  return (
    <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-xl space-y-5">
      {/* Tool Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
            {tool.category.toUpperCase()}
          </span>
          {tool.badge && (
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {tool.badge}
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          {tool.title[language] || tool.title.en}
        </h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          {tool.description[language] || tool.description.en}
        </p>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
            <span>
              {isBn ? 'আপনার টপিক, কিওয়ার্ড বা ব্রিফ লিখুন:' : 'Enter Topic, Keywords or Marketing Brief:'}
            </span>
            <span className="text-[11px] text-slate-500">
              {prompt.length} chars
            </span>
          </div>

          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={tool.placeholder[language] || tool.placeholder.en}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-y"
          />
        </div>

        {/* Quick Sample Presets */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            {isBn ? 'দ্রুত ব্যবহারের জন্য স্যাম্পল আইডিয়া:' : 'Quick Sample Presets (Click to Fill):'}
          </div>
          <div className="flex flex-wrap gap-2">
            {(tool.samplePrompts[language] || tool.samplePrompts.en).map((sample, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => handleSelectSample(sample)}
                className="text-left text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 hover:border-purple-500/40 transition-all"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Output Controls & Tone Selector */}
        <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-purple-400" />
              {isBn ? 'আউটপুট ভাষা' : 'Output Language'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTargetLang('bn')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                  targetLang === 'bn'
                    ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                বাংলা (Bengali)
              </button>
              <button
                type="button"
                onClick={() => setTargetLang('en')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                  targetLang === 'en'
                    ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                English (Global)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              {isBn ? 'মার্কেটিং টোন' : 'Marketing Tone & Style'}
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
            >
              <option value="high-converting">🔥 High-Converting / Sales-Focused</option>
              <option value="viral-catchy">⚡ Viral / High CTR / Catchy</option>
              <option value="professional">💼 Professional Agency / Corporate</option>
              <option value="storytelling">📖 Storytelling & Emotional Hook</option>
            </select>
          </div>
        </div>

        {/* Generate Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm text-white shadow-xl transition-all cursor-pointer ${
              isLoading || !prompt.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-purple-600/25 hover:shadow-purple-600/40 active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-purple-300" />
                <span>{isBn ? 'AI দিয়ে জেনারেট হচ্ছে...' : 'AI is Generating with Gemini 3.8 Flash...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isBn ? 'এখনই তৈরি করুন' : 'Generate Pro Content'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
