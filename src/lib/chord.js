import { roots, qualities, extensions } from "./enums";
import { allNotes } from "./notes";

const getKeyBySign = (sign, collection) => {
  const key = Object.keys(collection).find(
    key => collection[key].sign === sign
  );
  return collection[key];
};

export default class Chord {
  constructor(chord = {}) {
    const {
      root = roots.C,
      quality = qualities.MAJOR,
      extension = extensions.NONE,
      bass = ""
    } = chord;
    Object.assign(this, {
      root,
      quality,
      extension,
      bass
    });
  }

  get name() {
    return (
      this.root.sign +
      this.quality.sign +
      this.extension.sign +
      (this.bass ? `/${this.bass.sign}` : "")
    );
  }

  get notes() {
    let notes;
    const root = this.root.sign;
    const rootIndex = allNotes.indexOf(root);
    const minorSecondIndex = rootIndex + 1;
    const majorSecondIndex = rootIndex + 2;
    const minorThirdIndex = rootIndex + 3;
    const majorThirdIndex = rootIndex + 4;
    const perfectForthIndex = rootIndex + 5;
    const tritoneIndex = rootIndex + 6; // augmented 4th or diminished 5th
    const perfectFifthIndex = rootIndex + 7;
    const minorSixthIndex = rootIndex + 8;
    const majorSixthIndex = rootIndex + 9;
    const minorSeventhIndex = rootIndex + 10;
    const majorSeventhIndex = rootIndex + 11;
    const nineIndex = rootIndex + 12 + 2;
    const elevenIndex = rootIndex + 12 + 5;
    const thirteenIndex = rootIndex + 12 + 9;

    switch (this.quality) {
      case qualities.MAJOR:
        notes = [root, allNotes[majorThirdIndex], allNotes[perfectFifthIndex]];
        break;
      case qualities.MINOR:
        notes = [root, allNotes[minorThirdIndex], allNotes[perfectFifthIndex]];
        break;
      case qualities.DIMINISHED:
        notes = [root, allNotes[minorThirdIndex], allNotes[tritoneIndex]];
        break;
      case qualities.AUGMENTED:
        notes = [root, allNotes[majorThirdIndex], allNotes[minorSixthIndex]];
        break;
      case qualities.SUSPENDED2:
        notes = [root, allNotes[majorSecondIndex], allNotes[perfectFifthIndex]];
        break;
      case qualities.SUSPENDED4:
        notes = [
          root,
          allNotes[perfectForthIndex],
          allNotes[perfectFifthIndex]
        ];
        break;
      case qualities.FIFTH:
        notes = [root, allNotes[perfectFifthIndex]];
        break;
    }

    switch (this.extension) {
      case extensions.SIX:
        notes.push(allNotes[majorSixthIndex]);
        break;
      case extensions.SEVEN:
        notes.push(allNotes[minorSeventhIndex]);
        break;
      case extensions.MAJOR7:
        notes.push(allNotes[majorSeventhIndex]);
        break;
      case extensions.ADD9:
        notes.push(allNotes[nineIndex]);
        break;
      case extensions.NINE:
        notes.push(allNotes[majorSeventhIndex]);
        notes.push(allNotes[nineIndex]);
        break;
      case extensions.ELEVEN:
        notes.push(allNotes[majorSeventhIndex]);
        notes.push(allNotes[elevenIndex]);
        break;
      case extensions.THIRTEEN:
        notes.push(allNotes[majorSeventhIndex]);
        notes.push(allNotes[thirteenIndex]);
        break;
    }

    return notes;
  }

  static parse(chord) {
    const regex = /(^[abcdefg]#?)(m|dim|aug|sus2|sus4|5)?(6|7|maj7|\(9\)|9|11|13)?(\/[abcdefg]#?)?/;
    const matches = chord.match(regex);
    let result = null;
    if (matches) {
      const chord = {
        root: getKeyBySign(matches[1].toUpperCase(), roots),
        quality: getKeyBySign(matches[2], qualities),
        extension: getKeyBySign(matches[3], extensions),
        bass: matches[4]
          ? getKeyBySign(matches[4].toUpperCase().replace("/", ""), roots)
          : ""
      };
      result = new Chord(chord);
    }
    return result;
  }
}
