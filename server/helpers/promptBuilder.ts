export interface GenerateContentInput {
    videoTopic: string;
    platform: 'youtube' | 'instagram' | string;
    aspectRatio?: string;
    videoLength?: string;
    contentGoal?: string;
    additionalDetails?: string;
}

type PromptBuilder = (input: GenerateContentInput) => string;

const buildYouTubePrompt: PromptBuilder = (input) => {
    const { videoTopic, aspectRatio, videoLength, contentGoal, additionalDetails } = input;

    // IMPORTANT: Unique user data placed FIRST to bust Gemini implicit cache
    return `[REQUEST_ID: ${Date.now()}-${Math.random().toString(36).slice(2, 8)}]

VIDEO TOPIC: "${videoTopic}"
PLATFORM: YouTube
ASPECT RATIO: ${aspectRatio || '16:9'}
VIDEO DURATION: ${videoLength || '5to10min'}
CONTENT GOAL: ${contentGoal || 'Maximize CTR'}
${additionalDetails ? `ADDITIONAL DETAILS: "${additionalDetails}"` : ''}

You are an expert AI content strategist and SEO specialist for YouTube.
Generate a complete, highly engaging, production-ready SEO content pack for the YouTube video described above.

CRITICAL REQUIREMENT:
You MUST respond ONLY with valid JSON. Do NOT include markdown blocks, text before or after, or any explanations.

Return a JSON object with EXACTLY the following structure:
{
  "youtubeTitles": [
    "Array of 4 to 6 highly clickable, curiosity-inducing, SEO-optimized YouTube titles"
  ],
  "description": "A comprehensive, long-form SEO-optimized YouTube description. Include a compelling video summary, integrate relevant keywords naturally throughout the text, add a clear Call To Action (CTA), and end with relevant hashtags.",
  "tags": [
    "Array of 10 to 15 high-performing SEO tags and trending YouTube key search terms related to video title"
  ],
  "thumbnailPrompt": "A detailed, descriptive AI image generation prompt (compatible with ChatGPT, Midjourney, Flux, Pollinations) specifying: background scene, lighting setup, expressive facial reaction, key objects, color scheme, bold headline text suggestion, visual composition, camera angle, visual hierarchy, and click-worthy aesthetic style.",
  "videoScript": {
    "Hook": "Engaging hook for the opening 5-10 seconds",
    "Introduction": "Introduction setting up the core message",
    "Point 1": "First main point with detailed talking points",
    "Point 2": "Second main point with detailed talking points",
    "Point 3": "Third main point with detailed talking points",
    "Summary": "Key takeaways and wrap-up",
    "CTA": "Outro call to action encouraging likes, subscribes, and comments"
  }
}

Ensure the script depth and detail directly reflect the requested duration ("${videoLength || '5to10min'}").
All content MUST be specifically about: "${videoTopic}". Do NOT use generic or placeholder content.`;
};

const buildInstagramPrompt: PromptBuilder = (input) => {
    const { videoTopic, aspectRatio, videoLength, contentGoal, additionalDetails } = input;

    // IMPORTANT: Unique user data placed FIRST to bust Gemini implicit cache
    return `[REQUEST_ID: ${Date.now()}-${Math.random().toString(36).slice(2, 8)}]

VIDEO TOPIC: "${videoTopic}"
PLATFORM: Instagram Reel
ASPECT RATIO: ${aspectRatio || '9:16'}
VIDEO DURATION: ${videoLength || 'under30sec'}
CONTENT GOAL: ${contentGoal || 'Viral'}
${additionalDetails ? `ADDITIONAL DETAILS: "${additionalDetails}"` : ''}

You are an expert Instagram content creator and viral growth strategist.
Generate a complete, engaging SEO content pack for an Instagram Reel/Post about the topic described above.

CRITICAL REQUIREMENT:
You MUST respond ONLY with valid JSON. Do NOT include markdown blocks, text before or after, or any explanations.

Return a JSON object with EXACTLY the following structure:
{
  "reelTitle": "A catchy, attention-grabbing title for the Instagram Reel",
  "caption": "A highly engaging Instagram caption formatted cleanly with line breaks, emojis, hook, value, and a strong Call to Action.",
  "hashtags": [
    "Array of 10 to 20 niche and trending Instagram hashtags optimized for reach"
  ],
  "thumbnailPrompt": "A detailed visual prompt for creating a custom Reel cover/thumbnail image (describing subject, lighting, colors, dynamic angle, text overlay idea, visual style).",
  "shortScript": {
    "Hook": "Attention-grabbing 3-second visual and audio hook",
    "Main Content": "Concise main script delivery matched to ${videoLength || 'under30sec'}",
    "Call To Action": "Strong closing CTA for comments, saves, and shares"
  }
}

Ensure all fields are fully populated and the content is optimized for Instagram algorithms.
All content MUST be specifically about: "${videoTopic}". Do NOT use generic or placeholder content.`;
};

// Platform Strategy Map for scalability (LinkedIn, X/Twitter, Facebook can be added cleanly)
const PLATFORM_PROMPT_BUILDERS: Record<string, PromptBuilder> = {
    youtube: buildYouTubePrompt,
    instagram: buildInstagramPrompt
};

/**
 * Helper function to generate the dynamic Gemini prompt based on platform.
 */
export const buildPromptForPlatform = (input: GenerateContentInput): string => {
    const platformKey = input.platform.toLowerCase();
    const builder = PLATFORM_PROMPT_BUILDERS[platformKey];

    if (!builder) {
        throw new Error(`Unsupported platform: "${input.platform}". Supported platforms are: ${Object.keys(PLATFORM_PROMPT_BUILDERS).join(', ')}`);
    }

    return builder(input);
};
