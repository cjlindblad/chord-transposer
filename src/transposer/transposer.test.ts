import Transposer from './transposer';
import { Chord } from '../chord/chord';
import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import { Interval } from '../interval/interval';
import { Scale } from '../scale/scale';

describe('chord progression transposer', () => {
  it('transposes C G Am F in C major to G major', () => {
    const progression = [
      Chord.from(Note.from(NoteName.C)),
      Chord.from(Note.from(NoteName.G)),
      Chord.from(Note.from(NoteName.A), { third: Interval.MinorThird }),
      Chord.from(Note.from(NoteName.F))
    ];

    const fromScale = Scale.from(Note.from(NoteName.C));
    const toScale = Scale.from(Note.from(NoteName.G));

    const transposer = new Transposer(progression, fromScale);

    const transposedProgression = transposer.transpose(toScale);

    const transposedProgressionString = transposedProgression
      .map(chord => chord.toString())
      .join('');

    expect(transposedProgressionString).toEqual('GDEmC');
  });
});
