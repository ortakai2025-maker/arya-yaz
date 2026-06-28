import React, { useState } from 'react';
import { ChevronLeft, Sun, Moon, ChevronRight } from 'lucide-react';

const ACTIVITIES = ['Matematik', 'Oyun', 'Gitar', 'Müzik', 'Resim', 'Okuma', 'İngilizce', 'İspanyolca', 'Dinlenme', 'Yemek'];
const TEMPLATE_NAMES = ['Antrenman', 'Londra', 'Okul', 'Boş'];

export default function Settings({ data, updateData, onClose, isDark, setIsDark }) {
  const [currentTab, setCurrentTab] = useState('profile');
  const [selectedWeekStart, setSelectedWeekStart] = useState(new Date(2026, 5, 29)); // 29.06.2026

  const profile = data.profile || { grade: '6. Sınıf', lang1: 'İngilizce', lang2: 'İspanyolca' };
  const durations = data.durations || { book: 20, english: 30, spanish: 20, math: 30 };
  const weeklyPlan = data.weeklyPlan || {};

  const grades = ['1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf', '5. Sınıf', '6. Sınıf', '7. Sınıf', '8. Sınıf'];
  const languages = ['İngilizce', 'İspanyolca', 'Almanca', 'Fransızca'];

  const handleProfileUpdate = (field, value) => {
    const newProfile = { ...profile, [field]: value };
    updateData({ profile: newProfile });
  };

  const handleDurationUpdate = (field, value) => {
    const newDurations = { ...durations, [field]: Math.max(5, parseInt(value) || 0) };
    updateData({ durations: newDurations });
  };

  // Get week days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(selectedWeekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const dayNames = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

  const handleWeekChange = (offset) => {
    const newDate = new Date(selectedWeekStart);
    newDate.setDate(newDate.getDate() + offset * 7);
    setSelectedWeekStart(newDate);
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 22; hour++) {
      slots.push(`${String(hour).padStart(2, '0')}:00`);
    }
    return slots;
  };

  const handleActivityUpdate = (dayIdx, timeSlot, activity) => {
    const dateKey = weekDays[dayIdx].toISOString().split('T')[0];
    if (!weeklyPlan[dateKey]) {
      weeklyPlan[dateKey] = {};
    }
    weeklyPlan[dateKey][timeSlot] = activity;
    updateData({ weeklyPlan });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 sticky top-0 z-40">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <button
              onClick={onClose}
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <ChevronLeft size={24} /> Geri
            </button>
            <h1 className="text-2xl font-bold">⚙️ Ayarlar</h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto p-4 border-b border-slate-300 sticky top-16 bg-white">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'profile', label: '👤 Profil' },
              { id: 'lessons', label: '📚 Dersler' },
              { id: 'planner', label: '📅 Haftalık Plan' },
              { id: 'theme', label: '🎨 Tema' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                  currentTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto p-4">
          {/* Profile Tab */}
          {currentTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">👤 Profil Ayarları</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      📚 Kaçıncı Sınıftasın?
                    </label>
                    <select
                      value={profile.grade}
                      onChange={(e) => handleProfileUpdate('grade', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg font-semibold text-lg"
                    >
                      {grades.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      🇬🇧 1. Yabancı Dil
                    </label>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-slate-700 font-semibold">İngilizce (Varsayılan)</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      🌍 2. Yabancı Dil
                    </label>
                    <select
                      value={profile.lang2}
                      onChange={(e) => handleProfileUpdate('lang2', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg font-semibold text-lg"
                    >
                      {languages.filter(l => l !== 'İngilizce').map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lessons Tab */}
          {currentTab === 'lessons' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">📚 Derslerin Süresi</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      📖 Kitap Okuma
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="5"
                        max="120"
                        step="5"
                        value={durations.book}
                        onChange={(e) => handleDurationUpdate('book', e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-indigo-600 w-20 text-right">
                        {durations.book} dk
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      🇬🇧 İngilizce
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="5"
                        max="120"
                        step="5"
                        value={durations.english}
                        onChange={(e) => handleDurationUpdate('english', e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-indigo-600 w-20 text-right">
                        {durations.english} dk
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      🇪🇸 İspanyolca
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="5"
                        max="120"
                        step="5"
                        value={durations.spanish}
                        onChange={(e) => handleDurationUpdate('spanish', e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-indigo-600 w-20 text-right">
                        {durations.spanish} dk
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      🧮 Matematik
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="5"
                        max="120"
                        step="5"
                        value={durations.math}
                        onChange={(e) => handleDurationUpdate('math', e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold text-indigo-600 w-20 text-right">
                        {durations.math} dk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Weekly Planner Tab */}
          {currentTab === 'planner' && (
            <div className="space-y-6">
              {/* Week Navigation */}
              <div className="flex items-center justify-between bg-white rounded-lg shadow-lg p-4">
                <button
                  onClick={() => handleWeekChange(-1)}
                  className="p-2 hover:bg-slate-200 rounded-lg transition"
                >
                  <ChevronLeft size={24} />
                </button>
                <h3 className="text-lg font-bold">
                  {selectedWeekStart.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} - Haftalık Plan
                </h3>
                <button
                  onClick={() => handleWeekChange(1)}
                  className="p-2 hover:bg-slate-200 rounded-lg transition"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Week Days */}
              <div className="space-y-6">
                {weekDays.map((day, dayIdx) => {
                  const dateKey = day.toISOString().split('T')[0];
                  const dayPlan = weeklyPlan[dateKey] || {};

                  return (
                    <div key={dayIdx} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
                      <h3 className="text-xl font-bold text-slate-800 mb-4">
                        {dayNames[dayIdx]} - {day.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })}
                      </h3>

                      {/* Template Selection */}
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-slate-700 mb-3">🎯 Gün Şablonu Seç:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          {TEMPLATE_NAMES.map(template => (
                            <button
                              key={template}
                              onClick={() => {
                                const templateKey = template.toLowerCase().replace(/\s+/g, '');
                                weeklyPlan[dateKey] = { template: templateKey };
                                updateData({ weeklyPlan });
                              }}
                              className={`px-3 py-2 rounded-lg text-sm font-semibold transition border-2 ${
                                dayPlan.template === template.toLowerCase().replace(/\s+/g, '')
                                  ? 'bg-indigo-600 text-white border-indigo-700'
                                  : 'bg-slate-100 text-slate-800 border-slate-300 hover:border-slate-400'
                              }`}
                            >
                              {template === 'Antrenman' ? '🏐' :
                               template === 'Londra' ? '🇬🇧' :
                               template === 'Okul' ? '🎓' :
                               '⬜'} {template}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div className="space-y-3 max-h-96 overflow-y-auto border-t pt-4">
                        {getTimeSlots().map(timeSlot => (
                          <div key={timeSlot} className="flex gap-3 items-center bg-slate-50 p-3 rounded-lg">
                            <span className="font-bold text-slate-700 w-16">{timeSlot}</span>
                            <select
                              value={dayPlan[timeSlot] || ''}
                              onChange={(e) => handleActivityUpdate(dayIdx, timeSlot, e.target.value)}
                              className="flex-1 px-3 py-1 border border-slate-300 rounded-lg font-semibold"
                            >
                              <option value="">-- Seç --</option>
                              {ACTIVITIES.map(activity => (
                                <option key={activity} value={activity}>{activity}</option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Theme Tab */}
          {currentTab === 'theme' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">🎨 Tema Seç</h2>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setIsDark(false)}
                    className={`p-6 rounded-lg border-2 transition ${
                      !isDark
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <Sun size={32} className="mx-auto mb-2 text-yellow-500" />
                    <p className="font-bold text-slate-800">☀️ Açık Mod</p>
                  </button>

                  <button
                    onClick={() => setIsDark(true)}
                    className={`p-6 rounded-lg border-2 transition ${
                      isDark
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <Moon size={32} className="mx-auto mb-2 text-slate-600" />
                    <p className="font-bold text-slate-800">🌙 Koyu Mod</p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
