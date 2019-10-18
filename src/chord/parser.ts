import { Chord } from './chord';
import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import { NoteAlteration } from '../note/noteAlteration';
import { Third, Interval } from '../interval/interval';

class ChordParser {
  private constructor() {}

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

    // TODO write this as a 'real' parser that consumes tokens
    if (input.trim().length === 0) {
      throw new Error('Cannot parse empty string');
    }

    const baseCharacter = input[0].toUpperCase();

    if (!isBaseNoteCharacter(baseCharacter)) {
      throw new Error('Invalid base note character');
    }

    let alteration: NoteAlteration | undefined = undefined;
    let third: Third = Interval.MajorThird;

    if (input.length >= 2) {
      const char = input[1];

      if (isMinorCharacter(char)) {
        third = Interval.MinorThird;
      } else if (isAlterationCharacter(char)) {
        if (char === '#') {
          alteration = NoteAlteration.Sharp;
        }
        if (char === 'b') {
          alteration = NoteAlteration.Flat;
        }
      } else {
        throw new Error('Invalid second character');
      }
    }
    if (input.length >= 3 && isMinorCharacter(input[2])) {
      third = Interval.MinorThird;
    }

    type NoteName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

    const note =
      alteration !== undefined
        ? Note.from(NoteName[baseCharacter as NoteName], alteration)
        : Note.from(NoteName[baseCharacter as NoteName]);

    return Chord.from(note, { third });
  }
}

export default ChordParser;
