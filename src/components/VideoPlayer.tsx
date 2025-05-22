import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Maximize, Minimize, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video | null;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [helpful, setHelpful] = useState<boolean | undefined>(video?.helpful);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.load();
      setIsPlaying(false);
      setProgress(0);
      setHelpful(video.helpful);
    }
  }, [video]);

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        const { currentTime, duration } = videoRef.current;
        setProgress((currentTime / duration) * 100 || 0);
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
      const progressBarWidth = progressBar.clientWidth;
      const seekPercentage = clickPosition / progressBarWidth;
      videoRef.current.currentTime = seekPercentage * videoRef.current.duration;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleFeedback = (isHelpful: boolean) => {
    setHelpful(isHelpful);
    // Here you could add an API call to save the feedback
  };

  if (!video) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 md:p-8">
      <div 
        ref={containerRef}
        className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-all"
          aria-label="Close video"
        >
          <X size={24} />
        </button>
        
        <div className="relative">
          <video 
            ref={videoRef} 
            className="w-full"
            onClick={togglePlay}
          >
            <source src={video.source} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="mb-3">
              <h2 className="text-white text-xl md:text-2xl font-serif mb-1">{video.title}</h2>
              <p className="text-gray-300 text-sm">{video.concept}</p>
            </div>
            
            <div 
              className="h-1 bg-gray-700 rounded-full mb-3 cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-indigo-500 rounded-full relative"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={togglePlay}
                  className="text-white hover:text-indigo-300 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button 
                  onClick={toggleMute}
                  className="text-white hover:text-indigo-300 transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleFeedback(true)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                    helpful === true ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  aria-label="Mark as helpful"
                >
                  <ThumbsUp size={16} />
                  <span className="text-sm">Helpful</span>
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                    helpful === false ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  aria-label="Mark as not helpful"
                >
                  <ThumbsDown size={16} />
                  <span className="text-sm">Not Helpful</span>
                </button>
                <button 
                  onClick={toggleFullscreen}
                  className="text-white hover:text-indigo-300 transition-colors ml-2"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;