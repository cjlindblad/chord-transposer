import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import { Scale } from './scale';
import { NoteAlteration } from '../note/noteAlteration';
import { Mode } from './mode';

describe('scale position from note', () => {
  it('finds position of major third in C ionian', () => {
    const note = Note.from(NoteName.C);
    const scale = Scale.from(note, Mode.Ionian);

    const position = scale.getPositionFromNote(Note.from(NoteName.E));

    expect(3).toEqual(position);
  });

  it('finds position of fifth in G ionian', () => {
    const note = Note.from(NoteName.G);
    const scale = Scale.from(note, Mode.Ionian);

    const position = scale.getPositionFromNote(Note.from(NoteName.D));

    expect(5).toEqual(position);
  });

  it('finds position of major seventh in C# ionian', () => {
    const note = Note.from(NoteName.C, NoteAlteration.Sharp);
    const scale = Scale.from(note, Mode.Ionian);

    const position = scale.getPositionFromNote(
      Note.from(NoteName.B, NoteAlteration.Sharp)
    );

    expect(7).toEqual(position);
  });

  it('throws when requesting position for non existing note', () => {
    const note = Note.from(NoteName.C);
    const scale = Scale.from(note, Mode.Ionian);

    const requestNonExistingNotePosition = () => {
      scale.getPositionFromNote(Note.from(NoteName.C, NoteAlteration.Sharp));
    };

    expect(requestNonExistingNotePosition).toThrow();
  });
});

describe('scale note from position', () => {
  it('finds note for position 1 in C ionian', () => {
    const baseNote = Note.from(NoteName.C);
    const scale = Scale.from(baseNote, Mode.Ionian);

    const note = scale.getNoteFromPosition(1);

    expect(note.toString()).toEqual('C');
  });

  it('find note for position 4 in F ionian', () => {
    const baseNote = Note.from(NoteName.F);
    const scale = Scale.from(baseNote, Mode.Ionian);

    const note = scale.getNoteFromPosition(4);

    expect(note.toString()).toEqual('Bb');
  });

  it('finds note for position 5 in B ionian', () => {
    const baseNote = Note.from(NoteName.B);
    const scale = Scale.from(baseNote, Mode.Ionian);

    const note = scale.getNoteFromPosition(5);

    expect(note.toString()).toEqual('F#');
  });

  it('throws when requesting illegal position', () => {
    const note = Note.from(NoteName.C);
    const scale = Scale.from(note, Mode.Ionian);

    const requestIllegalScalePosition = () => {
      scale.getNoteFromPosition(13);
    };

    expect(requestIllegalScalePosition).toThrow();
  });
});

