import PianoChordValuator from '../chord/pianoChordValuator';
import TransposeSuggestor from './transposeSuggestor';
import { Chord } from '../chord/chord';
import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import { Interval } from '../interval/interval';
import { Scale } from '../scale/scale';

describe('transpose suggestor', () => {
  it('determines C to be the easiest piano key', () => {
    const pianoChordValuator = new PianoChordValuator();

    const progression = [
      Chord.from(Note.from(NoteName.G)),
      Chord.from(Note.from(NoteName.D)),
      Chord.from(Note.from(NoteName.E), { third: Interval.MinorThird }),
      Chord.from(Note.from(NoteName.C))
    ];
    const scale = Scale.from(Note.from(NoteName.G));

    const transposeSuggestor = new TransposeSuggestor(
      pianoChordValuator,
      progression,
      scale
    );

    const rankedTranpositions = transposeSuggestor.rankTranspositions();

    const firstSuggestion = rankedTranpositions[0];

    const progressionString = firstSuggestion.progression
      .map(chord => chord.toString())
      .join('');

    expect(progressionString).toEqual('CGAmF');
  });
});
