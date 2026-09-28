import React, { useState } from 'react';
import { 
  X, 
  History, 
  Trash2, 
  Star, 
  Copy, 
  Check, 
  Download, 
  Search,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { GeneratedHistoryItem, Language } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: GeneratedHistoryItem[];
  onSelectHistory: (item: GeneratedHistoryItem) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  language: Language;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onSelectHistory,
  onToggleFavorite,
  onDeleteItem,
  onClearAll,
  language
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const isBn = language === 'bn';

  const filteredItems = items.filter(it => 
    it.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    it.toolTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    it.result.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (e: React.MouseEvent, id: string, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ai-content-suite-history-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0f172a] border-l border-slate-800 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-sm">
              {isBn ? 'সংরক্ষিত হিস্টোরি ও আউটপুট' : 'Saved Generations History'}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {items.length}
            </span>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Actions Bar */}
        <div className="p-3 border-b border-slate-800/80 bg-slate-950/40 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder={isBn ? 'খুঁজুন...' : 'Search history...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={handleExportJson}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs hover:bg-slate-700"
                title="Export History JSON"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClearAll}
                className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:text-red-300 text-xs hover:bg-red-900/60"
                title="Clear All History"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-medium">
                {isBn ? 'এখনও কোনো হিস্টোরি তৈরি হয়নি।' : 'No saved generations yet.'}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {isBn ? 'যেকোনো টুল দিয়ে জেনারেট করলেই এখানে অটোমেটিক সেভ হবে।' : 'Outputs will automatically be saved here.'}
              </p>
            </div>
          ) : (
            filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => onSelectHistory(item)}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all hover:shadow-lg group"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {item.toolTitle}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className={`p-1 rounded hover:bg-slate-800 ${item.favorite ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                    </button>
                    <button
                      onClick={(e) => handleCopy(e, item.id, item.result)}
                      className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                    >
                      {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteItem(item.id);
                      }}
                      className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-200 line-clamp-1 mb-1">
                  {item.prompt}
                </div>

                <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.result.replace(/[#*`]/g, '').trim()}
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                  <span className="group-hover:text-purple-400 flex items-center gap-1 transition-colors">
                    {isBn ? 'ওপেন করুন' : 'Load into view'} &rarr;
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
