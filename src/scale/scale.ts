import { Note } from '../note/note';
import { Mode, ModeIntervals } from './mode';

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

      const prevSemitone = prevNote.getSemitoneValue();
      const nextSemitone = (prevSemitone + nextInterval) % Note.Count;
      const nextSemitoneCandidate = nextNoteCandidate.getSemitoneValue();

      if (nextSemitoneCandidate === nextSemitone) {
        this.notes.push(nextNoteCandidate);
      } else if ((nextSemitoneCandidate + 1) % Note.Count === nextSemitone) {
        this.notes.push(nextNoteCandidate.toSharp());
      } else if ((nextSemitoneCandidate + 2) % Note.Count === nextSemitone) {
        this.notes.push(nextNoteCandidate.toDoubleSharp());
      } else if (
        (((nextSemitoneCandidate - 1) % Note.Count) + Note.Count) %
          Note.Count ===
        nextSemitone
      ) {
        this.notes.push(nextNoteCandidate.toFlat());
      } else if (
        (((nextSemitoneCandidate - 2) % Note.Count) + Note.Count) %
          Note.Count ===
        nextSemitone
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
