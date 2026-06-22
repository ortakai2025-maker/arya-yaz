import React, { useState } from 'react';
import { RotateCcw, ChevronLeft } from 'lucide-react';

const CHESS_PUZZLES = [
  {
    id: 1,
    title: 'Vezir Mat (1)',
    description: 'Siyahın mat olduğunu bul!',
    puzzle: `
      ┌─┬─┬─┬─┬─┬─┬─┬─┐
    8 │ │ │ │ │ │ │ │ │
      ├─┼─┼─┼─┼─┼─┼─┼─┤
    7 │ │ │ │ │ │ │ │ │
      ├─┼─┼─┼─┼─┼─┼─┼─┤
    6 │ │ │ │ │ │ │ │ │
      ├─┼─┼─┼─┼─┼─┼─┼─┤
    5 │ │ │ │ │ │ │ │ │
      ├─┼─┼─┼─┼─┼─┼─┼─┤
    4 │ │ │ │ │ │ │ │ │
      ├─┼─┼─┼─┼─┼─┼─┼─┤
    3 │ │ │ │♖│ │ │ │♚│
      ├─┼─┼─┼─┼─┼─┼─┼─┤
    2 │ │ │ │ │ │ │ │ │
      ├─┼─┼─┼─┼─┼─┼─┼─┤
    1 │♔│ │ │ │ │ │ │ │
      └─┴─┴─┴─┴─┴─┴─┴─┘
        a  b  c  d  e  f  g  h
    `,
    solution: 'Rh3# (Kale h3 karesine)',
    hint: 'Kale siyah krala saldırın'
  },
  {
    id: 2,
    title: 'Vesir Mat (2)',
    description: 'Beyazın matı kaç hamleye bulur?',
    puzzle: `Puzzle 2...`,
    solution: 'Qe8#',
    hint: 'Vezir 8. sıraya gidin'
  }
];

export default function Chess({ onBack }) {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [solved, setSolved] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const puzzle = CHESS_PUZZLES[currentPuzzle];
  const isSolved = solved.includes(puzzle.id);

  const handleSolve = () => {
    if (!isSolved) {
      setSolved([...solved, puzzle.id]);
    }
  };

  const nextPuzzle = () => {
    if (currentPuzzle < CHESS_PUZZLES.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
      setShowHint(false);
      setShowSolution(false);
    }
  };

  const prevPuzzle = () => {
    if (currentPuzzle > 0) {
      setCurrentPuzzle(currentPuzzle - 1);
      setShowHint(false);
      setShowSolution(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold">
          <ChevronLeft size={20} /> Geri
        </button>
        <h2 className="text-2xl font-bold text-slate-800">♟️ Satranç Bulmacaları</h2>
        <div className="text-sm font-semibold text-slate-600">
          {solved.length}/{CHESS_PUZZLES.length} Çözüldü
        </div>
      </div>

      {/* Puzzle Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{puzzle.title}</h3>
        <p className="text-slate-600 mb-4">{puzzle.description}</p>

        {/* Board */}
        <div className="bg-slate-100 p-4 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
          <pre className="whitespace-pre">{puzzle.puzzle}</pre>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            💡 İpucu
          </button>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition"
          >
            ✓ Çözüm
          </button>
        </div>

        {showHint && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="font-semibold text-yellow-800">💡 {puzzle.hint}</p>
          </div>
        )}

        {showSolution && (
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-4">
            <p className="font-semibold text-purple-800">✓ {puzzle.solution}</p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleSolve}
          className={`w-full py-3 rounded-lg font-bold transition ${
            isSolved
              ? 'bg-green-500 text-white cursor-default'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isSolved ? '✓ Çözüldü!' : '✓ Çözdüm!'}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={prevPuzzle}
          disabled={currentPuzzle === 0}
          className="flex-1 py-2 bg-slate-400 text-white rounded-lg font-semibold hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          ← Önceki
        </button>
        <button
          onClick={nextPuzzle}
          disabled={currentPuzzle === CHESS_PUZZLES.length - 1}
          className="flex-1 py-2 bg-slate-400 text-white rounded-lg font-semibold hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Sonraki →
        </button>
      </div>

      {/* Stats */}
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <p className="text-slate-700">Bulmaca {currentPuzzle + 1} / {CHESS_PUZZLES.length}</p>
      </div>
    </div>
  );
}
