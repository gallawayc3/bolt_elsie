import React, { useState } from 'react';
import Header from './components/Header';
import VideoGrid from './components/VideoGrid';
import VideoPlayer from './components/VideoPlayer';
import { videos } from './data/videos';
import { Video } from './types';

function App() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchQuery) ||
    video.concept.toLowerCase().includes(searchQuery) ||
    video.description.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8 lg:px-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-800 mb-2">
            Economics Video Library
          </h2>
          <p className="text-gray-600">
            Watch videos explaining commonly missed economic concepts from student assignments
          </p>
        </div>
        
        <VideoGrid 
          videos={filteredVideos} 
          onVideoSelect={handleVideoSelect} 
        />
      </main>
      
      <footer className="bg-indigo-900 text-white py-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-indigo-200 text-sm">
            © {new Date().getFullYear()}  Macmillan Learning Economics Lessons • Educational Video Collection
          </p>
        </div>
      </footer>

      {selectedVideo && (
        <VideoPlayer 
          video={selectedVideo} 
          onClose={handleClosePlayer} 
        />
      )}
    </div>
  );
}

export default App;