import React from 'react';
import { PartyPopper, CheckCircle2, XCircle, PlayCircle, Cpu } from 'lucide-react';
import type { Question, QuizState } from '../types';

interface QuizProps {
  questions: Question[];
  onFinish: (score: number, answers: string[]) => void;
}

const correctMessages = [
  { text: "Hooray! You nailed it! 🎯", emoji: "🎉" },
  { text: "Superb work! Keep it up!", emoji: "⭐" },
  { text: "Brilliant answer!", emoji: "🌟" },
  { text: "You're on fire!", emoji: "🔥" },
  { text: "Outstanding!", emoji: "🏆" }
];

const incorrectMessages = [
  { text: "Nice try! Keep learning!", emoji: "💪" },
  { text: "Almost there! Keep going!", emoji: "🎯" },
  { text: "Don't give up!", emoji: "✨" },
  { text: "You're making progress!", emoji: "🌱" },
  { text: "Keep practicing!", emoji: "📚" }
];

export function Quiz({ questions, onFinish }: QuizProps) {
  const [state, setState] = React.useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    showScore: false,
    selectedAnswers: [],
  });
  const [showCelebration, setShowCelebration] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [feedbackMessage, setFeedbackMessage] = React.useState<{ text: string; emoji: string } | null>(null);
  const [yesAnswer, setYesAnswer] = React.useState('');
  const [readyForNext, setReadyForNext] = React.useState(false);

  const moveToNextQuestion = (answer: string, isCorrect: boolean, isYesNo: boolean = false) => {
    // Always add 10 points for yes/no questions, otherwise only for correct answers
    const newScore = isYesNo ? state.score + 10 : (isCorrect ? state.score + 10 : state.score);
    const newAnswers = [...state.selectedAnswers, answer];

    if (state.currentQuestion === questions.length - 1) {
      setState({
        ...state,
        score: newScore,
        showScore: true,
        selectedAnswers: newAnswers,
      });
    } else {
      setState({
        ...state,
        currentQuestion: state.currentQuestion + 1,
        score: newScore,
        selectedAnswers: newAnswers,
      });
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
    setFeedbackMessage(null);
    setReadyForNext(false);
    setYesAnswer('');
  };

  const handleAnswerClick = (answer: string) => {
    if (showFeedback) return;

    const currentQuestion = questions[state.currentQuestion];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const messages = isCorrect ? correctMessages : incorrectMessages;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setFeedbackMessage(randomMessage);

    if (isCorrect) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1500);
      setTimeout(() => moveToNextQuestion(answer, isCorrect), 1500);
    } else {
      // For wrong answers, show feedback briefly then move to next question
      setTimeout(() => moveToNextQuestion(answer, isCorrect), 1000);
    }
  };

  const handleYesNoAnswer = (answer: string) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);
    setReadyForNext(true);

    if (answer === 'Yes') {
      setYesAnswer('');
    }

    // Show celebration for yes/no questions as they always get points
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1500);
  };

  const handleNextClick = () => {
    const answer = selectedAnswer === 'Yes' ? yesAnswer || 'Yes' : selectedAnswer || '';
    moveToNextQuestion(answer, true, true); // Pass true for isYesNo parameter
  };

  const resetQuiz = () => {
    onFinish(state.score, state.selectedAnswers);
    setState({
      currentQuestion: 0,
      score: 0,
      showScore: false,
      selectedAnswers: [],
    });
    setSelectedAnswer(null);
    setShowFeedback(false);
    setFeedbackMessage(null);
    setYesAnswer('');
    setReadyForNext(false);
  };

  if (state.showScore) {
    const totalQuestions = questions.length;
    const percentage = (state.score / (totalQuestions * 10)) * 100;
    
    return (
      <div className="space-y-8 sm:space-y-12">
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="flex items-center justify-center">
            <PartyPopper className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-400 animate-bounce" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Quiz Completed!</h2>
          <div className="space-y-2">
            <p className="text-xl sm:text-2xl font-semibold text-blue-400">
              Your score: {state.score} out of {questions.length * 10}
            </p>
            <p className="text-base sm:text-lg text-slate-300">
              You got {state.score / 10} out of {totalQuestions} questions correct! ({percentage.toFixed(1)}%)
            </p>
            {percentage >= 80 && (
              <p className="text-base sm:text-lg text-emerald-400 font-semibold">
                Outstanding performance! You're a true professional! 🏆
              </p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-base sm:text-lg text-blue-400 font-semibold">
                Great job! You've got solid knowledge! 👏
              </p>
            )}
            {percentage < 60 && (
              <p className="text-base sm:text-lg text-amber-400 font-semibold">
                Keep learning! Practice makes perfect! 💪
              </p>
            )}
          </div>
          <button
            onClick={resetQuiz}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-200 font-semibold shadow-lg hover:shadow-blue-500/25 text-sm sm:text-base"
          >
            Try Another Quiz
          </button>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center">Our Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 sm:p-6 hover:bg-slate-700/50 transition-colors duration-200">
              <div className="flex items-center space-x-3 mb-3">
                <PlayCircle className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />
                <h4 className="text-lg sm:text-xl font-semibold text-white">My-OTT-AI</h4>
              </div>
              <p className="text-sm sm:text-base text-slate-300">
                A revolutionary streaming platform powered by AI that personalizes your entertainment experience. 
                Get content recommendations tailored to your preferences and enjoy seamless streaming across all devices.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 sm:p-6 hover:bg-slate-700/50 transition-colors duration-200">
              <div className="flex items-center space-x-3 mb-3">
                <Cpu className="h-6 w-6 sm:h-7 sm:w-7 text-purple-400" />
                <h4 className="text-lg sm:text-xl font-semibold text-white">PoweredByAI</h4>
              </div>
              <p className="text-sm sm:text-base text-slate-300">
                An advanced AI solution that transforms businesses through intelligent automation. 
                Leverage cutting-edge machine learning to optimize operations, enhance customer experiences, 
                and drive innovation across your organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[state.currentQuestion];
  const isYesNoQuestion = currentQuestion.type === 'yesno';

  return (
    <div className="w-full max-w-2xl relative">
      {showCelebration && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-emerald-900/90 text-emerald-400 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-lg animate-bounce flex items-center space-x-2 backdrop-blur-sm border border-emerald-700/50">
            <PartyPopper className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-semibold text-sm sm:text-base">+10 points</span>
          </div>
        </div>
      )}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <span className="text-base sm:text-lg font-semibold text-slate-300">
            Question {state.currentQuestion + 1}/{questions.length}
          </span>
          <span className="text-base sm:text-lg font-semibold text-blue-400">Score: {state.score}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">{currentQuestion.question}</h2>
        <div className="space-y-2 sm:space-y-3">
          {isYesNoQuestion ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option;
                  
                  return (
                    <label
                      key={option}
                      className="flex-1"
                    >
                      <input
                        type="radio"
                        name="yesno"
                        className="sr-only peer"
                        disabled={showFeedback}
                        checked={isSelected}
                        onChange={() => handleYesNoAnswer(option)}
                      />
                      <div className={`
                        w-full p-3 sm:p-4 rounded-lg transition-all duration-200
                        flex items-center justify-center cursor-pointer
                        ${!showFeedback 
                          ? 'bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:text-white peer-checked:bg-blue-600/50 peer-checked:border-blue-500'
                          : 'bg-slate-800/50 border border-slate-700/50 text-slate-400 peer-checked:bg-blue-600/50 peer-checked:border-blue-500'
                        }
                      `}>
                        <span className="text-sm sm:text-base font-medium">{option}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
              {showFeedback && selectedAnswer === 'Yes' && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={yesAnswer}
                    onChange={(e) => setYesAnswer(e.target.value)}
                    placeholder="Please provide more details..."
                    className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              {showFeedback && currentQuestion.content && (
                <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                  <p className="text-slate-300 text-sm sm:text-base">{currentQuestion.content}</p>
                </div>
              )}
              {readyForNext && (
                <button
                  onClick={handleNextClick}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                >
                  Next Question
                </button>
              )}
            </div>
          ) : (
            currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              
              let buttonClasses = "w-full p-3 sm:p-4 text-left rounded-lg transition-all duration-200 flex items-center justify-between text-sm sm:text-base ";
              
              if (!showFeedback) {
                buttonClasses += "bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:text-white";
              } else if (isCorrect) {
                buttonClasses += "bg-emerald-900/50 border-emerald-500 text-emerald-400 border";
              } else if (isSelected && !isCorrect) {
                buttonClasses += "bg-red-900/50 border-red-500 text-red-400 border";
              } else {
                buttonClasses += "bg-slate-800/50 border border-slate-700/50 text-slate-400";
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswerClick(option)}
                  disabled={showFeedback}
                  className={buttonClasses}
                >
                  <span>{option}</span>
                  {showFeedback && isCorrect && (
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                  )}
                  {showFeedback && isSelected && !isCorrect && (
                    <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                  )}
                </button>
              );
            })
          )}
        </div>
        {showFeedback && feedbackMessage && !isYesNoQuestion && (
          <div className={`mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-lg text-center font-semibold text-sm sm:text-base ${
            selectedAnswer === currentQuestion.correctAnswer 
              ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-500/50'
              : 'bg-amber-900/50 text-amber-400 border border-amber-500/50'
          }`}>
            {feedbackMessage.text} {feedbackMessage.emoji}
          </div>
        )}
      </div>
    </div>
  );
}