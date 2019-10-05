import { Note } from '../note/note';
import { Mode, ModeIntervals } from './mode';

// will not change any time soon
const NOTE_COUNT = 12;

export class Scale {
  private notes: Note[] = [];
  private intervals: number[];

  private constructor(base: Note, mode: Mode) {
    this.intervals = ModeIntervals[mode];
    this.notes.push(base);

    for (let i = 0; i < this.intervals.length; i++) {
      const prevNote = this.notes[this.notes.length - 1];
      const nextNoteCandidate = prevNote.toNext();

      const nextInterval = this.intervals[i];

      const prevPosition = prevNote.getPosition();
      const nextPosition = (prevPosition + nextInterval) % NOTE_COUNT;
      const nextPositionCandidate = nextNoteCandidate.getPosition();

      if (nextPositionCandidate === nextPosition) {
        this.notes.push(nextNoteCandidate);
      } else if ((nextPositionCandidate + 1) % NOTE_COUNT === nextPosition) {
        this.notes.push(nextNoteCandidate.toSharp());
      } else if ((nextPositionCandidate + 2) % NOTE_COUNT === nextPosition) {
        this.notes.push(nextNoteCandidate.toDoubleSharp());
      } else if (
        (((nextPositionCandidate - 1) % NOTE_COUNT) + NOTE_COUNT) %
          NOTE_COUNT ===
        nextPosition
      ) {
        this.notes.push(nextNoteCandidate.toFlat());
      } else if (
        (((nextPositionCandidate - 2) % NOTE_COUNT) + NOTE_COUNT) %
          NOTE_COUNT ===
        nextPosition
      ) {
        this.notes.push(nextNoteCandidate.toDoubleFlat());
      } else {
        throw new Error(`Illegal interval`);
      }
    }
  }

  public static from(base: Note, mode: Mode = Mode.Ionian): Scale {
    return new Scale(base, mode);
  }

  public toString(): string {
    return this.notes.map(note => note.toString()).join('');
  }
}
