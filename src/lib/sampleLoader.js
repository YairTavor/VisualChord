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
  'c3':  { pitch: 0.95, filePath: fileSource + 'c-3.wav'},
  'c#3': { pitch: 1, filePath: fileSource + 'c-3.wav'},
  'd3':  { pitch: 1.07, filePath: fileSource + 'c-3.wav'},
  'd#3': { pitch: 1.13, filePath: fileSource + 'c-3.wav'},
  'e3':  { pitch: 0.95, filePath: fileSource + 'e-3.wav'},
  'f3':  { pitch: 1, filePath: fileSource + 'e-3.wav'},
  'f#3': { pitch: 1.05, filePath: fileSource + 'e-3.wav'},
  'g3':  { pitch: 1.12, filePath: fileSource + 'e-3.wav'},
  'g#3': { pitch: 1.18, filePath: fileSource + 'e-3.wav'},
  'a3':  { pitch: 1, filePath: fileSource + 'a-3.wav'},
  'a#3': { pitch: 1.06, filePath: fileSource + 'a-3.wav'},
  'b3':  { pitch: 1.12, filePath: fileSource + 'a-3.wav'},
 
  'c4':  { pitch: 0.95, filePath: fileSource + 'c-4.wav'},
  'c#4': { pitch: 1, filePath: fileSource + 'c-4.wav'},
  'd4':  { pitch: 1.07, filePath: fileSource + 'c-4.wav'},
  'd#4': { pitch: 1.13, filePath: fileSource + 'c-4.wav'},
  'e4':  { pitch: 0.95, filePath: fileSource + 'e-4.wav'},
  'f4':  { pitch: 1, filePath: fileSource + 'e-4.wav'},
  'f#4': { pitch: 1.05, filePath: fileSource + 'e-4.wav'},
  'g4':  { pitch: 1.12, filePath: fileSource + 'e-4.wav'},
  'g#4': { pitch: 1.18, filePath: fileSource + 'e-4.wav'},
  'a4':  { pitch: 1, filePath: fileSource + 'a-4.wav'},
  'a#4': { pitch: 1.06, filePath: fileSource + 'a-4.wav'},
  'b4':  { pitch: 1.12, filePath: fileSource + 'a-4.wav'},
  
  'c5':  { pitch: 0.95, filePath: fileSource + 'c-5.wav'},
  'c#5': { pitch: 1, filePath: fileSource + 'c-5.wav'},
  'd5':  { pitch: 1.07, filePath: fileSource + 'c-5.wav'},
  'd#5': { pitch: 1.13, filePath: fileSource + 'c-5.wav'},
  'e5':  { pitch: 0.95, filePath: fileSource + 'e-5.wav'},
  'f5':  { pitch: 1, filePath: fileSource + 'e-5.wav'},
  'f#5': { pitch: 1.05, filePath: fileSource + 'e-5.wav'},
  'g5':  { pitch: 1.12, filePath: fileSource + 'e-5.wav'},
  'g#5': { pitch: 1.18, filePath: fileSource + 'e-5.wav'},
  'a5':  { pitch: 1, filePath: fileSource + 'a-5.wav'},
  'a#5': { pitch: 1.06, filePath: fileSource + 'a-5.wav'},
  'b5':  { pitch: 1.12, filePath: fileSource + 'a-5.wav'},
}
