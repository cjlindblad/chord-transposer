import ChordParser from './parser';
import { Chord } from './chord';

const notesString = (chord: Chord): string =>
  chord
    .getNotes()
    .map(note => note.toString())
    .join('');

describe('chord parser', () => {
  it('throws when parsing empty string', () => {
    expect(() => ChordParser.parse('')).toThrow();
  });

  it('throws when parsing string starting with non note character', () => {
    expect(() => ChordParser.parse('X')).toThrow();
  });

  it('parses a c major chord', () => {
    const chord = ChordParser.parse('C');

    expect(notesString(chord)).toEqual('CEG');
  });
});
