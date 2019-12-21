<template>
  <div class="key-finder">
    <div class="key-finder__description">Find all the scales that contains your chords in them</div>
    <div class="key-finder__search">
      <div class="key-finder__search-inputs">
        <div>
          Search type:
          <select v-model="search" class="key-finder__search-type">
            <option :value="strictness.loose">Loose</option>
            <option :value="strictness.tight">Tight</option>
            <option :value="strictness.strict">Strict</option>
          </select>
        </div>
        <div>
          Match all chords?:
          <select v-model="matchAll" class="key-finder__search-type">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          Sort by:
          <select v-model="sort" class="key-finder__search-type">
            <option :value="sorting.matches">{{sorting.matches}}</option>
            <option :value="sorting.scale">{{sorting.scale}}</option>
          </select>
        </div>
      </div>
      <div class="key-finder__search-description">
        <span v-if="search === strictness.loose">Loose - only search by roots</span>
        <span
          v-if="search === strictness.tight"
        >Tight - compare root and quality (major, minor and diminished, all other are considered major), ignoring extensions and bass</span>
        <span v-if="search === strictness.strict">Strict - Exactly match the chords</span>
      </div>
    </div>

    <div class="key-finder__row">
      <div class="key-finder__header">Name</div>
      <div class="key-finder__header">Matches</div>
      <div class="key-finder__header">1</div>
      <div class="key-finder__header">2</div>
      <div class="key-finder__header">3</div>
      <div class="key-finder__header">4</div>
      <div class="key-finder__header">5</div>
      <div class="key-finder__header">6</div>
      <div class="key-finder__header">7</div>
    </div>

    <div class="key-finder__results">
      <div class="key-finder__row" v-for="scale in getScalesWithChords()" :key="scale.id">
        <div class="key-finder__label">{{ scale.id }}</div>
        <div class="key-finder__label">{{ scale.count }}</div>
        <div :class="getChordClassName(chord)" v-for="chord in scale.chords" :key="chord">{{chord}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import scale from "../lib/scale";
import { roots, scales, qualities, scaleTypes } from "../lib/enums";
import { octaveNotes } from "../lib/notes";
import "./key-finder.scss";

const strictness = {
  loose: 1,
  tight: 2,
  strict: 3
};

const sorting = {
  matches: "Matches",
  scale: "Scale"
};
const scalesMatrix = [];
Object.keys(roots).forEach(rootName => {
  Object.keys(scales).forEach(scaleName => {
    const chords = scale.scaleChords(roots[rootName], scales[scaleName]);
    scalesMatrix.push({
      id: `${roots[rootName].sign}  ${scales[scaleName].name}`,
      root: roots[rootName],
      scale: scales[scaleName],
      chordRoots: chords.map(chord =>
        chord.substr(0, chord.includes("#") ? 2 : 1)
      ),
      chords
    });
  });
});

const getTightChordName = chord => {
  const root = chord.root.sign;
  const quality =
    chord.quality === qualities.MINOR || chord.quality === qualities.DIMINISHED
      ? chord.quality.sign
      : "";
  return root + quality;
};

const looseSearch = (scale, chords) => {
  const chordRoots = chords.map(chord => chord.root.sign);
  return chordRoots.reduce((total, root) => {
    return scale.chordRoots.includes(root) ? total + 1 : total;
  }, 0);
};

const tightSearch = (scale, chords) => {
  return chords.reduce((total, chord) => {
    const name = getTightChordName(chord);
    return scale.chords.includes(name) ? total + 1 : total;
  }, 0);
};

const strictSearch = (scale, chords) => {
  return chords.reduce((total, chord) => {
    return scale.chords.includes(chord.name) ? total + 1 : total;
  }, 0);
};

const sortTypes = {
  [sorting.matches]: (scaleA, scaleB) => {
    if (scaleA.count < scaleB.count) {
      return 1;
    }
    if (scaleA.count > scaleB.count) {
      return -1;
    }
    return 0;
  },
  [sorting.scale]: (scaleA, scaleB) => {
    const scaleARootIndex = octaveNotes.indexOf(scaleA.root.sign);
    const scaleBRootIndex = octaveNotes.indexOf(scaleB.root.sign);
    if (scaleARootIndex > scaleBRootIndex) {
      return 1;
    } else if (scaleARootIndex < scaleBRootIndex) {
      return -1;
    } else {
      const scaleANameIndex = scaleTypes.indexOf(
        scaleA.scale.name.toLowerCase()
      );
      const scaleBNameIndex = scaleTypes.indexOf(
        scaleB.scale.name.toLowerCase()
      );
      if (scaleANameIndex > scaleBNameIndex) {
        return 1;
      } else if (scaleANameIndex < scaleBNameIndex) {
        return -1;
      } else {
        return 0;
      }
    }
  }
};

export default {
  displayName: "Key Finder",
  props: ["chords"],
  data() {
    return {
      search: strictness.tight,
      strictness,
      matchAll: "yes",
      sort: sorting.scale,
      sorting
    };
  },
  methods: {
    getScalesWithChords() {
      return scalesMatrix
        .map(scale => {
          switch (this.search) {
            case strictness.tight:
              scale.count = tightSearch(scale, this.chords);
              break;
            case strictness.strict:
              scale.count = strictSearch(scale, this.chords, this.matchAll);
              break;
            case strictness.loose:
            default:
              scale.count = looseSearch(scale, this.chords, this.matchAll);
              break;
          }
          return scale;
        })
        .filter(scale =>
          this.matchAll === "yes"
            ? scale.count === this.chords.length
            : scale.count > 0
        )
        .sort(sortTypes[this.sort]);
    },

    getChordClassName(chord) {
      const className = "key-finder__value";
      const highlightedClassName = "key-finder__value--highlighted";
      switch (this.search) {
        case strictness.tight:
          return this.chords
            .map(composerChord => getTightChordName(composerChord))
            .includes(chord)
            ? highlightedClassName
            : className;
          break;
        case strictness.strict:
          return this.chords
            .map(composerChord => composerChord.name)
            .includes(chord)
            ? highlightedClassName
            : className;
          break;
        case strictness.loose:
        default:
          return this.chords
            .map(composerChord => composerChord.root.sign)
            .includes(chord.substr(0, chord.includes("#") ? 2 : 1))
            ? highlightedClassName
            : className;

          break;
      }
    }
  }
};
</script>