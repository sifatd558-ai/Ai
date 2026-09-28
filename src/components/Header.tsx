import React from 'react';
import { 
  Sparkles, 
  Languages, 
  User, 
  History, 
  Calculator, 
  Mail, 
  Share2,
  ExternalLink,
  Flame
} from 'lucide-react';
import { Language, UserProfile } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  profile: UserProfile;
  onOpenProfile: () => void;
  onOpenHistory: () => void;
  onSelectTool: (toolId: string) => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  profile,
  onOpenProfile,
  onOpenHistory,
  onSelectTool,
  historyCount
}) => {
  const isBn = language === 'bn';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-lg shadow-purple-500/20 text-white font-bold">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#090d16]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  AI Content Suite <span className="text-purple-400 font-extrabold">Pro</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  <Flame className="w-2.5 h-2.5 text-amber-400" />
                  SEO & Ads Hub
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-md">
                {isBn 
                  ? 'ডিজিটাল মার্কেটিং, ইউটিউব এসইও ও অ্যাডস স্পেশালিস্ট টুলকিট' 
                  : 'YouTube Video SEO, Google & Meta Ads, Content Writing Suite'}
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Links */}
            <button
              onClick={() => onSelectTool('calculator')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-colors"
              title="Ad & ROAS Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>ROAS Tool</span>
            </button>

            <button
              onClick={() => onSelectTool('email-signature')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-colors"
              title="Interactive Email Signature"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Signature</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-slate-200 transition-all hover:border-purple-500/50"
              title="Change Language (English / বাংলা)"
            >
              <Languages className="w-3.5 h-3.5 text-purple-400" />
              <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            {/* History Button */}
            <button
              onClick={onOpenHistory}
              className="relative p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
              title={isBn ? 'সংরক্ষিত হিস্টোরি' : 'Saved Generations'}
            >
              <History className="w-4 h-4 text-amber-400" />
              {historyCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-purple-600 text-white">
                  {historyCount > 9 ? '9+' : historyCount}
                </span>
              )}
            </button>

            {/* User Profile Pill */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-gradient-to-r from-slate-900 to-purple-950/40 border border-purple-500/30 hover:border-purple-400 text-left transition-all hover:shadow-md hover:shadow-purple-500/10"
              title={isBn ? 'প্রোফাইল বিবরণ দেখুন ও এডিট করুন' : 'View & Edit Marketer Profile'}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-purple-400/30">
                {profile.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <div className="text-xs font-semibold text-slate-200 truncate max-w-[120px]">
                  {profile.name}
                </div>
                <div className="text-[10px] text-purple-400 font-medium">
                  {isBn ? 'ডিজিটাল মার্কেটার' : 'SEO Specialist'}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
