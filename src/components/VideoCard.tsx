import React from 'react';
import { Play } from 'lucide-react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
      onClick={() => onClick(video)}
    >
      <div className="relative h-48 overflow-hidden">
        {video.thumbnail ? (
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-400 text-xl font-semibold">No Preview</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-indigo-600 bg-opacity-90 rounded-full flex items-center justify-center text-white">
            <Play size={30} className="ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-gray-800 mb-1">{video.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;