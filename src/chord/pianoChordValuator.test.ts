import { Chord } from './chord';
import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import PianoChordValuator from './pianoChordValuator';

describe('piano chord valutator', () => {
  it('assigns C a lower value than B', () => {
    const C = Chord.from(Note.from(NoteName.C));
    const B = Chord.from(Note.from(NoteName.B));

    const valuator = new PianoChordValuator();

    const cValue = valuator.getValue(C);
    const bValue = valuator.getValue(B);

    expect(cValue).toBeLessThan(bValue);
  });
});
