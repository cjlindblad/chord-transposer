import { NoteAlteration } from './noteAlteration';
import { NoteName } from './noteName';
import { Note } from './note';

/*

  Semitone values

  |  | | | |  |  | | | | |1|  |
  |  |1| |3|  |  |6| |8| |0|  |
  |  +-+ +-+  |  +-+ +-+ +-+  |
  |   |   |   |   |   |   | 1 |
  | 0 | 2 | 4 | 5 | 7 | 9 | 1 |
  +---+---+---+---+---+---+---+

*/
export class Semitone {
  private value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(name: NoteName, alteration: NoteAlteration): Semitone {
    const baseValue = this.lookupBaseValue(name);
    const alterationOffset = this.lookupAlterationOffset(alteration);

    const value = (baseValue + alterationOffset + Note.Count) % Note.Count;

    return new Semitone(value);
  }

  private static baseValues = {
    [NoteName.C]: 0,
    [NoteName.D]: 2,
    [NoteName.E]: 4,
    [NoteName.F]: 5,
    [NoteName.G]: 7,
    [NoteName.A]: 9,
    [NoteName.B]: 11
  };

  private static lookupBaseValue(name: NoteName): number {
    return this.baseValues[name];
  }

  private static alterationOffsets = {
    [NoteAlteration.Natural]: 0,
    [NoteAlteration.Sharp]: 1,
    [NoteAlteration.DoubleSharp]: 2,
    [NoteAlteration.Flat]: -1,
    [NoteAlteration.DoubleFlat]: -2
  };

  private static lookupAlterationOffset(alteration: NoteAlteration): number {
    return this.alterationOffsets[alteration];
  }

  public getValue(): number {
    return this.value;
  }
}
