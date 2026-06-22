import React, { useState, useEffect } from 'react';
import { SPANISH } from '../../data/spanish';
import { ChevronLeft, Sparkles } from 'lucide-react';

export default function Spanish({ onBack, updateData, data }) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);

  const currentWord = SPANISH[currentWordIdx];

  const handleAnswerSelect = (idx) => {
    setSelectedAnswer(idx);
    const isCorrect = idx === 0;
    setTotal(total + 1);
    if (isCorrect) {
      setCorrect(correct + 1);
      updateData({ stars: data.stars + 1 });
    }
    setTimeout(() => {
      if (currentWordIdx < SPANISH.length - 1) {
        setCurrentWordIdx(currentWordIdx + 1);
        setSelectedAnswer(null);
      } else {
        setQuizMode(false);
      }
    }, 1000);
  };

  const startQuiz = () => {
    setQuizMode(true);
    setSelectedAnswer(null);
    setCorrect(0);
    setTotal(0);
    setCurrentWordIdx(0);
  };

  if (quizMode) {
    const options = [currentWord[1], ...SPANISH
      .filter((_, i) => i !== currentWordIdx)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w[1])
    ].sort(() => Math.random() - 0.5);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold">
            <ChevronLeft size={20} /> Geri
          </button>
          <h2 className="text-2xl font-bold text-slate-800">🇪🇸 İspanyolca Quiz</h2>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-slate-700">{currentWordIdx + 1} / {SPANISH.length}</span>
            <span className="font-semibold text-slate-700">✓ {correct} / {total}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentWordIdx + 1) / SPANISH.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-sm opacity-90 mb-2">İspanyolca:</p>
          <p className="text-4xl font-bold">{currentWord[0]}</p>
          <p className="text-sm opacity-90 mt-4">Türkçe anlamı nedir?</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerSelect(idx)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-lg font-semibold text-lg transition ${
                selectedAnswer === null
                  ? 'bg-white border-2 border-slate-300 hover:border-red-500 text-slate-800'
                  : idx === 0
                  ? 'bg-green-500 text-white border-2 border-green-600'
                  : selectedAnswer === idx
                  ? 'bg-red-500 text-white border-2 border-red-600'
                  : 'bg-slate-100 text-slate-600 border-2 border-slate-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold">
          <ChevronLeft size={20} /> Geri
        </button>
        <h2 className="text-2xl font-bold text-slate-800">🇪🇸 İspanyolca Kelimeler</h2>
      </div>

      {/* Word Display */}
      <div className="bg-gradient-to-r from-yellow-100 to-red-100 rounded-lg shadow-lg p-8 text-center">
        <p className="text-sm text-slate-600 mb-2">Kelime {currentWordIdx + 1} / {SPANISH.length}</p>
        <p className="text-5xl font-bold text-red-600 mb-4">{currentWord[0]}</p>
        <p className="text-2xl text-slate-700">{currentWord[1]}</p>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => setCurrentWordIdx(Math.max(0, currentWordIdx - 1))}
          disabled={currentWordIdx === 0}
          className="flex-1 py-2 bg-slate-400 text-white rounded-lg font-semibold hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Önceki
        </button>
        <button
          onClick={() => setCurrentWordIdx(Math.min(SPANISH.length - 1, currentWordIdx + 1))}
          disabled={currentWordIdx === SPANISH.length - 1}
          className="flex-1 py-2 bg-slate-400 text-white rounded-lg font-semibold hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sonraki →
        </button>
      </div>

      {/* Quiz Button */}
      <button
        onClick={startQuiz}
        className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
      >
        <Sparkles size={20} /> Quiz'e Başla
      </button>
    </div>
  );
}
