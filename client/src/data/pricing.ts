import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
            "50 AI Content Packs/mo",
            "YouTube & Instagram SEO",
            "Viral Title Generator",
            "Hashtag & Tag Packs",
            "Email Support"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
            "Unlimited AI Content Packs",
            "Full Video Script Outlines",
            "Thumbnail Visual Prompts",
            "SEO Keyword Optimizer",
            "Priority Generation",
            "24/7 Priority Support"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Everything in Pro",
            "API Access",
            "Team Collaboration",
            "Multi-Account Management",
            "Dedicated Account Manager"
        ],
        mostPopular: false
    }
];