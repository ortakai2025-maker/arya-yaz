import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Pause, RotateCcw } from 'lucide-react';

export default function Reading({ data, updateData }) {
  const [sessionCount, setSessionCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [targetSeconds] = useState(20 * 60); // 20 minutes

  const sessionGoal = 2;
  const progress = Math.min((sessionCount / sessionGoal) * 100, 100);

  useEffect(() => {
    let interval;
    if (isRunning && currentTime < targetSeconds) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    } else if (currentTime >= targetSeconds && isRunning) {
      setIsRunning(false);
      setSessionCount(sessionCount + 1);
      setCurrentTime(0);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentTime, targetSeconds, sessionCount]);

  const handleReset = () => {
    setCurrentTime(0);
    setIsRunning(false);
  };

  const handleSessionDone = () => {
    if (sessionCount < sessionGoal) {
      setSessionCount(sessionCount + 1);
      setCurrentTime(0);
      setIsRunning(false);
      if (sessionCount + 1 >= sessionGoal) {
        updateData({ stars: data.stars + 2 });
      }
    }
  };

  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;

  return (
    <div className="space-y-6 pb-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">📖 Okuma Saati</h2>
        <p className="text-slate-600 mt-2">Her gün 20 dakika oku!</p>
      </div>

      {/* Daily Goal */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">Bugünün Hedefi</h3>
          <span className="text-2xl font-bold text-indigo-600">{sessionCount} / {sessionGoal}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-indigo-500 to-blue-500 h-4 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-slate-600 mt-3">
          {sessionGoal - sessionCount === 0
            ? '✓ Tebrikler, hedefine ulaştın!'
            : `${sessionGoal - sessionCount} seans daha gerekli`}
        </p>
      </div>

      {/* Timer */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg shadow-xl p-8 text-center">
        <p className="text-sm opacity-90 mb-4">Okuma Süresi</p>
        <p className="text-6xl font-bold font-mono mb-4">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
        <p className="text-sm opacity-90">Hedef: {Math.floor(targetSeconds / 60)} dakika</p>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex-1 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2 ${
            isRunning
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isRunning ? (
            <>
              <Pause size={24} /> Durdur
            </>
          ) : (
            <>
              <Play size={24} /> Başlat
            </>
          )}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-4 bg-slate-400 hover:bg-slate-500 text-white rounded-lg font-bold transition flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} /> Sıfırla
        </button>
      </div>

      {/* Session Complete Button */}
      {currentTime >= 60 && (
        <button
          onClick={handleSessionDone}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold text-lg hover:shadow-lg transition"
        >
          ✓ Oturumu Tamamla {sessionCount + 1}/{sessionGoal}
        </button>
      )}

      {/* Tips */}
      <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-400">
        <h3 className="font-bold text-amber-900 mb-2">💡 Okuma İpuçları</h3>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• Sakin bir yerde oku</li>
          <li>• Telefonu kapalı tut</li>
          <li>• Her gün aynı saatte oku</li>
          <li>• Okuduğun bölümleri özetlemeye çalış</li>
        </ul>
      </div>

      {/* Today's Stats */}
      {sessionCount >= sessionGoal && (
        <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center">
          <p className="text-green-700 font-bold text-lg">🎉 Harika! Hedefini tamamladın!</p>
          <p className="text-green-600">+2 ⭐ Kazandın!</p>
        </div>
      )}
    </div>
  );
}
