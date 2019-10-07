import { Note } from "../note/note";
import { Third, IntervalAlteration } from "../interval/interval";

export class Chord {
  private base: Note;
  private third: Third;

  private constructor(base: Note, third: Third) {
    this.base = base;
    this.third = third;
  }

  public static from(base: Note, third: Third = IntervalAlteration.Major) {
    return new Chord(base, third);
  }

  public toString(): string {
    const chordName = this.base.toString();
    const third = this.third === IntervalAlteration.Minor ? 'm' : '';

    return `${chordName}${third}`;
  }
}