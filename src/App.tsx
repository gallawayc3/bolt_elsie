import React from 'react';
import Header from './components/Header';
import ScenarioDialog from './components/ScenarioDialog';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
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