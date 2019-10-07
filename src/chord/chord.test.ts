import { Note } from "../note/note";
import { NoteName } from "../note/noteName";
import { Chord } from "./chord";
import { IntervalAlteration } from "../interval/interval";

describe('chords', () => {
  it('creates a major chord by default', () => {
    const c = new Note(NoteName.C);
    const cMajor = Chord.from(c);

    expect(cMajor.toString()).toEqual('C')
  });

  it('creates a minor chord', () => {
    const c = new Note(NoteName.C);
    const cMinor = Chord.from(c, IntervalAlteration.Minor);

    expect(cMinor.toString()).toEqual('Cm')
  })
})