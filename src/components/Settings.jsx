import React, { useState } from 'react';
import { Settings as SettingsIcon, ChevronLeft, Sun, Moon } from 'lucide-react';

export default function Settings({ data, updateData, onClose, isDark, setIsDark }) {
  const [currentTab, setCurrentTab] = useState('profile');

  const grades = ['1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf', '5. Sınıf', '6. Sınıf', '7. Sınıf', '8. Sınıf'];
  const languages = ['İngilizce', 'İspanyolca', 'Almanca', 'Fransızca'];

  const profile = data.profile || { grade: '6. Sınıf', lang1: 'İngilizce', lang2: 'İspanyolca' };
  const durations = data.durations || { book: 20, english: 30, spanish: 20, math: 30 };

  const handleProfileUpdate = (field, value) => {
    const newProfile = { ...profile, [field]: value };
    updateData({ profile: newProfile });
  };

  const handleDurationUpdate = (field, value) => {
    const newDurations = { ...durations, [field]: Math.max(5, parseInt(value) || 0) };
    updateData({ durations: newDurations });
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

        {/* Content */}
        <div className="max-w-6xl mx-auto p-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[
              { id: 'profile', label: '👤 Profil', icon: '👤' },
              { id: 'durations', label: '⏱️ Süreler', icon: '⏱️' },
              { id: 'theme', label: '🎨 Tema', icon: '🎨' },
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
                      🌍 1. Yabancı Dil (İngilizce)
                    </label>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-slate-700">İngilizce (varsayılan)</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      🇪🇸 2. Yabancı Dil
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

          {/* Durations Tab */}
          {currentTab === 'durations' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">⏱️ Günlük Süreler</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      📖 Kitap Okuma Süresi
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
                      🇬🇧 İngilizce Ders Süresi
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
                      🇪🇸 İspanyolca Ders Süresi
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
                      🧮 Matematik Ders Süresi
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

          {/* Theme Tab */}
          {currentTab === 'theme' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">🎨 Tema</h2>

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

                <div className="mt-8 p-4 bg-slate-100 rounded-lg">
                  <p className="text-sm text-slate-600">
                    💡 Koyu mod göz yorgunluğunu azaltır ve akşam saatlerinde daha rahat görüş sağlar.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
