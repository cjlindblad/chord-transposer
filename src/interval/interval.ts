export enum Interval {
  Unison = 0,
  MinorSecond = 1,
  MajorSecond = 2,
  MinorThird = 3,
  MajorThird = 4,
  Fourth = 5,
  AugmentedFourth = 6,
  Fifth = 7,
  MinorSixth = 8,
  MajorSixth = 9,
  MinorSeventh = 10,
  MajorSeventh = 11
}

export type Third = Interval.MinorThird | Interval.MajorThird;
