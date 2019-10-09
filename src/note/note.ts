import { NoteName } from './noteName';
import { NoteAlteration } from './noteAlteration';
import { Semitone } from './semitone';
import { Interval } from '../interval/interval';

export class Note {
  static readonly Count = 12;

  private name: NoteName;
  private modifier: NoteAlteration;
  private semiTone: Semitone;

  public constructor(
    name: NoteName,
    modifier: NoteAlteration = NoteAlteration.Natural
  ) {
    this.name = name;
    this.modifier = modifier;
    this.semiTone = Semitone.from(name, modifier);
  }

  public getSemitoneValue(): number {
    return this.semiTone.getValue();
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

  public plusInterval(interval: Interval): Note {
    let noteSteps = 0;
    let semitones = 0;

    switch (interval) {
      case Interval.MinorSecond:
        noteSteps = 1;
        semitones = 1;
        break;
      case Interval.MajorSecond:
        noteSteps = 1;
        semitones = 2;
        break;
      case Interval.MinorThird:
        noteSteps = 2;
        semitones = 3;
        break;
      case Interval.MajorThird:
        noteSteps = 2;
        semitones = 4;
        break;
      default:
        throw new Error('not implemented');
    }

    let nextNote = new Note(this.name, this.modifier);
    for (let i = 0; i < noteSteps; i++) {
      nextNote = nextNote.toNext();
    }

    const nextSemitoneValue =
      (this.getSemitoneValue() + semitones) % Note.Count;
    const nextSemitoneCandidateValue = nextNote.getSemitoneValue();

    if (nextSemitoneCandidateValue === nextSemitoneValue) {
      return nextNote;
    } else if (
      (nextSemitoneCandidateValue + 1) % Note.Count ===
      nextSemitoneValue
    ) {
      return nextNote.toSharp();
    } else if (
      (nextSemitoneCandidateValue + 2) % Note.Count ===
      nextSemitoneValue
    ) {
      return nextNote.toDoubleSharp();
    } else if (
      (nextSemitoneCandidateValue - 1 + Note.Count) % Note.Count ===
      nextSemitoneValue
    ) {
      return nextNote.toFlat();
    } else if (
      (nextSemitoneCandidateValue - 2 + Note.Count) % Note.Count ===
      nextSemitoneValue
    ) {
      return nextNote.toDoubleFlat();
    } else {
      throw new Error(`Illegal interval (${this.toString()} plus ${interval})`);
    }
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
