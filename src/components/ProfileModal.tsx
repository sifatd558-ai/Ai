import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Link as LinkIcon, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Copy,
  Check,
  Edit2,
  Save,
  Send
} from 'lucide-react';
import { UserProfile, Language } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  language: Language;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  language
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isBn = language === 'bn';

  const handleCopyContact = () => {
    const text = `${formData.name}
${formData.designation}
Phone / WhatsApp: ${formData.phone}
Email: ${formData.email}
Portfolio / Links: ${formData.linktree}
Location: ${formData.address}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Banner */}
        <div className="relative h-28 bg-gradient-to-r from-purple-700 via-indigo-700 to-cyan-600 p-6 flex items-end">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-slate-200 hover:text-white hover:bg-black/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Avatar & Actions */}
        <div className="px-6 pt-0 pb-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 mb-4 gap-4">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 border-4 border-[#0f172a] shadow-xl flex items-center justify-center text-white text-3xl font-extrabold ring-2 ring-purple-500/50">
                {formData.name.charAt(0)}
              </div>
              <div className="mb-1">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {formData.name}
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Verified Pro
                  </span>
                </h3>
                <p className="text-xs text-purple-300 font-medium line-clamp-1">
                  {formData.designation}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyContact}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
                <span>{copied ? (isBn ? 'কপি হয়েছে' : 'Copied!') : (isBn ? 'কন্টাক্ট কপি' : 'Copy Info')}</span>
              </button>
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition-colors"
              >
                {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
                <span>{isEditing ? (isBn ? 'সেভ করুন' : 'Save Changes') : (isBn ? 'এডিট করুন' : 'Edit Profile')}</span>
              </button>
            </div>
          </div>

          {/* Form / Details View */}
          {isEditing ? (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isBn ? 'পূর্ণ নাম' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isBn ? 'মোবাইল / হোয়াটসঅ্যাপ' : 'Phone / WhatsApp'}
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? 'পদবি ও স্পেশালাইজেশন' : 'Designation / Skills Tagline'}
                </label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isBn ? 'ইমেইল' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Linktree / Portfolio
                  </label>
                  <input
                    type="text"
                    value={formData.linktree}
                    onChange={(e) => setFormData({ ...formData, linktree: e.target.value, linktreeDisplay: e.target.value.replace(/^https?:\/\//, '') })}
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? 'ঠিকানা / লোকেশন' : 'Address / Location'}
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500"
                >
                  {isBn ? 'সংরক্ষণ করুন' : 'Save Details'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              {/* Credentials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] text-slate-400 font-medium">
                      {isBn ? 'মোবাইল / কল' : 'Mobile / WhatsApp'}
                    </div>
                    <a 
                      href={`tel:${formData.phone}`} 
                      className="text-xs font-semibold text-white hover:text-purple-400 truncate block"
                    >
                      {formData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] text-slate-400 font-medium">
                      {isBn ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
                    </div>
                    <a 
                      href={`mailto:${formData.email}`} 
                      className="text-xs font-semibold text-white hover:text-cyan-400 truncate block"
                    >
                      {formData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] text-slate-400 font-medium">Linktree Portfolio</div>
                    <a 
                      href={formData.linktree.startsWith('http') ? formData.linktree : `https://${formData.linktree}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-semibold text-emerald-400 hover:underline truncate block"
                    >
                      {formData.linktreeDisplay || formData.linktree}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] text-slate-400 font-medium">
                      {isBn ? 'ঠিকানা ও লোকেশন' : 'Location'}
                    </div>
                    <div className="text-xs font-semibold text-slate-200 truncate">
                      {formData.address}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialization Tags */}
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-xs font-semibold text-slate-400 mb-2">
                  {isBn ? 'মূল দক্ষতাসমূহ ও সেবাসমূহ' : 'Core Expertise & Services'}:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 text-[11px] rounded-lg bg-red-500/10 text-red-300 border border-red-500/20 font-medium">
                    🎬 YouTube Video SEO Expert
                  </span>
                  <span className="px-2.5 py-1 text-[11px] rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium">
                    🎯 Google Ads (Search & Display)
                  </span>
                  <span className="px-2.5 py-1 text-[11px] rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                    📱 Meta Ads (Facebook & Instagram)
                  </span>
                  <span className="px-2.5 py-1 text-[11px] rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                    🌐 Website On-Page & Technical SEO
                  </span>
                  <span className="px-2.5 py-1 text-[11px] rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                    🚀 Viral Content & Lead Gen
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <span className="text-xs text-slate-400 font-medium">
                  {isBn ? 'সোশ্যাল প্রোফাইল' : 'Social Channels'}:
                </span>
                <div className="flex items-center gap-2">
                  <a 
                    href={formData.socials.facebook} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600/30 text-blue-400 hover:text-white transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a 
                    href={formData.socials.twitter} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2 rounded-lg bg-slate-800 hover:bg-sky-500/30 text-sky-400 hover:text-white transition-colors"
                    title="Twitter / X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a 
                    href={formData.socials.instagram} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2 rounded-lg bg-slate-800 hover:bg-pink-600/30 text-pink-400 hover:text-white transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a 
                    href={formData.socials.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2 rounded-lg bg-slate-800 hover:bg-blue-700/30 text-blue-300 hover:text-white transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
