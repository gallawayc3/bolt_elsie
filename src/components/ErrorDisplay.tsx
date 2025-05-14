import React from 'react';
import { useSimulationStore } from '../store';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorDisplay: React.FC = () => {
  const { error, resetScenario } = useSimulationStore();

  if (!error) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">
              There was an error generating your scenario
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={resetScenario}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;