import { roots, qualities, extensions } from "./enums";

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
}
