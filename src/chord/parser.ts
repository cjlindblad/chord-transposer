import { Chord } from './chord';
import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import { NoteAlteration } from '../note/noteAlteration';
import { Third, Interval } from '../interval/interval';

class ChordParser {
  private constructor() {}

  public static parse(input: string): Chord {
    // TODO write this as a 'real' parser that consumes tokens
    if (input.trim().length === 0) {
      throw new Error('Cannot parse empty string');
    }

    const baseCharacter = input[0].toUpperCase();

    // clean this up..
    if (
      baseCharacter !== 'A' &&
      baseCharacter !== 'B' &&
      baseCharacter !== 'C' &&
      baseCharacter !== 'D' &&
      baseCharacter !== 'E' &&
      baseCharacter !== 'F' &&
      baseCharacter !== 'G'
    ) {
      throw new Error('Invalid base note character');
    }

    let alteration: NoteAlteration | undefined = undefined;
    let third: Third = Interval.MajorThird;

    if (input.length >= 2) {
      const alterationCharacter = input[1];

      switch (alterationCharacter) {
        case '#':
          alteration = NoteAlteration.Sharp;
          break;
        case 'b':
          alteration = NoteAlteration.Flat;
          break;
        case 'm':
          third = Interval.MinorThird;
          break;
        default:
          throw new Error('Invalid alteration character');
      }
    }

    const note =
      alteration !== undefined
        ? Note.from(NoteName[baseCharacter], alteration)
        : Note.from(NoteName[baseCharacter]);

    return Chord.from(note, { third });
  }
}

export default ChordParser;
