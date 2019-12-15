# VisualChord

![Visual Chord](https://github.com/YairTavor/VisualChord/raw/master/visual-chord.png "Visual Chord")
Music making helper tool that help you learn and compose chord progressions.

## How to use

// TODO

## Available modules

### Player

### Keys & Scales

### Chord Visualization

### Library

## Adding new modules

Modules are just VUE components that run inside a special container called Module, that handles the drag and drop, collapsing and error handling in a generic way.
To add a new module, simply create a new VUE file under src/modules.
Make sure your module object (vue script) exposes a `displayName` property, as this will be used in the menu and container title of the module.
A script will read this folder every time you run `yarn start` and add it to the `modules-map.js` file.
