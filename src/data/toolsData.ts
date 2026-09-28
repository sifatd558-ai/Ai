import { ToolDefinition, UserProfile } from '../types';

export const defaultProfileData: UserProfile = {
  name: "MD. Rofikul Islam",
  designation: "Digital Marketer, YouTube Video SEO Expert, Google Ads, Meta Ads, Website SEO Expert",
  phone: "+8801989947492",
  email: "bdfrofikul@gmail.com",
  linktree: "https://linktr.ee/bdfrofikul",
  linktreeDisplay: "linktr.ee/bdfrofikul",
  address: "Rowmari, Kurigram | 5640, Bangladesh",
  socials: {
    facebook: "https://facebook.com/bdfrofikul",
    twitter: "https://twitter.com/bdfrofikul",
    instagram: "https://instagram.com/bdfrofikul",
    linkedin: "https://linkedin.com/in/bdfrofikul"
  },
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
};

export const toolCategories: { id: string; labelEn: string; labelBn: string; icon: string }[] = [
  { id: 'youtube', labelEn: 'YouTube SEO & Growth', labelBn: 'ইউটিউব এসইও ও গ্রোথ', icon: 'Youtube' },
  { id: 'ads', labelEn: 'Google & Meta Ads', labelBn: 'গুগল ও মেটা অ্যাডস', icon: 'Target' },
  { id: 'seo', labelEn: 'Website SEO & Content', labelBn: 'ওয়েবসাইট এসইও ও কন্টেন্ট', icon: 'Globe' },
  { id: 'social', labelEn: 'Social Media & Copy', labelBn: 'সোশ্যাল মিডিয়া ও কপিরাইটিং', icon: 'Share2' },
  { id: 'freelance', labelEn: 'Proposals & Signatures', labelBn: 'প্রপোজাল ও সিগনেচার', icon: 'Briefcase' },
  { id: 'calculator', labelEn: 'Ad & ROAS Calculator', labelBn: 'অ্যাড বাজেট ক্যালকুলেটর', icon: 'Calculator' },
];

