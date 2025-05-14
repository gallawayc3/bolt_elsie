import React from 'react';
import { useSimulationStore } from './store';
import Header from './components/Header';
import InputForm from './components/InputForm';
import LoadingScreen from './components/LoadingScreen';
import ScenarioOutput from './components/ScenarioOutput';
import ErrorDisplay from './components/ErrorDisplay';

function App() {
  const { loading, scenario, error } = useSimulationStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-6xl mx-auto py-8 px-4">
        {loading && <LoadingScreen />}
        
        {error && <ErrorDisplay />}
        
        {!loading && !error && !scenario && <InputForm />}
        
        {!loading && !error && scenario && <ScenarioOutput />}
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-4 px-6 mt-auto">
        <div className="max-w-6xl mx-auto text-center text-sm"></div>
      </footer>
    </div>
  );
}

export default App;