import React from 'react';
import Header from './components/Header';
import ScenarioDialog from './components/ScenarioDialog';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => window.location.href = '/videos'}
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
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Completed 15 of 15 Questions</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Question 15 of 15</span>
                <button className="text-blue-600 hover:text-blue-800">
                  Revealed Answer ▼
                </button>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <h2>Factor Markets and the Distribution of Income — End of Chapter Problem</h2>
              <p className="text-gray-700">
                You are the governor's economic policy adviser. The governor wants to put in place policies that encourage employed people to work more hours at their jobs and that encourage unemployed people to find and take jobs. Assess each proposed policy in terms of reaching that goal. Explain your reasoning in terms of income and substitution effects, and indicate when the impact of the policy may be ambiguous.
              </p>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Welcome to ELSiE Scenario Generator
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
            Create detailed, AI-powered educational scenarios for immersive learning experiences
          </p>
          <ScenarioDialog />
        </div>
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-4 px-6 mt-auto">
        <div className="max-w-6xl mx-auto text-center text-sm"></div>
      </footer>
    </div>
  );
}

export default App;