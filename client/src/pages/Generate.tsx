import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sparkles, Sliders } from "lucide-react";
import { contentGoals, dummyThumbnails, videoLengths, type AspectRatio, type ContentGoal, type PlatformSelect, type VideoLength } from "../assets/assets";
import SoftBackdrop from "../components/SoftBackdrop";
import AspectRatioSelector from "../components/AspectRatioSelector";
import PreviewPanel from "../components/PreviewPanel";
import PlatformSelector from "../components/PlatformSelector";
import VideoLengthSelector from "../components/VideoLengthSelector";
import ContentGoalSelector from "../components/ContentGoalSelector";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../configs/api";

const Generate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [generatedData, setGeneratedData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [platform, setPlatform] = useState<PlatformSelect>("Youtube");
  const [videoLength, setVideoLength] = useState<VideoLength>(videoLengths[0]);
  const [contentGoal, setContentGoal] = useState<ContentGoal>(contentGoals[0]);

  useEffect(() => {
    if (platform === 'Instagram') {
      setAspectRatio('9:16');
    }
  }, [platform]);

  const handleGenerate = async () => {
    if (!isLoggedIn) return toast.error('Please login to generate content pack');
    if (!title.trim()) return toast.error('Video topic is required');
    setLoading(true);

    try {
      const api_payload = {
        videoTopic: title,
        platform,
        aspectRatio,
        videoLength,
        contentGoal,
        additionalDetails,
      };
      const { data } = await api.post('/api/thumbnail/generate', api_payload);
      const resultObj = data.videoRecord || data.thumbnail;
      if (resultObj) {
        setGeneratedData(resultObj);
        setLoading(false);
        if (resultObj._id) {
          navigate('/generate/' + resultObj._id);
        }
        toast.success(data.message || 'Content pack generated successfully!');
      } else {
        setLoading(false);
        toast.error('Failed to receive generated data');
      }
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || error.message || 'Error generating pack');
    }
  };

  const populateFormFromItem = (item: any) => {
    if (!item) return;
console.log("Item :" , item)
    setGeneratedData(item);
    setTitle(item.videoTopic || item.title || '');
    setPlatform(item.platform || 'Youtube');
    if (item.aspectRatio) setAspectRatio(item.aspectRatio);
    if (item.videoLength) setVideoLength(item.videoLength);
    if (item.contentGoal) setContentGoal(item.contentGoal || item.content_goal);
    setAdditionalDetails(item.additionalDetails || '');
  };

  const fetchData = async () => {
    if (id) {
      try {
        const { data } = await api.get(`/api/user/thumbnail/${id.trim()}`);
        console.log(data);
        if (data?.thumbnail) {
          populateFormFromItem(data.thumbnail);
          setLoading(false);
          return;
        }
      } catch (error: any) {
        console.log('API fetch data error:', error);
      }

      // Fallback check in dummy data for testing
      const dummyItem: any = dummyThumbnails.find((item) => item._id === id);
      if (dummyItem) {
        populateFormFromItem(dummyItem);
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setAdditionalDetails("");
    setGeneratedData(null);
    setPlatform("Youtube");
    setAspectRatio("16:9");
    setVideoLength(videoLengths[0]);
    setContentGoal(contentGoals[0]);
  };

  useEffect(() => {
    if (isLoggedIn && id) {
      fetchData();
    } else if (!id) {
      resetForm();
    }
  }, [id, isLoggedIn]);

  return (
    <>
      <SoftBackdrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8 items-start">
            {/* LEFT PANEL */}
            <div className={`space-y-6 ${id && "pointer-events-none"}`}>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-zinc-100">
                    Create Your Content Pack
                  </h2>
                  <p className="text-xs text-zinc-400 w-full mt-1">
                    Enter video topic and generate a full SEO-friendly pack.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* TITLE INPUT */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-pink-400" />
                      <span>Video Topic</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      placeholder="e.g. Learn React in 7 Days"
                      className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <div className="flex justify-end">
                      <span className="text-xs text-zinc-400">{title.length}/100</span>
                    </div>
                  </div>

                  {/* Platform Selector */}
                  <PlatformSelector value={platform} onChange={setPlatform} />

                  {/* AspectRatioSelector */}
                  <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} platformSelected={platform} />

                  {/* Video Length Selector */}
                  <VideoLengthSelector value={videoLength} onChange={setVideoLength} />

                  {/* Content Goal Selector */}
                  <ContentGoalSelector value={contentGoal} onChange={setContentGoal} />

                  {/* DETAILS */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-200 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-pink-400" />
                      <span>Additional Prompts</span> <span className="text-zinc-400 text-xs font-normal">(optional)</span>
                    </label>
                    <textarea value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)} rows={3} placeholder="Mention key points, CTA, special instructions, audience, or any extra context..." className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none" />
                  </div>
                </div>

                {/* BUTTON */}
                {!id && (
                  <button onClick={handleGenerate}
                    className="text-[15px] w-full py-3.5 rounded-xl font-semibold bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 
                  disabled:cursor-not-allowed transition-all shadow-lg shadow-pink-500/20 active:scale-98 cursor-pointer">
                    {loading ? "Generating..." : "Generate Pack"}
                  </button>
                )}
              </div>
            </div>
            {/* RIGHT PANEL */}
            <div className="w-full">
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <PreviewPanel
                  generatedData={generatedData}
                  isLoading={loading}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
