import React from 'react';
import { Star, Flame, Trophy, Calendar } from 'lucide-react';

export default function Profile({ data }) {
  const badges = [
    { id: 'first-week', label: '1 Hafta Savaşçısı', icon: '🏆', required: 7 },
    { id: 'star-collector', label: '50 Yıldız', icon: '⭐', required: 50 },
    { id: 'streak-master', label: '7 Gün Serisi', icon: '🔥', required: 7 },
    { id: 'game-master', label: 'Oyun Ustası', icon: '🎮', required: 10 },
  ];

  const completedDays = data.days.filter(d => d.completed.length > 0).length;

  return (
    <div className="space-y-6 pb-4">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-2">👧 Aryasu</h1>
        <p className="text-lg opacity-90">Yaz Macerası Şampiyonu</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-slate-800">{data.stars}</div>
          <p className="text-xs text-slate-600">Toplam Yıldız</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <Flame className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-slate-800">{calculateStreak(data.days)}</div>
          <p className="text-xs text-slate-600">Gün Serisi</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-slate-800">{completedDays}</div>
          <p className="text-xs text-slate-600">Aktif Gün</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-slate-800">{Math.floor(data.stars / 10)}</div>
          <p className="text-xs text-slate-600">Rozet</p>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">🏆 Rozetler</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {badges.map(badge => {
            const earned = checkBadgeEarned(badge, data);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-lg text-center transition-all ${
                  earned
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400'
                    : 'bg-slate-100 border-2 border-slate-300 opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className="text-xs font-semibold text-slate-800">{badge.label}</p>
                {!earned && (
                  <p className="text-xs text-slate-600 mt-1">
                    {badge.required} gerekli
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">📊 Özet</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <span className="text-slate-700">Toplam Aktivite Günü</span>
            <span className="font-bold text-indigo-600">{completedDays} gün</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <span className="text-slate-700">Ortalama Yıldız/Gün</span>
            <span className="font-bold text-indigo-600">
              {completedDays > 0 ? (data.stars / completedDays).toFixed(1) : 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-700">Bu Hafta Yerlocation</span>
            <span className="font-bold text-indigo-600">{data.mode}</span>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 border-l-4 border-green-500 rounded-lg p-6">
        <p className="text-slate-700 font-semibold text-center">
          {data.stars === 0
            ? '🎯 Hadi ilk aktiviteni tamamla!'
            : data.stars < 20
            ? '💪 Başarılı başladın, devam et!'
            : data.stars < 50
            ? '⭐ Harika gidiyorsun, şampiyon!'
            : '🏆 Sen bir yaz efsendesisin!'}
        </p>
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

function checkBadgeEarned(badge, data) {
  const completedDays = data.days.filter(d => d.completed.length > 0).length;
  const streak = calculateStreak(data.days);

  switch (badge.id) {
    case 'first-week':
      return completedDays >= 7;
    case 'star-collector':
      return data.stars >= 50;
    case 'streak-master':
      return streak >= 7;
    case 'game-master':
      return data.days.some(d => d.completed.includes('game')) && data.days.filter(d => d.completed.includes('game')).length >= 10;
    default:
      return false;
  }
}
