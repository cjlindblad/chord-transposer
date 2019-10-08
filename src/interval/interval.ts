export enum Interval {
  Unison,
  MinorSecond,
  MajorSecond,
  MinorThird,
  MajorThird,
  Fourth,
  AugmentedFourth,
  Fifth,
  MinorSixth,
  MajorSixth,
  MinorSeventh,
  MajorSeventh,
  Octave
}

export type Third = Interval.MinorThird | Interval.MajorThird;
