import React, { useState, useEffect } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  ProfileModal 
} from './components/ProfileModal';
import { 
  HistoryDrawer 
} from './components/HistoryDrawer';
import { 
  EmailSignatureTool 
} from './components/EmailSignatureTool';
import { 
  RoasCalculator 
} from './components/RoasCalculator';
import { 
  ToolForm 
} from './components/ToolForm';
import { 
  OutputView 
} from './components/OutputView';
import { 
  allTools, 
  toolCategories, 
  defaultProfileData 
} from './data/toolsData';
import { 
  ToolDefinition, 
  Language, 
  UserProfile, 
  GeneratedHistoryItem 
} from './types';
import { 
  Sparkles, 
  Youtube, 
  Target, 
  Globe, 
  Share2, 
  Briefcase, 
  Calculator,
  Search,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Tag,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('preferred_language') as Language) || 'bn';
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('marketer_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultProfileData;
      }
    }
    return defaultProfileData;
  });

  const [activeCategory, setActiveCategory] = useState<string>('youtube');
  const [activeToolId, setActiveToolId] = useState<string>('youtube-seo');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [history, setHistory] = useState<GeneratedHistoryItem[]>(() => {
    const saved = localStorage.getItem('generation_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [currentResult, setCurrentResult] = useState<string>('');
  const [isFallback, setIsFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  // Persist language
  useEffect(() => {
    localStorage.setItem('preferred_language', language);
  }, [language]);

  // Persist profile
  useEffect(() => {
    localStorage.setItem('marketer_profile', JSON.stringify(profile));
  }, [profile]);

  // Persist history
  useEffect(() => {
    localStorage.setItem('generation_history', JSON.stringify(history));
  }, [history]);

  const isBn = language === 'bn';

  const currentTool = allTools.find(t => t.id === activeToolId) || allTools[0];

  const handleSelectTool = (toolId: string) => {
    if (toolId === 'calculator') {
      setActiveCategory('calculator');
      setActiveToolId('calculator');
      return;
    }
    if (toolId === 'email-signature') {
      setActiveCategory('freelance');
      setActiveToolId('email-signature');
      return;
    }
    const tool = allTools.find(t => t.id === toolId);
    if (tool) {
      setActiveCategory(tool.category);
      setActiveToolId(tool.id);
    }
  };

  const handleGenerate = async (prompt: string, targetLang: Language, options: any) => {
    setIsLoading(true);
    setCurrentPrompt(prompt);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: activeToolId,
          prompt,
          language: targetLang,
          options: {
            ...options,
            marketerInfo: profile
          }
        }),
      });

      const data = await response.json();
      const outputText = data.result || '';
      setCurrentResult(outputText);
      setIsFallback(Boolean(data.isFallback));

      // Append to history
      const newItem: GeneratedHistoryItem = {
        id: `gen-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        toolId: activeToolId,
        toolTitle: currentTool.title[language] || currentTool.title.en,
        prompt,
        result: outputText,
        timestamp: Date.now(),
        language: targetLang,
        favorite: false
      };
      setHistory(prev => [newItem, ...prev.slice(0, 49)]); // keep up to 50 items
    } catch (err) {
      console.error('Generation error:', err);
      setCurrentResult(`⚠️ An error occurred while generating. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryItem = (item: GeneratedHistoryItem) => {
    handleSelectTool(item.toolId);
    setCurrentResult(item.result);
    setCurrentPrompt(item.prompt);
    setIsHistoryOpen(false);
  };

  const handleToggleFavorite = (id: string) => {
    setHistory(prev => prev.map(item => item.id === id ? { ...item, favorite: !item.favorite } : item));
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleClearAllHistory = () => {
    if (window.confirm(isBn ? 'আপনি কি নিশ্চিত যে সব হিস্টোরি মুছে ফেলতে চান?' : 'Clear all saved history?')) {
      setHistory([]);
    }
  };

  const handleAskAiScaling = (metricsText: string) => {
    handleSelectTool('meta-ads');
    handleGenerate(metricsText, language, { tone: 'high-converting' });
  };

  // Icon selector helper
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'youtube': return <Youtube className="w-4 h-4 text-red-400" />;
      case 'ads': return <Target className="w-4 h-4 text-cyan-400" />;
      case 'seo': return <Globe className="w-4 h-4 text-emerald-400" />;
      case 'social': return <Share2 className="w-4 h-4 text-pink-400" />;
      case 'freelance': return <Briefcase className="w-4 h-4 text-purple-400" />;
      case 'calculator': return <Calculator className="w-4 h-4 text-amber-400" />;
      default: return <Sparkles className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-[#e2e8f0] flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Navigation */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        profile={profile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onSelectTool={handleSelectTool}
        historyCount={history.length}
      />

      {/* Hero Welcome Ribbon */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#11162a]/60 via-[#0c101e]/80 to-[#090d16] py-8 sm:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.12),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.08),transparent_40%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-3">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                {isBn 
                  ? 'রফিকুল ইসলাম • ডিজিটাল মার্কেটিং ও এসইও কমান্ড সেন্টার' 
                  : 'Engineered for Digital Marketers, YouTube SEO & Ads Specialists'}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                AI Content Suite <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">Pro</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {isBn 
                  ? 'ইউটিউব ভিডিও এসইও (টাইটেল, ডেসক্রিপশন, ৫০০ ক্যারেক্টার ট্যাগ), মেটা ও গুগল অ্যাডস কপি, অন-পেজ ওয়েবসাইট এসইও এবং ক্লায়েন্ট প্রপোজাল তৈরি করার অল-ইন-ওয়ান এআই স্যুট।' 
                  : 'All-in-one AI platform for YouTube Video SEO (Rank 1 descriptions & 500-char tags), Google & Meta Ads copy, On-Page SEO, and client-winning freelance proposals.'}
              </p>

              {/* Specialization Chips */}
              <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] font-medium text-slate-300">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 flex items-center gap-1.5">
                  <Youtube className="w-3.5 h-3.5 text-red-400" />
                  YouTube Video SEO (CTR 90+)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                  Google & Meta Ads (AIDA / PAS)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  Website On-Page & Schema
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  HTML Email Signature
                </span>
              </div>
            </div>

            {/* Marketer Profile Quick Card */}
            <div className="shrink-0">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/20 backdrop-blur-md shadow-xl flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-md ring-2 ring-purple-400/30">
                    {profile.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#090d16]" />
                </div>

                <div className="text-left space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">{profile.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                      Expert
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-300 font-medium max-w-[200px] truncate">
                    {profile.designation}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
                    📍 {profile.address}
                  </p>
                  <div className="pt-1 flex items-center gap-2">
                    <button
                      onClick={() => setIsProfileModalOpen(true)}
                      className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      {isBn ? 'প্রোফাইল দেখুন' : 'View Profile Card'} &rarr;
                    </button>
                    <span className="text-slate-600">•</span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-[10px] text-slate-400 hover:text-white"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Suite Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
          {toolCategories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id === 'calculator') {
                    setActiveToolId('calculator');
                  } else {
                    const firstInCat = allTools.find(t => t.category === cat.id);
                    if (firstInCat) setActiveToolId(firstInCat.id);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{isBn ? cat.labelBn : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Sub-tool Selector Bar (if category has multiple tools) */}
        {activeCategory !== 'calculator' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1 shrink-0">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              {isBn ? 'টুলস নির্বাচন করুন:' : 'Select Tool:'}
            </span>
            {allTools
              .filter(t => t.category === activeCategory)
              .map(tool => {
                const isSelected = activeToolId === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveToolId(tool.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-slate-800 text-purple-300 border border-purple-500/50 shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:bg-slate-800/60'
                    }`}
                  >
                    {tool.title[language] || tool.title.en}
                  </button>
                );
              })}
          </div>
        )}

        {/* Dynamic Tool Workspace Container */}
        <div>
          {activeToolId === 'email-signature' ? (
            <EmailSignatureTool profile={profile} language={language} />
          ) : activeToolId === 'calculator' || activeCategory === 'calculator' ? (
            <RoasCalculator language={language} onAskAiScaling={handleAskAiScaling} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Form Input Column */}
              <div className="lg:col-span-6 space-y-6">
                <ToolForm
                  tool={currentTool}
                  language={language}
                  onGenerate={handleGenerate}
                  isLoading={isLoading}
                  initialPrompt={currentPrompt}
                />
              </div>

              {/* Output Display Column */}
              <div className="lg:col-span-6 space-y-6">
                {currentResult ? (
                  <OutputView
                    result={currentResult}
                    toolId={activeToolId}
                    language={language}
                    isFallback={isFallback}
                  />
                ) : (
                  <div className="p-10 rounded-2xl bg-[#0f172a]/70 border border-dashed border-slate-800 flex flex-col items-center justify-center text-center space-y-3 min-h-[420px]">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-1">
                      <Sparkles className="w-7 h-7 animate-pulse" />
                    </div>
                    <h3 className="font-bold text-white text-base">
                      {isBn ? 'আপনার আউটপুট এখানে প্রদর্শিত হবে' : 'Your Pro Marketing Asset Will Appear Here'}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                      {isBn
                        ? 'বামের ফর্মে আপনার টপিক বা কিওয়ার্ড লিখে "এখনই তৈরি করুন" বাটনে ক্লিক করুন। এক নিমেষেই পেয়ে যাবেন উচ্চমানের এসইও ও অ্যাডস কন্টেন্ট।'
                        : 'Fill in your topic or click any of the quick presets on the left. Gemini 3.8 Flash will instantly craft high-converting copy.'}
                    </p>
                    <div className="pt-2 flex flex-wrap justify-center gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {isBn ? '১-ক্লিকে ট্যাগ কপি' : '1-Click Tag Copy'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {isBn ? 'Google SERP প্রিভিউ' : 'Google SERP Preview'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {isBn ? 'স্বয়ংক্রিয় হিস্টোরি সেভ' : 'Auto History Save'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Credentials */}
      <footer className="border-t border-slate-800/80 bg-[#070a12] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                R
              </div>
              <span className="font-semibold text-slate-300">
                AI Content Suite Pro
              </span>
              <span>•</span>
              <span className="text-slate-400">
                Created for <strong className="text-slate-200">MD. Rofikul Islam</strong>
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-400 flex-wrap justify-center">
              <span>M: {profile.phone}</span>
              <span>•</span>
              <span>E: {profile.email}</span>
              <span>•</span>
              <a 
                href={profile.linktree.startsWith('http') ? profile.linktree : `https://${profile.linktree}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline"
              >
                {profile.linktreeDisplay}
              </a>
            </div>

            <div className="text-slate-600">
              Rowmari, Kurigram | 5640, Bangladesh
            </div>
          </div>
        </div>
      </footer>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={setProfile}
        language={language}
      />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={history}
        onSelectHistory={handleSelectHistoryItem}
        onToggleFavorite={handleToggleFavorite}
        onDeleteItem={handleDeleteHistoryItem}
        onClearAll={handleClearAllHistory}
        language={language}
      />
    </div>
  );
}
