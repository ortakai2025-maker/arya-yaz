import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PLAN_TEMPLATES = {
  volleyball: {
    name: '🏐 Voleybol',
    color: 'from-orange-100 to-orange-200',
    schedule: [
      { time: '07:00-08:00', activity: 'Voleybol Antrenmanı' },
      { time: '08:00-09:00', activity: 'Kahvaltı & Dinlenme' },
      { time: '09:00-10:00', activity: 'İngilizce Ders' },
      { time: '10:00-11:00', activity: 'Matematik' },
      { time: '11:00-12:00', activity: 'Arası' },
      { time: '12:00-13:00', activity: 'Öğle Yemeği' },
      { time: '13:00-14:00', activity: 'Okuma' },
      { time: '14:00-17:00', activity: 'Oyunlar & Sosyal' },
    ]
  },
  holiday: {
    name: '🏖️ Tatil',
    color: 'from-yellow-100 to-pink-100',
    schedule: [
      { time: '08:00-09:00', activity: 'Kahvaltı' },
      { time: '09:00-10:00', activity: 'İngilizce Ders' },
      { time: '10:00-11:00', activity: 'İspanyolca Ders' },
      { time: '11:00-12:00', activity: 'Arası' },
      { time: '12:00-13:30', activity: 'Öğle Yemeği' },
      { time: '13:30-14:30', activity: 'Okuma' },
      { time: '14:30-17:00', activity: 'Plaj / Eğlence' },
      { time: '17:00-19:00', activity: 'Dinlenme' },
    ]
  },
  london: {
    name: '🇬🇧 Londra',
    color: 'from-blue-100 to-cyan-100',
    schedule: [
      { time: '07:00-08:00', activity: 'Kahvaltı' },
      { time: '08:00-09:00', activity: 'İngilizce Dil Atölyesi' },
      { time: '09:00-12:00', activity: 'Londra Turları / Müzeler' },
      { time: '12:00-13:00', activity: 'Öğle Yemeği' },
      { time: '13:00-14:00', activity: 'Dinlenme' },
      { time: '14:00-17:00', activity: 'Kültürel Aktiviteler' },
      { time: '17:00-19:00', activity: 'Akşam Aktiviteleri' },
    ]
  },
  londonSchool: {
    name: '🎓 Londra Okul',
    color: 'from-green-100 to-emerald-100',
    schedule: [
      { time: '08:00-09:00', activity: 'Okula Gidiş' },
      { time: '09:00-12:30', activity: 'Okul Dersleri' },
      { time: '12:30-13:30', activity: 'Öğle Yemeği' },
      { time: '13:30-15:30', activity: 'Okul Dersleri (Devam)' },
      { time: '15:30-17:00', activity: 'Ödev & Ders Çalışma' },
      { time: '17:00-19:00', activity: 'Oyunlar & Sosyal' },
    ]
  },
  empty: {
    name: '⬜ Boş',
    color: 'from-slate-100 to-slate-200',
    schedule: []
  }
};

export default function WeeklyPlanner({ data, updateData, onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTemplate, setSelectedTemplate] = useState('empty');
  const [selectedDay, setSelectedDay] = useState(null);

  const weekStart = new Date(currentDate);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  const handleApplyTemplate = () => {
    if (selectedDay && selectedTemplate !== 'empty') {
      const dateStr = selectedDay.toISOString().split('T')[0];
      const plans = data.plans || {};
      const template = PLAN_TEMPLATES[selectedTemplate];

      plans[dateStr] = {
        template: selectedTemplate,
        schedule: template.schedule,
      };

      updateData({ plans });
    }
  };

  const dayDateStr = selectedDay ? selectedDay.toISOString().split('T')[0] : null;
  const currentDayPlan = dayDateStr && data.plans ? data.plans[dayDateStr] : null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sticky top-0 z-40">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <button onClick={onClose} className="flex items-center gap-2 hover:opacity-80">
              <ChevronLeft size={24} /> Geri
            </button>
            <h1 className="text-2xl font-bold">📅 Haftalık Plan</h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto p-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="px-4 py-2 bg-slate-200 rounded-lg hover:bg-slate-300 transition"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-2xl font-bold">
              {currentDate.toLocaleString('tr-TR', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="px-4 py-2 bg-slate-200 rounded-lg hover:bg-slate-300 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Week View */}
          <div className="grid grid-cols-7 gap-2 mb-8">
            {weekDays.map((day, idx) => {
              const isToday = new Date().toDateString() === day.toDateString();
              const isSelected = selectedDay && day.toDateString() === selectedDay.toDateString();
              const dateStr = day.toISOString().split('T')[0];
              const hasPlan = data.plans && data.plans[dateStr];

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectDay(day)}
                  className={`p-4 rounded-lg transition border-2 ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50 shadow-lg'
                      : isToday
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <p className="font-bold text-sm">{dayNames[day.getDay()]}</p>
                  <p className="text-2xl font-bold">{day.getDate()}</p>
                  {hasPlan && <p className="text-lg mt-1">📋</p>}
                </button>
              );
            })}
          </div>

          {/* Plan Editor */}
          {selectedDay && (
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-purple-300">
              <h3 className="text-xl font-bold mb-4">
                📋 {selectedDay.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h3>

              {currentDayPlan ? (
                <div>
                  <p className="font-semibold text-slate-700 mb-4">
                    Mevcut Plan: {PLAN_TEMPLATES[currentDayPlan.template].name}
                  </p>
                  <div className="space-y-2">
                    {currentDayPlan.schedule.map((slot, idx) => (
                      <div key={idx} className="flex gap-4 bg-slate-50 p-3 rounded-lg">
                        <span className="font-bold text-slate-700 w-24">{slot.time}</span>
                        <span className="text-slate-600">{slot.activity}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => updateData({ plans: { ...data.plans, [selectedDay.toISOString().split('T')[0]]: undefined } })}
                    className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600"
                  >
                    🗑️ Planı Sil
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-slate-600">Bu güne bir plan şablonu seç:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(PLAN_TEMPLATES).map(([key, template]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedTemplate(key)}
                        className={`p-3 rounded-lg border-2 transition ${
                          selectedTemplate === key
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <p className="font-bold">{template.name}</p>
                      </button>
                    ))}
                  </div>

                  {selectedTemplate !== 'empty' && (
                    <div className="bg-slate-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                      <p className="font-semibold mb-2">Ön İzleme:</p>
                      <div className="space-y-1">
                        {PLAN_TEMPLATES[selectedTemplate].schedule.map((slot, idx) => (
                          <div key={idx} className="flex gap-4 text-sm">
                            <span className="font-bold text-slate-600 w-20">{slot.time}</span>
                            <span className="text-slate-600">{slot.activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleApplyTemplate}
                    disabled={selectedTemplate === 'empty'}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50"
                  >
                    ✓ Planı Uygula
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
