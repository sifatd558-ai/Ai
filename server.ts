import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini AI client initialization
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// User Profile info provided in user brief
const defaultProfile = {
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
  }
};

app.get('/api/profile', (req, res) => {
  res.json({ profile: defaultProfile });
});

// Specialized AI Generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { toolType, prompt, language = 'en', options = {} } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt or input data is required' });
    }

    if (!ai) {
      // Fallback generator with smart templates if API key is not yet provisioned
      const fallbackOutput = generateLocalTemplate(toolType, prompt, language, options);
      return res.json({ result: fallbackOutput, isFallback: true });
    }

    let systemInstruction = `You are AI Content Suite Pro, a world-class digital marketing and SEO expert assistant.
You specialize in:
1. YouTube Video SEO: CTR-optimized titles (90+ VidIQ/TubeBuddy score), keyword-dense video descriptions with structured chapters and hashtags, viral 500-character tag sets (comma-separated), click-worthy thumbnail concepts with text overlays, and high-retention video scripts.
2. Google Ads: High-converting Responsive Search Ads (RSA) with 15 headlines (<=30 chars) and 4 descriptions (<=90 chars), keyword match types [exact], "phrase", and broad.
3. Meta (Facebook & Instagram) Ads: Pain-point driven primary text (AIDA & PAS frameworks), attention-grabbing headlines, descriptions, call-to-action, targeted audience demographics, interests, and creative angle suggestions.
4. Website SEO: Title tags (50-60 chars), meta descriptions (150-160 chars), H1-H3 outlines, LSI keywords, JSON-LD Schema markup, and rank-ready blog articles.
5. Social Media & Outreach: Viral hooks, LinkedIn thought leadership, TikTok/Reels hooks, client proposals, and pitch emails.

Target output language: ${language === 'bn' ? 'Bengali (বাংলা) with natural, professional marketing phrasing, while keeping essential English technical terms where standard in Bangladesh/international marketing' : 'English (clear, persuasive, expert standard)'}.
Always structure your response cleanly with clear markdown headings, bullet points, code blocks for tags or schemas, and actionable tips.`;

    const userMessage = `Tool Type: ${toolType}
User Input:
${prompt}

Additional Parameters:
${JSON.stringify(options, null, 2)}

Provide an in-depth, production-ready, professional marketing output right away.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const outputText = response.text || '';
    return res.json({ result: outputText, isFallback: false });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    // Graceful fallback to prevent app crashing
    const { toolType, prompt, language = 'en', options = {} } = req.body;
    const fallbackOutput = generateLocalTemplate(toolType, prompt, language, options);
    return res.json({
      result: fallbackOutput,
      isFallback: true,
      errorDetails: error?.message || 'Error communicating with AI model'
    });
  }
});

// Fallback high-quality template generator in case API key is offline
function generateLocalTemplate(toolType: string, input: string, lang: string, options: any): string {
  const isBn = lang === 'bn';
  switch (toolType) {
    case 'youtube-seo':
      return isBn
        ? `### 🚀 YouTube Video SEO অপটিমাইজেশন প্যাক

**বিষয়:** ${input}

#### 🎯 ৫টি হাই-সি-টি-আর (CTR) টাইটেল:
1. ${input} করার সহজ নিয়ম (২০২৬ স্পেশাল গাইড) 🔥
2. মাত্র ১০ মিনিটে ${input} শিখুন | Step by Step Tutorial
3. ${input} কেন কাজ করে না? ৩টি গোপন ট্রিকস যা কেউ বলে না!
4. How to Master ${input} in 2026 [সম্পূর্ণ বাংলা টিউটোরিয়াল]
5. ${input} এর সেরা স্ট্র্যাটেজি যা আপনার ভিউ ১০ গুণ বাড়াবে!

#### 📝 র্যাঙ্ক-১ ডেসক্রিপশন:
স্বাগতম সবাইকে! আজকের ভিডিওতে আমরা বিস্তারিত আলোচনা করেছি "${input}" নিয়ে। যদি আপনি এই বিষয়ে সঠিক নিয়ম জানতে চান, তবে সম্পূর্ণ ভিডিওটি শেষ পর্যন্ত দেখুন।

