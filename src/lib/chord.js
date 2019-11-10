import { roots, qualities, extensions } from "./enums";

const getKeyBySign = (sign, collection) => {
  const key = Object.keys(collection).find(
    key => collection[key].sign === sign
  );
  return collection[key];
};

export default class Chord {
  constructor(chord = {}) {
    const {
      root = roots.A,
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

  static parse(chord) {
    const regex = /(^[abcdefg]#?)(m|dim|aug|sus2|sus4|5)?(6|7|maj7|\(9\)|9|11|13)?(\/[abcdefg]#?)?/;
    const matches = chord.match(regex);
    let result = null;
    if (matches) {
      const chord = {
        root: getKeyBySign(matches[1].toUpperCase().replace("#", "♯"), roots),
        quality: getKeyBySign(matches[2], qualities),
        extension: getKeyBySign(matches[3], extensions),
        bass: matches[4]
          ? getKeyBySign(matches[4].toUpperCase().replace("#", "♯"), roots)
          : ""
      };
      console.log(chord);
      result = new Chord(chord);
      console.log(result);
    }
    return result;
  }
}
