import { Chord } from './chord';
import { Note } from '../note/note';
import { NoteName } from '../note/noteName';

class ChordParser {
  private constructor() {}

  public static parse(input: string): Chord {
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

    const note = Note.from(NoteName[baseCharacter]);

    return Chord.from(note);
  }
}

export default ChordParser;
