import { Note } from '../note/note';
import { Mode, ModeIntervals } from './mode';

export class Scale {
  private notes: Note[] = [];
  private mode: Mode;

  private constructor(base: Note, mode: Mode) {
    this.mode = mode;

    const intervals = ModeIntervals[mode];
    this.notes.push(base);

    intervals.forEach((interval) => {
      const prevNote = this.notes[this.notes.length - 1];
      this.notes.push(prevNote.addInterval(interval));
    });
  }

  public static from(base: Note, mode: Mode = Mode.Ionian) {
    return new Scale(base, mode);
  }

  public getNoteFromPosition(position: number) {
    if (position < 1 || position > this.notes.length) {
      throw new Error(`Invalid position (${position})`);
    }

    return this.notes[position - 1];
  }

  public getPositionFromNote(fromNote: Note) {
    for (let i = 0; i < this.notes.length; i++) {
      const note = this.notes[i];

      if (note.equals(fromNote)) {
        const position = i + 1;
        return position;
      }
    }

    // throw if we couldn't find note
    throw new Error(`Couldn't find note (${fromNote.toString()})`);
  }

  public get name() {
    let result = this.notes[0].toString();

    if (this.mode === Mode.Aeolian) {
      result += 'm';
    }

    return result;
  }

  public toString() {
    return this.notes.map((note) => note.toString()).join('');
  }
}
