import { Interval } from '../interval/interval';

export enum Mode {
  Ionian,
  Dorian,
  Phrygian,
  Lydian,
  Mixolydian,
  Aeolian,
  Locrian
}

export const ModeIntervals = {
  [Mode.Ionian]: [
    Interval.MajorSecond,
    Interval.MajorSecond,
    Interval.MinorSecond,
    Interval.MajorSecond,
    Interval.MajorSecond,
    Interval.MajorSecond
  ],
  [Mode.Dorian]: [
    Interval.MajorSecond,
    Interval.MinorSecond,
    Interval.MajorSecond,
    Interval.MajorSecond,
    Interval.MajorSecond,
    Interval.MinorSecond
  ],
  [Mode.Phrygian]: [
    Interval.MinorSecond,
    Interval.MajorSecond,
    Interval.MajorSecond,
    Interval.MajorSecond,
    Interval.MinorSecond,
    Interval.MajorSecond
  ],
  [Mode.Lydian]: [
    Interval.MajorSecond,
    Interval.MajorSecond,
    Interval.MajorSecond,
    Interval.MinorSecond,
    Interval.MajorSecond,
    Interval.MajorSecond
  ],
  [Mode.Mixolydian]: [
    Interval.MajorSecond,
    Interval.MajorSecond,
    Interval.MinorSecond,
    Interval.MajorSecond,
    Interval.MajorSecond,
    Interval.MinorSecond
  ],
  [Mode.Aeolian]: [
    Interval.MajorSecond,
    Interval.MinorSecond,
    Interval.MajorSecond,
    Interval.MajorSecond,
    Interval.MinorSecond,
    Interval.MajorSecond
  ],
  [Mode.Locrian]: [
    Interval.MinorSecond,
    Interval.MajorSecond,
    Interval.MajorSecond,
    Interval.MinorSecond,
    Interval.MajorSecond,
    Interval.MajorSecond
  ]
};
