import { Note } from './note';
import { NoteName } from './noteName';
import { NoteAlteration } from './noteAlteration';

describe('note position value', () => {
  it('has a correct positional value for c variants', () => {
    const c = new Note(NoteName.C);
    const cSharp = new Note(NoteName.C, NoteAlteration.Sharp);
    const cFlat = new Note(NoteName.C, NoteAlteration.Flat);

    expect(c.getPosition()).toEqual(0);
    expect(cSharp.getPosition()).toEqual(1);
    expect(cFlat.getPosition()).toEqual(11);
  });

  it('has a correct positional value for b variants', () => {
    const b = new Note(NoteName.B);
    const bSharp = new Note(NoteName.B, NoteAlteration.Sharp);
    const bFlat = new Note(NoteName.B, NoteAlteration.Flat);

    expect(b.getPosition()).toEqual(11);
    expect(bSharp.getPosition()).toEqual(0);
    expect(bFlat.getPosition()).toEqual(10);
  });

  it('has a correct positional value for e variants', () => {
    const e = new Note(NoteName.E);
    const eSharp = new Note(NoteName.E, NoteAlteration.Sharp);
    const eFlat = new Note(NoteName.E, NoteAlteration.Flat);

    expect(e.getPosition()).toEqual(4);
    expect(eSharp.getPosition()).toEqual(5);
    expect(eFlat.getPosition()).toEqual(3);
  });

  it('has a correct positional valute for f variants', () => {
    const f = new Note(NoteName.F);
    const fSharp = new Note(NoteName.F, NoteAlteration.Sharp);
    const fFlat = new Note(NoteName.F, NoteAlteration.Flat);

    expect(f.getPosition()).toEqual(5);
    expect(fSharp.getPosition()).toEqual(6);
    expect(fFlat.getPosition()).toEqual(4);
  });
});

// describe('position offset', () => {
//   it('can create new positions based on positive offset', () => {});
// });
