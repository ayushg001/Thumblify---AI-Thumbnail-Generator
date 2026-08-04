import { useEffect, useState } from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import { type IContentPack } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowRight, Sparkles, Clock, Target, Calendar, FileText, RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../configs/api";
import toast from "react-hot-toast";

// YouTube Icon SVG
const YouTubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={`shrink-0 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      fill="#FF0000"
    />
    <polygon points="9.545,15.568 15.818,12 9.545,8.432" fill="#FFFFFF" />
  </svg>
);

// Instagram Icon SVG
const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={`shrink-0 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="insta-card-grad" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285ae6" />
      </radialGradient>
    </defs>
    <path
      fill="url(#insta-card-grad)"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    />
  </svg>
);

const renderRatioIcon = (ratio?: string) => {
  if (ratio === '9:16') return <RectangleVertical className="w-3.5 h-3.5 text-pink-400" />;
  if (ratio === '1:1') return <Square className="w-3.5 h-3.5 text-pink-400" />;
  return <RectangleHorizontal className="w-3.5 h-3.5 text-pink-400" />;
};

const MyGeneration = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [packs, setPacks] = useState<IContentPack[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPacks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/user/thumbnails');
      setPacks(data.thumbnails || []);
    } catch (error: any) {
      console.error("Error fetching content packs:", error);
      toast.error(error?.response?.data?.message || error.message || "Failed to fetch generations");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this content pack?')) return;
    try {
      const { data } = await api.delete(`/api/thumbnail/delete/${id}`);
      toast.success(data.message || 'Deleted successfully');
      setPacks((prev) => prev.filter((p) => p._id !== id));
    } catch (error: any) {
      console.error("Error deleting item:", error);
      toast.error(error?.response?.data?.message || error.message || "Failed to delete item");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchPacks();
    }
  }, [isLoggedIn]);

  return (
    <>
      <SoftBackdrop />
      <div className="mt-28 min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-28">
        {/* HEADER SECTION */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
                My Content Packs
              </h1>
            </div>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">
              Access your AI-generated SEO packs.
            </p>
          </div>

          <button
            onClick={() => navigate('/generate')}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg shadow-pink-500/20 active:scale-95 transition-all cursor-pointer self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate New Pack</span>
          </button>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/[0.04] border border-white/10 animate-pulse h-[280px] p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="h-6 w-24 bg-white/10 rounded-full" />
                  <div className="h-6 w-16 bg-white/5 rounded-md" />
                </div>
                <div className="h-6 w-3/4 bg-white/10 rounded-lg" />
                <div className="h-20 w-full bg-white/5 rounded-xl" />
                <div className="h-5 w-1/3 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && packs.length === 0 && (
          <div className="text-center py-20 px-6 rounded-3xl border border-dashed border-white/12 bg-black/20 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto text-pink-400">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100">No content packs yet</h3>
            <p className="text-xs text-zinc-400">
              Create your first AI content pack to see it here.
            </p>
            <button
              onClick={() => navigate('/generate')}
              className="mt-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white text-sm transition-all shadow-lg shadow-pink-500/20 cursor-pointer"
            >
              Create Content Pack Now
            </button>
          </div>
        )}

        {/* CONTENT PACKS CARDS GRID */}
        {!loading && packs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packs.map((item: IContentPack) => {
              const isYoutube = item.platform?.toLowerCase() === 'youtube';

              const content = item.generatedContent || {};
              const topTitle =
                content.youtubeTitles?.[0] ||
                content.reelTitle ||
                content.titles?.[0] ||
                item.videoTopic ||
                item.title ||
                'SEO Content Pack';

              return (
                <div
                  key={item._id}
                  onClick={() => navigate(`/generate/${item._id}`)}
                  className="group relative flex flex-col justify-between rounded-2xl bg-white/[0.04] border border-white/10 hover:border-pink-500/50 p-6 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-1 cursor-pointer overflow-hidden backdrop-blur-sm"
                >
                  {/* Subtle Top-Right Ambient Glow */}
                  <div
                    className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-40 ${
                      isYoutube ? 'bg-red-500' : 'bg-pink-500'
                    }`}
                  />

                  <div className="space-y-4 relative z-10">
                    {/* CARD HEADER: PLATFORM BADGE & DELETE BUTTON */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-wide ${
                          isYoutube
                            ? 'bg-red-500/12 border-red-500/30 text-red-400 shadow-[0_0_12px_rgba(255,0,0,0.15)]'
                            : 'bg-pink-500/12 border-pink-500/30 text-pink-400 shadow-[0_0_12px_rgba(214,36,159,0.15)]'
                        }`}
                      >
                        {isYoutube ? <YouTubeIcon /> : <InstagramIcon />}
                        <span>{isYoutube ? 'YouTube' : 'Instagram'}</span>
                      </div>

                      <button
                        onClick={(e) => handleDelete(item._id, e)}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500 hover:border-red-500 text-zinc-400 hover:text-white hover:scale-110 shadow-sm hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200 cursor-pointer active:scale-95"
                        title="Delete Content Pack"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* VIDEO TOPIC TITLE */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-pink-400/90 uppercase tracking-wider">
                        Topic
                      </span>
                      <h3 className="text-base font-bold text-zinc-100 group-hover:text-pink-200 transition-colors line-clamp-1">
                        {item.videoTopic || item.title || 'Untitled Topic'}
                      </h3>
                    </div>

                    {/* METADATA CHIPS */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      {item.aspectRatio && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/30 border border-white/8 text-zinc-300">
                          {renderRatioIcon(item.aspectRatio)}
                          <span>{item.aspectRatio}</span>
                        </span>
                      )}
                      {item.videoLength && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/30 border border-white/8 text-zinc-300">
                          <Clock className="w-3.5 h-3.5 text-pink-400" />
                          <span>{item.videoLength}</span>
                        </span>
                      )}
                      {item.contentGoal && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/30 border border-white/8 text-zinc-300">
                          <Target className="w-3.5 h-3.5 text-pink-400" />
                          <span>{item.contentGoal}</span>
                        </span>
                      )}
                    </div>

                    {/* AI PREVIEW BOX */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/8 space-y-1.5 group-hover:border-white/15 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-pink-400" />
                          <span>Generated Title</span>
                        </span>
                      </div>
                      <p className="text-xs text-zinc-200 font-medium line-clamp-2 leading-relaxed">
                        "{topTitle}"
                      </p>
                    </div>
                  </div>

                  {/* CARD FOOTER */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/8 text-xs text-zinc-400 relative z-10">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{new Date(item.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-1 text-pink-400 font-medium text-xs group-hover:translate-x-1 transition-transform">
                      <span>View Pack</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyGeneration;
