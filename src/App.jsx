import React, { useState, useEffect } from 'react';
import { loadData, saveData } from './storage';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loaded = loadData();
    setData(loaded || { start: new Date().toISOString(), days: [], stars: 0, mode: "Tatilde" });
  }, []);

  useEffect(() => {
    if (data) saveData(data);
  }, [data]);

  if (!data) return <div className="flex items-center justify-center h-screen text-2xl">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">✨ Aryasu'nun Yaz Macerası</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-lg text-slate-600 mb-4">🎮 Yaz aktiviteleri uygulaması yakında geliyor!</p>
          <p className="text-slate-500">Satranç, Sudoku, İngilizce Kelimeler, Gitar ve daha fazlası...</p>
        </div>
      </div>
    </div>
  );
}
