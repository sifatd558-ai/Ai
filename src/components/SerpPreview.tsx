import React from 'react';
import { Globe, Search } from 'lucide-react';

interface SerpPreviewProps {
  title: string;
  description: string;
  url?: string;
}

export const SerpPreview: React.FC<SerpPreviewProps> = ({
  title,
  description,
  url = 'https://example.com/digital-marketing'
}) => {
  const cleanTitle = title || 'Your Page Title - 50-60 Characters Recommended';
  const cleanDesc = description || 'Your compelling meta description goes here. Keep it between 150-160 characters for maximum search engine click-through rate without being truncated.';
  
  const titleLength = cleanTitle.length;
  const descLength = cleanDesc.length;

  return (
    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-sans">
      <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
        <span className="flex items-center gap-1.5 font-semibold text-slate-300">
          <Search className="w-3.5 h-3.5 text-blue-400" />
          Google SERP Live Snippet Preview
        </span>
        <div className="flex items-center gap-3">
          <span className={titleLength > 60 ? 'text-amber-400 font-mono' : 'text-emerald-400 font-mono'}>
            Title: {titleLength}/60
          </span>
          <span className={descLength > 160 ? 'text-amber-400 font-mono' : 'text-emerald-400 font-mono'}>
            Desc: {descLength}/160
          </span>
        </div>
      </div>

      <div className="bg-[#202124] p-4 rounded-lg space-y-1 text-left">
        {/* URL Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#dadce0]">
          <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-[10px]">
            <Globe className="w-3 h-3" />
          </div>
          <div className="truncate">
            <span className="text-[#bdc1c6] text-[11px] block leading-tight">Digital Marketing Pro</span>
            <span className="text-[#9aa0a6] text-[10px] truncate block leading-tight">{url}</span>
          </div>
        </div>

        {/* Title */}
        <div className="pt-1">
          <h3 className="text-base sm:text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer leading-snug line-clamp-1">
            {cleanTitle}
          </h3>
        </div>

        {/* Snippet Description */}
        <p className="text-xs text-[#bdc1c6] line-clamp-2 leading-relaxed pt-0.5">
          {cleanDesc}
        </p>
      </div>
    </div>
  );
};
