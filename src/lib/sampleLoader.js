import { Howl } from "howler";

const fileSource = "/samples/";
const samplesCache = {};

export const getSample = sampleKey => {
  return new Promise(resolve => {
    if (samplesCache[sampleKey]) {
      resolve(samplesCache[sampleKey]);
    } else {
      const { filePath, pitch } = sampleFileMap[sampleKey];
      const sample = new Howl({
        src: [filePath]
      });
      sample.rate(pitch);
      samplesCache[sampleKey] = sample;
      resolve(sample);
    }
  });
};

// prettier-ignore
const sampleFileMap = {
  'C3':  { pitch: 0.95, filePath: fileSource + 'c-3.wav'},
  'C#3': { pitch: 1, filePath: fileSource + 'c-3.wav'},
  'D3':  { pitch: 1.07, filePath: fileSource + 'c-3.wav'},
  'D#3': { pitch: 1.13, filePath: fileSource + 'c-3.wav'},
  'E3':  { pitch: 0.95, filePath: fileSource + 'e-3.wav'},
  'F3':  { pitch: 1, filePath: fileSource + 'e-3.wav'},
  'F#3': { pitch: 1.05, filePath: fileSource + 'e-3.wav'},
  'G3':  { pitch: 1.12, filePath: fileSource + 'e-3.wav'},
  'G#3': { pitch: 1.18, filePath: fileSource + 'e-3.wav'},
  'A3':  { pitch: 1, filePath: fileSource + 'a-3.wav'},
  'A#3': { pitch: 1.06, filePath: fileSource + 'a-3.wav'},
  'B3':  { pitch: 1.12, filePath: fileSource + 'a-3.wav'},
 
  'C4':  { pitch: 0.95, filePath: fileSource + 'c-4.wav'},
  'C#4': { pitch: 1, filePath: fileSource + 'c-4.wav'},
  'D4':  { pitch: 1.07, filePath: fileSource + 'c-4.wav'},
  'D#4': { pitch: 1.13, filePath: fileSource + 'c-4.wav'},
  'E4':  { pitch: 0.95, filePath: fileSource + 'e-4.wav'},
  'F4':  { pitch: 1, filePath: fileSource + 'e-4.wav'},
  'F#4': { pitch: 1.05, filePath: fileSource + 'e-4.wav'},
  'G4':  { pitch: 1.12, filePath: fileSource + 'e-4.wav'},
  'G#4': { pitch: 1.18, filePath: fileSource + 'e-4.wav'},
  'A4':  { pitch: 1, filePath: fileSource + 'a-4.wav'},
  'A#4': { pitch: 1.06, filePath: fileSource + 'a-4.wav'},
  'B4':  { pitch: 1.12, filePath: fileSource + 'a-4.wav'},
  
  'C5':  { pitch: 0.95, filePath: fileSource + 'c-5.wav'},
  'C#5': { pitch: 1, filePath: fileSource + 'c-5.wav'},
  'D5':  { pitch: 1.07, filePath: fileSource + 'c-5.wav'},
  'D#5': { pitch: 1.13, filePath: fileSource + 'c-5.wav'},
  'E5':  { pitch: 0.95, filePath: fileSource + 'e-5.wav'},
  'F5':  { pitch: 1, filePath: fileSource + 'e-5.wav'},
  'F#5': { pitch: 1.05, filePath: fileSource + 'e-5.wav'},
  'G5':  { pitch: 1.12, filePath: fileSource + 'e-5.wav'},
  'G#5': { pitch: 1.18, filePath: fileSource + 'e-5.wav'},
  'A5':  { pitch: 1, filePath: fileSource + 'a-5.wav'},
  'A#5': { pitch: 1.06, filePath: fileSource + 'a-5.wav'},
  'B5':  { pitch: 1.12, filePath: fileSource + 'a-5.wav'},
}
