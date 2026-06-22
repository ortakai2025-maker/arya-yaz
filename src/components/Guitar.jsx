import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import { Music, Play, Pause } from 'lucide-react';

const CHORDS = [
  { name: 'C', notes: [0, 3, 2, 0, 1, 0], description: 'Do Majör' },
  { name: 'G', notes: [3, 2, 0, 0, 0, 3], description: 'Sol Majör' },
  { name: 'D', notes: [2, 2, 0, 2, 3, 2], description: 'Re Majör' },
  { name: 'A', notes: [0, 0, 2, 2, 2, 0], description: 'La Majör' },
  { name: 'E', notes: [0, 2, 2, 1, 0, 0], description: 'Mi Majör' },
];

const NOTE_FREQUENCIES = {
  0: 164.81, // E
  1: 174.61, // F
  2: 196.00, // G
  3: 220.00, // A
  4: 246.94, // B
  5: 261.63, // C
};

export default function Guitar({ data, updateData }) {
  const [currentChord, setCurrentChord] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef(null);
  const metronomeRef = useRef(null);

  useEffect(() => {
    Tone.start();
    synthRef.current = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
      },
    }).toDestination();

    return () => {
      if (synthRef.current) synthRef.current.dispose();
    };
  }, []);

  const playChord = () => {
    const chord = CHORDS[currentChord];
    setIsPlaying(true);

    chord.notes.forEach((fret, stringIdx) => {
      const freq = NOTE_FREQUENCIES[fret] || 440;
      synthRef.current.triggerAttackRelease('4n', `+${stringIdx * 0.1}`);
      setTimeout(() => {
        synthRef.current.frequency.value = freq;
      }, stringIdx * 100);
    });

    setTimeout(() => setIsPlaying(false), 2000);
  };

  const chord = CHORDS[currentChord];

  return (
    <div className="space-y-6 pb-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">🎸 Gitar</h2>
        <p className="text-slate-600 mt-2">Akorları öğren ve çal!</p>
      </div>

      {/* Current Chord */}
      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg shadow-lg p-8 text-center border-2 border-orange-300">
        <p className="text-sm text-slate-600 mb-2">Şimdiki Akor</p>
        <p className="text-6xl font-bold text-orange-600 mb-2">{chord.name}</p>
        <p className="text-lg text-slate-700">{chord.description}</p>
      </div>

      {/* Chord Diagram */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="font-semibold text-slate-800 mb-4 text-center">Akor Diyagramı</p>
        <div className="flex justify-center gap-4">
          {chord.notes.map((fret, stringIdx) => (
            <div key={stringIdx} className="flex flex-col items-center">
              <p className="text-xs text-slate-600 mb-2">Tel {stringIdx + 1}</p>
              <div className="w-12 h-16 border-2 border-slate-400 relative">
                {fret === 0 ? (
                  <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-slate-600">
                    O
                  </p>
                ) : (
                  <div
                    className="absolute w-6 h-6 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white text-xs font-bold"
                    style={{ left: '50%', top: `${(fret / 6) * 100}%` }}
                  >
                    {fret}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Play Button */}
      <button
        onClick={playChord}
        disabled={isPlaying}
        className={`w-full py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2 ${
          isPlaying
            ? 'bg-slate-400 text-white cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:shadow-lg'
        }`}
      >
        <Music size={24} />
        {isPlaying ? 'Çalınıyor...' : 'Akorı Çal'}
      </button>

      {/* Chord Navigation */}
      <div className="grid grid-cols-5 gap-2">
        {CHORDS.map((c, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentChord(idx)}
            className={`py-3 rounded-lg font-bold text-lg transition ${
              currentChord === idx
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-400">
        <h3 className="font-bold text-purple-900 mb-2">🎸 Gitar İpuçları</h3>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• O = açık tel (parmak koymadan çal)</li>
          <li>• Sayılar = hangi perde (fret) basılacak</li>
          <li>• Günlük akorları öğrenmeye devam et</li>
          <li>• Tamamlanan akorlar sana yıldız kazandırıyor</li>
        </ul>
      </div>
    </div>
  );
}
