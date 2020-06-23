import React, { useState } from 'react';
import { Note, NoteName, Chord, Interval } from './lib/api';
import ChordPicker from './components/ChordPicker';

const chords = [
  Chord.from(Note.from(NoteName.C)),
  Chord.from(Note.from(NoteName.D), { third: Interval.MinorThird }),
  Chord.from(Note.from(NoteName.E), { third: Interval.MinorThird }),
  Chord.from(Note.from(NoteName.F)),
  Chord.from(Note.from(NoteName.G)),
  Chord.from(Note.from(NoteName.A), { third: Interval.MinorThird }),
  Chord.from(Note.from(NoteName.B), { third: Interval.MinorThird }),
];

function App() {
  const [inputText, setInputText] = useState('');
  const [pickedChords, setPickedChords] = useState<Chord[]>([]);
  return (
    <div className="flex h-screen w-full bg-gray-100">
      <div className="flex-1 mx-2 pt-16 flex flex-col items-center">
        <h1 className="text-center text-gray-800 text-4xl leading-none font-semibold">
          Pick some chords!
        </h1>
        <ChordPicker
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <div className="relative bg-red-900 w-64">
          <div className="absolute">
            {inputText &&
              chords
                .filter((chord) =>
                  chord.toString().match(new RegExp(inputText, 'gi'))
                )
                .map((chord) => (
                  <div
                    key={chord.toString()}
                    className="hover:text-white hover:bg-gray-400 bg-white cursor-pointer px-4 py-2 text-xl text-gray-800 w-64 rounded-lg border-gray-300 border-2"
                    onClick={() => {
                      setPickedChords([...pickedChords, chord]);
                      setInputText('');
                    }}
                  >
                    {chord.toString()}
                  </div>
                ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap">
          {pickedChords.map((chord) => (
            <div className="transition duration-150 ease-in-out mx-1 w-16 text-center cursor-pointer hover:shadow-md rounded-md pb-2 pt-6 bg-white border-gray-300 border-solid border-2 font-bold text-2xl">
              {chord.toString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
