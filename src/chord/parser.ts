import { Chord } from './chord';
import { Note } from '../note/note';
import { NoteName } from '../note/noteName';
import { NoteAlteration } from '../note/noteAlteration';
import { Third, Interval, Seventh } from '../interval/interval';

class ChordParser {
  // we have an issue with separating the flat symbol ('b')
  // and the lower case note name
  public static parse(input: string): Chord {
    enum Token {
      Note,
      Alteration,
      MinorThird,
      MajorSeventh,
      MinorSeventh
    }
    interface Lexeme {
      token: Token;
      value?: string;
    }

    class Lexemes {
      private lexemes: Lexeme[];
      private currentIndex: number;

      constructor(lexemes: Lexeme[]) {
        this.lexemes = lexemes;
        this.currentIndex = -1;
      }

      public getNext(): Lexeme {
        if (this.currentIndex >= this.lexemes.length - 1) {
          throw new Error('No more lexemes');
        }
        return this.lexemes[++this.currentIndex];
      }

      public hasNext(): boolean {
        return this.currentIndex < this.lexemes.length - 1;
      }
    }

    const _lexemes: Lexeme[] = [];

    const NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (NOTES.indexOf(char) !== -1) {
        _lexemes.push({
          token: Token.Note,
          value: char
        });
        continue;
      }

      if (i + 4 <= input.length && input.substring(i, i + 4) === 'maj7') {
        _lexemes.push({
          token: Token.MajorSeventh
        });
        i += 3;
        continue;
      }

      if (char === '7') {
        _lexemes.push({
          token: Token.MinorSeventh
        });
        continue;
      }

      if (char === 'm') {
        _lexemes.push({
          token: Token.MinorThird
        });
        continue;
      }

      if (char === '#' || char === 'b') {
        _lexemes.push({
          token: Token.Alteration,
          value: char
        });
        continue;
      }

      throw new Error(`Unexpected character - ${char})`);
    }

    const lexemes = new Lexemes(_lexemes);

    let alteration: NoteAlteration | undefined = undefined;
    let third: Third = Interval.MajorThird;
    let seventh: Seventh | undefined = undefined;

    type Notes = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

    let currentLexeme: Lexeme;
    currentLexeme = lexemes.getNext();

    if (currentLexeme.token !== Token.Note) {
      throw new Error('Expected note');
    }

    const baseNote = NoteName[currentLexeme.value!.toUpperCase() as Notes];

    if (lexemes.hasNext()) {
      currentLexeme = lexemes.getNext();

      if (currentLexeme.token === Token.Alteration) {
        if (currentLexeme.value === '#') {
          alteration = NoteAlteration.Sharp;
        }
        if (currentLexeme.value === 'b') {
          alteration = NoteAlteration.Flat;
        }

        if (lexemes.hasNext()) {
          currentLexeme = lexemes.getNext();
        }
      }

      if (currentLexeme.token === Token.MinorThird) {
        third = Interval.MinorThird;

        if (lexemes.hasNext()) {
          currentLexeme = lexemes.getNext();
        }
      }

      if (
        currentLexeme.token === Token.MajorSeventh ||
        currentLexeme.token === Token.MinorSeventh
      ) {
        if (currentLexeme.token === Token.MajorSeventh) {
          seventh = Interval.MajorSeventh;
        }
        if (currentLexeme.token === Token.MinorSeventh) {
          seventh = Interval.MinorSeventh;
        }
        if (lexemes.hasNext()) {
          currentLexeme = lexemes.getNext();
        }
      }
    }

    const note =
      alteration !== undefined
        ? Note.from(baseNote, alteration)
        : Note.from(baseNote);

    return seventh !== undefined
      ? Chord.from(note, { third, seventh })
      : Chord.from(note, { third });
  }
}

export default ChordParser;
