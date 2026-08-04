import React, { useState } from 'react';
import { Copy, Check, Sparkles, Loader2 } from 'lucide-react';
import { type PreviewPanelProps } from '../assets/assets';
import { div } from 'motion/react-client';

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  generatedData,
  isLoading = false
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (key: string, textToCopy: string) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // 1. LOADING STATE
  if (isLoading) {
    return (
      <div className="space-y-6 w-full text-left">
        <div className="p-8 rounded-2xl bg-[#121217]/70 border border-zinc-800/80 flex flex-col items-center justify-center text-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-pink-400" />
          <p className="text-sm font-medium text-zinc-200">AI is crafting your complete content pack...</p>
          <p className="text-xs text-zinc-400">Generating SEO titles, detailed description, tags & script</p>
        </div>

        {[1, 2, 3].map((n) => (
          <div key={n} className="rounded-2xl bg-[#121217]/60 border border-zinc-800/60 p-5 space-y-3 animate-pulse">
            <div className="h-5 w-40 bg-white/10 rounded" />
            <div className="h-16 w-full bg-white/5 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  // Single data variable for the API record
  const data = generatedData;
  const content = data?.generatedContent;

  // 2. EMPTY / DEFAULT STATE (no data yet)
  if (!data || !content) {
    return (
      <div className="min-h-[460px] flex flex-col items-center justify-center p-8 text-center rounded-2xl border-2 border-dashed border-white/12 bg-black/20 my-auto">
        <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-pink-400">
          <Sparkles className="size-8 opacity-80 animate-pulse" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-200">Generated content will show here</h3>
        <p className="text-xs text-zinc-400 mt-1">
          Enter a topic on the left and click <span className="text-pink-400 font-medium">Generate Pack</span>.
        </p>
      </div>
    );
  }

  // 3. DATA ARRIVED STATE - Read directly from single data variable
  const platform = (data.platform || 'youtube').toLowerCase();
  const aspectRatio = data.aspectRatio || '16:9';
  const isInstagram = platform === 'instagram';

  const titles: string[] = content.youtubeTitles || (content.reelTitle ? [content.reelTitle] : content.titles || []);
  const description: string = content.description || content.caption || '';
  const tags: string[] = content.tags || content.hashtags || [];
  const thumbnailPrompt: string = content.thumbnailPrompt || '';
  const scriptObj: Record<string, string> | null = content.videoScript || content.shortScript || null;

  // Copy entire pack handler
  const handleCopyAll = () => {
    const scriptLines = scriptObj
      ? Object.entries(scriptObj).map(([k, v]) => `${k}: ${v}`).join('\n')
      : '';

    const fullText = `--- RESULTS PREVIEW (${platform.toUpperCase()}) ---

[TITLES]
${titles.map((t, i) => `${i + 1}. ${t}`).join('\n')}

[DESCRIPTION / CAPTION]
${description}

[SEO TAGS / HASHTAGS]
${tags.join(', ')}

[THUMBNAIL PROMPT]
${thumbnailPrompt}

[SCRIPT BREAKDOWN]
${scriptLines}
`;
    handleCopy('all', fullText);
  };

  return (
    <div className="space-y-6 w-full text-left">
      {/* Header & Copy All */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">
              Results Preview
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Dynamic output changes with platform.
            </p>
          </div>

          <button
            onClick={handleCopyAll}
            type="button"
            className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl bg-white/8 hover:bg-white/12 text-zinc-200 border border-white/10 transition-all cursor-pointer"
          >
            {copiedSection === "all" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Entire Pack!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy Entire Pack</span>
              </>
            )}
          </button>
        </div>

        {/* Platform & Ratio Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-purple-950/60 border border-purple-500/40 text-purple-300 capitalize">
            Platform:{" "}
            <span className="font-semibold text-purple-200">{platform}</span>
          </span>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-pink-950/60 border border-pink-500/40 text-pink-300">
            Ratio:{" "}
            <span className="font-semibold text-pink-200">{aspectRatio}</span>
          </span>
        </div>
      </div>

      {/* 1. Titles Section */}    
       {titles.length > 0 && (
        <div className="rounded-2xl bg-[#121217]/90 border border-zinc-800/80 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-zinc-100">
                {isInstagram ? 'Reel Title & Hook' : 'YouTube Video Titles'}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">{titles.length} option{titles.length > 1 ? 's' : ''} generated</p>
            </div>

            <button
              onClick={() => handleCopy('titles', titles.map((t, i) => `${i + 1}. ${t}`).join('\n'))}
              type="button"
              className="p-2 rounded-lg bg-zinc-800/60 text-zinc-400 hover:text-zinc-100 border border-white/5 text-xs cursor-pointer"
              title="Copy Titles"
            >
              {copiedSection === 'titles' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="space-y-2">
            {titles.map((item, index) => {
              const itemKey = `title-${index}`;
              const isCopied = copiedSection === itemKey;
              return (
                <div
                  key={index}
                  onClick={() => handleCopy(itemKey, item)}
                  className="group flex items-start justify-between gap-3 p-3 rounded-xl bg-black/30 hover:bg-white/5 border border-white/5 transition-all cursor-pointer"
                >
                  <div className="text-sm text-zinc-200 font-medium leading-relaxed">
                    <span className="text-zinc-500 font-normal mr-2">{index + 1}.</span>
                    {item}
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-pink-400 shrink-0 mt-0.5">
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Description / Caption Section */}
      {description && (
        <div className="rounded-2xl bg-[#121217]/90 border border-zinc-800/80 p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-zinc-100">
                {isInstagram ? 'Reel Caption' : 'YouTube Description'}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">SEO-optimized content with CTA</p>
            </div>

            <button
              onClick={() => handleCopy('description', description)}
              type="button"
              className="p-2 rounded-lg bg-zinc-800/60 text-zinc-400 hover:text-zinc-100 border border-white/5 text-xs cursor-pointer"
              title="Copy Description"
            >
              {copiedSection === 'description' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-black/30 border border-white/5 text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
            {description}
          </div>
        </div>
      )}

      {/* 3. SEO Tags / Hashtags Section */}
      {tags.length > 0 && (
        <div className="rounded-2xl bg-[#121217]/90 border border-zinc-800/80 p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-zinc-100">
                {isInstagram ? 'Hashtags' : 'SEO Tags'}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">{tags.length} tags generated</p>
            </div>

            <button
              onClick={() => handleCopy('tags', tags.join(', '))}
              type="button"
              className="p-2 rounded-lg bg-zinc-800/60 text-zinc-400 hover:text-zinc-100 border border-white/5 text-xs cursor-pointer"
              title="Copy Tags"
            >
              {copiedSection === 'tags' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag, index) => {
              const itemKey = `tag-${index}`;
              const tagText = isInstagram && !tag.startsWith('#') ? `#${tag}` : tag;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleCopy(itemKey, tagText)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-zinc-900/90 text-zinc-300 hover:text-pink-300 border border-zinc-800 hover:border-pink-500/40 transition-all cursor-pointer"
                >
                  {tagText}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Thumbnail Prompt Section */}
      {thumbnailPrompt && (
        <div className="rounded-2xl bg-[#121217]/90 border border-zinc-800/80 p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-zinc-100">Thumbnail Prompt</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Prompt for AI image generators</p>
            </div>

            <button
              onClick={() => handleCopy('prompt', thumbnailPrompt)}
              type="button"
              className="p-2 rounded-lg bg-zinc-800/60 text-zinc-400 hover:text-zinc-100 border border-white/5 text-xs cursor-pointer"
              title="Copy Prompt"
            >
              {copiedSection === 'prompt' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#09090b] border border-zinc-800/90 text-sm text-zinc-300 font-mono leading-relaxed">
            {thumbnailPrompt}
          </div>
        </div>
      )}

      {/* 5. Video Script Breakdown */}
      {scriptObj && typeof scriptObj === 'object' && (
        <div className="rounded-2xl bg-[#121217]/90 border border-zinc-800/80 p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-zinc-100">Video Script Breakdown</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Section-by-section script guide</p>
            </div>

            <button
              onClick={() => {
                const text = Object.entries(scriptObj).map(([k, v]) => `${k}: ${v}`).join('\n');
                handleCopy('script', text);
              }}
              type="button"
              className="p-2 rounded-lg bg-zinc-800/60 text-zinc-400 hover:text-zinc-100 border border-white/5 text-xs cursor-pointer"
              title="Copy Script"
            >
              {copiedSection === 'script' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {Object.entries(scriptObj).map(([sectionTitle, sectionContent], idx) => (
              <div key={idx} className="p-3 rounded-xl bg-black/20 border border-white/5 space-y-1">
                <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">{sectionTitle}</span>
                <p className="text-sm text-zinc-200 leading-relaxed">{String(sectionContent)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPanel;