describe('ionian scales', () => {
  it('creates a C major scale', () => {
    const c = Note.from(NoteName.C);
    const cMajorScale = Scale.from(c);

    expect(cMajorScale.toString()).toEqual('CDEFGAB');
  });

  it('creates a G major scale', () => {
    const g = Note.from(NoteName.G);
    const gMajorScale = Scale.from(g);

    expect(gMajorScale.toString()).toEqual('GABCDEF#');
  });

  it('creates a D major scale', () => {
    const d = Note.from(NoteName.D);
    const dMajorScale = Scale.from(d);

    expect(dMajorScale.toString()).toEqual('DEF#GABC#');
  });

  it('creates an A major scale', () => {
    const a = Note.from(NoteName.A);
    const aMajorScale = Scale.from(a);

    expect(aMajorScale.toString()).toEqual('ABC#DEF#G#');
  });

  it('creates an E major scale', () => {
    const e = Note.from(NoteName.E);
    const eMajorScale = Scale.from(e);

    expect(eMajorScale.toString()).toEqual('EF#G#ABC#D#');
  });

  it('creates a B major scale', () => {
    const b = Note.from(NoteName.B);
    const bMajorScale = Scale.from(b);

    expect(bMajorScale.toString()).toEqual('BC#D#EF#G#A#');
  });

  it('creates a F# major scale', () => {
    const fSharp = Note.from(NoteName.F, NoteAlteration.Sharp);
    const fSharpMajorScale = Scale.from(fSharp);

    expect(fSharpMajorScale.toString()).toEqual('F#G#A#BC#D#E#');
  });

  it('creates a C# major scale', () => {
    const cSharp = Note.from(NoteName.C, NoteAlteration.Sharp);
    const cSharpMajorScale = Scale.from(cSharp);

    expect(cSharpMajorScale.toString()).toEqual('C#D#E#F#G#A#B#');
  });

  it('creates a G# major scale', () => {
    const gSharp = Note.from(NoteName.G, NoteAlteration.Sharp);
    const gSharpMajorScale = Scale.from(gSharp);

    expect(gSharpMajorScale.toString()).toEqual('G#A#B#C#D#E#Fx');
  });

  it('creates a D# major scale', () => {
    const dSharp = Note.from(NoteName.D, NoteAlteration.Sharp);
    const dSharpMajorScale = Scale.from(dSharp);

    expect(dSharpMajorScale.toString()).toEqual('D#E#FxG#A#B#Cx');
  });

  it('creates an A# major scale', () => {
    const aSharp = Note.from(NoteName.A, NoteAlteration.Sharp);
    const aSharpMajorscale = Scale.from(aSharp);

    expect(aSharpMajorscale.toString()).toEqual('A#B#CxD#E#FxGx');
  });

  it('creates an E# major scale', () => {
    const eSharp = Note.from(NoteName.E, NoteAlteration.Sharp);
    const eSharpMajorScale = Scale.from(eSharp);

    expect(eSharpMajorScale.toString()).toEqual('E#FxGxA#B#CxDx');
  });

  it('creates an B# major scale', () => {
    const bSharp = Note.from(NoteName.B, NoteAlteration.Sharp);
    const bSharpMajorScale = Scale.from(bSharp);

    expect(bSharpMajorScale.toString()).toEqual('B#CxDxE#FxGxAx');
  });

  it('creates a F major scale', () => {
    const f = Note.from(NoteName.F);
    const fMajorScale = Scale.from(f);

    expect(fMajorScale.toString()).toEqual('FGABbCDE');
  });

  it('creates a Bb major scale', () => {
    const bFlat = Note.from(NoteName.B, NoteAlteration.Flat);
    const bFlatMajorScale = Scale.from(bFlat);

    expect(bFlatMajorScale.toString()).toEqual('BbCDEbFGA');
  });

  it('creates a Eb major scale', () => {
    const eFlat = Note.from(NoteName.E, NoteAlteration.Flat);
    const eFlatMajorScale = Scale.from(eFlat);

    expect(eFlatMajorScale.toString()).toEqual('EbFGAbBbCD');
  });

  it('creates an Ab major scale', () => {
    const aFlat = Note.from(NoteName.A, NoteAlteration.Flat);
    const aFlatMajorScale = Scale.from(aFlat);

    expect(aFlatMajorScale.toString()).toEqual('AbBbCDbEbFG');
  });

  it('creates a Db major scale', () => {
    const dFlat = Note.from(NoteName.D, NoteAlteration.Flat);
    const dFlatMajorScale = Scale.from(dFlat);

    expect(dFlatMajorScale.toString()).toEqual('DbEbFGbAbBbC');
  });

  it('creates a Gb major scale', () => {
    const gFlat = Note.from(NoteName.G, NoteAlteration.Flat);
    const gFlatMajorScale = Scale.from(gFlat);

    expect(gFlatMajorScale.toString()).toEqual('GbAbBbCbDbEbF');
  });

  it('creates a Cb major scale', () => {
    const cFlat = Note.from(NoteName.C, NoteAlteration.Flat);
    const cFlatMajorScale = Scale.from(cFlat);

    expect(cFlatMajorScale.toString()).toEqual('CbDbEbFbGbAbBb');
  });

  it('creates a Fb major scale', () => {
    const fFlat = Note.from(NoteName.F, NoteAlteration.Flat);
    const fFlatMajorScale = Scale.from(fFlat);

    expect(fFlatMajorScale.toString()).toEqual('FbGbAbBbbCbDbEb');
  });
});

describe('dorian scales', () => {
  it('creates a C dorian scale', () => {
    const c = Note.from(NoteName.C);
    const cDorian = Scale.from(c, Mode.Dorian);

    expect(cDorian.toString()).toEqual('CDEbFGABb');
  });
});

describe('phrygian scales', () => {
  it('creates a C phrygian scale', () => {
    const c = Note.from(NoteName.C);
    const cPhrygian = Scale.from(c, Mode.Phrygian);

    expect(cPhrygian.toString()).toEqual('CDbEbFGAbBb');
  });
});

describe('lydian scales', () => {
  it('creates a C lydian scale', () => {
    const c = Note.from(NoteName.C);
    const cLydian = Scale.from(c, Mode.Lydian);

    expect(cLydian.toString()).toEqual('CDEF#GAB');
  });
});

describe('mixolydian scales', () => {
  it('creates a C mixolydian scale', () => {
    const c = Note.from(NoteName.C);
    const cMixoLydian = Scale.from(c, Mode.Mixolydian);

    expect(cMixoLydian.toString()).toEqual('CDEFGABb');
  });
});

describe('aeolian scales', () => {
  it('creates a C aeolian scale', () => {
    const c = Note.from(NoteName.C);
    const cAeolian = Scale.from(c, Mode.Aeolian);

    expect(cAeolian.toString()).toEqual('CDEbFGAbBb');
  });
});

describe('locrian scales', () => {
  it('creates a C locrian scale', () => {
    const c = Note.from(NoteName.C);
    const cLocrian = Scale.from(c, Mode.Locrian);

    expect(cLocrian.toString()).toEqual('CDbEbFGbAbBb');
  });
});
