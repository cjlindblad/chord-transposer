import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import { Chord, ChordIntervals } from './chord';
import { Interval } from '../interval/interval';
import { NoteAlteration } from '../note/noteAlteration';

describe('chord creation', () => {
  it('creates a major chord by default', () => {
    const c = Note.from(NoteName.C);
    const cMajor = Chord.from(c);

    expect(cMajor.toString()).toEqual('C');
  });

  it('creates a minor chord', () => {
    const c = Note.from(NoteName.C);
    const cMinor = Chord.from(c, { third: Interval.MinorThird });

    expect(cMinor.toString()).toEqual('Cm');
  });

  it('creates an implicit major chord with major seventh', () => {
    const c = Note.from(NoteName.C);
    const chord = Chord.from(c, { seventh: Interval.MajorSeventh });

    expect(chord.toString()).toEqual('Cmaj7');
  });

  it('creates an implicit major chord with minor seventh', () => {
    const c = Note.from(NoteName.C);
    const chord = Chord.from(c, { seventh: Interval.MinorSeventh });

    expect(chord.toString()).toEqual('C7');
  });

  it('creates minor chord with minor seventh', () => {
    const c = Note.from(NoteName.C);
    const chord = Chord.from(c, {
      third: Interval.MinorThird,
      seventh: Interval.MinorSeventh,
    });

    expect(chord.toString()).toEqual('Cm7');
  });

  it('creates minor chord with major seventh', () => {
    const c = Note.from(NoteName.C);
    const chord = Chord.from(c, {
      third: Interval.MinorThird,
      seventh: Interval.MajorSeventh,
    });

    expect(chord.toString()).toEqual('Cmmaj7');
  });
});

