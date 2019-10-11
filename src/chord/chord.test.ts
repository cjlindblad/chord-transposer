import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import { Chord } from './chord';
import { Interval } from '../interval/interval';

describe('chords', () => {
  it('creates a major chord by default', () => {
    const c = Note.from(NoteName.C);
    const cMajor = Chord.from(c);

    expect(cMajor.toString()).toEqual('C');
  });

  it('creates a minor chord', () => {
    const c = Note.from(NoteName.C);
    const cMinor = Chord.from(c, Interval.MinorThird);

    expect(cMinor.toString()).toEqual('Cm');
  });
});
