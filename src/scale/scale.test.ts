import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import { Scale } from './scale';
import { NoteAlteration } from '../note/noteAlteration';

describe('scale', () => {
  it('creates a C major scale', () => {
    const c = new Note(NoteName.C);
    const cMajorScale = Scale.from(c);

    expect(cMajorScale.toString()).toEqual('CDEFGAB');
  });

  it('creates a G major scale', () => {
    const g = new Note(NoteName.G);
    const gMajorScale = Scale.from(g);

    expect(gMajorScale.toString()).toEqual('GABCDEF#');
  });

  it('creates a D major scale', () => {
    const d = new Note(NoteName.D);
    const dMajorScale = Scale.from(d);

    expect(dMajorScale.toString()).toEqual('DEF#GABC#');
  });

  it('creates an A major scale', () => {
    const a = new Note(NoteName.A);
    const aMajorScale = Scale.from(a);

    expect(aMajorScale.toString()).toEqual('ABC#DEF#G#');
  });

  it('creates an E major scale', () => {
    const e = new Note(NoteName.E);
    const eMajorScale = Scale.from(e);

    expect(eMajorScale.toString()).toEqual('EF#G#ABC#D#');
  });

  it('creates a B major scale', () => {
    const b = new Note(NoteName.B);
    const bMajorScale = Scale.from(b);

    expect(bMajorScale.toString()).toEqual('BC#D#EF#G#A#');
  });

  it('creates a F# major scale', () => {
    const fSharp = new Note(NoteName.F, NoteAlteration.Sharp);
    const fSharpMajorScale = Scale.from(fSharp);

    expect(fSharpMajorScale.toString()).toEqual('F#G#A#BC#D#E#');
  });

  it('creates a C# major scale', () => {
    const cSharp = new Note(NoteName.C, NoteAlteration.Sharp);
    const cSharpMajorScale = Scale.from(cSharp);

    expect(cSharpMajorScale.toString()).toEqual('C#D#E#F#G#A#B#');
  });

  it('creates a F major scale', () => {
    const f = new Note(NoteName.F);
    const fMajorScale = Scale.from(f);

    expect(fMajorScale.toString()).toEqual('FGABbCDE');
  });

  it('creates a Bb major scale', () => {
    const bFlat = new Note(NoteName.B, NoteAlteration.Flat);
    const bFlatMajorScale = Scale.from(bFlat);

    expect(bFlatMajorScale.toString()).toEqual('BbCDEbFGA');
  });

  it('creates a Eb major scale', () => {
    const eFlat = new Note(NoteName.E, NoteAlteration.Flat);
    const eFlatMajorScale = Scale.from(eFlat);

    expect(eFlatMajorScale.toString()).toEqual('EbFGAbBbCD');
  });

  it('creates an Ab major scale', () => {
    const aFlat = new Note(NoteName.A, NoteAlteration.Flat);
    const aFlatMajorScale = Scale.from(aFlat);

    expect(aFlatMajorScale.toString()).toEqual('AbBbCDbEbFG');
  });

  it('creates a Db major scale', () => {
    const dFlat = new Note(NoteName.D, NoteAlteration.Flat);
    const dFlatMajorScale = Scale.from(dFlat);

    expect(dFlatMajorScale.toString()).toEqual('DbEbFGbAbBbC');
  });

  it('creates a Gb major scale', () => {
    const gFlat = new Note(NoteName.G, NoteAlteration.Flat);
    const gFlatMajorScale = Scale.from(gFlat);

    expect(gFlatMajorScale.toString()).toEqual('GbAbBbCbDbEbF');
  });

  it('creates a Cb major scale', () => {
    const cFlat = new Note(NoteName.C, NoteAlteration.Flat);
    const cFlatMajorScale = Scale.from(cFlat);

    expect(cFlatMajorScale.toString()).toEqual('CbDbEbFbGbAbBb');
  });
});
