import React from 'react';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-6 px-6 shadow-md">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center">
          <Brain className="h-8 w-8 mr-3" />
          <h1 className="text-2xl font-bold">ELSiE Scenario Generator</h1>
        </div>
        <p className="mt-2 text-blue-200">Create detailed, interactive educational scenarios powered by AI</p>
      </div>
    </header>
  );
};

export default Header;