import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import { Scale } from './scale';
import { NoteAlteration } from '../note/noteAlteration';
import { Mode } from './mode';

describe('ionian scales', () => {
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

  it('creates a G# major scale', () => {
    const gSharp = new Note(NoteName.G, NoteAlteration.Sharp);
    const gSharpMajorScale = Scale.from(gSharp);

    expect(gSharpMajorScale.toString()).toEqual('G#A#B#C#D#E#Fx');
  });

  it('creates a D# major scale', () => {
    const dSharp = new Note(NoteName.D, NoteAlteration.Sharp);
    const dSharpMajorScale = Scale.from(dSharp);

    expect(dSharpMajorScale.toString()).toEqual('D#E#FxG#A#B#Cx');
  });

  it('creates an A# major scale', () => {
    const aSharp = new Note(NoteName.A, NoteAlteration.Sharp);
    const aSharpMajorscale = Scale.from(aSharp);

    expect(aSharpMajorscale.toString()).toEqual('A#B#CxD#E#FxGx');
  });

  it('creates an E# major scale', () => {
    const eSharp = new Note(NoteName.E, NoteAlteration.Sharp);
    const eSharpMajorScale = Scale.from(eSharp);

    expect(eSharpMajorScale.toString()).toEqual('E#FxGxA#B#CxDx');
  });

  it('creates an B# major scale', () => {
    const bSharp = new Note(NoteName.B, NoteAlteration.Sharp);
    const bSharpMajorScale = Scale.from(bSharp);

    expect(bSharpMajorScale.toString()).toEqual('B#CxDxE#FxGxAx');
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

  it('creates a Fb major scale', () => {
    const fFlat = new Note(NoteName.F, NoteAlteration.Flat);
    const fFlatMajorScale = Scale.from(fFlat);

    expect(fFlatMajorScale.toString()).toEqual('FbGbAbBbbCbDbEb');
  });
});

describe('dorian scales', () => {
  it('creates a C dorian scale', () => {
    const c = new Note(NoteName.C);
    const cDorian = Scale.from(c, Mode.Dorian);

    expect(cDorian.toString()).toEqual('CDEbFGABb');
  });
});

describe('phrygian scales', () => {
  it('creates a C phrygian scale', () => {
    const c = new Note(NoteName.C);
    const cPhrygian = Scale.from(c, Mode.Phrygian);

    expect(cPhrygian.toString()).toEqual('CDbEbFGAbBb');
  });
});

describe('lydian scales', () => {
  it('creates a C lydian scale', () => {
    const c = new Note(NoteName.C);
    const cLydian = Scale.from(c, Mode.Lydian);

    expect(cLydian.toString()).toEqual('CDEF#GAB');
  });
});

describe('mixolydian scales', () => {
  it('creates a C mixolydian scale', () => {
    const c = new Note(NoteName.C);
    const cMixoLydian = Scale.from(c, Mode.Mixolydian);

    expect(cMixoLydian.toString()).toEqual('CDEFGABb');
  });
});

describe('aeolian scales', () => {
  it('creates a C aeolian scale', () => {
    const c = new Note(NoteName.C);
    const cAeolian = Scale.from(c, Mode.Aeolian);

    expect(cAeolian.toString()).toEqual('CDEbFGAbBb');
  });
});

describe('locrian scales', () => {
  it('creates a C locrian scale', () => {
    const c = new Note(NoteName.C);
    const cLocrian = Scale.from(c, Mode.Locrian);

    expect(cLocrian.toString()).toEqual('CDbEbFGbAbBb');
  });
});
