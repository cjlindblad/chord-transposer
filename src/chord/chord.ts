import { Note } from '../note/note';
import { Interval, Third, Fifth, Seventh } from '../interval/interval';

export interface ChordIntervals {
  third: Third;
  fifth?: Fifth;
  seventh?: Seventh;
}

const defaultIntervals: ChordIntervals = {
  third: Interval.MajorThird,
  fifth: Interval.Fifth,
};

export class Chord {
  private base: Note;
  private third: Third;
  private fifth: Fifth;
  private seventh?: Seventh;

  private constructor(
    base: Note,
    third: Third,
    fifth: Fifth,
    seventh: Seventh | undefined
  ) {
    this.base = base;
    this.third = third;
    this.fifth = fifth;
    this.seventh = seventh;
  }

  public static from(
    base: Note,
    intervals: ChordIntervals = defaultIntervals
  ): Chord {
    // set default values
    intervals.third = intervals.third || Interval.MajorThird;
    intervals.fifth = intervals.fifth || Interval.Fifth;

    return new Chord(base, intervals.third, intervals.fifth, intervals.seventh);
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
