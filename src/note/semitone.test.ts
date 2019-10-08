import { Note } from './note';
import { NoteName } from './noteName';
import { NoteAlteration } from './noteAlteration';

describe('note semitone value', () => {
  it('has a correct semitone value for c variants', () => {
    const c = new Note(NoteName.C);
    const cSharp = new Note(NoteName.C, NoteAlteration.Sharp);
    const cFlat = new Note(NoteName.C, NoteAlteration.Flat);

    expect(c.getSemitoneValue()).toEqual(0);
    expect(cSharp.getSemitoneValue()).toEqual(1);
    expect(cFlat.getSemitoneValue()).toEqual(11);
  });

  it('has a correct semitone value for b variants', () => {
    const b = new Note(NoteName.B);
    const bSharp = new Note(NoteName.B, NoteAlteration.Sharp);
    const bFlat = new Note(NoteName.B, NoteAlteration.Flat);

    expect(b.getSemitoneValue()).toEqual(11);
    expect(bSharp.getSemitoneValue()).toEqual(0);
    expect(bFlat.getSemitoneValue()).toEqual(10);
  });

  it('has a correct semitone value for e variants', () => {
    const e = new Note(NoteName.E);
    const eSharp = new Note(NoteName.E, NoteAlteration.Sharp);
    const eFlat = new Note(NoteName.E, NoteAlteration.Flat);

    expect(e.getSemitoneValue()).toEqual(4);
    expect(eSharp.getSemitoneValue()).toEqual(5);
    expect(eFlat.getSemitoneValue()).toEqual(3);
  });

  it('has a correct semitone valute for f variants', () => {
    const f = new Note(NoteName.F);
    const fSharp = new Note(NoteName.F, NoteAlteration.Sharp);
    const fFlat = new Note(NoteName.F, NoteAlteration.Flat);

    expect(f.getSemitoneValue()).toEqual(5);
    expect(fSharp.getSemitoneValue()).toEqual(6);
    expect(fFlat.getSemitoneValue()).toEqual(4);
  });
});
