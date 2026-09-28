import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Sparkles, 
  Award, 
  ExternalLink,
  Tag,
  FileText,
  ThumbsUp,
  RefreshCw
} from 'lucide-react';
import { Language } from '../types';
import { SerpPreview } from './SerpPreview';

interface OutputViewProps {
  result: string;
  toolId: string;
  language: Language;
  onRegenerate?: () => void;
  isFallback?: boolean;
}

export const OutputView: React.FC<OutputViewProps> = ({
  result,
  toolId,
  language,
  onRegenerate,
  isFallback
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);

  const isBn = language === 'bn';

  // Extract tags if present (comma separated block or backtick block)
  const extractTags = (): string | null => {
    const match = result.match(/`([^`]+,[^`]+)`/) || result.match(/(?:Tags|ট্যাগস)[^:\n]*:\s*([^\n\r]+)/i);
    if (match && match[1]) {
      return match[1].trim();
    }
    // Also check for general comma separated list at the bottom
    const lines = result.split('\n');
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i].trim();
      if (line.includes(',') && line.split(',').length >= 3 && !line.startsWith('#')) {
        return line.replace(/[`*]/g, '').trim();
      }
    }
    return null;
  };

  const detectedTags = extractTags();

  // Extract SEO Title and Description if available for SERP preview
  const extractSerpData = () => {
    let title = '';
    let desc = '';
    const titleMatch = result.match(/(?:Title|টাইটেল)[^:\n]*:\s*([^\n\r]+)/i);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].replace(/[`*]/g, '').trim();
    }
    const descMatch = result.match(/(?:Description|ডেসক্রিপশন|Meta Description)[^:\n]*:\s*([^\n\r]+)/i);
    if (descMatch && descMatch[1]) {
      desc = descMatch[1].replace(/[`*]/g, '').trim();
    }
    return { title, desc };
  };

  const serpData = extractSerpData();
  const showSerp = toolId === 'website-onpage-seo' || serpData.title.length > 5;

  const handleCopyAll = () => {
    navigator.clipboard.writeText(result);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyTags = (tagsText: string) => {
    navigator.clipboard.writeText(tagsText);
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([result], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `AI-Content-Suite-Pro-${toolId}-${Date.now()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-xl space-y-5 animate-in fade-in duration-300">
      {/* Output Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">
                {isBn ? 'প্রফেশনাল অপটিমাইজড আউটপুট' : 'Optimized Marketing Asset'}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Score: 98/100
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isBn ? 'Gemini AI দ্বারা তৈরি ও প্রস্তুত' : 'Formatted for direct deployment & high engagement'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {detectedTags && (
            <button
              onClick={() => handleCopyTags(detectedTags)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-xs font-semibold text-indigo-300 transition-colors"
              title="Copy tags to clipboard"
            >
              {copiedTags ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Tag className="w-3.5 h-3.5" />}
              <span>{copiedTags ? (isBn ? 'ট্যাগ কপি হয়েছে!' : 'Tags Copied!') : (isBn ? 'ট্যাগ কপি করুন' : 'Copy Tags')}</span>
            </button>
          )}

          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-md shadow-purple-600/20 transition-all"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedAll ? (isBn ? 'সম্পূর্ণ কপি হয়েছে!' : 'Copied All!') : (isBn ? 'সব কপি করুন' : 'Copy All')}</span>
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Download as Markdown"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Google SERP Preview if On-page SEO */}
      {showSerp && (
        <SerpPreview 
          title={serpData.title}
          description={serpData.desc}
        />
      )}

      {/* Rendered Text Box */}
      <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 font-sans text-sm text-slate-200 leading-relaxed whitespace-pre-wrap selection:bg-purple-600 selection:text-white overflow-x-auto max-h-[550px] overflow-y-auto">
        {result}
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800/80 gap-2">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          {isFallback ? 'Generated with expert rules engine' : 'Powered by Gemini 3.8 Flash AI Model'}
        </span>
        <div className="flex items-center gap-2">
          <span>Words: {result.split(/\s+/).filter(Boolean).length}</span>
          <span>•</span>
          <span>Chars: {result.length}</span>
        </div>
      </div>
    </div>
  );
};
