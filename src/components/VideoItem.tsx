import { ChevronDown, Play } from 'lucide-react'
import { useState } from 'react'
import { QuestionList } from './QuestionList'
import { VideoModal } from './VideoModal'

interface VideoItemProps {
  id: number
  title: string
  questions: number
  expanded: boolean
  onExpand: () => void
  questionIds: number[]
  videoUuid: string
}

export function VideoItem({ 
  id, 
  title, 
  questions, 
  expanded, 
  onExpand, 
  questionIds,
  videoUuid 
}: VideoItemProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsVideoModalOpen(true)}
            className="w-10 h-10 bg-[#f0f1fe] rounded-full flex items-center justify-center hover:bg-[#e4e5fd] transition-colors"
          >
            <Play className="w-5 h-5 text-[#3f3d9c]" />
          </button>
          <div>
            <h4 className="font-medium text-lg">{title}</h4>
            <p className="text-gray-500">Covers {questions} questions</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onExpand}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
      
      {expanded && questionIds.length > 0 && (
        <div className="mt-4 ml-14">
          <QuestionList questionIds={questionIds} />
        </div>
      )}

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUuid={videoUuid}
      />
    </div>
  )
}