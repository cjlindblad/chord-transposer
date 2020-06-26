import React, { useState } from 'react';
import {
  Scale,
  Note,
  NoteName,
  Chord,
  Interval,
  Mode,
  NoteAlteration,
} from './lib/api';
import ChordPicker from './components/ChordPicker';

interface ScalePair {
  major: Scale;
  minor: Scale;
}

const scaleCircle: ScalePair[] = [
  {
    major: Scale.from(Note.from(NoteName.C)),
    minor: Scale.from(Note.from(NoteName.A), Mode.Aeolian),
  },
  {
    major: Scale.from(Note.from(NoteName.G)),
    minor: Scale.from(Note.from(NoteName.E), Mode.Aeolian),
  },
  {
    major: Scale.from(Note.from(NoteName.D)),
    minor: Scale.from(Note.from(NoteName.B), Mode.Aeolian),
  },
  {
    major: Scale.from(Note.from(NoteName.A)),
    minor: Scale.from(
      Note.from(NoteName.F, NoteAlteration.Sharp),
      Mode.Aeolian
    ),
  },
  {
    major: Scale.from(Note.from(NoteName.E)),
    minor: Scale.from(
      Note.from(NoteName.C, NoteAlteration.Sharp),
      Mode.Aeolian
    ),
  },
  {
    major: Scale.from(Note.from(NoteName.B)),
    minor: Scale.from(
      Note.from(NoteName.G, NoteAlteration.Sharp),
      Mode.Aeolian
    ),
  },
  {
    major: Scale.from(Note.from(NoteName.F, NoteAlteration.Sharp)),
    minor: Scale.from(
      Note.from(NoteName.D, NoteAlteration.Sharp),
      Mode.Aeolian
    ),
  },
  {
    major: Scale.from(Note.from(NoteName.G, NoteAlteration.Flat)),
    minor: Scale.from(Note.from(NoteName.E, NoteAlteration.Flat), Mode.Aeolian),
  },
  {
    major: Scale.from(Note.from(NoteName.D, NoteAlteration.Flat)),
    minor: Scale.from(Note.from(NoteName.B, NoteAlteration.Flat), Mode.Aeolian),
  },
  {
    major: Scale.from(Note.from(NoteName.A, NoteAlteration.Flat)),
    minor: Scale.from(Note.from(NoteName.F), Mode.Aeolian),
  },
  {
    major: Scale.from(Note.from(NoteName.E, NoteAlteration.Flat)),
    minor: Scale.from(Note.from(NoteName.C), Mode.Aeolian),
  },
  {
    major: Scale.from(Note.from(NoteName.B, NoteAlteration.Flat)),
    minor: Scale.from(Note.from(NoteName.G), Mode.Aeolian),
  },
  {
    major: Scale.from(Note.from(NoteName.F)),
    minor: Scale.from(Note.from(NoteName.D), Mode.Aeolian),
  },
];

// const chords = [
//   Chord.from(Note.from(NoteName.C)),
//   Chord.from(Note.from(NoteName.D), { third: Interval.MinorThird }),
//   Chord.from(Note.from(NoteName.E), { third: Interval.MinorThird }),
//   Chord.from(Note.from(NoteName.F)),
//   Chord.from(Note.from(NoteName.G)),
//   Chord.from(Note.from(NoteName.A), { third: Interval.MinorThird }),
//   Chord.from(Note.from(NoteName.B), { third: Interval.MinorThird }),
// ];

function App() {
  const [pickedScalePair, setPickedScalePair] = useState(scaleCircle[0]);

  const triads = pickedScalePair.major.triads();

  const [inputText, setInputText] = useState('');
  const [pickedChords, setPickedChords] = useState<Chord[]>([]);
  return (
    <div className="flex h-screen w-full bg-gray-100">
      <div className="flex-1 mx-2 pt-16 flex flex-col items-center">
        <h1 className="text-center text-gray-800 text-4xl leading-none font-semibold">
          Pick a scale!
        </h1>
        <div className="flex flex-wrap justify-center mt-4">
          {scaleCircle.map((scalePair) => (
            <div
              key={`${scalePair.major.toString()}${scalePair.minor.toString()}`}
              onClick={() => setPickedScalePair(scalePair)}
              className={`mx-2 mb-1 w-12 text-center cursor-pointer ${
                pickedScalePair.major.toString() === scalePair.major.toString()
                  ? 'bg-white border-gray-300 border-2 rounded-lg'
                  : ''
              }`}
            >
              <div className="text-2xl font-bold">{scalePair.major.name}</div>
              <div className="text-xl">{scalePair.minor.name}</div>
            </div>
          ))}
        </div>
        {/* <h1 className="text-center text-gray-800 text-4xl leading-none font-semibold">
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
        */}
        <div className="mt-8 flex flex-wrap">
          {triads.map((chord) => (
            <div
              key={chord.toString()}
              className="transition duration-150 ease-in-out mx-1 w-24 text-center cursor-pointer hover:shadow-md rounded-md pb-2 pt-8 bg-white border-gray-300 border-solid border-2 font-bold text-2xl"
            >
              {chord.toString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
