import { Note } from '../note/note';

// only one scale right now
const MAJOR_INTERVALS = [2, 2, 1, 2, 2, 2];

// will not change any time soon
const NOTE_COUNT = 12;

export class Scale {
  private notes: Note[] = [];

  private constructor(base: Note) {
    this.notes.push(base);

    for (let i = 0; i < MAJOR_INTERVALS.length; i++) {
      const prevNote = this.notes[this.notes.length - 1];
      const nextNoteCandidate = prevNote.toNext();

      const nextInterval = MAJOR_INTERVALS[i];

      const prevPosition = prevNote.getPosition();
      const nextPosition = (prevPosition + nextInterval) % NOTE_COUNT;
      const nextPositionCandidate = nextNoteCandidate.getPosition();

      if (nextPositionCandidate === nextPosition) {
        this.notes.push(nextNoteCandidate);
      } else if ((nextPositionCandidate + 1) % NOTE_COUNT === nextPosition) {
        this.notes.push(nextNoteCandidate.toSharp());
      } else if (
        (((nextPositionCandidate - 1) % NOTE_COUNT) + NOTE_COUNT) %
          NOTE_COUNT ===
        nextPosition
      ) {
        this.notes.push(nextNoteCandidate.toFlat());
      } else {
        throw new Error(`Illegal interval`);
      }
    }
  }

  public static from(base: Note): Scale {
    return new Scale(base);
  }

  public toString(): string {
    return this.notes.map(note => note.toString()).join('');
  }
}
