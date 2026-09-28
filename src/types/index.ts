export type Language = 'en' | 'bn';

export type ToolCategory = 'youtube' | 'ads' | 'seo' | 'social' | 'freelance' | 'calculator';

export interface ToolDefinition {
  id: string;
  category: ToolCategory;
  title: {
    en: string;
    bn: string;
  };
  description: {
    en: string;
    bn: string;
  };
  iconName: string;
  badge?: string;
  placeholder: {
    en: string;
    bn: string;
  };
  samplePrompts: {
    en: string[];
    bn: string[];
  };
  hasOptions?: boolean;
}

export interface UserProfile {
  name: string;
  designation: string;
  phone: string;
  email: string;
  linktree: string;
  linktreeDisplay: string;
  address: string;
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  avatarUrl?: string;
}

export interface GeneratedHistoryItem {
  id: string;
  toolId: string;
  toolTitle: string;
  prompt: string;
  result: string;
  timestamp: number;
  language: Language;
  favorite?: boolean;
}
