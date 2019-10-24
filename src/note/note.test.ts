import { NoteName } from './noteName';
import { Note } from './note';
import { NoteAlteration } from './noteAlteration';
import { Interval } from '../interval/interval';

describe('note creation', () => {
  it('is created as natural by default', () => {
    const a = Note.from(NoteName.A);
    const b = Note.from(NoteName.B);

    expect(a.toString()).toEqual('A');
    expect(a.isNatural()).toEqual(true);
    expect(b.toString()).toEqual('B');
    expect(b.isNatural()).toEqual(true);
  });

  it('can be sharp', () => {
    const cSharp = Note.from(NoteName.C, NoteAlteration.Sharp);
    const bSharp = Note.from(NoteName.B, NoteAlteration.Sharp);

    expect(cSharp.isSharp()).toEqual(true);
    expect(cSharp.toString()).toEqual('C#');
    expect(bSharp.isSharp()).toEqual(true);
    expect(bSharp.toString()).toEqual('B#');
  });

  it('can be double sharp', () => {
    const cDoubleSharp = Note.from(NoteName.C, NoteAlteration.DoubleSharp);
    const bDoubleSharp = Note.from(NoteName.B, NoteAlteration.DoubleSharp);

    expect(cDoubleSharp.isDoubleSharp()).toEqual(true);
    expect(cDoubleSharp.toString()).toEqual('Cx');
    expect(bDoubleSharp.isDoubleSharp()).toEqual(true);
    expect(bDoubleSharp.toString()).toEqual('Bx');
  });

  it('can be flat', () => {
    const bFlat = Note.from(NoteName.B, NoteAlteration.Flat);
    const fFlat = Note.from(NoteName.F, NoteAlteration.Flat);

    expect(bFlat.isFlat()).toEqual(true);
    expect(bFlat.toString()).toEqual('Bb');
    expect(fFlat.isFlat()).toEqual(true);
    expect(fFlat.toString()).toEqual('Fb');
  });

  it('can be double flat', () => {
    const bDoubleFlat = Note.from(NoteName.B, NoteAlteration.DoubleFlat);
    const fDoubleFlat = Note.from(NoteName.F, NoteAlteration.DoubleFlat);

    expect(bDoubleFlat.isDoubleFlat()).toEqual(true);
    expect(bDoubleFlat.toString()).toEqual('Bbb');
    expect(fDoubleFlat.isDoubleFlat()).toEqual(true);
    expect(fDoubleFlat.toString()).toEqual('Fbb');
  });
});

describe('note equality', () => {
  it('finds one c equal to c', () => {
    const c = Note.from(NoteName.C);
    const otherC = Note.from(NoteName.C);

    const equal = c.equals(otherC);

    expect(equal).toBe(true);
  });

  it('finds c not equal to f', () => {
    const c = Note.from(NoteName.C);
    const d = Note.from(NoteName.D);

    const equal = c.equals(d);

    expect(equal).toBe(false);
  });

  it('finds c# equal to c#', () => {
    const cSharp = Note.from(NoteName.C, NoteAlteration.Sharp);
    const otherCSharp = Note.from(NoteName.C, NoteAlteration.Sharp);

    const equal = cSharp.equals(otherCSharp);

    expect(equal).toBe(true);
  });

  it('find c not equal to c#', () => {
    const c = Note.from(NoteName.C);
    const cSharp = Note.from(NoteName.C, NoteAlteration.Sharp);

    const equal = c.equals(cSharp);

    expect(equal).toBe(false);
  });
});

describe('note alteration', () => {
  it('can be sharpened', () => {
    const naturalC = Note.from(NoteName.C);

    const cSharp = naturalC.toSharp();

    expect(cSharp.isSharp()).toEqual(true);
    expect(cSharp.toString()).toEqual('C#');
  });

  it('can be double sharpened', () => {
    const naturalC = Note.from(NoteName.C);

    const cDoubleSharp = naturalC.toDoubleSharp();

    expect(cDoubleSharp.isDoubleSharp()).toEqual(true);
    expect(cDoubleSharp.toString()).toEqual('Cx');
  });

  it('can be flattened', () => {
    const naturalE = Note.from(NoteName.E);

    const eFlat = naturalE.toFlat();

    expect(eFlat.isFlat()).toEqual(true);
    expect(eFlat.toString()).toEqual('Eb');
  });

  it('can be double flattened', () => {
    const naturalE = Note.from(NoteName.E);

    const eDoubleFlat = naturalE.toDoubleFlat();

    expect(eDoubleFlat.isDoubleFlat()).toEqual(true);
    expect(eDoubleFlat.toString()).toEqual('Ebb');
  });

  it('can be naturalized', () => {
    const fSharp = Note.from(NoteName.F, NoteAlteration.Sharp);

    const fNatural = fSharp.toNatural();

    expect(fNatural.isNatural()).toEqual(true);
    expect(fNatural.toString()).toEqual('F');
  });

  it('can create next natural note', () => {
    const aNatural = Note.from(NoteName.A);
    const eSharp = Note.from(NoteName.E, NoteAlteration.Sharp);
    const cFlat = Note.from(NoteName.C, NoteAlteration.Flat);

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

  it('can create next note by adding interval', () => {
    const c = Note.from(NoteName.C);

    const dFlat = c.addInterval(Interval.MinorSecond);
    const d = c.addInterval(Interval.MajorSecond);
    const eFlat = c.addInterval(Interval.MinorThird);
    const e = c.addInterval(Interval.MajorThird);

    expect(dFlat.toString()).toEqual('Db');
    expect(d.toString()).toEqual('D');
    expect(eFlat.toString()).toEqual('Eb');
    expect(e.toString()).toEqual('E');
  });
});
