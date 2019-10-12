import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import { Chord } from './chord';
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
});

describe('chord notes', () => {
  const noteString = (notes: Note[]): string =>
    notes.map(note => note.toString()).join('');

  it('lists notes in major chords', () => {
    const c = Note.from(NoteName.C);
    const cMajor = Chord.from(c);
    const cMajorNotes = cMajor.getNotes();

    const b = Note.from(NoteName.B);
    const bMajor = Chord.from(b);
    const bMajorNotes = bMajor.getNotes();

    const eFlat = Note.from(NoteName.E, NoteAlteration.Flat);
    const eFlatMajor = Chord.from(eFlat);
    const eFlatMajorNotes = eFlatMajor.getNotes();

    const gSharp = Note.from(NoteName.G, NoteAlteration.Sharp);
    const gSharpMajor = Chord.from(gSharp);
    const gSharpMajorNotes = gSharpMajor.getNotes();

    const gFlat = Note.from(NoteName.G, NoteAlteration.Flat);
    const gFlatMajor = Chord.from(gFlat);
    const gFlatMajorNotes = gFlatMajor.getNotes();

    expect(noteString(cMajorNotes)).toEqual('CEG');
    expect(noteString(bMajorNotes)).toEqual('BD#F#');
    expect(noteString(eFlatMajorNotes)).toEqual('EbGBb');
    expect(noteString(gSharpMajorNotes)).toEqual('G#B#D#');
    expect(noteString(gFlatMajorNotes)).toEqual('GbBbDb');
  });

  it('lists the notes in minor chords', () => {
    const c = Note.from(NoteName.C);
    const cMinor = Chord.from(c, { third: Interval.MinorThird });
    const cMinorNotes = cMinor.getNotes();

    const b = Note.from(NoteName.B);
    const bMinor = Chord.from(b, { third: Interval.MinorThird });
    const bMinorNotes = bMinor.getNotes();

    const eFlat = Note.from(NoteName.E, NoteAlteration.Flat);
    const eFlatMinor = Chord.from(eFlat, { third: Interval.MinorThird });
    const eFlatMinorNotes = eFlatMinor.getNotes();

    const gSharp = Note.from(NoteName.G, NoteAlteration.Sharp);
    const gSharpMinor = Chord.from(gSharp, { third: Interval.MinorThird });
    const gSharpMinorNotes = gSharpMinor.getNotes();

    const gFlat = Note.from(NoteName.G, NoteAlteration.Flat);
    const gFlatMinor = Chord.from(gFlat, { third: Interval.MinorThird });
    const gFlatMinorNotes = gFlatMinor.getNotes();

    expect(noteString(cMinorNotes)).toEqual('CEbG');
    expect(noteString(bMinorNotes)).toEqual('BDF#');
    expect(noteString(eFlatMinorNotes)).toEqual('EbGbBb');
    expect(noteString(gSharpMinorNotes)).toEqual('G#BD#');
    expect(noteString(gFlatMinorNotes)).toEqual('GbBbbDb');
  });
});
