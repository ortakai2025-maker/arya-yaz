import React, { useState, useEffect } from 'react';
import { MEB } from '../../data/meb-quizzes';
import { ChevronLeft, Sparkles } from 'lucide-react';

const ALL_QUIZZES = Object.values(MEB).flat();

export default function Math({ onBack, updateData, data }) {
  const [category, setCategory] = useState('Matematik');
  const [quizMode, setQuizMode] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [categoryQuestions, setCategoryQuestions] = useState(MEB[category] || []);

  useEffect(() => {
    const questions = MEB[category] || [];
    setCategoryQuestions(questions);
  }, [category]);

  const currentQuestion = categoryQuestions[currentIdx];
  if (!currentQuestion) return null;

  const handleAnswerSelect = (idx) => {
    setSelectedAnswer(idx);
    const isCorrect = idx === currentQuestion.a;
    setTotal(total + 1);
    if (isCorrect) {
      setCorrect(correct + 1);
      updateData({ stars: data.stars + 1 });
    }
    setTimeout(() => {
      if (currentIdx < categoryQuestions.length - 1) {
        setCurrentIdx(currentIdx + 1);
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
    setCurrentIdx(0);
  };

  if (quizMode) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold">
            <ChevronLeft size={20} /> Geri
          </button>
          <h2 className="text-2xl font-bold text-slate-800">📊 {category} Quiz</h2>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-slate-700">{currentIdx + 1} / {categoryQuestions.length}</span>
            <span className="font-semibold text-slate-700">✓ {correct} / {total}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentIdx + 1) / categoryQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
          <p className="text-slate-700 text-lg font-semibold mb-4">{currentQuestion.q}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.c.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerSelect(idx)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-lg font-semibold text-lg transition ${
                selectedAnswer === null
                  ? 'bg-white border-2 border-slate-300 hover:border-green-500 text-slate-800'
                  : idx === currentQuestion.a
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
        <h2 className="text-2xl font-bold text-slate-800">📊 MEB Soruları</h2>
      </div>

      {/* Category Selector */}
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(MEB).map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`py-2 px-3 rounded-lg font-semibold text-sm transition ${
              category === cat
                ? 'bg-green-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {cat === 'Matematik' ? '🧮 Matematik' :
             cat === 'Fen Bilimleri' ? '🔬 Fen' :
             cat === 'Türkçe' ? '📖 Türkçe' :
             '🌍 Sosyal'}
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="text-blue-800 font-semibold">
          {category}: {categoryQuestions.length} soru
        </p>
      </div>

      {/* Quiz Button */}
      <button
        onClick={startQuiz}
        className="w-full py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2 text-lg"
      >
        <Sparkles size={20} /> Quiz'e Başla ({categoryQuestions.length} soru)
      </button>

      {/* Tips */}
      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
        <h3 className="font-bold text-yellow-900 mb-2">💡 MEB 6. Sınıf Müfredat</h3>
        <p className="text-sm text-yellow-800">
          Türkiye MEB müfredatına göre hazırlanmış sorularla sınavlara hazırlan!
        </p>
      </div>
    </div>
  );
}
