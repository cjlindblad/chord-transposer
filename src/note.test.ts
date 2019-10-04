import { NoteName } from './noteName';
import { Note } from './note';
import { NoteAlteration } from './noteAlteration';

describe('note', () => {
  it('is created as natural by default', () => {
    const a = new Note(NoteName.A);
    const b = new Note(NoteName.B);

    expect(a.toString()).toEqual('A');
    expect(a.isNatural()).toEqual(true);
    expect(b.toString()).toEqual('B');
    expect(b.isNatural()).toEqual(true);
  });

  it('can be sharp', () => {
    const cSharp = new Note(NoteName.C, NoteAlteration.Sharp);
    const bSharp = new Note(NoteName.B, NoteAlteration.Sharp);

    expect(cSharp.isSharp()).toEqual(true);
    expect(cSharp.toString()).toEqual('C#');
    expect(bSharp.isSharp()).toEqual(true);
    expect(bSharp.toString()).toEqual('B#');
  });

  it('can be flat', () => {
    const bFlat = new Note(NoteName.B, NoteAlteration.Flat);
    const fFlat = new Note(NoteName.F, NoteAlteration.Flat);

    expect(bFlat.isFlat()).toEqual(true);
    expect(bFlat.toString()).toEqual('Bb');
    expect(fFlat.isFlat()).toEqual(true);
    expect(fFlat.toString()).toEqual('Fb');
  });

  it('can be sharpened', () => {
    const naturalC = new Note(NoteName.C);

    const cSharp = naturalC.toSharp();

    expect(cSharp.isSharp()).toEqual(true);
    expect(cSharp.toString()).toEqual('C#');
  });

  it('can be flattened', () => {
    const naturalE = new Note(NoteName.E);

    const eFlat = naturalE.toFlat();

    expect(eFlat.isFlat()).toEqual(true);
    expect(eFlat.toString()).toEqual('Eb');
  });

  it('can be naturalized', () => {
    const fSharp = new Note(NoteName.F, NoteAlteration.Sharp);

    const fNatural = fSharp.toNatural();

    expect(fNatural.isNatural()).toEqual(true);
    expect(fNatural.toString()).toEqual('F');
  });

  it('has a correct positional value for c variants', () => {
    const c = new Note(NoteName.C);
    const cSharp = new Note(NoteName.C, NoteAlteration.Sharp);
    const cFlat = new Note(NoteName.C, NoteAlteration.Flat);

    expect(c.getPosition()).toEqual(1);
    expect(cSharp.getPosition()).toEqual(2);
    expect(cFlat.getPosition()).toEqual(12);
  });

  it('has a correct positional value for b variants', () => {
    const b = new Note(NoteName.B);
    const bSharp = new Note(NoteName.B, NoteAlteration.Sharp);
    const bFlat = new Note(NoteName.B, NoteAlteration.Flat);

    expect(b.getPosition()).toEqual(12);
    expect(bSharp.getPosition()).toEqual(1);
    expect(bFlat.getPosition()).toEqual(11);
  });

  it('has a correct positional value for e variants', () => {
    const e = new Note(NoteName.E);
    const eSharp = new Note(NoteName.E, NoteAlteration.Sharp);
    const eFlat = new Note(NoteName.E, NoteAlteration.Flat);

    expect(e.getPosition()).toEqual(5);
    expect(eSharp.getPosition()).toEqual(6);
    expect(eFlat.getPosition()).toEqual(4);
  });

  it('has a correct positional valute for f variants', () => {
    const f = new Note(NoteName.F);
    const fSharp = new Note(NoteName.F, NoteAlteration.Sharp);
    const fFlat = new Note(NoteName.F, NoteAlteration.Flat);

    expect(f.getPosition()).toEqual(6);
    expect(fSharp.getPosition()).toEqual(7);
    expect(fFlat.getPosition()).toEqual(5);
  });
});
