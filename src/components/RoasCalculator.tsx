import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Users, 
  ShoppingCart, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Language } from '../types';

interface RoasCalculatorProps {
  language: Language;
  onAskAiScaling?: (metricsText: string) => void;
}

export const RoasCalculator: React.FC<RoasCalculatorProps> = ({ language, onAskAiScaling }) => {
  const [adSpend, setAdSpend] = useState<number>(500);
  const [cpc, setCpc] = useState<number>(0.50);
  const [convRate, setConvRate] = useState<number>(2.5);
  const [aov, setAov] = useState<number>(65);
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD');

  const isBn = language === 'bn';
  const currSymbol = currency === 'USD' ? '$' : '৳';

  // Math Calculations
  const clicks = cpc > 0 ? Math.floor(adSpend / cpc) : 0;
  const conversions = Math.floor(clicks * (convRate / 100));
  const revenue = conversions * aov;
  const roas = adSpend > 0 ? (revenue / adSpend) : 0;
  const netProfit = revenue - adSpend;
  const roi = adSpend > 0 ? ((netProfit / adSpend) * 100) : 0;

  const handleAskAi = () => {
    if (onAskAiScaling) {
      const summary = `Analyze this campaign for scaling:
- Total Ad Spend: ${currSymbol}${adSpend}
- Average CPC: ${currSymbol}${cpc}
- Conversion Rate: ${convRate}%
- Average Order Value (AOV): ${currSymbol}${aov}
- Estimated Clicks: ${clicks.toLocaleString()}
- Conversions: ${conversions}
- Revenue: ${currSymbol}${revenue.toLocaleString()}
- ROAS: ${roas.toFixed(2)}x
- Net Profit: ${currSymbol}${netProfit.toLocaleString()} (${roi.toFixed(1)}% ROI)`;
      onAskAiScaling(summary);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
              <Calculator className="w-3.5 h-3.5" />
              {isBn ? 'গুগল ও মেটা অ্যাডস ফোরকাস্টার' : 'Google & Meta Ads Forecaster'}
            </div>
            <h2 className="text-xl font-bold text-white">
              {isBn ? 'অ্যাড বাজেট ও ROAS / ROI ক্যালকুলেটর' : 'Ad Budget & ROAS / ROI Calculator'}
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              {isBn 
                ? 'আপনার বিজ্ঞাপনের খরচ, ক্লিক ও কনভার্সন রেট দিয়ে সম্ভাব্য প্রফিট ও রিটার্ন অন অ্যাড স্পেন্ড (ROAS) হিসাব করুন।'
                : 'Plan and project Google Ads or Meta Ads campaign profitability, clicks, revenue, and scale targets.'}
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                currency === 'USD' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('BDT')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                currency === 'BDT' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              BDT (৳)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              {isBn ? 'ক্যাম্পেইন ইনপুট ডাটা' : 'Campaign Input Metrics'}
            </h3>

            {/* Ad Spend */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                <span>{isBn ? 'বিজ্ঞাপন বাজেট (Ad Spend)' : 'Total Ad Spend'}</span>
                <span className="text-emerald-400 font-mono">{currSymbol}{adSpend.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50"
                max="10000"
                step="50"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-slate-500">{currSymbol}</span>
                <input
                  type="number"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Math.max(0, Number(e.target.value)))}
                  className="w-full px-2.5 py-1 text-xs font-mono bg-slate-900 border border-slate-800 rounded-lg text-white"
                />
              </div>
            </div>

            {/* Cost Per Click */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                <span>{isBn ? 'কস্ট পার ক্লিক (CPC)' : 'Avg. Cost Per Click (CPC)'}</span>
                <span className="text-cyan-400 font-mono">{currSymbol}{cpc.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="5.00"
                step="0.05"
                value={cpc}
                onChange={(e) => setCpc(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-slate-500">{currSymbol}</span>
                <input
                  type="number"
                  step="0.05"
                  value={cpc}
                  onChange={(e) => setCpc(Math.max(0.01, Number(e.target.value)))}
                  className="w-full px-2.5 py-1 text-xs font-mono bg-slate-900 border border-slate-800 rounded-lg text-white"
                />
              </div>
            </div>

            {/* Conversion Rate */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                <span>{isBn ? 'কনভার্সন রেট (%)' : 'Website Conversion Rate (%)'}</span>
                <span className="text-purple-400 font-mono">{convRate.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="15.0"
                step="0.5"
                value={convRate}
                onChange={(e) => setConvRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-slate-500">%</span>
                <input
                  type="number"
                  step="0.1"
                  value={convRate}
                  onChange={(e) => setConvRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-full px-2.5 py-1 text-xs font-mono bg-slate-900 border border-slate-800 rounded-lg text-white"
                />
              </div>
            </div>

            {/* Average Order Value (AOV) */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                <span>{isBn ? 'অ্যাভারেজ অর্ডার ভ্যালু (AOV)' : 'Average Order / Client Value'}</span>
                <span className="text-amber-400 font-mono">{currSymbol}{aov.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-slate-500">{currSymbol}</span>
                <input
                  type="number"
                  value={aov}
                  onChange={(e) => setAov(Math.max(1, Number(e.target.value)))}
                  className="w-full px-2.5 py-1 text-xs font-mono bg-slate-900 border border-slate-800 rounded-lg text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Calculated Results & Projections */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-xl space-y-6">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>{isBn ? 'সম্ভাব্য ফলাফল ও প্রজেকশন' : 'Projected Campaign Performance'}</span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                roas >= 3 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                roas >= 1.5 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {roas >= 3 ? '🔥 High Scalability' : roas >= 1.5 ? '✅ Profitable' : '⚠️ Optimize Funnel'}
              </span>
            </h3>

            {/* Key KPI Hero Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400">{isBn ? 'রিটার্ন (ROAS)' : 'Return on Ad Spend'}</div>
                <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                  {roas.toFixed(2)}x
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {roas >= 2 ? 'Strong positive return' : 'Needs creative testing'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400">{isBn ? 'মোট রেভিনিউ' : 'Projected Revenue'}</div>
                <div className="text-2xl font-black text-white mt-1 font-mono">
                  {currSymbol}{revenue.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  From {conversions} sales
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-[11px] font-semibold text-slate-400">{isBn ? 'নেট প্রফিট' : 'Estimated Net Profit'}</div>
                <div className={`text-2xl font-black mt-1 font-mono ${netProfit >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
                  {netProfit >= 0 ? '+' : ''}{currSymbol}{netProfit.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {roi.toFixed(1)}% ROI
                </div>
              </div>
            </div>

            {/* Funnel Breakdown */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-300">
                {isBn ? 'ফানেল ড্রপ-অফ অ্যানালাইসিস' : 'Traffic & Conversion Funnel'}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    {isBn ? 'সম্ভাব্য ওয়েবসাইট ট্রাফিক / ক্লিক' : 'Estimated Ad Clicks'}
                  </span>
                  <span className="font-mono font-bold text-white">{clicks.toLocaleString()} clicks</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShoppingCart className="w-3.5 h-3.5 text-purple-400" />
                    {isBn ? 'সম্ভাব্য সেলস / কনভার্সন' : 'Conversions / Orders'}
                  </span>
                  <span className="font-mono font-bold text-white">{conversions} purchases</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                    {isBn ? 'কস্ট পার অ্যাকুইজিশন (CPA / CPL)' : 'Cost Per Acquisition (CPA)'}
                  </span>
                  <span className="font-mono font-bold text-amber-400">
                    {conversions > 0 ? `${currSymbol}${(adSpend / conversions).toFixed(2)}` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Optimization Trigger */}
            <div className="pt-2">
              <button
                onClick={handleAskAi}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>
                  {isBn 
                    ? 'AI দিয়ে এই ক্যাম্পেইনের স্কেলিং ও অপটিমাইজেশন স্ট্র্যাটেজি তৈরি করুন' 
                    : 'Generate AI Scaling & Optimization Blueprint for These Numbers'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
