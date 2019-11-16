import { Chord } from './chord';

export interface IChordValuator {
  getValue: (chord: Chord) => number;
}
