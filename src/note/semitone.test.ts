import { Note } from './note';
import { NoteName } from './noteName';
import { NoteAlteration } from './noteAlteration';

describe('note semitone value', () => {
  it('has a correct semitone value for c variants', () => {
    const c = Note.from(NoteName.C);
    const cSharp = Note.from(NoteName.C, NoteAlteration.Sharp);
    const cFlat = Note.from(NoteName.C, NoteAlteration.Flat);

    expect(c.getSemitoneValue()).toEqual(0);
    expect(cSharp.getSemitoneValue()).toEqual(1);
    expect(cFlat.getSemitoneValue()).toEqual(11);
  });

  it('has a correct semitone value for b variants', () => {
    const b = Note.from(NoteName.B);
    const bSharp = Note.from(NoteName.B, NoteAlteration.Sharp);
    const bFlat = Note.from(NoteName.B, NoteAlteration.Flat);

    expect(b.getSemitoneValue()).toEqual(11);
    expect(bSharp.getSemitoneValue()).toEqual(0);
    expect(bFlat.getSemitoneValue()).toEqual(10);
  });

  it('has a correct semitone value for e variants', () => {
    const e = Note.from(NoteName.E);
    const eSharp = Note.from(NoteName.E, NoteAlteration.Sharp);
    const eFlat = Note.from(NoteName.E, NoteAlteration.Flat);

    expect(e.getSemitoneValue()).toEqual(4);
    expect(eSharp.getSemitoneValue()).toEqual(5);
    expect(eFlat.getSemitoneValue()).toEqual(3);
  });

  it('has a correct semitone valute for f variants', () => {
    const f = Note.from(NoteName.F);
    const fSharp = Note.from(NoteName.F, NoteAlteration.Sharp);
    const fFlat = Note.from(NoteName.F, NoteAlteration.Flat);

    expect(f.getSemitoneValue()).toEqual(5);
    expect(fSharp.getSemitoneValue()).toEqual(6);
    expect(fFlat.getSemitoneValue()).toEqual(4);
  });
});