describe('chord notes', () => {
  const noteString = (notes: Note[]): string =>
    notes.map(note => note.toString()).join('');

  describe('illegal chords notes', () => {
    it('crashes on chords requiring triple sharps', () => {
      const note = Note.from(NoteName.D, NoteAlteration.DoubleSharp);
      const chord = Chord.from(note);
      expect(chord.getNotes).toThrow();
    });

    it('crashes on chords requiring triple flats', () => {
      const note = Note.from(NoteName.C, NoteAlteration.DoubleFlat);
      const chord = Chord.from(note);
      expect(chord.getNotes).toThrow();
    });
  });

  describe('major chord notes', () => {
    it('lists notes in C', () => {
      const c = Note.from(NoteName.C);
      const cMajor = Chord.from(c);
      const cMajorNotes = cMajor.getNotes();

      expect(noteString(cMajorNotes)).toEqual('CEG');
    });

    it('lists notes in chord with sharps', () => {
      const b = Note.from(NoteName.B);
      const bMajor = Chord.from(b);
      const bMajorNotes = bMajor.getNotes();

      expect(noteString(bMajorNotes)).toEqual('BD#F#');
    });

    it('lists notes in chord with flats', () => {
      const eFlat = Note.from(NoteName.E, NoteAlteration.Flat);
      const eFlatMajor = Chord.from(eFlat);
      const eFlatMajorNotes = eFlatMajor.getNotes();

      expect(noteString(eFlatMajorNotes)).toEqual('EbGBb');
    });

    it('lists notes in chord with double sharps', () => {
      const bSharp = Note.from(NoteName.B, NoteAlteration.Sharp);
      const bSharpMajor = Chord.from(bSharp);
      const bSharpMajorNotes = bSharpMajor.getNotes();

      expect(noteString(bSharpMajorNotes)).toEqual('B#DxFx');
    });

    it('lists notes in chord with double flats', () => {
      const dDoubleFlat = Note.from(NoteName.D, NoteAlteration.DoubleFlat);
      const dDoubleFlatMajor = Chord.from(dDoubleFlat);
      const dDoubleFlatMajorNotes = dDoubleFlatMajor.getNotes();

      expect(noteString(dDoubleFlatMajorNotes)).toEqual('DbbFbAbb');
    });
  });

  describe('minor chord notes', () => {
    it('lists notes in C', () => {
      const c = Note.from(NoteName.C);
      const cMinor = Chord.from(c, { third: Interval.MinorThird });
      const cMinorNotes = cMinor.getNotes();

      expect(noteString(cMinorNotes)).toEqual('CEbG');
    });

    it('lists notes in chord with sharps', () => {
      const b = Note.from(NoteName.B);
      const bMinor = Chord.from(b, { third: Interval.MinorThird });
      const bMinorNotes = bMinor.getNotes();

      expect(noteString(bMinorNotes)).toEqual('BDF#');
    });

    it('lists notes in chord with flats', () => {
      const eFlat = Note.from(NoteName.E, NoteAlteration.Flat);
      const eFlatMinor = Chord.from(eFlat, { third: Interval.MinorThird });
      const eFlatMinorNotes = eFlatMinor.getNotes();

      expect(noteString(eFlatMinorNotes)).toEqual('EbGbBb');
    });

    it('lists notes in chord with double sharps', () => {
      const cDoubleSharp = Note.from(NoteName.C, NoteAlteration.DoubleSharp);
      const cDoubleSharpMinor = Chord.from(cDoubleSharp, {
        third: Interval.MinorThird,
      });
      const cDoubleSharpMinorNotes = cDoubleSharpMinor.getNotes();

      expect(noteString(cDoubleSharpMinorNotes)).toEqual('CxE#Gx');
    });

    it('lists notes in chord with double flats', () => {
      const gFlat = Note.from(NoteName.G, NoteAlteration.Flat);
      const gFlatMinor = Chord.from(gFlat, { third: Interval.MinorThird });
      const gFlatMinorNotes = gFlatMinor.getNotes();

      expect(noteString(gFlatMinorNotes)).toEqual('GbBbbDb');
    });
  });

  describe('major chords with major seventh notes', () => {
    it('lists notes in C', () => {
      const c = Note.from(NoteName.C);
      const cmaj7 = Chord.from(c, { seventh: Interval.MajorSeventh });

      const cmaj7Notes = cmaj7.getNotes();

      expect(noteString(cmaj7Notes)).toEqual('CEGB');
    });

    it('lists notes in chord with sharps', () => {
      const b = Note.from(NoteName.B);
      const bmaj7 = Chord.from(b, { seventh: Interval.MajorSeventh });
      const bmaj7Notes = bmaj7.getNotes();

      expect(noteString(bmaj7Notes)).toEqual('BD#F#A#');
    });

    it('lists notes in chord with flats', () => {
      const eFlat = Note.from(NoteName.E, NoteAlteration.Flat);
      const eFlatMaj7 = Chord.from(eFlat, { seventh: Interval.MajorSeventh });
      const eFlatMaj7Notes = eFlatMaj7.getNotes();

      expect(noteString(eFlatMaj7Notes)).toEqual('EbGBbD');
    });

    it('lists notes in chord with double sharps', () => {
      const gSharp = Note.from(NoteName.G, NoteAlteration.Sharp);
      const gSharpMaj7 = Chord.from(gSharp, { seventh: Interval.MajorSeventh });
      const gSharpMaj7Notes = gSharpMaj7.getNotes();

      expect(noteString(gSharpMaj7Notes)).toEqual('G#B#D#Fx');
    });

    it('lists notes in chord with double flats', () => {
      const dDoubleFlat = Note.from(NoteName.D, NoteAlteration.DoubleFlat);
      const dDoubleFlatMaj7 = Chord.from(dDoubleFlat, {
        seventh: Interval.MajorSeventh,
      });
      const dDoubleFlatMaj7Notes = dDoubleFlatMaj7.getNotes();

      expect(noteString(dDoubleFlatMaj7Notes)).toEqual('DbbFbAbbCb');
    });
  });

  describe('major chords with minor seventh notes', () => {
    it('lists notes in C', () => {
      const note = Note.from(NoteName.C);
      const chord = Chord.from(note, { seventh: Interval.MinorSeventh });
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('CEGBb');
    });

    it('lists notes in chords with sharps', () => {
      const note = Note.from(NoteName.E);
      const chord = Chord.from(note, { seventh: Interval.MinorSeventh });
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('EG#BD');
    });

    it('lists notes in chords with flats', () => {
      const note = Note.from(NoteName.B, NoteAlteration.Flat);
      const chord = Chord.from(note, { seventh: Interval.MinorSeventh });
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('BbDFAb');
    });

    it('lists notes in chords with double sharps', () => {
      const note = Note.from(NoteName.C, NoteAlteration.DoubleSharp);
      const chord = Chord.from(note, { seventh: Interval.MinorSeventh });
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('CxExGxB#');
    });

    it('lists notes in chords with double flats', () => {
      const note = Note.from(NoteName.D, NoteAlteration.DoubleFlat);
      const chord = Chord.from(note, { seventh: Interval.MinorSeventh });
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('DbbFbAbbCbb');
    });
  });

  describe('minor chords with minor seventh notes', () => {
    const intervals: ChordIntervals = {
      third: Interval.MinorThird,
      seventh: Interval.MinorSeventh,
    };

    it('lists notes in C', () => {
      const note = Note.from(NoteName.C);
      const chord = Chord.from(note, intervals);
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('CEbGBb');
    });

    it('lists notes in chords with sharps', () => {
      const note = Note.from(NoteName.F, NoteAlteration.Sharp);
      const chord = Chord.from(note, intervals);
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('F#AC#E');
    });

    it('lists notes in chords with flats', () => {
      const note = Note.from(NoteName.E, NoteAlteration.Flat);
      const chord = Chord.from(note, intervals);
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('EbGbBbDb');
    });

    it('lists notes in chords with double sharps', () => {
      const note = Note.from(NoteName.E, NoteAlteration.DoubleSharp);
      const chord = Chord.from(note, intervals);
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('ExGxBxDx');
    });

    it('lists notes in chords with double flats', () => {
      const note = Note.from(NoteName.G, NoteAlteration.Flat);
      const chord = Chord.from(note, intervals);
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('GbBbbDbFb');
    });
  });

  describe('minor chords with major seventh notes', () => {
    const intervals: ChordIntervals = {
      third: Interval.MinorThird,
      seventh: Interval.MajorSeventh,
    };

    it('lists notes in C', () => {
      const note = Note.from(NoteName.C);
      const chord = Chord.from(note, intervals);
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('CEbGB');
    });

    it('lists notes in chords with sharps', () => {
      const note = Note.from(NoteName.E);
      const chord = Chord.from(note, intervals);
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('EGBD#');
    });

    it('lists notes in chords with flats', () => {
      const note = Note.from(NoteName.B, NoteAlteration.Flat);
      const chord = Chord.from(note, intervals);
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('BbDbFA');
    });

    it('lists notes in chords with double sharps', () => {
      const note = Note.from(NoteName.G, NoteAlteration.Sharp);
      const chord = Chord.from(note, intervals);
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('G#BD#Fx');
    });

    it('lists notes in chords with double flats', () => {
      const note = Note.from(NoteName.D, NoteAlteration.DoubleFlat);
      const chord = Chord.from(note, intervals);
      const notes = chord.getNotes();

      expect(noteString(notes)).toEqual('DbbFbbAbbCb');
    });
  });
});
