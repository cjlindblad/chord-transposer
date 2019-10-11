import { Note } from '../note/note';
import { Mode, ModeIntervals } from './mode';
import { Interval } from '../interval/interval';

export class Scale {
  private notes: Note[] = [];
  private intervals: Interval[];

  private constructor(base: Note, mode: Mode) {
    this.intervals = ModeIntervals[mode];
    this.notes.push(base);

    this.intervals.forEach(interval => {
      const prevNote = this.notes[this.notes.length - 1];
      this.notes.push(prevNote.addInterval(interval));
    });
  }

  public static from(base: Note, mode: Mode = Mode.Ionian): Scale {
    return new Scale(base, mode);
  }

  public toString(): string {
    return this.notes.map(note => note.toString()).join('');
  }
}
