import { getSample } from "./sampleLoader";

let isPlaying = false;
let speed = 100;
let metronomeSample;

getSample("metronome").then(sample => {
  metronomeSample = sample;
});

const loop = () => {
  setTimeout(() => {
    if (metronomeSample && isPlaying) {
      metronomeSample.play();
      loop();
    }
  }, Math.round(60000 / speed));
};

export default {
  get playing() {
    return isPlaying;
  },

  get speed() {
    return speed;
  },

  set speed(newSpeed) {
    speed = newSpeed;
  },

  start() {
    isPlaying = true;
    loop();
  },

  stop() {
    isPlaying = false;
  }
};
