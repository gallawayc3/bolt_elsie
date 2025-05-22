import React from 'react';
import { BookOpen, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-6 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen size={32} className="text-indigo-200" />
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight">Review Lessons</h1>
              <p className="text-indigo-200 text-sm md:text-base">Essential concepts for economics student - fueled with Paul Krugman's voice</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search concepts..."
              className="bg-indigo-800 bg-opacity-50 border border-indigo-600 rounded-full py-2 px-4 pr-10 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-60"
            />
            <Search size={18} className="absolute right-3 text-indigo-300" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;