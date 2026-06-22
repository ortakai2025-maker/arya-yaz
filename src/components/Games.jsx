import React, { useState } from 'react';
import Chess from './games/Chess';
import Sudoku from './games/Sudoku';
import { Grid3x3 } from 'lucide-react';

export default function Games() {
  const [currentGame, setCurrentGame] = useState(null);

  if (currentGame === 'chess') {
    return <Chess onBack={() => setCurrentGame(null)} />;
  }

  if (currentGame === 'sudoku') {
    return <Sudoku onBack={() => setCurrentGame(null)} />;
  }

  return (
    <div className="space-y-6 pb-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800">🎮 Oyunlar</h2>
        <p className="text-slate-600 mt-2">Eğlene eğlene öğren!</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Chess Card */}
        <button
          onClick={() => setCurrentGame('chess')}
          className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg shadow-lg p-6 hover:shadow-xl transition text-left border-2 border-orange-200"
        >
          <div className="text-4xl mb-2">♟️</div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">Satranç Bulmacaları</h3>
          <p className="text-slate-600 text-sm mb-4">Mat bulmacalarını çöz ve zekandı geliştir</p>
          <div className="flex items-center gap-2 text-orange-600 font-semibold">
            Başla →
          </div>
        </button>

        {/* Sudoku Card */}
        <button
          onClick={() => setCurrentGame('sudoku')}
          className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg shadow-lg p-6 hover:shadow-xl transition text-left border-2 border-purple-200"
        >
          <div className="text-4xl mb-2">🧩</div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">Sudoku</h3>
          <p className="text-slate-600 text-sm mb-4">4x4 veya 9x9 bulmacaları çöz</p>
          <div className="flex items-center gap-2 text-purple-600 font-semibold">
            Başla →
          </div>
        </button>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
        <h3 className="font-bold text-blue-900 mb-2">💡 İpuçları</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Satranç bulmacalarında hızlı mat bulabilir misin?</li>
          <li>• Sudoku'da sabırla her sayıyı kontrol et</li>
          <li>• Her doğru cevap sana yıldız kazandırıyor!</li>
        </ul>
      </div>
    </div>
  );
}
