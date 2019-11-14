import Transposer from './transposer';
import { Chord } from '../chord/chord';
import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import { Interval } from '../interval/interval';
import { Scale } from '../scale/scale';
import { Mode } from '../scale/mode';
import { NoteAlteration } from '../note/noteAlteration';

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

  it('transposes Imagine bridge from C major to B major', () => {
    const progression = [
      Chord.from(Note.from(NoteName.F)),
      Chord.from(Note.from(NoteName.G)),
      Chord.from(Note.from(NoteName.C)),
      Chord.from(Note.from(NoteName.E))
    ];

    const fromScale = Scale.from(Note.from(NoteName.C));
    const toScale = Scale.from(Note.from(NoteName.B));

    const transposer = new Transposer(progression, fromScale);

    const transposedProgression = transposer.transpose(toScale);

    const transposedProgressionString = transposedProgression
      .map(chord => chord.toString())
      .join('');

    expect(transposedProgressionString).toEqual('EF#BD#');
  });

  it('transposes "Värmlandsvisan" from Dm to Am', () => {
    const Dm = Chord.from(Note.from(NoteName.D), {
      third: Interval.MinorThird
    });
    const A7 = Chord.from(Note.from(NoteName.A), {
      third: Interval.MajorThird,
      seventh: Interval.MinorSeventh
    });
    const Bb = Chord.from(Note.from(NoteName.B, NoteAlteration.Flat));
    const C7 = Chord.from(Note.from(NoteName.C), {
      seventh: Interval.MinorSeventh
    });
    const F = Chord.from(Note.from(NoteName.F));
    const Gm = Chord.from(Note.from(NoteName.G), {
      third: Interval.MinorThird
    });
    const G7 = Chord.from(Note.from(NoteName.G), {
      seventh: Interval.MinorSeventh
    });
    const A = Chord.from(Note.from(NoteName.A));

    const progression = [
      Dm,
      A7,
      Bb,
      C7,
      F,
      Gm,
      A7,
      Dm,
      G7,
      A7,
      Dm,
      C7,
      F,
      Gm,
      A7,
      Dm,
      A,
      Dm,
      A7,
      Bb,
      C7,
      F,
      F,
      A7,
      Dm,
      G7,
      A7,
      Dm
    ];

    const fromScale = Scale.from(Note.from(NoteName.D), Mode.Aeolian);
    const toScale = Scale.from(Note.from(NoteName.A), Mode.Aeolian);

    const transposer = new Transposer(progression, fromScale);

    const transposedProgression = transposer.transpose(toScale);

    const transposedProgressionString = transposedProgression
      .map(chord => chord.toString())
      .join(' ');

    expect(transposedProgressionString).toEqual(
      'Am E7 F G7 C Dm E7 Am D7 E7 Am G7 C Dm E7 Am E Am E7 F G7 C C E7 Am D7 E7 Am'
    );
  });
});
