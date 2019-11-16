import { IChordValuator } from './IChordValuator';
import { Chord } from './chord';

class PianoChordValuator implements IChordValuator {
  private blackKeySemitones = [1, 3, 6, 8, 10];

  public getValue(chord: Chord) {
    const semiToneValues = chord
      .getNotes()
      .map(note => note.getSemitoneValue());

    // initial strategy: count black keys
    const value = semiToneValues.reduce((acc, semiToneValue) => {
      if (this.blackKeySemitones.indexOf(semiToneValue) !== -1) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return value;
  }
}

export default PianoChordValuator;
