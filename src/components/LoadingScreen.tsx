import React from 'react';
import { Brain, RefreshCw } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  // Progress steps to show during loading
  const loadingSteps = [
    'Analyzing your inputs...',
    'Designing scenario structure...',
    'Creating believable characters...',
    'Crafting learning objectives...',
    'Finalizing scenario details...'
  ];
  
  // Simple animation to cycle through the steps
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center py-10">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Brain className="h-16 w-16 text-blue-600" />
            <RefreshCw className="h-8 w-8 text-blue-500 absolute -right-2 -bottom-2 animate-spin" />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Generating Your Simulation Scenario</h2>
        <p className="text-gray-600 mb-8">This may take up to a minute. We're creating a detailed simulation scenario based on your specifications.</p>
        
        <div className="max-w-md mx-auto">
          <div className="h-2 bg-blue-100 rounded-full mb-6">
            <div className="h-2 bg-blue-600 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
          
          <p className="text-blue-700 font-medium">{loadingSteps[currentStepIndex]}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;