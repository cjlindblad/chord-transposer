import ChordParser from "./parser";
import { Chord } from "./chord";

const notesString = (chord: Chord): string =>
  chord
    .getNotes()
    .map(note => note.toString())
    .join("");

describe("chord parser", () => {
  describe("invalid input", () => {
    it("throws when parsing empty string", () => {
      const input = "";

      expect(() => ChordParser.parse(input)).toThrow();
    });

    it("throws when parsing string starting with non note character", () => {
      const input = "X";

      expect(() => ChordParser.parse(input)).toThrow();
    });

    it("throws on invalid second character", () => {
      const input = "C!";

      expect(() => ChordParser.parse(input)).toThrow();
    });

    it("throws on minor third character before alteration", () => {
      const input = "Cm#";

      expect(() => ChordParser.parse(input)).toThrow();
    });

    it("throws on seventh character before minor third character", () => {
      const input = "C7m";

      expect(() => ChordParser.parse(input)).toThrow();
    });
  });

  describe("single character chords", () => {
    it("parses a c major chord", () => {
      const input = "C";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("CEG");
    });

    it("parses a b major chord", () => {
      const input = "B";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("BD#F#");
    });
  });

  describe("minor chords", () => {
    it("parses a c minor chord", () => {
      const input = "Cm";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("CEbG");
    });
  });

  describe("chords with alteration characters", () => {
    it("parses a c# major chord", () => {
      const input = "C#";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("C#E#G#");
    });

    it("parses a g# major chord", () => {
      const input = "G#";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("G#B#D#");
    });

    it("parses a Cb major chord", () => {
      const input = "Cb";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("CbEbGb");
    });

    it("parses Fb major chord", () => {
      const input = "Fb";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("FbAbCb");
    });

    it("parses a C# minor chord", () => {
      const input = "C#m";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("C#EG#");
    });

    it("parses a Cb minor chord", () => {
      const input = "Cbm";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("CbEbbGb");
    });
  });

  describe("minor 7th chords", () => {
    it("parses G7 chord", () => {
      const input = "G7";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("GBDF");
    });

    it("parses F#7 chord", () => {
      const input = "F#7";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("F#A#C#E");
    });

    it("parses Am7 chord", () => {
      const input = "Am7";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("ACEG");
    });

    it("parses Cm7 chord", () => {
      const input = "Cm7";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("CEbGBb");
    });
  });

  describe("major 7th chords", () => {
    it("parses Cmaj7 chord", () => {
      const input = "Cmaj7";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("CEGB");
    });

    it("parses Ebmaj7 chord", () => {
      const input = "Ebmaj7";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("EbGBbD");
    });

    it("parses Cmmaj7", () => {
      const input = "Cmmaj7";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("CEbGB");
    });

    it("parses Bmmaj7", () => {
      const input = "Bmmaj7";

      const chord = ChordParser.parse(input);

      expect(notesString(chord)).toEqual("BDF#A#");
    });
  });
});
