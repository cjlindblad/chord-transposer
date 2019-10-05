import { NoteName } from './noteName';
import { NoteAlteration } from './noteAlteration';

export class Note {
  private name: NoteName;
  private modifier: NoteAlteration;
  private position: number;

  public constructor(
    name: NoteName,
    modifier: NoteAlteration = NoteAlteration.Natural
  ) {
    this.name = name;
    this.modifier = modifier;

    let position;
    /*

    |  | | | |  |  | | | | |1|  |
    |  |1| |3|  |  |6| |8| |0|  |
    |  +-+ +-+  |  +-+ +-+ +-+  |
    |   |   |   |   |   |   | 1 |
    | 0 | 2 | 4 | 5 | 7 | 9 | 1 |
    +---+---+---+---+---+---+---+

    */
    switch (this.name) {
      case NoteName.C:
        position = 0;
        break;
      case NoteName.D:
        position = 2;
        break;
      case NoteName.E:
        position = 4;
        break;
      case NoteName.F:
        position = 5;
        break;
      case NoteName.G:
        position = 7;
        break;
      case NoteName.A:
        position = 9;
        break;
      case NoteName.B:
        position = 11;
        break;
      default:
        throw new Error('Invariant: Illegal note name');
    }

    if (modifier === NoteAlteration.Sharp) {
      position = (position + 1) % 12;
    }

    if (modifier === NoteAlteration.DoubleSharp) {
      position = (position + 2) % 12;
    }

    if (modifier === NoteAlteration.Flat) {
      position = (position - 1 + 12) % 12;
    }

    if (modifier === NoteAlteration.DoubleFlat) {
      position = (position - 2 + 12) % 12;
    }

    this.position = position;
  }

  public getPosition(): number {
    return this.position;
  }

  public isSharp(): boolean {
    return this.modifier === NoteAlteration.Sharp;
  }

  public isDoubleSharp(): boolean {
    return this.modifier === NoteAlteration.DoubleSharp;
  }

  public isFlat(): boolean {
    return this.modifier === NoteAlteration.Flat;
  }

  public isDoubleFlat(): boolean {
    return this.modifier === NoteAlteration.DoubleFlat;
  }

  public isNatural(): boolean {
    return this.modifier === NoteAlteration.Natural;
  }

  public toSharp(): Note {
    return new Note(this.name, NoteAlteration.Sharp);
  }

  public toDoubleSharp(): Note {
    return new Note(this.name, NoteAlteration.DoubleSharp);
  }

  public toFlat(): Note {
    return new Note(this.name, NoteAlteration.Flat);
  }

  public toDoubleFlat(): Note {
    return new Note(this.name, NoteAlteration.DoubleFlat);
  }

  public toNatural(): Note {
    return new Note(this.name, NoteAlteration.Natural);
  }

  public toNext(): Note {
    let nextNoteName: NoteName;

    switch (this.name) {
      case NoteName.A:
        nextNoteName = NoteName.B;
        break;
      case NoteName.B:
        nextNoteName = NoteName.C;
        break;
      case NoteName.C:
        nextNoteName = NoteName.D;
        break;
      case NoteName.D:
        nextNoteName = NoteName.E;
        break;
      case NoteName.E:
        nextNoteName = NoteName.F;
        break;
      case NoteName.F:
        nextNoteName = NoteName.G;
        break;
      case NoteName.G:
        nextNoteName = NoteName.A;
        break;
      default:
        throw new Error('Invariant - invalid note name');
    }

    return new Note(nextNoteName);
  }

  public toString(): string {
    const base = NoteName[this.name];
    const modifier =
      this.modifier === NoteAlteration.Sharp
        ? '#'
        : this.modifier === NoteAlteration.DoubleSharp
        ? 'x'
        : this.modifier === NoteAlteration.Flat
        ? 'b'
        : this.modifier === NoteAlteration.DoubleFlat
        ? 'bb'
        : '';

    return `${base}${modifier}`;
  }
}
