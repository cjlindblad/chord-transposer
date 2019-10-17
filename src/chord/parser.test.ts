import ChordParser from './parser';
import { Chord } from './chord';

const notesString = (chord: Chord): string =>
  chord
    .getNotes()
    .map(note => note.toString())
    .join('');

describe('chord parser', () => {
  describe('invalid input', () => {
    it('throws when parsing empty string', () => {
      const input = '';

      expect(() => ChordParser.parse(input)).toThrow();
    });

    it('throws when parsing string starting with non note character', () => {
      const input = 'X';

      expect(() => ChordParser.parse(input)).toThrow();
    });
  });

  describe('single character chords', () => {
    it('parses a c major chord', () => {
      const input = 'C';

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual('CEG');
    });

    it('parses a b major chord', () => {
      const input = 'B';

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual('BD#F#');
    });

    it('parses lower case c major chord', () => {
      const input = 'c';

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual('CEG');
    });
  });

  describe('chords with alteration characters', () => {
    it('parses a c# major chord', () => {
      const input = 'C#';

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual('C#E#G#');
    });

    it('parses a lower case g# major chord', () => {
      const input = 'g#';

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual('G#B#D#');
    });

    it('parses a lower case cb major chord', () => {
      const input = 'cb';

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual('CbEbGb');
    });

    it('parses Fb major chord', () => {
      const input = 'Fb';

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual('FbAbCb');
    });
  });
});
