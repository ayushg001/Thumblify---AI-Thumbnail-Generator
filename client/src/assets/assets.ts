import thumb_1 from "./thumb_1.jpg";
import thumb_2 from "./thumb_2.jpg";
import thumb_3 from "./thumb_3.jpg";
import thumb_4 from "./thumb_4.jpg";
import thumb_5 from "./thumb_5.jpg";
import thumb_6 from "./thumb_6.jpg";
import thumb_7 from "./thumb_7.jpg";

export const aspectRatios = ["16:9", "9:16"];
export type AspectRatio = (typeof aspectRatios)[number];

export const platformSelect = ['Youtube' , 'Instagram'];
export type PlatformSelect = (typeof platformSelect)[number];  //Give me the type of any element inside this array.

export const videoLengths = ["< 1 min", "1-5 mins", "5-10 mins","10-15 mins", "15-30 mins", "30+ mins"];
export type VideoLength = (typeof videoLengths)[number];

export const contentGoals = ["Views & CTR", "Educate", "Entertain", "Promote", "Build Brand"];
export type ContentGoal = (typeof contentGoals)[number];

export const thumbnailStyles = ["Bold & Graphic", "Minimalist", "Photorealistic", "Illustrated", "Tech/Futuristic"];
export type ThumbnailStyle = (typeof thumbnailStyles)[number];

