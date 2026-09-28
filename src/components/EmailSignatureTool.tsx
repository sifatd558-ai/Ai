import React, { useState, useRef } from 'react';
import { 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  ExternalLink,
  Code,
  Sparkles,
  Layout,
  Palette
} from 'lucide-react';
import { UserProfile, Language } from '../types';

interface EmailSignatureToolProps {
  profile: UserProfile;
  language: Language;
}

export const EmailSignatureTool: React.FC<EmailSignatureToolProps> = ({ profile, language }) => {
  const [styleTheme, setStyleTheme] = useState<'modern' | 'minimal' | 'badge' | 'gradient'>('modern');
  const [copiedVisual, setCopiedVisual] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const isBn = language === 'bn';

  // Build clean HTML email signature compatible with Gmail, Apple Mail, Outlook
  const getHtmlCode = () => {
    return `<!-- AI Content Suite Pro - Email Signature for ${profile.name} -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.4; color: #333333; max-width: 520px;">
  <tr>
    <td valign="top" style="padding-right: 16px; border-right: 2px solid #8b5cf6;">
      <div style="width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #ffffff; text-align: center; line-height: 72px; font-size: 26px; font-weight: bold;">
        ${profile.name.charAt(0)}
      </div>
    </td>
    <td valign="top" style="padding-left: 16px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <span style="font-size: 17px; font-weight: bold; color: #1e1b4b; letter-spacing: -0.3px;">${profile.name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 2px; padding-bottom: 6px;">
            <span style="font-size: 12px; font-weight: 600; color: #7c3aed;">${profile.designation}</span>
          </td>
        </tr>
        <tr>
          <td style="font-size: 12px; color: #4b5563; padding-top: 4px;">
            <strong>M:</strong> <a href="tel:${profile.phone}" style="color: #4b5563; text-decoration: none;">${profile.phone}</a>
          </td>
        </tr>
        <tr>
          <td style="font-size: 12px; color: #4b5563; padding-top: 2px;">
            <strong>E:</strong> <a href="mailto:${profile.email}" style="color: #7c3aed; text-decoration: none; font-weight: 500;">${profile.email}</a>
            <span style="color: #9ca3af; margin: 0 4px;">|</span>
            <a href="${profile.linktree.startsWith('http') ? profile.linktree : 'https://' + profile.linktree}" style="color: #059669; text-decoration: none; font-weight: 500;">${profile.linktreeDisplay}</a>
          </td>
        </tr>
        <tr>
          <td style="font-size: 12px; color: #6b7280; padding-top: 2px;">
            <span style="color: #9ca3af;">📍</span> ${profile.address}
          </td>
        </tr>
        <tr>
          <td style="padding-top: 8px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right: 8px;">
                  <a href="${profile.socials.facebook}" style="display: inline-block; padding: 2px 8px; background-color: #1877f2; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 10px; font-weight: bold;">Facebook</a>
                </td>
                <td style="padding-right: 8px;">
                  <a href="${profile.socials.twitter}" style="display: inline-block; padding: 2px 8px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 10px; font-weight: bold;">X / Twitter</a>
                </td>
                <td style="padding-right: 8px;">
                  <a href="${profile.socials.instagram}" style="display: inline-block; padding: 2px 8px; background-color: #e1306c; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 10px; font-weight: bold;">Instagram</a>
                </td>
                <td>
                  <a href="${profile.socials.linkedin}" style="display: inline-block; padding: 2px 8px; background-color: #0a66c2; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 10px; font-weight: bold;">LinkedIn</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
  };

  const copyRichTextToClipboard = async () => {
    try {
      const html = getHtmlCode();
      const blob = new Blob([html], { type: 'text/html' });
      const textBlob = new Blob([`${profile.name}\n${profile.designation}\nPhone: ${profile.phone}\nEmail: ${profile.email}\n${profile.linktree}\n${profile.address}`], { type: 'text/plain' });
      
      const item = new ClipboardItem({
        'text/html': blob,
        'text/plain': textBlob
      });
      await navigator.clipboard.write([item]);
      setCopiedVisual(true);
      setTimeout(() => setCopiedVisual(false), 2500);
    } catch (err) {
      // Fallback to text copy
      navigator.clipboard.writeText(getHtmlCode());
      setCopiedVisual(true);
      setTimeout(() => setCopiedVisual(false), 2500);
    }
  };

  const copyRawHtml = () => {
    navigator.clipboard.writeText(getHtmlCode());
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-slate-900 border border-purple-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-2">
              <Sparkles className="w-3 h-3 text-purple-400" />
              {isBn ? 'ইমেইল সিগনেচার স্টুডিও' : 'Client-Ready Signature Studio'}
            </div>
            <h2 className="text-xl font-bold text-white">
              {isBn ? 'প্রফেশনাল ডিজিটাল মার্কেটার ইমেইল সিগনেচার' : 'Professional Digital Marketer Email Signature'}
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              {isBn 
                ? 'জিমেইল (Gmail), আউটলুক বা অ্যাপল মেইলের জন্য রফিকুল ইসলামের কন্টাক্ট ইনফো ও সোশ্যাল আইকন সমৃদ্ধ সিগনেচার।'
                : 'Formatted with MD. Rofikul Islam contact details, clickable links, social buttons, and 1-click paste for Gmail & Outlook.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={copyRichTextToClipboard}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/25 transition-all"
            >
              {copiedVisual ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedVisual ? (isBn ? 'কপি সফল (Gmail এ পেস্ট করুন)!' : 'Copied! Paste into Gmail') : (isBn ? 'Gmail এ পেস্ট করার জন্য কপি' : 'Copy for Gmail / Outlook')}</span>
            </button>

            <button
              onClick={copyRawHtml}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5" />}
              <span>{copiedHtml ? 'HTML Copied!' : 'Copy HTML'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Style Theme Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
          <Palette className="w-3.5 h-3.5" />
          {isBn ? 'স্টাইল বাছুন:' : 'Signature Style:'}
        </span>
        {[
          { id: 'modern', label: 'Modern Pro' },
          { id: 'gradient', label: 'Gradient Glow' },
          { id: 'minimal', label: 'Clean Minimal' },
          { id: 'badge', label: 'Executive Card' }
        ].map(style => (
          <button
            key={style.id}
            onClick={() => setStyleTheme(style.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              styleTheme === style.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {style.label}
          </button>
        ))}
      </div>

      {/* Live Preview Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Preview */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-slate-800 bg-[#0f172a] p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800 text-xs text-slate-400">
              <span className="flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {isBn ? 'লাইভ প্রিভিউ (মেইল কম্পোজার লুক)' : 'Live Preview (Mail Composer View)'}
              </span>
              <span className="text-[11px] text-slate-500">Auto-synced with active profile</span>
            </div>

            {/* Email Canvas Preview */}
            <div className="p-6 rounded-xl bg-white text-slate-900 border border-slate-200 shadow-sm" ref={previewRef}>
              <div className="text-xs text-slate-400 pb-4 mb-4 border-b border-slate-100">
                <span className="font-semibold text-slate-600">To:</span> client@potentialpartner.com<br />
                <span className="font-semibold text-slate-600">Subject:</span> YouTube SEO & Digital Marketing Strategy Proposal
              </div>

              <div className="text-xs text-slate-700 space-y-2 mb-6 font-sans">
                <p>Hello,</p>
                <p>Thank you for reaching out. Please review the campaign projections and deliverables discussed.</p>
                <p>Best regards,</p>
              </div>

              {/* The Actual Rendered Signature */}
              <div className={`p-4 rounded-xl transition-all ${
                styleTheme === 'gradient' ? 'border-l-4 border-purple-600 bg-purple-50/50' : 
                styleTheme === 'badge' ? 'border border-slate-200 bg-slate-50' : 
                styleTheme === 'minimal' ? 'border-t border-slate-200 pt-4' : 'border-l-4 border-indigo-600 bg-slate-50/70'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Avatar / Monogram */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-md shrink-0 ring-2 ring-purple-200">
                    {profile.name.charAt(0)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 tracking-tight">
                        {profile.name}
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">
                        Top Rated
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-purple-700 leading-snug">
                      {profile.designation}
                    </div>

                    <div className="text-xs text-slate-600 pt-1 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-700">M:</span>
                        <a href={`tel:${profile.phone}`} className="hover:text-purple-600">{profile.phone}</a>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <div>
                          <span className="font-bold text-slate-700">E:</span>{' '}
                          <a href={`mailto:${profile.email}`} className="text-purple-600 hover:underline">{profile.email}</a>
                        </div>
                        <span className="text-slate-300">|</span>
                        <div>
                          <a 
                            href={profile.linktree.startsWith('http') ? profile.linktree : `https://${profile.linktree}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-600 font-semibold hover:underline flex items-center gap-1"
                          >
                            {profile.linktreeDisplay}
                          </a>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500 pt-0.5">
                        <span>📍 {profile.address}</span>
                      </div>
                    </div>

                    {/* Social Badges */}
                    <div className="flex items-center gap-1.5 pt-2">
                      <a 
                        href={profile.socials.facebook} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1877f2] text-white hover:opacity-90 inline-block"
                      >
                        Facebook
                      </a>
                      <a 
                        href={profile.socials.twitter} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-black text-white hover:opacity-90 inline-block"
                      >
                        X / Twitter
                      </a>
                      <a 
                        href={profile.socials.instagram} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#e1306c] text-white hover:opacity-90 inline-block"
                      >
                        Instagram
                      </a>
                      <a 
                        href={profile.socials.linkedin} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0a66c2] text-white hover:opacity-90 inline-block"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions & Help */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-[#0f172a] space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-400" />
              {isBn ? 'কীভাবে Gmail এ যুক্ত করবেন?' : 'How to Add to Gmail?'}
            </h3>
            
            <ol className="text-xs text-slate-300 space-y-2.5 list-decimal pl-4">
              <li>
                {isBn 
                  ? 'উপরের "Gmail এ পেস্ট করার জন্য কপি" বাটনে ক্লিক করুন।' 
                  : 'Click the "Copy for Gmail / Outlook" button above.'}
              </li>
              <li>
                {isBn 
                  ? 'আপনার Gmail ওপেন করে উপরের ডানদিকের Settings (গিয়ার আইকন) > "See all settings" এ যান।'
                  : 'Open Gmail, click the gear icon (Settings) and click "See all settings".'}
              </li>
              <li>
                {isBn 
                  ? 'General ট্যাবের নিচে স্ক্রল করে "Signature" সেকশনে আসুন।' 
                  : 'Scroll down to the "Signature" section under the General tab.'}
              </li>
              <li>
                {isBn 
                  ? 'নতুন সিগনেচার ক্রিয়েট করে বক্সে সরাসরি Paste (Ctrl + V বা Cmd + V) করুন।' 
                  : 'Click "+ Create new" and paste (Ctrl+V / Cmd+V) directly into the box.'}
              </li>
              <li>
                {isBn 
                  ? 'পেজের একদম নিচে "Save Changes" এ ক্লিক করলেই আপনার প্রফেশনাল সিগনেচার রেডি!' 
                  : 'Scroll to the bottom and click "Save Changes". Done!'}
              </li>
            </ol>

            <div className="pt-2 border-t border-slate-800">
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 mb-1">
                <Check className="w-3.5 h-3.5" />
                {isBn ? 'মোবাইল ও ডেস্কটপ রেসপনসিভ' : 'Mobile & Desktop Responsive'}
              </div>
              <p className="text-[11px] text-slate-400">
                {isBn 
                  ? 'টেবিল-বেজড লেআউট হওয়ায় যেকোনো ইমেইল ক্লায়েন্টে কোনো ভাঙা ছাড়া নির্ভুলভাবে প্রদর্শিত হয়।' 
                  : 'Built using HTML email table standards so it will never break in iPhone Mail, Outlook, or Android.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
