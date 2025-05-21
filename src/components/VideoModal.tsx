import { ThumbsDown, ThumbsUp, X } from 'lucide-react'
import { useState } from 'react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUuid: string
}

export function VideoModal({ isOpen, onClose, videoUuid }: VideoModalProps) {
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null)
  
  if (!isOpen) return null

  const handleFeedback = (type: 'like' | 'dislike') => {
    setFeedback(type)
    // Here you would typically send this feedback to your backend
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold">Video Explanation</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="aspect-video bg-black">
          <video 
            className="w-full h-full"
            controls
            src={`https://vita-syllabus-parsing.s3.us-east-1.amazonaws.com/podcast_audio/video_${videoUuid}.mp4`}
          />
        </div>

        <div className="p-4 flex justify-center gap-4">
          <button
            onClick={() => handleFeedback('like')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              feedback === 'like'
                ? 'bg-green-100 text-green-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
            Helpful
          </button>
          <button
            onClick={() => handleFeedback('dislike')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              feedback === 'dislike'
                ? 'bg-red-100 text-red-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <ThumbsDown className="w-5 h-5" />
            Not Helpful
          </button>
        </div>
      </div>
    </div>
  )
}