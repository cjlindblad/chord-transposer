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
  [Mode.Ionian]: [2, 2, 1, 2, 2, 2],
  [Mode.Dorian]: [2, 1, 2, 2, 2, 1],
  [Mode.Phrygian]: [1, 2, 2, 2, 1, 2],
  [Mode.Lydian]: [2, 2, 2, 1, 2, 2],
  [Mode.Mixolydian]: [2, 2, 1, 2, 2, 1],
  [Mode.Aeolian]: [2, 1, 2, 2, 1, 2],
  [Mode.Locrian]: [1, 2, 2, 1, 2, 2]
};
