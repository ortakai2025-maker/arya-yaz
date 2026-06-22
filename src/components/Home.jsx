import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Star, Flame, PartyPopper } from 'lucide-react';

export default function Home({ data, updateData }) {
  const activities = [
    { id: 'vocab', label: '📚 10 Kelime Öğren', icon: '📚' },
    { id: 'math', label: '🧮 Matematik Yap', icon: '🧮' },
    { id: 'read', label: '📖 20 Dakika Oku', icon: '📖' },
    { id: 'guitar', label: '🎸 Gitar Çal', icon: '🎸' },
    { id: 'game', label: '🎮 Oyun Oyna', icon: '🎮' },
    { id: 'exercise', label: '💪 Egzersiz Yap', icon: '💪' },
  ];

  const today = new Date().toISOString().split('T')[0];
  const todayData = data.days.find(d => d.date === today) || { date: today, completed: [] };

  const handleCheck = (activityId) => {
    const isCompleted = todayData.completed.includes(activityId);
    const newCompleted = isCompleted
      ? todayData.completed.filter(id => id !== activityId)
      : [...todayData.completed, activityId];

    const updatedDays = data.days.filter(d => d.date !== today);
    updatedDays.push({ date: today, completed: newCompleted });

    const newStars = data.stars + (isCompleted ? -1 : 1);
    updateData({ days: updatedDays, stars: newStars });
  };

  const completionPercentage = Math.round((todayData.completed.length / activities.length) * 100);
  const streak = calculateStreak(data.days);

  return (
    <div className="space-y-6 pb-4">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-3xl font-bold text-yellow-500">⭐</div>
          <div className="text-2xl font-bold text-slate-800">{data.stars}</div>
          <p className="text-sm text-slate-600">Yıldız</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-3xl font-bold text-red-500">🔥</div>
          <div className="text-2xl font-bold text-slate-800">{streak}</div>
          <p className="text-sm text-slate-600">Gün Serisi</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-3xl font-bold text-blue-500">%</div>
          <div className="text-2xl font-bold text-slate-800">{completionPercentage}</div>
          <p className="text-sm text-slate-600">Bugün Tamamlandı</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-800">Bugünün Görevleri</h2>
          {completionPercentage === 100 && (
            <div className="flex items-center gap-2 text-green-600 font-bold animate-bounce">
              <PartyPopper size={20} /> Tamamlandı!
            </div>
          )}
        </div>
        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-slate-600 mt-2">
          {todayData.completed.length} / {activities.length} tamamlandı
        </p>
      </div>

      {/* Activity Checklist */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Aktiviteler</h3>
        <div className="space-y-3">
          {activities.map(activity => {
            const isCompleted = todayData.completed.includes(activity.id);
            return (
              <button
                key={activity.id}
                onClick={() => handleCheck(activity.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all ${
                  isCompleted
                    ? 'bg-green-50 border-2 border-green-400'
                    : 'bg-slate-50 border-2 border-slate-200 hover:border-indigo-400'
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <span className={`text-left font-semibold ${isCompleted ? 'text-green-700' : 'text-slate-700'}`}>
                  {activity.label}
                </span>
                {isCompleted && <Star className="w-5 h-5 text-yellow-500 ml-auto" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Bu Hafta Nerede?</h3>
        <div className="grid grid-cols-3 gap-3">
          {['Tatilde', 'Evde', 'Londra'].map(mode => (
            <button
              key={mode}
              onClick={() => updateData({ mode })}
              className={`p-4 rounded-lg font-semibold transition-all ${
                data.mode === mode
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function calculateStreak(days) {
  if (days.length === 0) return 0;

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];

    const dayData = days.find(d => d.date === dateStr);
    if (dayData && dayData.completed.length > 0) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  return streak;
}
