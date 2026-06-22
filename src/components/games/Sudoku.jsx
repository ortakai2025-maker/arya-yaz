import React, { useState, useEffect } from 'react';
import { RotateCcw, ChevronLeft } from 'lucide-react';

const SUDOKU_EASY = [
  [5,3,0, 0,7,0, 0,0,0],
  [6,0,0, 1,9,5, 0,0,0],
  [0,9,8, 0,0,0, 0,6,0],

  [8,0,0, 0,6,0, 0,0,3],
  [4,0,0, 8,0,3, 0,0,1],
  [7,0,0, 0,2,0, 0,0,6],

  [0,6,0, 0,0,0, 2,8,0],
  [0,0,0, 4,1,9, 0,0,5],
  [0,0,0, 0,8,0, 0,7,9],
];

const SUDOKU_4x4 = [
  [1,0, 0,2],
  [0,3, 4,0],
  [3,0, 0,4],
  [0,4, 1,0],
];

export default function Sudoku({ onBack }) {
  const [size, setSize] = useState('4x4');
  const [grid, setGrid] = useState(size === '4x4' ? SUDOKU_4x4.map(row => [...row]) : SUDOKU_EASY.map(row => [...row]));
  const [solution, setSolution] = useState(size === '4x4' ? SUDOKU_4x4.map(row => [...row]) : SUDOKU_EASY.map(row => [...row]));
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCellChange = (row, col, value) => {
    const newGrid = grid.map(r => [...r]);
    const numValue = value === '' ? 0 : parseInt(value);

    if (numValue === 0 || (size === '4x4' ? numValue <= 4 : numValue <= 9)) {
      newGrid[row][col] = numValue;
      setGrid(newGrid);
      setMoves(moves + 1);
    }
  };

  const resetPuzzle = () => {
    setGrid(size === '4x4' ? SUDOKU_4x4.map(row => [...row]) : SUDOKU_EASY.map(row => [...row]));
    setMoves(0);
    setTime(0);
  };

  const changeDifficulty = (newSize) => {
    setSize(newSize);
    const newGrid = newSize === '4x4' ? SUDOKU_4x4.map(row => [...row]) : SUDOKU_EASY.map(row => [...row]);
    setGrid(newGrid);
    setMoves(0);
    setTime(0);
  };

  const isComplete = grid.every(row => row.every(cell => cell !== 0));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold">
          <ChevronLeft size={20} /> Geri
        </button>
        <h2 className="text-2xl font-bold text-slate-800">🧩 Sudoku</h2>
      </div>

      {/* Difficulty Selector */}
      <div className="flex gap-2">
        {['4x4', '9x9'].map(sz => (
          <button
            key={sz}
            onClick={() => changeDifficulty(sz)}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              size === sz
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {sz}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="bg-blue-100 rounded-lg p-2">
          <p className="text-slate-600">Hamle</p>
          <p className="text-lg font-bold text-blue-600">{moves}</p>
        </div>
        <div className="bg-green-100 rounded-lg p-2">
          <p className="text-slate-600">Zaman</p>
          <p className="text-lg font-bold text-green-600">{Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}</p>
        </div>
        <div className="bg-purple-100 rounded-lg p-2">
          <p className="text-slate-600">Durumu</p>
          <p className="text-lg font-bold text-purple-600">{isComplete ? '✓' : '...'}</p>
        </div>
      </div>

      {/* Grid */}
      <div className={`bg-white rounded-lg shadow-lg p-4 ${size === '4x4' ? 'max-w-xs' : ''}`}>
        <div className={`inline-grid gap-0 ${size === '4x4' ? 'grid-cols-4' : 'grid-cols-9'}`}
          style={{
            backgroundColor: '#333',
            padding: '2px',
            gap: '2px'
          }}>
          {grid.map((row, rowIdx) => (
            row.map((cell, colIdx) => (
              <input
                key={`${rowIdx}-${colIdx}`}
                type="text"
                maxLength="1"
                value={cell === 0 ? '' : cell}
                onChange={(e) => handleCellChange(rowIdx, colIdx, e.target.value)}
                disabled={SUDOKU_EASY[rowIdx]?.[colIdx] !== 0 || (size === '4x4' && SUDOKU_4x4[rowIdx][colIdx] !== 0)}
                className={`w-10 h-10 text-center font-bold text-lg border-0 ${
                  SUDOKU_EASY[rowIdx]?.[colIdx] !== 0 || (size === '4x4' && SUDOKU_4x4[rowIdx][colIdx] !== 0)
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-white cursor-text'
                }`}
              />
            ))
          ))}
        </div>
      </div>

      {/* Buttons */}
      <button
        onClick={resetPuzzle}
        className="w-full py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2"
      >
        <RotateCcw size={20} /> Sıfırla
      </button>

      {isComplete && (
        <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center">
          <p className="text-green-700 font-bold text-lg">🎉 Tamamladın!</p>
          <p className="text-green-600">{moves} hamle, {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}</p>
        </div>
      )}
    </div>
  );
}
