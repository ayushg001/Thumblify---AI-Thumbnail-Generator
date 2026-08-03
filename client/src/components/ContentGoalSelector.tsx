import { Target } from 'lucide-react'
import { contentGoals, type ContentGoal } from '../assets/assets'

const ContentGoalSelector = ({ value, onChange }: { value: ContentGoal; onChange: (value: ContentGoal) => void }) => {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-200 flex items-center gap-2">
                <Target className="w-4 h-4 text-pink-400" />
                <span>Content Goal</span>
            </label>

            <div className="flex flex-wrap gap-2.5">
                {contentGoals.map((content) => {
                    const selected = value === content;

                    return (
                        <button
                            key={content}
                            type="button"
                            onClick={() => onChange(content)}
                            className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 border cursor-pointer ${
                                selected
                                    ? 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border-pink-500/80 text-white shadow-lg shadow-pink-500/20 scale-[1.02] ring-1 ring-pink-500/40'
                                    : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20 hover:text-white hover:-translate-y-0.5 active:scale-95'
                            }`}
                        >
                            {/* Selected dot indicator */}
                            <span
                                className={`w-1.5 h-1.5 rounded-full transition-all ${
                                    selected ? 'bg-pink-400 shadow-[0_0_8px_#f43f5e]' : 'bg-zinc-600 group-hover:bg-zinc-400'
                                }`}
                            />
                            <span>{content}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default ContentGoalSelector