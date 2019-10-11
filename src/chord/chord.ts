import { Note } from '../note/note';
import { Interval, Third, Fifth } from '../interval/interval';

export class Chord {
  private base: Note;
  private third: Third;
  private fifth: Fifth;

  private constructor(base: Note, third: Third, fifth: Fifth = Interval.Fifth) {
    this.base = base;
    this.third = third;
    this.fifth = fifth;
  }

  public static from(base: Note, third: Third = Interval.MajorThird): Chord {
    return new Chord(base, third);
  }

  public getNotes(): Note[] {
    const notes = [this.base];
    notes.push(this.base.addInterval(this.third));
    notes.push(this.base.addInterval(this.fifth));

    return notes;
  }

  public toString(): string {
    const chordName = this.base.toString();
    const third = this.third === Interval.MinorThird ? 'm' : '';

    return `${chordName}${third}`;
  }
}
