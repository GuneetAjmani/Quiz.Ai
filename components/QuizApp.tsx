'use client';

import React from 'react';
import { Mail, User, ToggleLeft, ToggleRight } from 'lucide-react';
import { QuizSelector } from './QuizSelector';
import { Quiz } from './Quiz';
import { CountrySelector } from './CountrySelector';
import type { Profession } from '@/types';
import { generateQuestions } from '@/utils/quizGenerator';
import { submitUserForm, saveQuizResults } from '@/services/userService';

export function QuizApp() {
  const [selectedProfession, setSelectedProfession] = React.useState<Profession | null>(null);
  const [questions, setQuestions] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState<{ id?: string; name: string; email: string; country: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [saveToFirebase, setSaveToFirebase] = React.useState(true);

  const handleProfessionSelect = (profession: Profession) => {
    setSelectedProfession(profession);
    setQuestions(generateQuestions(profession));
  };

  const handleQuizFinish = async (score: number, answers: string[]) => {
    if (saveToFirebase && userInfo?.id && selectedProfession) {
      try {
        await saveQuizResults(userInfo.id, {
          profession: selectedProfession,
          score,
          totalQuestions: questions.length,
          percentage: (score / (questions.length * 10)) * 100,
          answers,
          timestamp: new Date()
        });
      } catch (err) {
        console.error('Failed to save quiz results:', err);
      }
    }
    setSelectedProfession(null);
    setQuestions(null);
  };

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      country: formData.get('country') as string
    };

    try {
      let userId;
      if (saveToFirebase) {
        userId = await submitUserForm(userData);
      }
      setUserInfo({ ...userData, id: userId });
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 sm:space-y-8">
      {!userInfo ? (
        <div className="w-full max-w-md">
          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white bg-clip-text">
              Welcome to Professional Quiz
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Please enter your details to begin
            </p>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleUserSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="block w-full pl-9 sm:pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 text-sm sm:text-base"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="block w-full pl-9 sm:pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 text-sm sm:text-base"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-1">
                  Country
                </label>
                <CountrySelector />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                <span className="text-sm text-slate-300">Save responses to database</span>
                <button
                  type="button"
                  onClick={() => setSaveToFirebase(!saveToFirebase)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {saveToFirebase ? (
                    <ToggleRight className="h-6 w-6" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg transition-all duration-200 font-semibold shadow-lg text-sm sm:text-base ${
                isSubmitting 
                  ? 'opacity-75 cursor-not-allowed' 
                  : 'hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/25'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Start Quiz'}
            </button>
          </form>
        </div>
      ) : !selectedProfession ? (
        <div className="text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white bg-clip-text">
            Welcome, {userInfo.name}!
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl">
            Select your profession to start a quiz. Each correct answer is worth 10 points.
          </p>
          <QuizSelector onProfessionSelect={handleProfessionSelect} />
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            {selectedProfession} Quiz
          </h2>
          {questions && (
            <Quiz 
              questions={questions} 
              onFinish={handleQuizFinish}
            />
          )}
        </div>
      )}
    </div>
  );
}