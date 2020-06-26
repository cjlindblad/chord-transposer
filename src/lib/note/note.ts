import { NoteName } from './noteName';
import { NoteAlteration } from './noteAlteration';
import { Semitone } from './semitone';
import { Interval } from '../interval/interval';

export class Note {
  static readonly Count = 12;

  private name: NoteName;
  private modifier: NoteAlteration;
  private semiTone: Semitone;

  private constructor(name: NoteName, modifier: NoteAlteration) {
    this.name = name;
    this.modifier = modifier;
    this.semiTone = Semitone.from(name, modifier);
  }

  public static from(
    name: NoteName,
    modifier: NoteAlteration = NoteAlteration.Natural
  ): Note {
    return new Note(name, modifier);
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
    return Note.from(this.name, NoteAlteration.Sharp);
  }

  public toDoubleSharp(): Note {
    return Note.from(this.name, NoteAlteration.DoubleSharp);
  }

  public toFlat(): Note {
    return Note.from(this.name, NoteAlteration.Flat);
  }

  public toDoubleFlat(): Note {
    return Note.from(this.name, NoteAlteration.DoubleFlat);
  }

  public toNatural(): Note {
    return Note.from(this.name, NoteAlteration.Natural);
  }

  public intervalTo(note: Note) {
    const fromSemiTone = this.getSemitoneValue();
    const toSemiTone = note.getSemitoneValue();
    const difference = (toSemiTone + 12 - fromSemiTone) % 12;

    return difference as Interval;
  }

  public addInterval(interval: Interval): Note {
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
      case Interval.Fourth:
        noteSteps = 3;
        semitones = 5;
        break;
      case Interval.AugmentedFourth:
        noteSteps = 3;
        semitones = 6;
        break;
      case Interval.Fifth:
        noteSteps = 4;
        semitones = 7;
        break;
      case Interval.MinorSixth:
        noteSteps = 5;
        semitones = 8;
        break;
      case Interval.MajorSixth:
        noteSteps = 5;
        semitones = 9;
        break;
      case Interval.MinorSeventh:
        noteSteps = 6;
        semitones = 10;
        break;
      case Interval.MajorSeventh:
        noteSteps = 6;
        semitones = 11;
        break;
    }

    let nextNote = Note.from(this.name, this.modifier);
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
    switch (this.name) {
      case NoteName.A:
        return Note.from(NoteName.B);
      case NoteName.B:
        return Note.from(NoteName.C);
      case NoteName.C:
        return Note.from(NoteName.D);
      case NoteName.D:
        return Note.from(NoteName.E);
      case NoteName.E:
        return Note.from(NoteName.F);
      case NoteName.F:
        return Note.from(NoteName.G);
      case NoteName.G:
        return Note.from(NoteName.A);
    }
  }

  public equals(note: Note): boolean {
    return this.name === note.name && this.modifier === note.modifier;
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
