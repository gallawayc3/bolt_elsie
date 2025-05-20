import React from 'react';
import { useState } from 'react';
import VideoModal from './components/VideoModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');

  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full bg-white shadow">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => openVideoModal('123')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                View Videos
              </button>
              <div className="text-2xl font-bold">Final Score: 52%</div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                Resources
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                Solution
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Go to Beginning
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              Completed 15 of 15 Questions
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Question 15 of 15</span>
              <button className="text-sm text-blue-600">
                Revealed Answer ▼
              </button>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-bold mb-4">
              Factor Markets and the Distribution of Income — End of Chapter Problem
            </h2>
            <p className="text-gray-700">
              You are the governor's economic policy adviser. The governor wants to put in place policies that encourage employed people to work more hours at their jobs and that encourage unemployed people to find and take jobs. Assess each proposed policy in terms of reaching that goal. Explain your reasoning in terms of income and substitution effects, and indicate when the impact of the policy may be ambiguous.
            </p>
          </div>
        </div>
      </main>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId={selectedVideo}
      />
    </div>
  );
}

export default App;