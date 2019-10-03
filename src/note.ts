import { NoteName } from './noteName';
import { NoteModifier } from './noteModifier';

export class Note {
  private name: NoteName;
  private modifier: NoteModifier;
  private position: number;

  public constructor(
    name: NoteName,
    modifier: NoteModifier = NoteModifier.Normal
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

    if (modifier === NoteModifier.Sharp) {
      position = position === 12 ? 1 : position + 1;
    }

    if (modifier === NoteModifier.Flat) {
      position = position === 1 ? 12 : position - 1;
    }

    this.position = position;
  }

  public getPosition(): number {
    return this.position;
  }

  public toString(): string {
    const base = NoteName[this.name];
    const modifier =
      this.modifier === NoteModifier.Sharp
        ? '#'
        : this.modifier === NoteModifier.Flat
        ? 'b'
        : '';

    return `${base}${modifier}`;
  }
}
