import React, { useState, useEffect } from "react";
import { UserAnswer, UserRegistration } from "../types";
import { Question, QUESTION_POOL } from "../data/questions";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  HelpCircle,
  Award
} from "lucide-react";
import { motion } from "motion/react";

interface QuizSectionProps {
  user: UserRegistration;
  onFinish: (answers: UserAnswer[], timeElapsedSeconds: number) => void;
}

// Function to shuffle array and pick N items
function getRandomQuestions(count: number): Question[] {
  const shuffled = [...QUESTION_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function QuizSection({ user, onFinish }: QuizSectionProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  
  // Timer state
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Initialize 30 random questions
  useEffect(() => {
    setQuestions(getRandomQuestions(30));
  }, []);

  // Timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format seconds to MM:SS
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-800"></div>
        <p className="text-sm text-slate-500 mt-4">Preparando evaluación teórica...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progressPercent = ((currentIndex) / 30) * 100;

  const handleOptionClick = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      selectedOptionIndex: optionIndex,
      selectedOptionText: currentQuestion.options[optionIndex],
      isCorrect,
      correctOptionIndex: currentQuestion.correctAnswerIndex,
      correctOptionText: currentQuestion.options[currentQuestion.correctAnswerIndex]
    };

    setUserAnswers(prev => [...prev, newAnswer]);
  };

  const handleNext = () => {
    if (currentIndex < 29) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz finished
      onFinish(userAnswers, secondsElapsed);
    }
  };

  return (
    <div className="flex-1 px-5 py-4 flex flex-col justify-between h-full bg-slate-50" id="quiz-view">
      {/* Quiz Top Header */}
      <div className="shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Cat. {user.tipoLicencia}</span>
          </div>
          <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-bold border border-blue-100">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-mono">{formatTime(secondsElapsed)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1 mb-3">
          <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
            <span>Pregunta {currentIndex + 1} de 30</span>
            <span className="text-blue-600">{Math.round(((currentIndex + 1)/30)*100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / 30) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col justify-center my-1.5 overflow-y-auto pr-0.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-h-[110px] flex flex-col justify-center mb-3">
          <div className="flex gap-2.5 items-start">
            <div className="w-5 h-5 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              {currentIndex + 1}
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
              {currentQuestion.text}
            </h2>
          </div>
        </div>

        {/* Options Stack */}
        <div className="space-y-2">
          {currentQuestion.options.map((option, idx) => {
            const letter = ["A", "B", "C", "D"][idx];
            let optStyle = "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100/70 hover:border-slate-300";
            let iconElement = null;

            if (isAnswered) {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctAnswerIndex;

              if (isCorrect) {
                // Highlight correct answer in green always
                optStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-100";
                iconElement = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
              } else if (isSelected) {
                // Selected option was incorrect
                optStyle = "border-rose-400 bg-rose-50 text-rose-900 ring-1 ring-rose-100";
                iconElement = <XCircle className="w-4 h-4 text-rose-500 shrink-0" />;
              } else {
                // Other non-selected options
                optStyle = "border-slate-100 bg-white text-slate-400 opacity-60";
              }
            }

            return (
              <motion.button
                key={idx}
                whileTap={!isAnswered ? { scale: 0.99 } : {}}
                disabled={isAnswered}
                onClick={() => handleOptionClick(idx)}
                className={`w-full p-2.5 text-left text-xs rounded-lg border flex items-center justify-between gap-3 transition-all ${optStyle}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold shrink-0 ${
                    isAnswered 
                      ? "bg-slate-200 text-slate-500" 
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {letter}
                  </span>
                  <span className="leading-tight text-[11px]">{option}</span>
                </div>
                {iconElement}
              </motion.button>
            );
          })}
        </div>

        {/* Correct/Incorrect Explanation Banner */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-3 p-3 rounded-lg border text-[11px] leading-relaxed ${
              selectedOption === currentQuestion.correctAnswerIndex
                ? "bg-emerald-50/50 border-emerald-100 text-emerald-800"
                : "bg-rose-50/50 border-rose-100 text-rose-800"
            }`}
          >
            <div className="flex gap-1.5 items-center font-bold mb-0.5">
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span>
                {selectedOption === currentQuestion.correctAnswerIndex 
                  ? "¡Respuesta Correcta!" 
                  : "Respuesta Incorrecta"}
              </span>
            </div>
            <p className="text-[10px] leading-normal">{currentQuestion.explanation}</p>
          </motion.div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="pt-3 border-t border-slate-200/60 mt-1 shrink-0">
        <motion.button
          whileTap={isAnswered ? { scale: 0.98 } : {}}
          disabled={!isAnswered}
          onClick={handleNext}
          className={`w-full h-11 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all ${
            isAnswered
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100 cursor-pointer"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          id="btn-next-question"
        >
          <span>
            {currentIndex < 29 ? "Siguiente Pregunta" : "Ver Resultados"}
          </span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
