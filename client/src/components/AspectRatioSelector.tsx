import { Maximize2, RectangleHorizontal, RectangleVertical, Square } from 'lucide-react'
import React from 'react'
import { aspectRatios, type AspectRatio, type PlatformSelect } from '../assets/assets'

const AspectRatioSelector = ({value , onChange , platformSelected} : {value : AspectRatio ; onChange : (ratio : AspectRatio) => void ; platformSelected : PlatformSelect}) => {

    const iconMap = {
        '16:9' : <RectangleHorizontal className='size-6'/>,
        '9:16' : <RectangleVertical className='size-6'/>,
    } as Record<AspectRatio , React.ReactNode>              //ReactNode means "anything React can render."
    
    const visibleAspectRatios = platformSelected?.toLowerCase() === 'youtube' ? aspectRatios : aspectRatios.filter((ratio)=> ratio==='9:16')

  return (
    <div className='space-y-3 dark'>
       <label className='block text-sm font-medium text-zinc-200 flex items-center gap-2'>
         <Maximize2 className='w-4 h-4 text-pink-400' />
         <span>Aspect Ratio</span>
       </label>

       <div className='flex flex-wrap gap-2'>
        {visibleAspectRatios.map( (ratio) => {
           const selected = value === ratio;
          //  const isLandscape = ratio.toLowerCase() === '16:9';

           return (
            <button key={ratio} type='button' onClick={ () => onChange(ratio)} 
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/10 text-sm transition
            ${selected ? 'bg-white/10' : 'hover:bg-white/6'}`}>
              {iconMap[ratio]}
              <span className='tracking-widest'>{ratio}</span>
            </button>
           )
        })}
       </div>
    </div>
  )
}

export default AspectRatioSelector
