import { NoteName } from './noteName';
import { NoteAlteration } from './noteAlteration';
import { Position } from './position';

export class Note {
  static readonly Count = 12;

  private name: NoteName;
  private modifier: NoteAlteration;
  private position: Position;

  public constructor(
    name: NoteName,
    modifier: NoteAlteration = NoteAlteration.Natural
  ) {
    this.name = name;
    this.modifier = modifier;
    this.position = Position.from(name, modifier);
  }

  public getPosition(): number {
    return this.position.getValue();
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