⏱️ **ভিডিও চ্যাপ্টার / টাইমস্ট্যাম্প:**
00:00 - ইন্ট্রোডাকশন
01:30 - ${input} এর মূল বিষয়
04:15 - প্র্যাকটিক্যাল টিপস এবং ট্রিকস
08:00 - সাধারণ ভুল ও সমাধান
10:30 - কনক্লুশন ও বোনাস ট্রিক

🔗 **কন্টাক্ট ও সোশ্যাল লিংক:**
• Email: bdfrofikul@gmail.com
• Portfolio: linktr.ee/bdfrofikul
• WhatsApp: +8801989947492

#${input.replace(/\s+/g, '')} #DigitalMarketing #SEO #RofikulIslam #ViralVideo

#### 🏷️ ভাইরাল ট্যাগস (কপি ও পেস্ট করুন):
${input}, ${input} bangla tutorial, how to do ${input}, ${input} tips 2026, rofikul islam, digital marketing bd, youtube video seo, best ${input} tricks, viral tags 2026`
        : `### 🚀 YouTube Video SEO Optimization Masterpack

**Topic / Target Keyword:** ${input}

#### 🎯 Top 5 High CTR (Click-Through-Rate) Titles:
1. Master ${input} in 2026: The Ultimate Step-by-Step Guide 🔥
2. Stop Making This ${input} Mistake! (Fix It in 5 Mins)
3. How to Rank #1 for ${input} Fast [Proven Strategy]
4. The Secret ${input} Blueprint Nobody Tells You (2026)
5. 5 Insane Hacks to Scale ${input} 10X This Year!

#### 📝 High-Retention Description Template:
Looking to conquer ${input}? In this in-depth guide, we break down actionable workflows, industry best practices, and insider strategies to get results with ${input}.

⏱️ **Timestamps & Key Moments:**
00:00 - Introduction & Why ${input} Matters
01:45 - Key Fundamentals & Setup
04:20 - Step-by-Step Execution Strategy
07:50 - Top 3 Pitfalls to Avoid
11:15 - Summary & Next Steps

📌 **Connect & Inquiries:**
• Expert: MD. Rofikul Islam
• Email: bdfrofikul@gmail.com | Portfolio: linktr.ee/bdfrofikul
• Phone/WhatsApp: +8801989947492

#${input.replace(/\s+/g, '')} #DigitalMarketing #SEOStrategy #YouTubeSEO #ContentCreation

#### 🏷️ Viral Video Tags (Copy & Paste):
\`${input}, how to ${input}, ${input} tutorial 2026, ${input} guide, best ${input} tips, rank 1 on youtube, ${input} for beginners, digital marketing, rofikul islam seo\``;

    case 'meta-ads':
      return `### 📱 Meta (Facebook & Instagram) Ad Campaign Generator
**Target:** ${input}

#### 🔥 Primary Text Angle 1 (AIDA Framework - Attention, Interest, Desire, Action):
Are you tired of wasting money on ads that don't convert? 🛑
Discover how "${input}" helps businesses generate high-intent leads and explosive ROI.
We've cracked the code so you don't have to test blindly.
👉 Click 'Learn More' now to claim your free consultation!

#### 💡 Primary Text Angle 2 (PAS Framework - Problem, Agitate, Solution):
Running marketing without "${input}" is like driving with your eyes closed. You burn ad spend and lose qualified customers to competitors.
The solution? A targeted, data-backed approach customized for your brand.
🚀 Tap below to start growing today!

#### 📌 Headlines (Max 40 chars):
1. Scale Fast with ${input} 📈
2. Stop Wasting Ad Spend!
3. Proven ${input} Strategy

#### 👥 Suggested Target Audience:
- **Demographics:** Age 22-50, All Genders
- **Interests:** Digital Marketing, Small Business Owners, E-commerce, Social Media Marketing, Entrepreneurship
- **Behaviors:** Engaged Shoppers, Facebook Page Admins
- **Recommended CTA:** Learn More / Get Quote`;

    default:
      return `### ⚡ AI Content Suite Pro Output
**Generated for:** ${input}

- **Strategy:** Optimized for high reach, CTR, and search intent.
- **Core Benefit:** Crafted following top industry benchmarks by digital marketing specialists.
- **Next Step:** Copy and deploy directly into your marketing campaign!`;
  }
}

// Dev server or Production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
