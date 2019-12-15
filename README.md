# VisualChord

Music making helper tool

## Adding new modules

Add a new VUE file under src/modules.
A script will read this folder every time you run `yarn start` and add it to the `modules-map.js` file.
Make sure your module object (vue script) exposes a `displayName` property, as this will be used in the menu and container title of the module.
