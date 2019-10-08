import { Note } from '../note/note';
import { Interval, Third } from '../interval/interval';

export class Chord {
  private base: Note;
  private third: Third;

  private constructor(base: Note, third: Third) {
    this.base = base;
    this.third = third;
  }

  public static from(base: Note, third: Third = Interval.MajorThird): Chord {
    return new Chord(base, third);
  }

  public toString(): string {
    const chordName = this.base.toString();
    const third = this.third === Interval.MinorThird ? 'm' : '';

    return `${chordName}${third}`;
  }
}