export const allTools: ToolDefinition[] = [
  // YouTube Category
  {
    id: 'youtube-seo',
    category: 'youtube',
    title: {
      en: 'YouTube Video SEO Masterpack',
      bn: 'ইউটিউব ভিডিও এসইও মাস্টারপ্যাক'
    },
    description: {
      en: 'Generate high-CTR titles, Rank #1 keyword-dense description with timestamps, viral tag cloud, and hashtags.',
      bn: 'উচ্চ CTR টাইটেল, টাইমস্ট্যাম্পসহ র‍্যাঙ্ক-১ ডেসক্রিপশন এবং ভাইরাল ট্যাগ এক ক্লিকে তৈরি করুন।'
    },
    iconName: 'Youtube',
    badge: 'Popular',
    placeholder: {
      en: 'e.g. How to do digital marketing for beginners in 2026, or Facebook Ads tutorial in Bangla...',
      bn: 'যেমন: নতুনদের জন্য ডিজিটাল মার্কেটিং শেখার উপায়, অথবা ফেসবুক অ্যাডস বাংলা টিউটোরিয়াল...'
    },
    samplePrompts: {
      en: [
        'Complete Digital Marketing Course for Beginners 2026',
        'How to Rank YouTube Videos Fast with VidIQ & TubeBuddy',
        'Shopify Dropshipping Facebook Ads Scaling Strategy',
        'Python Programming Zero to Hero Crash Course'
      ],
      bn: [
        'ঘরে বসে ডিজিটাল মার্কেটিং শিখে আয় করার সম্পূর্ণ গাইড',
        'ইউটিউব ভিডিও এসইও করার গোপন ট্রিকস ২০২৬',
        'ফেসবুক বুস্টিং এবং ক্যাম্পেইন সেটআপ টিউটোরিয়াল',
        'ফ্রিল্যান্সিং শুরু করার সঠিক রোডম্যাপ'
      ]
    },
    hasOptions: true
  },
  {
    id: 'youtube-tags',
    category: 'youtube',
    title: {
      en: 'YouTube Viral Tags & Keywords',
      bn: 'ইউটিউব ভাইরাল ট্যাগ ও কিওয়ার্ড'
    },
    description: {
      en: 'Generate comma-separated 500-character tag sets categorized into high-volume, medium, and long-tail tags.',
      bn: 'ইউটিউবের ৫০০ অক্ষরের জন্য ভাইরাল কমা-সেপারেটেড ট্যাগ এবং লং-টেল কিওয়ার্ড তৈরি করুন।'
    },
    iconName: 'Tag',
    placeholder: {
      en: 'Enter your video topic or target keyword...',
      bn: 'আপনার ভিডিওর টপিক বা টার্গেট কিওয়ার্ড লিখুন...'
    },
    samplePrompts: {
      en: [
        'Google Ads Search Campaign Setup Tutorial',
        'Meta Ads Creative Strategy 2026',
        'On-page SEO Checklist for WordPress'
      ],
      bn: [
        'ইউটিউব চ্যানেল গ্রো করার সহজ উপায়',
        'এসইও ফুল কোর্স বাংলা',
        'ওয়েবসাইট অডিট গাইড'
      ]
    }
  },
  {
    id: 'youtube-script',
    category: 'youtube',
    title: {
      en: 'Video Script & Viral Hook Writer',
      bn: 'ভিডিও স্ক্রিপ্ট ও ভাইরাল হুক রাইটার'
    },
    description: {
      en: 'Craft high-retention video scripts with a 3-second hook, structured body chapters, B-roll cues, and strong CTA.',
      bn: 'প্রথম ৩ সেকেন্ডের দৃষ্টি আকর্ষণকারী হুক, বডি এবং কল-টু-অ্যাকশন সহ পূর্ণাঙ্গ ভিডিও স্ক্রিপ্ট।'
    },
    iconName: 'FileText',
    placeholder: {
      en: 'Describe your video concept, target audience, and duration (e.g. 5-minute video on 3 SEO mistakes)...',
      bn: 'আপনার ভিডিও আইডিয়া এবং দৈর্ঘ্য লিখুন (যেমন: ৫ মিনিটের ভিডিও ৩টি কমন এসইও ভুলের উপর)...'
    },
    samplePrompts: {
      en: [
        '5 Common Digital Marketing Mistakes Small Businesses Make',
        'How I Ranked #1 on Google in 30 Days Without Backlinks',
        'Why Your Meta Ads Are Burning Money and How to Fix Them'
      ],
      bn: [
        'যে ৩টি কারণে ফেসবুক অ্যাডে সেলস আসে না',
        '২০২৬ সালে ইউটিউব চ্যানেল শুরু করলে যে ভুলগুলো করবেন না',
        'ওয়েবসাইটে অর্গানিক ট্রাফিক বাড়ানোর সহজ উপায়'
      ]
    }
  },
  {
    id: 'youtube-thumbnail',
    category: 'youtube',
    title: {
      en: 'Thumbnail Concept & AI Prompt Generator',
      bn: 'থাম্বনেইল কনসেপ্ট ও প্রম্পট জেনারেটর'
    },
    description: {
      en: 'High CTR visual layout ideas, 3-word power text overlays, facial expression cues, and Midjourney/Gemini image prompts.',
      bn: 'উচ্চ CTR পাওয়ারফুল থাম্বনেইল আইডিয়া, টেক্সট ওভারলে এবং ইমেজ প্রম্পট।'
    },
    iconName: 'Image',
    placeholder: {
      en: 'Enter your video title or premise...',
      bn: 'আপনার ভিডিওর টাইটেল বা বিষয়বস্তু লিখুন...'
    },
    samplePrompts: {
      en: [
        'I Tested 5 AI Marketing Tools for 30 Days (Shocking Results)',
        'How to Get 100K YouTube Subscribers in 6 Months',
        'Meta Ads Banned My Account - Here is How I Recovered'
      ],
      bn: [
        'মাত্র ৩০ দিনে ফেসবুক পেজ থেকে লক্ষাধিক টাকা আয়',
        'ইউটিউব অ্যালগরিদম হ্যাক ২০২৬',
        'গুগল অ্যাডস দিয়ে ১০ গুণ সেলস বাড়ানোর উপায়'
      ]
    }
  },

  // Ads Category
  {
    id: 'meta-ads',
    category: 'ads',
    title: {
      en: 'Meta (Facebook & IG) Ad Copy Suite',
      bn: 'মেটা (ফেসবুক ও ইনস্টাগ্রাম) অ্যাড কপি'
    },
    description: {
      en: 'Generate high-converting ad copy with AIDA/PAS angles, click-worthy headlines, emojis, and demographic targeting.',
      bn: 'AIDA এবং PAS মডেলে ফেসবুক ও ইনস্টাগ্রামের জন্য রূপান্তরকারী অ্যাড টেক্সট ও টার্গেটিং আইডিয়া।'
    },
    iconName: 'Target',
    badge: 'High ROI',
    placeholder: {
      en: 'Product or service name, USP (Unique Selling Proposition), target price, and special offer...',
      bn: 'পণ্য বা সার্ভিসের নাম, মূল সুবিধা, অফার বা মূল্য এবং টার্গেট কাস্টমার লিখুন...'
    },
    samplePrompts: {
      en: [
        'Local Dental Clinic in London offering 50% off teeth whitening this spring',
        'E-commerce clothing brand selling premium cotton t-shirts for men',
        'SaaS CRM software for real estate agents with 14-day free trial'
      ],
      bn: [
        'প্রিমিয়াম কোয়ালিটি গ্যাজেট এবং স্মার্টওয়াচ ক্যাশ অন ডেলিভারি',
        'ডিজিটাল মার্কেটিং এবং এসইও সার্ভিস ছোট ও মাঝারি ব্যবসার জন্য',
        'অনলাইন আইটি স্কিল ডেভেলপমেন্ট লাইভ কোর্স স্পেশাল ছাড়'
      ]
    }
  },
  {
    id: 'google-ads-rsa',
    category: 'ads',
    title: {
      en: 'Google Ads (RSA) Campaign Builder',
      bn: 'গুগল সার্চ অ্যাডস (RSA) বিল্ডার'
    },
    description: {
      en: 'Generate 15 character-counted Headlines (<=30 chars) and 4 Descriptions (<=90 chars) + keyword match types.',
      bn: 'গুগল অ্যাডসের জন্য ১৫টি হেডলাইন ও ৪টি ডেসক্রিপশন এবং ব্রড, ফ্রেজ ও এক্স্যাক্ট কিওয়ার্ড।'
    },
    iconName: 'Search',
    placeholder: {
      en: 'Business name, product/service, and landing page URL/key benefits...',
      bn: 'ব্যবসার নাম, প্রোডাক্ট/সার্ভিস এবং মূল সুবিধাগুলো লিখুন...'
    },
    samplePrompts: {
      en: [
        'Emergency 24/7 Plumber in New York, fast 30-min response, licensed',
        'Best Digital Marketing Agency for E-commerce Growth & SEO',
        'Cloud Accounting Software for Freelancers & Contractors'
      ],
      bn: [
        'বেস্ট ইউটিউব ভিডিও এসইও এবং গুগল অ্যাডস সার্ভিস',
        'অনলাইন ডোমেন এবং হোস্টিং প্যাকেজ বাংলাদেশ',
        'করপোরেট ওয়েবসাইট ডেভেলপমেন্ট ও মেইনটেন্যান্স'
      ]
    }
  },

  // Website SEO Category
  {
    id: 'website-onpage-seo',
    category: 'seo',
    title: {
      en: 'On-Page SEO & Meta Tags Generator',
      bn: 'অন-পেজ এসইও ও মেটা ট্যাগ জেনারেটর'
    },
    description: {
      en: 'Create search-optimized Meta Title (55-60 chars), Meta Description (155-160 chars), H1-H3 outlines, and SERP preview.',
      bn: 'সার্চ রেজাল্টে ১ম পেজে আসার জন্য মেটা টাইটেল, মেটা ডেসক্রিপশন ও হেডিং স্ট্রাকচার তৈরি করুন।'
    },
    iconName: 'Globe',
    badge: 'SERP',
    placeholder: {
      en: 'Page topic or target URL, primary keyword, and core audience...',
      bn: 'পেজের বিষয়বস্তু বা মূল কিওয়ার্ড এবং ব্র্যান্ডের নাম লিখুন...'
    },
    samplePrompts: {
      en: [
        'Best CRM Software for Small Businesses 2026 Guide',
        'Ultimate Guide to Technical SEO Audits for Shopify Stores',
        'Affordable Coworking Spaces in Austin, Texas'
      ],
      bn: [
        'অনলাইনে ঘরে বসে আয় করার সেরা ১০টি উপায় ২০২৬',
        'ফেসবুক পেজ প্রফেশনালভাবে অপটিমাইজ করার গাইড',
        'স্মার্টফোনে ভিডিও এডিটিং করার সেরা অ্যাপস'
      ]
    }
  },
  {
    id: 'seo-article-writer',
    category: 'seo',
    title: {
      en: 'SEO Blog Article & Content Writer',
      bn: 'এসইও ব্লগ আর্টিকেল ও কন্টেন্ট রাইটার'
    },
    description: {
      en: 'Generate rank-ready, humanized long-form articles with introductory hooks, structured H2/H3 subheads, and FAQ schema.',
      bn: 'গুগল ফ্রেন্ডলি, রিডেবল এবং হাই কোয়ালিটি পূর্ণাঙ্গ ব্লগ পোস্ট ও আর্টিকেল তৈরি করুন।'
    },
    iconName: 'BookOpen',
    placeholder: {
      en: 'Article title or topic, keywords to include, and tone (e.g. authoritative, beginner-friendly)...',
      bn: 'আর্টিকেলের শিরোনাম, কী কী পয়েন্ট কভার করতে হবে এবং টোন লিখুন...'
    },
    samplePrompts: {
      en: [
        'How to Boost Organic Traffic Using Semantic SEO in 2026',
        'The Complete Guide to Meta Ads Pixel Setup and Conversion API',
        'Top 10 Website SEO Checkpoints Before Launching'
      ],
      bn: [
        'ইউটিউব এসইও করে কীভাবে ভিডিও ভাইরাল করবেন সম্পূর্ণ টিউটোরিয়াল',
        'গুগল অ্যাডস ক্যাম্পেইনে কীভাবে কম খরচে বেশি সেলস পাওয়া যায়',
        'ছোট ব্যবসার জন্য ডিজিটাল মার্কেটিং করার সঠিক পদ্ধতি'
      ]
    }
  },
  {
    id: 'schema-markup',
    category: 'seo',
    title: {
      en: 'Schema.org JSON-LD Generator',
      bn: 'স্কিমা মার্কআপ (JSON-LD) জেনারেটর'
    },
    description: {
      en: 'Create Google Rich Snippets compatible structured data for FAQ, Article, Local Business, Product, or Person.',
      bn: 'গুগল রিচ রেজাল্ট এবং সার্চ স্নাইপেটের জন্য নিখুঁত JSON-LD স্কিমা তৈরি করুন।'
    },
    iconName: 'Code',
    placeholder: {
      en: 'Type of schema (e.g. FAQPage, LocalBusiness, Article) and details...',
      bn: 'স্কিমার ধরন (যেমন: FAQPage, LocalBusiness, Article) এবং তথ্য দিন...'
    },
    samplePrompts: {
      en: [
        'FAQPage schema for 4 questions about YouTube SEO Services',
        'LocalBusiness schema for Digital Marketing Agency in Bangladesh',
        'Article schema for a comprehensive guide on Meta Ads'
      ],
      bn: [
        'ডিজিটাল মার্কেটিং সার্ভিস সম্পর্কে ৪টি প্রশ্নোত্তরের FAQ স্কিমা',
        'বাংলাদেশি ফ্রিল্যান্সার এজেন্সির LocalBusiness স্কিমা',
        'ইউটিউব এসইও গাইডের জন্য Article স্কিমা'
      ]
    }
  },

  // Social Media Category
  {
    id: 'social-posts',
    category: 'social',
    title: {
      en: 'Viral LinkedIn & Facebook Post',
      bn: 'ভাইরাল লিঙ্কডইন ও ফেসবুক পোস্ট'
    },
    description: {
      en: 'Generate high-engagement social posts with stop-the-scroll hooks, storytelling structure, and CTA.',
      bn: 'লাইক, কমেন্ট ও রিচ বাড়ানোর জন্য দৃষ্টিনন্দন ফেসবুক ও লিঙ্কডইন পোস্ট জেনারেটর।'
    },
    iconName: 'Share2',
    placeholder: {
      en: 'Share your insight, client win, marketing lesson, or news update...',
      bn: 'আপনার কোনো অভিজ্ঞতা, ক্লায়েন্টের সাফল্য বা মার্কেটিং টিপস লিখুন...'
    },
    samplePrompts: {
      en: [
        'How we generated $45k revenue for an e-commerce client with a $3k ad spend',
        'Why most creators fail at YouTube SEO in their first 6 months',
        'The single most important lesson I learned after running 500+ Google Ads campaigns'
      ],
      bn: [
        'কীভাবে একজন ক্লায়েন্টের ইউটিউব চ্যানেলে ১ মাসে ১০ গুণ ভিউ বাড়ালাম',
        'ফ্রিল্যান্সিংয়ে প্রথম কাজ পাওয়ার গোপন ট্রিকস',
        'ডিজিটাল মার্কেটিংয়ে সফল হতে যে ৩টি অভ্যাস সবচেয়ে জরুরি'
      ]
    }
  },
  {
    id: 'reels-tiktok-script',
    category: 'social',
    title: {
      en: 'TikTok, Reels & Shorts Script',
      bn: 'টিকটক, রিলস ও শর্টস স্ক্রিপ্ট'
    },
    description: {
      en: 'Fast-paced 30-60 second vertical video scripts with on-screen text overlays, audio cues, and viral pacing.',
      bn: 'দ্রুতগতির ৩০-৬০ সেকেন্ডের শর্ট ভিডিও স্ক্রিপ্ট যাতে রয়েছে স্ক্রিন টেক্সট এবং কথা বলার হুক।'
    },
    iconName: 'Smartphone',
    placeholder: {
      en: 'Topic of the Short/Reel, main tip or reveal...',
      bn: 'শর্টস বা রিলসের টপিক এবং মূল টিপস লিখুন...'
    },
    samplePrompts: {
      en: [
        '3 secret Chrome extensions every marketer must know in 2026',
        'Stop doing this on your YouTube thumbnails immediately',
        'How to spy on your competitors Meta Ads in 10 seconds'
      ],
      bn: [
        '৩টি সিক্রেট টুলস যা আপনার ডিজিটাল মার্কেটিং কাজ ১০ গুণ সহজ করবে',
        'ফেসবুক পেজ দ্রুত ভাইরাল করার সহজ কৌশল',
        'গুগল সার্চের ৩টি গোপন ট্রিকস যা আপনি জানতেন না'
      ]
    }
  },

  // Freelance & Proposal Category
  {
    id: 'client-proposal',
    category: 'freelance',
    title: {
      en: 'Freelance Client Pitch & Proposal',
      bn: 'ক্লায়েন্ট প্রপোজাল ও পিচ লেটার'
    },
    description: {
      en: 'Write winning proposals for Upwork, Fiverr, or direct cold email outreach highlighting skills, deliverables, and timeline.',
      bn: 'আপওয়ার্ক, ফাইভার বা সরাসরি ক্লায়েন্টদের জন্য পেশাদার প্রস্তাবপত্র ও কাভার লেটার।'
    },
    iconName: 'Send',
    badge: 'Clients',
    placeholder: {
      en: 'Job posting description, client requirements, service (YouTube SEO, Google Ads, Meta Ads)...',
      bn: 'কাজের বিবরণ বা ক্লায়েন্টের চাহিদা এবং কোন সার্ভিস দিতে চান তা লিখুন...'
    },
    samplePrompts: {
      en: [
        'Client wants a YouTube Video SEO expert to optimize 20 existing podcast videos and increase reach',
        'E-commerce brand looking for a Meta Ads media buyer to scale ROAS from 2x to 4x',
        'Local business in need of local SEO and Google Business Profile optimization'
      ],
      bn: [
        'ক্লায়েন্টের ইউটিউব চ্যানেলে ভিউ বাড়ানোর জন্য এসইও অডিট ও অপটিমাইজেশন অফার',
        'ফেসবুক ও ইনস্টাগ্রাম অ্যাড ক্যাম্পেইন পরিচালনার জন্য কাভার লেটার',
        'ওয়েবসাইটের অন-পেজ ও টেকনিক্যাল এসইও করার প্রস্তাব'
      ]
    }
  },
  {
    id: 'email-signature',
    category: 'freelance',
    title: {
      en: 'Pro HTML Email Signature Generator',
      bn: 'প্রফেশনাল ইমেইল সিগনেচার জেনারেটর'
    },
    description: {
      en: 'Interactive live designer and HTML generator with Rofikul Islam contact credentials, photo, links, and Gmail copy format.',
      bn: 'রফিকুল ইসলামের কন্টাক্ট ডিটেইলস সহ জিমেইল ও আউটলুকের জন্য রেডিমেড প্রফেশনাল ইমেইল সিগনেচার।'
    },
    iconName: 'Mail',
    placeholder: {
      en: 'Click to design or customize your professional email signature...',
      bn: 'আপনার পছন্দের ইমেইল সিগনেচার ডিজাইন এবং কাস্টমাইজ করতে ক্লিক করুন...'
    },
    samplePrompts: {
      en: ['Digital Marketer & SEO Specialist Signature'],
      bn: ['ডিজিটাল মার্কেটার ও এসইও এক্সপার্ট সিগনেচার']
    }
  }
];
