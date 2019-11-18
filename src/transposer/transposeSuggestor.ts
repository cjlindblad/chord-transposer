import { IChordValuator } from '../chord/IChordValuator';
import { Chord } from '../chord/chord';
import { Scale } from '../scale/scale';
import Transposer from './transposer';
import { NoteName } from '../note/noteName';
import { Note } from '../note/note';
import { NoteAlteration } from '../note/noteAlteration';

class TransposeSuggestor {
  private chordValuator: IChordValuator;
  private transposer: Transposer;

  private toScales = [
    Note.from(NoteName.C),
    Note.from(NoteName.C, NoteAlteration.Sharp),
    Note.from(NoteName.D),
    Note.from(NoteName.E, NoteAlteration.Flat),
    Note.from(NoteName.E),
    Note.from(NoteName.F),
    Note.from(NoteName.F, NoteAlteration.Sharp),
    Note.from(NoteName.G),
    Note.from(NoteName.A, NoteAlteration.Flat),
    Note.from(NoteName.A),
    Note.from(NoteName.B, NoteAlteration.Flat),
    Note.from(NoteName.B)
  ].map(note => Scale.from(note));

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
      .map(scale => {
        const progression = this.transposer.transpose(scale);
        return {
          scale,
          progression,
          value: progression.reduce(
            (acc, cur) => acc + this.chordValuator.getValue(cur),
            0
          )
        };
      })
      .sort((a, b) => a.value - b.value);

    return rankedTranspositions;
  }
}

export default TransposeSuggestor;
