'use client';

import { BrainCog } from 'lucide-react';
import { QuizApp } from '@/components/QuizApp';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <BrainCog className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">Professional Quiz</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        <QuizApp />
      </main>
    </div>
  );
}