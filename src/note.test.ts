import { NoteName } from './noteName';
import { Note } from './note';
import { NoteModifier } from './noteModifier';

describe('note', () => {
  it('is created from enum', () => {
    const a = new Note(NoteName.A);
    const b = new Note(NoteName.B);

    expect(a.toString()).toEqual('A');
    expect(b.toString()).toEqual('B');
  });

  it('can be sharp', () => {
    const cSharp = new Note(NoteName.C, NoteModifier.Sharp);
    const bSharp = new Note(NoteName.B, NoteModifier.Sharp);

    expect(cSharp.toString()).toEqual('C#');
    expect(bSharp.toString()).toEqual('B#');
  });

  it('can be flat', () => {
    const bFlat = new Note(NoteName.B, NoteModifier.Flat);
    const fFlat = new Note(NoteName.F, NoteModifier.Flat);

    expect(bFlat.toString()).toEqual('Bb');
    expect(fFlat.toString()).toEqual('Fb');
  });

  it('has a correct positional value for c variants', () => {
    const c = new Note(NoteName.C);
    const cSharp = new Note(NoteName.C, NoteModifier.Sharp);
    const cFlat = new Note(NoteName.C, NoteModifier.Flat);

    expect(c.getPosition()).toEqual(1);
    expect(cSharp.getPosition()).toEqual(2);
    expect(cFlat.getPosition()).toEqual(12);
  });

  it('has a correct positional value for b variants', () => {
    const b = new Note(NoteName.B);
    const bSharp = new Note(NoteName.B, NoteModifier.Sharp);
    const bFlat = new Note(NoteName.B, NoteModifier.Flat);

    expect(b.getPosition()).toEqual(12);
    expect(bSharp.getPosition()).toEqual(1);
    expect(bFlat.getPosition()).toEqual(11);
  });

  it('has a correct positional value for e variants', () => {
    const e = new Note(NoteName.E);
    const eSharp = new Note(NoteName.E, NoteModifier.Sharp);
    const eFlat = new Note(NoteName.E, NoteModifier.Flat);

    expect(e.getPosition()).toEqual(5);
    expect(eSharp.getPosition()).toEqual(6);
    expect(eFlat.getPosition()).toEqual(4);
  });

  it('has a positional valute for f variants', () => {
    const f = new Note(NoteName.F);
    const fSharp = new Note(NoteName.F, NoteModifier.Sharp);
    const fFlat = new Note(NoteName.F, NoteModifier.Flat);

    expect(f.getPosition()).toEqual(6);
    expect(fSharp.getPosition()).toEqual(7);
    expect(fFlat.getPosition()).toEqual(5);
  });
});
