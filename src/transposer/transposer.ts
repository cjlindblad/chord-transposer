import { Chord } from '../chord/chord';
import { Scale } from '../scale/scale';

class Transposer {
  private progression: Chord[];
  private scale: Scale;

  constructor(progression: Chord[], scale: Scale) {
    this.progression = progression;
    this.scale = scale;
  }

  public transpose(toScale: Scale) {
    const positions = this.getBaseNotes().map(baseNote =>
      this.scale.getPositionFromNote(baseNote)
    );

    const transposedBaseNotes = positions.map(position =>
      toScale.getNoteFromPosition(position)
    );

    const transposedChords = transposedBaseNotes.map((baseNote, index) =>
      Chord.from(baseNote, {
        third: this.progression[index].getThird(),
        fifth: this.progression[index].getFifth(),
        seventh: this.progression[index].getSeventh()
      })
    );

    return transposedChords;
  }

  private getBaseNotes() {
    return this.progression.map(chord => chord.getNotes()[0]);
  }
}

export default Transposer;
