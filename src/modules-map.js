import pianoChord from "./components/piano-chord";
import keyView from "./components/key-view";
import player from "./components/chord-player";

// Register all modules here
export default {
  "piano-chord": pianoChord,
  "key-view": keyView,
  "chord-player": player
};

// expose modules in the menu. name must match the registered module name
export const menuItems = [
  { name: "key-view", displayName: "Key View" },
  { name: "chord-player", displayName: "Chord Player" },
  { name: "piano-chord", displayName: "Piano Chord" }
];
