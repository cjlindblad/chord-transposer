import { Chord } from './chord/chord';
import ChordParser from './chord/parser';
import PianoChordValuator from './chord/pianoChordValuator';

import { Interval } from './interval/interval';

import { Note } from './note/note';
import { NoteAlteration } from './note/noteAlteration';
import { NoteName } from './note/noteName';
import { Semitone } from './note/semitone';

import { Scale } from './scale/scale';
import { Mode } from './scale/mode';

import Transposer from './transposer/transposer';
import TransposeSuggestor from './transposer/transposeSuggestor';

export default {
  Chord,
  ChordParser,
  PianoChordValuator,
  Interval,
  Note,
  NoteAlteration,
  NoteName,
  Semitone,
  Scale,
  Mode,
  Transposer,
  TransposeSuggestor
};
