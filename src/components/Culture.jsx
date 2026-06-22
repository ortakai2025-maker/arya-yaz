import React, { useState } from 'react';
import { Film, BookOpen, Music, Plus, Star, Trash2 } from 'lucide-react';

export default function Culture({ data, updateData }) {
  const [entries, setEntries] = useState(data.media || []);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'film',
    title: '',
    rating: 5,
    notes: '',
  });
  const [activeTab, setActiveTab] = useState('film');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...formData,
    };
    const newEntries = [...entries, newEntry];
    setEntries(newEntries);
    updateData({ media: newEntries, stars: data.stars + 1 });
    setFormData({ type: 'film', title: '', rating: 5, notes: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const newEntries = entries.filter(e => e.id !== id);
    setEntries(newEntries);
    updateData({ media: newEntries });
  };

  const filteredEntries = entries.filter(e => e.type === activeTab);

  const getIcon = (type) => {
    switch (type) {
      case 'film': return '🎬';
      case 'book': return '📖';
      case 'music': return '🎵';
      default: return '✨';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'film': return 'Film';
      case 'book': return 'Kitap';
      case 'music': return 'Müzik';
      default: return 'Diğer';
    }
  };

  return (
    <div className="space-y-6 pb-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">🎬 Kültür Günlüğü</h2>
        <p className="text-slate-600 mt-2">Seyrettiğin filmleri, okuduğun kitapları, dinlediğin müzikleri kaydet!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {['film', 'book', 'music'].map(type => {
          const count = entries.filter(e => e.type === type).length;
          return (
            <div key={type} className="bg-white rounded-lg shadow-md p-3 text-center">
              <p className="text-2xl mb-1">{getIcon(type)}</p>
              <p className="text-lg font-bold text-slate-800">{count}</p>
              <p className="text-xs text-slate-600">{getTypeLabel(type)}</p>
            </div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        {['film', 'book', 'music'].map(type => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              activeTab === type
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {getIcon(type)} {getTypeLabel(type)}
          </button>
        ))}
      </div>

      {/* Add New Entry Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
      >
        <Plus size={20} /> Yeni Kayıt Ekle
      </button>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-indigo-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tür</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg font-semibold"
              >
                <option value="film">🎬 Film</option>
                <option value="book">📖 Kitap</option>
                <option value="music">🎵 Müzik</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Başlık</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Film/Kitap/Müzik adını gir"
                className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg font-semibold"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Puanı: {formData.rating}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Notlar</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Düşüncelerini yaz..."
                rows="3"
                className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg font-semibold"
              ></textarea>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
              >
                ✓ Kaydet
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-2 bg-slate-400 text-white rounded-lg font-bold hover:bg-slate-500 transition"
              >
                ✕ İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Entries List */}
      <div className="space-y-3">
        {filteredEntries.length === 0 ? (
          <div className="bg-slate-100 rounded-lg p-6 text-center">
            <p className="text-slate-600">Henüz kayıt eklenmedi</p>
          </div>
        ) : (
          filteredEntries.map(entry => (
            <div key={entry.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-indigo-500">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{getIcon(entry.type)}</span>
                    <p className="font-bold text-slate-800">{entry.title}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                    <span>⭐ {entry.rating}/10</span>
                    <span>{new Date(entry.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                  {entry.notes && (
                    <p className="text-sm text-slate-700 italic">{entry.notes}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tips */}
      <div className="bg-cyan-50 rounded-lg p-6 border-l-4 border-cyan-400">
        <h3 className="font-bold text-cyan-900 mb-2">💡 Kültür İpuçları</h3>
        <ul className="text-sm text-cyan-800 space-y-1">
          <li>• Her hafta yeni bir film seyret</li>
          <li>• Ay sonunda okuduğun kitapları say</li>
          <li>• Müzik türlerini keşfet</li>
          <li>• Puanladığın ve notlar aldığın eserler sana yıldız kazandırıyor</li>
        </ul>
      </div>
    </div>
  );
}
