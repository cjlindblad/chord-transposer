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
    switch (this.name) {
      case NoteName.C:
        position = 1;
        break;
      case NoteName.D:
        position = 3;
        break;
      case NoteName.E:
        position = 5;
        break;
      case NoteName.F:
        position = 6;
        break;
      case NoteName.G:
        position = 8;
        break;
      case NoteName.A:
        position = 10;
        break;
      case NoteName.B:
        position = 12;
        break;
      default:
        throw new Error('Invariant: Illegal note name');
    }

    if (modifier === NoteAlteration.Sharp) {
      position = position === 12 ? 1 : position + 1;
    }

    if (modifier === NoteAlteration.Flat) {
      position = position === 1 ? 12 : position - 1;
    }

    this.position = position;
  }

  public getPosition(): number {
    return this.position;
  }

  public isSharp(): boolean {
    return this.modifier === NoteAlteration.Sharp;
  }

  public isFlat(): boolean {
    return this.modifier === NoteAlteration.Flat;
  }

  public isNatural(): boolean {
    return this.modifier === NoteAlteration.Natural;
  }

  public toSharp(): Note {
    return new Note(this.name, NoteAlteration.Sharp);
  }

  public toFlat(): Note {
    return new Note(this.name, NoteAlteration.Flat);
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
        : this.modifier === NoteAlteration.Flat
        ? 'b'
        : '';

    return `${base}${modifier}`;
  }
}
