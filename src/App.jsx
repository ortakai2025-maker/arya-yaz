import React, { useState, useEffect } from 'react';
import { loadData, saveData } from './storage';
import {
  Sun, BookOpen, Calculator, Languages, Film, Crown, Grid3x3,
  CheckCircle2, Music, Dumbbell, Waves, Drama, Home as HomeIcon, LogOut
} from 'lucide-react';

// Pages
import Home from './components/Home';
import Profile from './components/Profile';
import Games from './components/Games';
import Study from './components/Study';
import Reading from './components/Reading';
import Guitar from './components/Guitar';
import Culture from './components/Culture';
import Settings from './components/Settings';
import WeeklyPlanner from './components/WeeklyPlanner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [data, setData] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPlanner, setShowPlanner] = useState(false);

  useEffect(() => {
    const loaded = loadData();
    setData(loaded || {
      start: new Date().toISOString(),
      days: [],
      stars: 0,
      mode: "Tatilde",
      week: 1,
      media: [],
      uploads: [],
      practice: {}
    });
  }, []);

  useEffect(() => {
    if (data) saveData(data);
  }, [data]);

  if (!data) return <div className="flex items-center justify-center h-screen text-2xl">Yükleniyor...</div>;

  const updateData = (updates) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const navItems = [
    { id: 'home', label: 'Anasayfa', icon: HomeIcon },
    { id: 'vocab', label: 'Kelimeler', icon: Languages },
    { id: 'games', label: 'Oyunlar', icon: Grid3x3 },
    { id: 'math', label: 'Matematik', icon: Calculator },
    { id: 'reading', label: 'Okuma', icon: BookOpen },
    { id: 'guitar', label: 'Gitar', icon: Music },
    { id: 'culture', label: 'Kültür', icon: Film },
    { id: 'profile', label: 'Profil', icon: Crown },
  ];

  return (
    <div className={`min-h-screen transition-colors ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 to-slate-800'
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      {/* Top Navigation */}
      <nav className={`${isDark ? 'bg-slate-900 border-b border-slate-700' : 'bg-gradient-to-r from-indigo-600 to-blue-500'} text-white shadow-lg sticky top-0 z-50`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            ✨ Aryasu Yaz
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <span>⭐ {data.stars} Yıldız</span>
            <button
              onClick={() => setShowPlanner(true)}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition text-sm font-semibold"
              title="Haftalık Plan"
            >
              📅
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition text-sm font-semibold"
              title="Ayarlar"
            >
              ⚙️
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4">
        {currentPage === 'home' && <Home data={data} updateData={updateData} />}
        {currentPage === 'profile' && <Profile data={data} />}
        {currentPage === 'vocab' && <Study data={data} updateData={updateData} />}
        {currentPage === 'games' && <Games />}
        {currentPage === 'math' && <Study data={data} updateData={updateData} />}
        {currentPage === 'reading' && <Reading data={data} updateData={updateData} />}
        {currentPage === 'guitar' && <Guitar data={data} updateData={updateData} />}
        {currentPage === 'culture' && <Culture data={data} updateData={updateData} />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-2 py-2 grid grid-cols-4 gap-1 sm:grid-cols-8">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all text-xs sm:text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={20} className="mb-1" />
                <span className="line-clamp-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Padding for Navigation */}
      <div className="h-24"></div>

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          data={data}
          updateData={updateData}
          onClose={() => setShowSettings(false)}
          isDark={isDark}
          setIsDark={setIsDark}
        />
      )}

      {/* Weekly Planner Modal */}
      {showPlanner && (
        <WeeklyPlanner
          data={data}
          updateData={updateData}
          onClose={() => setShowPlanner(false)}
        />
      )}
    </div>
  );
}
