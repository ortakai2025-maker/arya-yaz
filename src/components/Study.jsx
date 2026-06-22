import React, { useState } from 'react';
import Vocabulary from './study/Vocabulary';
import Spanish from './study/Spanish';
import Math from './study/Math';
import { BookOpen } from 'lucide-react';

export default function Study({ data, updateData }) {
  const [currentStudy, setCurrentStudy] = useState(null);

  if (currentStudy === 'vocab') {
    return <Vocabulary onBack={() => setCurrentStudy(null)} data={data} updateData={updateData} />;
  }

  if (currentStudy === 'spanish') {
    return <Spanish onBack={() => setCurrentStudy(null)} data={data} updateData={updateData} />;
  }

  if (currentStudy === 'math') {
    return <Math onBack={() => setCurrentStudy(null)} data={data} updateData={updateData} />;
  }

  return (
    <div className="space-y-6 pb-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800">📚 Ders Çalış</h2>
        <p className="text-slate-600 mt-2">Her gün biraz daha öğren!</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Vocabulary Card */}
        <button
          onClick={() => setCurrentStudy('vocab')}
          className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-lg p-6 hover:shadow-xl transition text-left border-2 border-blue-200"
        >
          <div className="text-4xl mb-2">📚</div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">İngilizce Kelimeler</h3>
          <p className="text-slate-600 text-sm mb-4">Her gün 10 yeni kelime öğren</p>
          <div className="flex items-center gap-2 text-blue-600 font-semibold">
            Başla →
          </div>
        </button>

        {/* Spanish Card */}
        <button
          onClick={() => setCurrentStudy('spanish')}
          className="bg-gradient-to-br from-yellow-100 to-red-100 rounded-lg shadow-lg p-6 hover:shadow-xl transition text-left border-2 border-yellow-200"
        >
          <div className="text-4xl mb-2">🇪🇸</div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">İspanyolca Kelimeler</h3>
          <p className="text-slate-600 text-sm mb-4">İspanyolca öğrenmeye başla</p>
          <div className="flex items-center gap-2 text-yellow-600 font-semibold">
            Başla →
          </div>
        </button>

        {/* Math Card */}
        <button
          onClick={() => setCurrentStudy('math')}
          className="bg-gradient-to-br from-green-100 to-teal-100 rounded-lg shadow-lg p-6 hover:shadow-xl transition text-left border-2 border-green-200 sm:col-span-2"
        >
          <div className="text-4xl mb-2">📊</div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">MEB 6. Sınıf Müfredat</h3>
          <p className="text-slate-600 text-sm mb-4">Matematik, Fen, Türkçe, Sosyal Bilgiler soruları</p>
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            Başla →
          </div>
        </button>
      </div>

      {/* Tips */}
      <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-400">
        <h3 className="font-bold text-purple-900 mb-2">💡 Öğrenme İpuçları</h3>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Günlük 10 kelime öğrenmeye alış</li>
          <li>• Quizleri her gün çöz, puan kazanı</li>
          <li>• MEB sorularıyla sınava hazırlan</li>
          <li>• Her doğru cevap sana yıldız kazandırıyor!</li>
        </ul>
      </div>
    </div>
  );
}
