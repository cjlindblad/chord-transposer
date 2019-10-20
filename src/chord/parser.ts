import { Chord } from './chord';
import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import { NoteAlteration } from '../note/noteAlteration';
import { Third, Interval, Seventh } from '../interval/interval';

class ChordParser {
  // TODO write this as a 'real' parser that consumes tokens
  public static parse(input: string): Chord {
    const isBaseNoteCharacter = (char: string) =>
      char === 'A' ||
      char === 'B' ||
      char === 'C' ||
      char === 'D' ||
      char === 'E' ||
      char === 'F' ||
      char === 'G';
    const isMinorCharacter = (char: string) => char === 'm';
    const isAlterationCharacter = (char: string) =>
      char === '#' || char === 'b';
    const isSeventhCharacter = (char: string) => char === '7';
    const hasMajorSeventhSubstring = (input: string) =>
      input.toLowerCase().indexOf('maj7') !== -1;

    if (input.trim().length === 0) {
      throw new Error('Cannot parse empty string');
    }

    const baseCharacter = input[0].toUpperCase();

    if (!isBaseNoteCharacter(baseCharacter)) {
      throw new Error('Invalid base note character');
    }

    let alteration: NoteAlteration | undefined = undefined;
    let third: Third = Interval.MajorThird;
    let seventh: Seventh | undefined = undefined;

    if (input.length >= 2) {
      const secondCharacter = input[1];

      // this won't handle minor chords with major sevenths.
      // not an usual chord, but we'll handle that with a
      // real parser.

      // the if statements are also getting out of hand pretty
      // fast.

      let foundMatchingRule = false;

      if (
        isMinorCharacter(secondCharacter) &&
        !hasMajorSeventhSubstring(input)
      ) {
        third = Interval.MinorThird;
        foundMatchingRule = true;
      }

      if (hasMajorSeventhSubstring(input)) {
        seventh = Interval.MajorSeventh;
        foundMatchingRule = true;
      }

      if (
        isSeventhCharacter(secondCharacter) &&
        !hasMajorSeventhSubstring(input)
      ) {
        seventh = Interval.MinorSeventh;
        foundMatchingRule = true;
      }

      if (isAlterationCharacter(secondCharacter)) {
        if (secondCharacter === '#') {
          alteration = NoteAlteration.Sharp;
        }
        if (secondCharacter === 'b') {
          alteration = NoteAlteration.Flat;
        }
        foundMatchingRule = true;
      }

      if (!foundMatchingRule) {
        throw new Error('Invalid second character');
      }
    }
    if (input.length >= 3) {
      const thirdCharacter = input[2];
      if (
        isMinorCharacter(thirdCharacter) &&
        !hasMajorSeventhSubstring(input)
      ) {
        third = Interval.MinorThird;
      }
      if (isSeventhCharacter(thirdCharacter)) {
        seventh = Interval.MinorSeventh;
      }
    }

    // this doesn't care about ordering..
    if (hasMajorSeventhSubstring(input)) {
      seventh = Interval.MajorSeventh;
    }

    type NoteName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

    const note =
      alteration !== undefined
        ? Note.from(NoteName[baseCharacter as NoteName], alteration)
        : Note.from(NoteName[baseCharacter as NoteName]);

    return seventh !== undefined
      ? Chord.from(note, { third, seventh })
      : Chord.from(note, { third });
  }
}

export default ChordParser;
