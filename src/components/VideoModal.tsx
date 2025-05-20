import React from 'react';
import { ThumbsUp, ThumbsDown, X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoId }) => {
  if (!isOpen) return null;

  const handleRating = (liked: boolean) => {
    console.log(`Video ${videoId} rated: ${liked ? 'liked' : 'disliked'}`);
    // Here you would typically send this rating to your backend
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Video Player</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="aspect-video bg-black">
          <video
            className="w-full h-full"
            controls
            src={`https://vita-syllabus-parsing.s3.us-east-1.amazonaws.com/podcast_audio/video_${videoId}.mp4`}
          />
        </div>
        
        <div className="p-4 flex justify-center space-x-4">
          <button
            onClick={() => handleRating(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <ThumbsUp className="h-5 w-5" />
            <span>Like</span>
          </button>
          <button
            onClick={() => handleRating(false)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <ThumbsDown className="h-5 w-5" />
            <span>Dislike</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;