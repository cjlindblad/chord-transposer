import { Note } from '../note/note';
import { Mode, ModeIntervals } from './mode';
import { Chord } from '../api';
import { Third, Fifth, Seventh } from '../interval/interval';

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

  public triads() {
    const triads: Chord[] = [];

    for (let i = 0; i < this.notes.length; i++) {
      const baseNote = this.notes[i];
      const third = this.notes[(i + 2) % this.notes.length];
      const fifth = this.notes[(i + 4) % this.notes.length];
      const seventh = this.notes[(i + 6) % this.notes.length];

      const thirdInterval = baseNote.intervalTo(third);
      const fifthInterval = baseNote.intervalTo(fifth);
      const seventhInterval = baseNote.intervalTo(seventh);

      const chord = Chord.from(baseNote, {
        third: thirdInterval as Third,
        fifth: fifthInterval as Fifth,
        seventh: seventhInterval as Seventh,
      });
      triads.push(chord);
    }

    return triads;
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
