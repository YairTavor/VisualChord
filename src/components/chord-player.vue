<template>
  <div>
    <div v-if="!currentChord.root && !chords.length" class="chord-player">
      Player will become available as soon as you have at least one chord
      selected in the composer
    </div>
    <div v-else class="chord-player">
      <button class="chord-player__button" @click="playSequence">
        <font-awesome-icon
          icon="retweet"
          class="chord-player__icon"
        ></font-awesome-icon>
        Loop
      </button>
      <button class="chord-player__button" @click="play">
        <font-awesome-icon
          icon="play"
          class="chord-player__icon"
        ></font-awesome-icon>
        Play
      </button>
      <button class="chord-player__button" @click="stop">
        <font-awesome-icon
          icon="stop"
          class="chord-player__icon"
        ></font-awesome-icon>
        Stop
      </button>

      <button
        :class="`chord-player__metronome${metronomeOn ? '--on' : '--off'}`"
        @click="toggleMetronome"
      >
        Metronome
      </button>

      <div>
        <vue-slider
          v-model="metronome.speed"
          :min="300"
          :max="2000"
          :interval="100"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getSample } from "../lib/sampleLoader";
import metronome from "../lib/metronom";
import octave from "../lib/octave";
import "./chord-player.scss";

export default {
  props: ["chords", "currentChord", "next"],
  data() {
    return {
      playing: true,
      metronomeOn: metronome.playing,
      metronome
    };
  },
  methods: {
    playSequence() {
      this.playing = true;
      const loop = () => {
        this.play();
        this.next();
        setTimeout(() => {
          if (this.playing) {
            loop();
          }
        }, metronome.speed);
      };

      loop();
    },
    play() {
      const notes = octave(this.currentChord);
      Promise.all(notes.map(note => getSample(note))).then(samples =>
        samples.forEach(sample => sample.play())
      );
    },
    stop() {
      this.playing = false;
    },

    toggleMetronome() {
      if (metronome.playing) {
        metronome.stop();
        this.metronomeOn = false;
      } else {
        metronome.start();
        this.metronomeOn = true;
      }
    }
  }
};
</script>