export const colorSchemes = [
    { id: "vibrant", name: "Vibrant", colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"] },
    { id: "sunset", name: "Sunset", colors: ["#FF8C42", "#FF3C38", "#A23B72"] },
    { id: "ocean", name: "Ocean", colors: ["#0077B6", "#00B4D8", "#90E0EF"] },
    { id: "forest", name: "Forest", colors: ["#2D6A4F", "#40916C", "#95D5B2"] },
    { id: "purple", name: "Purple Dream", colors: ["#7B2CBF", "#9D4EDD", "#C77DFF"] },
    { id: "monochrome", name: "Monochrome", colors: ["#212529", "#495057", "#ADB5BD"] },
    { id: "neon", name: "Neon", colors: ["#FF00FF", "#00FFFF", "#FFFF00"] },
    { id: "pastel", name: "Pastel", colors: ["#FFB5A7", "#FCD5CE", "#F8EDEB"] },
] as const;
export type ColorScheme = (typeof colorSchemes)[number];

export interface ThumbnailRequest {
    title: string;
    colorSchemeId: string;
    aspectRatio: AspectRatio;
    style: ThumbnailStyle;
    additionalDetails?: string;
}

export interface IScriptPoint {
    time: string;
    title: string;
}

export interface IContentPackData {
    titles: string[];
    description: string;
    tags: string[];
    thumbnailPrompt: string;
    scriptPoints: IScriptPoint[];
}

export interface PreviewPanelProps {
    generatedData?: any;
    isLoading?: boolean;
}

export interface IContentPack {
    _id: string;
    userId?: string;
    createdBy?: string;
    videoTopic: string;
    title?: string;
    platform: string;
    aspectRatio?: string;
    videoLength?: string;
    contentGoal?: string;
    additionalDetails?: string;
    user_prompt?: string;
    generatedContent?: Record<string, any>;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface IUser {
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const dummyThumbnails = [
    {
        _id: "6a71f754abc35be0459b7418",
        userId: "6a6e17b046159f0c4ea977a6",
        createdBy: "6a6e17b046159f0c4ea977a6",
        videoTopic: "best earbuds under 2500rs in india",
        platform: "youtube",
        aspectRatio: "16:9",
        videoLength: "5-10 mins",
        contentGoal: "Educate",
        additionalDetails: "want to tell best earbuds to people that are under budget in 2500rs taht produces balance sound",
        generatedContent: {
            youtubeTitles: [
                "Top 5 Best Earbuds Under ₹2500 in 2024! (Balanced Sound King?)",
                "Don't Buy TWS Earbuds Under ₹2500 Before Watching THIS!",
                "Ultimate Budget TWS Guide: Best Earbuds Under ₹2500 for Music Lovers",
                "Best Earbuds Under 2500 Rupees in India (Real Sound & Mic Test!)",
                "Best Balanced Sound Earbuds Under ₹2500 | Audiophile Quality on a Budget"
            ],
            description: `Looking for the best TWS earbuds under ₹2500 in India with clean, balanced sound, crisp vocals, and punchy bass? In this video, we test and rank the top budget wireless earbuds that offer near-audiophile audio tuning without breaking the bank!

Most budget earbuds dump excess bass to cover up cheap drivers, but we tested 10+ models to find the rare pairs that deliver true instrument separation, clear vocals, low latency, and great battery life.

⏱️ TIMESTAMPS:
0:00 - The Problem with Budget Earbuds
0:45 - What is 'Balanced Sound'?
1:30 - #3 Best Value Earbuds
3:15 - #2 Best Battery & Feature Pair
5:30 - #1 THE KING of Balanced Sound
7:30 - Mic & Latency Test Comparison
8:45 - Final Verdict & Buying Advice

📌 KEY FEATURES WE EVALUATED:
- Driver tuning and frequency response (Clean highs, warm mids, tight bass)
- AAC/SBC Codec performance
- Call quality & ENC microphone performance
- Battery backup and fast charging

💬 Which pair are you picking? Drop your thoughts or questions in the comments below!

🔔 Subscribe to the channel for more tech & tutorial videos!

#BestEarbudsUnder2500 #TWSEarbuds #BudgetEarbuds #AudioTech #EarbudsIndia #BalancedSound #TechReviews`,
            tags: [
                "best earbuds under 2500",
                "best tws under 2500",
                "best earbuds under 2500 in india",
                "top tws under 2500",
                "balanced sound earbuds under 2500",
                "best wireless earbuds 2024",
                "best budget earbuds india",
                "earbuds under 2500 with good mic",
                "best earbuds for music under 2500",
                "best sound quality tws under 2500",
                "oppo enco buds 2",
                "realme tws under 2500",
                "budget tws sound test"
            ],
            thumbnailPrompt: "A highly engaging 16:9 YouTube thumbnail scene featuring an expressive Indian male tech reviewer with a shocked, open-mouthed expression pointing towards two sleek TWS earbud charging cases. Cinematic dark background with dynamic neon blue and warm orange rim light accents. Floating high-resolution 3D renders of translucent earbud drivers showing sound wave visual effects behind them. Minimalist dark wooden tech desk setup in shallow depth of field bokeh. High-contrast bold yellow and white text overlay reading 'STOP! BEST ₹2500 TWS'. Eye-level angle, ultra-sharp detail, high visual contrast, maximum clickability aesthetic.",
            videoScript: {
                Hook: "Stop wasting your money on bass-heavy, muddy-sounding earbuds! If you are looking for clean, crisp, and truly balanced sound under 2500 rupees in India, 90% of YouTube recommendations are giving you cheap, bass-boosted junk. Today, I'm revealing the top earbuds that actually deliver audiophile-grade clarity on a tight budget.",
                Introduction: "Welcome back to the channel! Finding True Wireless Stereo (TWS) earbuds under ₹2500 in India is super easy—there are hundreds of options. But finding ones with *balanced sound*—where vocals shine, acoustic instruments are distinct, and bass punchy without overwhelming the track—is almost impossible. Over the past month, we tested over 10 popular TWS earbuds specifically analyzing sound signatures, mic performance, gaming latency, and long-term comfort. Let's break down the best options you can buy right now.",
                "Point 1": "Why 'Balanced Sound' Matters Under ₹2500. Most budget manufacturers artificially boost low frequencies (bass) to hide cheap audio drivers. The result? Muddy vocals and missing background instruments in your favorite Indian and Pop tracks. To get true balanced sound, we looked for earbuds with titanium drivers, customized EQ profiles via app support, and AAC codec integration that keeps treble crisp, mids warm, and bass tight.",
                "Point 2": "The Contenders: Spot #3 and Spot #2 Breakdown. At #3, we have the Realme Buds T300—great overall package with decent ANC, deep software customization, and 30-hour battery, but slightly elevated bass. At #2, the Nord Buds 2r—incredible build quality, dual microphones with ENC for clear calls, and a very neutral 'Balanced' EQ preset straight out of the box that makes acoustic tracks and podcasts sound rich.",
                "Point 3": "The Undisputed King of Sound Quality (#1 Pick). Coming in at #1 is the Oppo Enco Buds 2. Equipped with 10mm titanium composite drivers and expert acoustic tuning, these offer the absolute cleanest sound stage under 2500 rupees. Vocals sound intimate, high frequencies never distort even at 90% volume, and bass is tight and punchy without leaking into the mid-range. Plus, fast charging and 80ms low latency gaming mode make it an unbeatable package.",
                Summary: "To wrap it up: If you only care about brain-rattling bass, you have plenty of cheap options. But if you care about music depth, clear phone calls, vocal accuracy, and listening comfort during long sessions, the Oppo Enco Buds 2 and Nord Buds 2r are the ultimate budget picks under ₹2500 in India.",
                CTA: "Which sound profile do you prefer—flat balanced sound or heavy bass? Let me know in the comments down below! If this guide helped you make a decision, hit that Like button, share it with a friend looking for budget earbuds, and Subscribe for more real, no-BS tech reviews. Check the description for the best buying links!"
            }
        },
        createdAt: "2026-08-04T14:29:40.460Z",
        updatedAt: "2026-08-04T14:29:40.460Z",
        __v: 0
    },
    {
        _id: "6a71f4776446e38b2b7fe650",
        userId: "6a6e17b046159f0c4ea977a6",
        createdBy: "6a6e17b046159f0c4ea977a6",
        videoTopic: "tech news of last 24 hrs in india",
        platform: "instagram",
        aspectRatio: "9:16",
        videoLength: "1-5 mins",
        contentGoal: "Promote",
        additionalDetails: "want to tech news in the form of intsa reel , mainly it will include news related to  smartphones",
        generatedContent: {
            reelTitle: "🚨 3 CRAZY Smartphone Launches in India Today! (Don't Buy Yet 🛑)",
            caption: `Stop! 🚨 If you're planning to buy a new smartphone in India this week, you NEED to watch this first! Here is your daily 24-hour Tech Recap 🇮🇳📱

1️⃣ 🔥 Huge Flagship Launch Confirmed: A brand new mid-range killer is dropping sooner than expected!
2️⃣ ⚡ Price Cut Alert: Popular 5G phones just got massive discounts across Indian e-commerce platforms.
3️⃣ ⚙️ OS Update Rollout: Android 14 updates starting for budget segment users today!

Which phone are you currently using? Let me know in the comments! 👇

📌 SAVE this Reel to stay updated with daily tech news!
📤 SHARE with a friend who needs a new phone!`,
            hashtags: [
                "#TechNewsIndia",
                "#SmartphonesIndia",
                "#TechReels",
                "#MobileNews",
                "#TechUpdates",
                "#IndiaTech",
                "#SmartphoneLaunch",
                "#BestPhone2024",
                "#5GSmartphones",
                "#GadgetNews",
                "#TechDaily",
                "#InstaTech",
                "#AndroidIndia",
                "#TechTips"
            ],
            thumbnailPrompt: "A high-energy, vertical 9:16 Instagram thumbnail featuring a futuristic tech creator holding the latest metallic sleek smartphone with glowing neon yellow and vibrant blue accent lights. Dynamic low-angle shot, studio background with soft bokeh tech circuit patterns. Bold, high-contrast 3D text overlay reading 'TODAY'S TECH RECAP 🇮🇳' with a shock expression face cut-out. Clean, cinematic, hyper-detailed photography.",
            shortScript: {
                Hook: "[Visual: Quick jump cut holding two latest smartphones with warning emojis on screen] Stop scrolling! If you're buying a smartphone in India right now, wait 24 hours! Here’s what just went down today.",
                "Main Content": "First up, a major brand just teased its newest 5G killer coming to India with a snapdragon flagship chip under 25K! Second, major e-commerce platforms quietly dropped prices on top-selling camera phones by up to 4,000 Rupees today. And third, a massive software update is rolling out right now fixing battery drain issues for millions of budget phone users in India.",
                "Call To Action": "Which of these updates shocked you the most? Drop your current phone model in the comments below, hit save, and share this with your tech friend!"
            }
        },
        createdAt: "2026-08-04T14:17:27.542Z",
        updatedAt: "2026-08-04T14:17:27.542Z",
        __v: 0
    }
];

export const yt_html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>YouTube - Clone</title>
            <!-- Tailwind CSS CDN -->
            <script src="https://cdn.tailwindcss.com"></script>
            <script>
                tailwind.config = { darkMode: 'class', theme: { extend: { colors: { yt: '#0f0f0f', yt2: '#181818', ytBorder: '#303030', }, }, }, };
            </script>
            <!-- Lucide Icons CDN -->
            <script src="https://unpkg.com/lucide@latest"></script>
        </head>
        <body class="dark bg-yt text-white font-sans">
            <!-- ================= HEADER ================= -->
            <header class="fixed top-0 left-0 right-0 z-50 bg-yt flex items-center justify-between px-4 h-14">
                <div class="flex items-center gap-4">
                    <i data-lucide="menu"></i>
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" id="yt-ringo2-svg_yt7" width="93" height="20" viewBox="0 0 93 20" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
                            <g> <path d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z" fill="#FF0033"></path> <path d="M19 10L11.5 5.75V14.25L19 10Z" fill="white"></path> </g>
                            <g id="youtube-paths_yt7" class="text-white" fill="currentColor"> <path d="M37.1384 18.8999V13.4399L40.6084 2.09994H38.0184L36.6984 7.24994C36.3984 8.42994 36.1284 9.65994 35.9284 10.7999H35.7684C35.6584 9.79994 35.3384 8.48994 35.0184 7.22994L33.7384 2.09994H31.1484L34.5684 13.4399V18.8999H37.1384Z"></path> <path d="M44.1003 6.29994C41.0703 6.29994 40.0303 8.04994 40.0303 11.8199V13.6099C40.0303 16.9899 40.6803 19.1099 44.0403 19.1099C47.3503 19.1099 48.0603 17.0899 48.0603 13.6099V11.8199C48.0603 8.44994 47.3803 6.29994 44.1003 6.29994ZM45.3903 14.7199C45.3903 16.3599 45.1003 17.3899 44.0503 17.3899C43.0203 17.3899 42.7303 16.3499 42.7303 14.7199V10.6799C42.7303 9.27994 42.9303 8.02994 44.0503 8.02994C45.2303 8.02994 45.3903 9.34994 45.3903 10.6799V14.7199Z"></path> <path d="M52.2713 19.0899C53.7313 19.0899 54.6413 18.4799 55.3913 17.3799H55.5013L55.6113 18.8999H57.6012V6.53994H54.9613V16.4699C54.6812 16.9599 54.0312 17.3199 53.4212 17.3199C52.6512 17.3199 52.4113 16.7099 52.4113 15.6899V6.53994H49.7812V15.8099C49.7812 17.8199 50.3613 19.0899 52.2713 19.0899Z"></path> <path d="M62.8261 18.8999V4.14994H65.8661V2.09994H57.1761V4.14994H60.2161V18.8999H62.8261Z"></path> <path d="M67.8728 19.0899C69.3328 19.0899 70.2428 18.4799 70.9928 17.3799H71.1028L71.2128 18.8999H73.2028V6.53994H70.5628V16.4699C70.2828 16.9599 69.6328 17.3199 69.0228 17.3199C68.2528 17.3199 68.0128 16.7099 68.0128 15.6899V6.53994H65.3828V15.8099C65.3828 17.8199 65.9628 19.0899 67.8728 19.0899Z"></path> <path d="M80.6744 6.26994C79.3944 6.26994 78.4744 6.82994 77.8644 7.73994H77.7344C77.8144 6.53994 77.8744 5.51994 77.8744 4.70994V1.43994H75.3244L75.3144 12.1799L75.3244 18.8999H77.5444L77.7344 17.6999H77.8044C78.3944 18.5099 79.3044 19.0199 80.5144 19.0199C82.5244 19.0199 83.3844 17.2899 83.3844 13.6099V11.6999C83.3844 8.25994 82.9944 6.26994 80.6744 6.26994ZM80.7644 13.6099C80.7644 15.9099 80.4244 17.2799 79.3544 17.2799C78.8544 17.2799 78.1644 17.0399 77.8544 16.5899V9.23994C78.1244 8.53994 78.7244 8.02994 79.3944 8.02994C80.4744 8.02994 80.7644 9.33994 80.7644 11.7299V13.6099Z"></path> <path d="M92.6517 11.4999C92.6517 8.51994 92.3517 6.30994 88.9217 6.30994C85.6917 6.30994 84.9717 8.45994 84.9717 11.6199V13.7899C84.9717 16.8699 85.6317 19.1099 88.8417 19.1099C91.3817 19.1099 92.6917 17.8399 92.5417 15.3799L90.2917 15.2599C90.2617 16.7799 89.9117 17.3999 88.9017 17.3999C87.6317 17.3999 87.5717 16.1899 87.5717 14.3899V13.5499H92.6517V11.4999ZM88.8617 7.96994C90.0817 7.96994 90.1717 9.11994 90.1717 11.0699V12.0799H87.5717V11.0699C87.5717 9.13994 87.6517 7.96994 88.8617 7.96994Z"></path> </g>
                        </svg>
                    </div>
                </div>

                <div class="flex items-center w-[45%] max-sm:hidden">
                    <input type="text" placeholder="Search" class="w-full px-4 py-2 bg-yt2 border border-ytBorder rounded-l-full focus:outline-none" />
                    <button class="px-5 py-2 bg-yt2 border border-ytBorder rounded-r-full">
                        <i data-lucide="search"></i>
                    </button>
                    <button class="ml-4 p-2 bg-yt2 rounded-full">
                        <i data-lucide="mic"></i>
                    </button>
                </div>

                <div class="flex items-center gap-4">
                    <button class="flex items-center gap-1 px-3 py-1 border border-ytBorder rounded-full"><i data-lucide="plus"></i> Create</button>
                    <i data-lucide="bell"></i>
                    <img src="https://i.pravatar.cc/40" class="size-8 rounded-full" />
                </div>
            </header>

            <!-- ================= LAYOUT ================= -->
            <div class="flex pt-14">
                <!-- ========== SIDEBAR (DESKTOP) ========== -->
                <aside class="fixed left-0 top-14 bottom-0 w-60 bg-yt px-3 py-4 overflow-y-auto hidden lg:block">
                    <nav class="space-y-2">
                        <a class="flex items-center gap-4 px-3 py-2 rounded-lg bg-yt2"><i data-lucide="home"></i> Home</a>
                        <a class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-yt2"><i data-lucide="play-square"></i> Shorts</a>
                        <a class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-yt2"><i data-lucide="rss"></i> Subscriptions</a>
                        <hr class="border-ytBorder" />
                        <a class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-yt2"><i data-lucide="library"></i> Library</a>
                        <a class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-yt2"><i data-lucide="history"></i> History</a>
                        <a class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-yt2"><i data-lucide="clock"></i> Watch later</a>
                        <a class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-yt2"><i data-lucide="thumbs-up"></i> Liked videos</a>
                        <hr class="border-ytBorder" />
                        <p class="px-3 text-xs text-gray-400 uppercase">Subscriptions</p>
                        <a target="_blank" href="https://www.youtube.com/@GreatStackDev?sub_confirmation=1" class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-yt2"> <img src="https://greatstack.dev/favicon.ico" class="rounded-full size-7" /> GreatStack </a>
                        
                        <a class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-yt2"> <img src="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2023.ico" class="rounded-full size-7" /> Netflix </a>
                        <a class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-yt2"> <img src="https://images.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" class="rounded-full size-7" /> Google </a>
                    </nav>
                </aside>
                <!-- ========== MAIN CONTENT ========== -->
                <main class="lg:ml-60 w-full px-6 py-6">
                    <!-- CATEGORY CHIPS -->
                    <div class="flex gap-3 overflow-x-auto pb-4">
                        <span class="px-4 py-1 line-clamp-1 bg-white text-black rounded-full">All</span>
                        <span class="px-4 py-1 line-clamp-1 bg-yt2 rounded-full">JavaScript</span>
                        <span class="px-4 py-1 line-clamp-1 bg-yt2 rounded-full">AI</span>
                        <span class="px-4 py-1 line-clamp-1 bg-yt2 rounded-full">Music</span>
                        <span class="px-4 py-1 line-clamp-1 bg-yt2 rounded-full">Live</span>
                        <span class="px-4 py-1 line-clamp-1 bg-yt2 rounded-full">System Design</span>
                        <span class="px-4 py-1 line-clamp-1 bg-yt2 rounded-full">Recruitment</span>
                    </div>

                    <!-- VIDEO GRID -->
                    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- CARD -->
                        <article>
                            <img src="https://picsum.photos/600/340?1" class="rounded-xl" />
                            <div class="flex gap-3 mt-3">
                                <img src="https://i.pravatar.cc/36?1" class="rounded-full h-9 w-9" />
                                <div>
                                    <h3 class="font-semibold line-clamp-2">Breaking MASS Hiring – TCS, IBM | Tech Mahindra</h3>
                                    <p class="text-sm text-gray-400">Online Learning</p>
                                    <p class="text-sm text-gray-400">12K views • 23 hours ago</p>
                                </div>
                            </div>
                        </article>

                        <article>
                            <img src="https://picsum.photos/600/340?2" class="rounded-xl" />
                            <div class="flex gap-3 mt-3">
                                <img src="https://i.pravatar.cc/36?2" class="rounded-full h-9 w-9" />
                                <div>
                                    <h3 class="font-semibold line-clamp-2">My 6 Year Journey as a Backend Developer</h3>
                                    <p class="text-sm text-gray-400">Genie Ashwani</p>
                                    <p class="text-sm text-gray-400">28K views • 3 weeks ago</p>
                                </div>
                            </div>
                        </article>

                        <article>
                            <img src="https://picsum.photos/600/340?3" class="rounded-xl" />
                            <div class="flex gap-3 mt-3">
                                <img src="https://i.pravatar.cc/36?3" class="rounded-full h-9 w-9" />
                                <div>
                                    <h3 class="font-semibold line-clamp-2">Spring Boot Project Tutorial – REST API + JWT</h3>
                                    <p class="text-sm text-gray-400">Faisal Memon</p>
                                    <p class="text-sm text-gray-400">2.5K views • 17 hours ago</p>
                                </div>
                            </div>
                        </article>

                        <article>
                            <img src="%%THUMBNAIL_URL%%" class="rounded-xl aspect-video object-top" />
                            <div class="flex gap-3 mt-3">
                                <img src="https://i.pravatar.cc/36?4" class="rounded-full h-9 w-9" />
                                <div>
                                    <h3 class="font-semibold line-clamp-2">%%TITLE%%</h3>
                                    <p class="text-sm text-gray-400">Neo TY Channel</p>
                                    <p class="text-sm text-gray-400">2.3M views • 12 days ago</p>
                                </div>
                            </div>
                        </article>

                        <article>
                            <img src="https://picsum.photos/600/340?5" class="rounded-xl" />
                            <div class="flex gap-3 mt-3">
                                <img src="https://i.pravatar.cc/36?5" class="rounded-full h-9 w-9" />
                                <div>
                                    <h3 class="font-semibold line-clamp-2">Full course: Build a production app with Next.js</h3>
                                    <p class="text-sm text-gray-400">Academy Channel</p>
                                    <p class="text-sm text-gray-400">4.8M views • 1 year ago</p>
                                </div>
                            </div>
                        </article>

                        <article>
                            <img src="https://picsum.photos/600/340?6" class="rounded-xl" />
                            <div class="flex gap-3 mt-3">
                                <img src="https://i.pravatar.cc/36?6" class="rounded-full h-9 w-9" />
                                <div>
                                    <h3 class="font-semibold line-clamp-2">Short: Amazing CSS trick</h3>
                                    <p class="text-sm text-gray-400">Design Byte</p>
                                    <p class="text-sm text-gray-400">95K views • 4 days ago</p>
                                </div>
                            </div>
                        </article>

                        <article>
                            <img src="https://picsum.photos/600/340?7" class="rounded-xl" />
                            <div class="flex gap-3 mt-3">
                                <img src="https://i.pravatar.cc/36?7" class="rounded-full h-9 w-9" />
                                <div>
                                    <h3 class="font-semibold line-clamp-2">React 18 new features — what's changed?</h3>
                                    <p class="text-sm text-gray-400">Frontend Focus</p>
                                    <p class="text-sm text-gray-400">10K views • 6 days ago</p>
                                </div>
                            </div>
                        </article>

                        <article>
                            <img src="https://picsum.photos/600/340?8" class="rounded-xl" />
                            <div class="flex gap-3 mt-3">
                                <img src="https://i.pravatar.cc/36?8" class="rounded-full h-9 w-9" />
                                <div>
                                    <h3 class="font-semibold line-clamp-2">Top 20 music tracks this month — playlist</h3>
                                    <p class="text-sm text-gray-400">Music Hub</p>
                                    <p class="text-sm text-gray-400">1.1M views • 3 days ago</p>
                                </div>
                            </div>
                        </article>

                        <article>
                            <img src="https://picsum.photos/600/340?9" class="rounded-xl" />
                            <div class="flex gap-3 mt-3">
                                <img src="https://i.pravatar.cc/36?9" class="rounded-full h-9 w-9" />
                                <div>
                                    <h3 class="font-semibold line-clamp-2">Top 20 music tracks this month — playlist</h3>
                                    <p class="text-sm text-gray-400">Music Hub</p>
                                    <p class="text-sm text-gray-400">1.1M views • 3 days ago</p>
                                </div>
                            </div>
                        </article>
                    </section>
                </main>
            </div>

            <script>
                lucide.createIcons();
            </script>
        </body>
    </html>
`;
