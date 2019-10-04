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

  it('can create next natural note', () => {
    const aNatural = new Note(NoteName.A);
    const eSharp = new Note(NoteName.E, NoteAlteration.Sharp);
    const cFlat = new Note(NoteName.C, NoteAlteration.Flat);

    const bNatural = aNatural.toNext();
    const fNatural = eSharp.toNext();
    const dNatural = cFlat.toNext();

    expect(bNatural.isNatural()).toEqual(true);
    expect(bNatural.toString()).toEqual('B');
    expect(fNatural.isNatural()).toEqual(true);
    expect(fNatural.toString()).toEqual('F');
    expect(dNatural.isNatural()).toEqual(true);
    expect(dNatural.toString()).toEqual('D');
  });

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
