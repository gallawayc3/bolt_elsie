import React, { useState } from 'react';
import { useSimulationStore } from '../store';
import { ArrowRight, RefreshCw } from 'lucide-react';
import PdfUploader from './PdfUploader';

const InputForm: React.FC = () => {
  const { scenarioRequest, setScenarioRequest, generateScenario, loading } = useSimulationStore();
  const [inputError, setInputError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!scenarioRequest.trim()) {
      setInputError('Please enter a scenario description');
      return;
    }
    
    setInputError('');
    await generateScenario();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Your ELSiE Scenario</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-200">
        <h3 className="text-lg font-medium text-blue-800 mb-2">What You Need to Provide:</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>A clear description of the scenario context or setting</li>
          <li>Any specific case study, business scenario, or educational context</li>
          <li>Key learning objectives or goals for the scenario</li>
          <li>Any specific requirements for participant roles or interactions</li>
        </ul>
      </div>
      
      <form onSubmit={handleSubmit}>
        <PdfUploader />
        
        <div className="mb-6">
          <label 
            htmlFor="scenarioRequest" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Scenario Description
          </label>
          <textarea
            id="scenarioRequest"
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="I want a scenario based around..."
            value={scenarioRequest}
            onChange={(e) => setScenarioRequest(e.target.value)}
            disabled={loading}
          ></textarea>
          {inputError && (
            <p className="mt-1 text-sm text-red-600">{inputError}</p>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Generating...
              </>
            ) : (
              <>
                Generate Scenario
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;