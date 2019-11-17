import { IChordValuator } from '../chord/IChordValuator';
import { Chord } from '../chord/chord';
import { Scale } from '../scale/scale';
import Transposer from './transposer';
import { NoteName } from '../note/noteName';
import { Note } from '../note/note';

class TransposeSuggestor {
  private chordValuator: IChordValuator;
  private transposer: Transposer;

  // TODO add "all" scales
  private toScales = [
    NoteName.C,
    NoteName.D,
    NoteName.E,
    NoteName.F,
    NoteName.G,
    NoteName.A,
    NoteName.B
  ]
    .map(noteName => Note.from(noteName))
    .map(note => Scale.from(note));

  public constructor(
    chordValuator: IChordValuator,
    progression: Chord[],
    scale: Scale
  ) {
    this.chordValuator = chordValuator;
    this.transposer = new Transposer(progression, scale);
  }

  public rankTranspositions(): { scale: Scale; progression: Chord[] }[] {
    const rankedTranspositions = this.toScales
      .map(scale => ({
        scale,
        progression: this.transposer.transpose(scale),
        value: this.transposer
          .transpose(scale)
          .reduce((acc, cur) => acc + this.chordValuator.getValue(cur), 0)
      }))
      .sort((a, b) => a.value - b.value);

    return rankedTranspositions;
  }
}

export default TransposeSuggestor;
