# VisualChord

Music making helper tool that help you learn and compose chord progressions.

![Visual Chord](https://github.com/YairTavor/VisualChord/raw/master/visual-chord.png "Visual Chord")

## installation

Pull the repo or download as a zip file. You will need to have

- NodeJS (version 12 and up)
- Yarn
- Chrome browser (might work on other browsers, but I have not tested it)

Steps to run:

1. In the root of the project, run `yarn` to install dependencies.
2. After this has finished running, run `yarn start` to launch the app.
3. It will start the app at `http://localhost:1234`, so open your browser and go there.

## How to use

VisualChord's main objective is to help you compose chord progressions, but also to learn some music theory on the way.
It is built in a modular way so you can focus on just the things you want to learn or use at the moment.

VisualChord is split into 3 main parts:

1. The Composer (top center)
2. The modules menu (on the left)
3. The Module container (bottom center)

### Composer

##### Getting started

The Composer is where you compose your chord progression. To get started, you will need to click on the blue plus button. This will add a C major chord.

##### Editing

When a chord selected, it will be highlighted in blue. Once selected, you will see the chord editor below. This will allow you to modify the chord however you like. Use the dropdowns to modify the chord's root, quality, extension and bass note.

##### Quick Add

A faster way to add chords is by using the `Quick Add` textbox. You can type any chord in there, for example C#m7, and press `Enter`. The chord will be added to the chord progression. If you mess up, VisualChord will try to find the closes chord available and use that instead, if it can.

##### Ordering

You can drag and drop chords to reorder them.

##### Deleting

If you want to delete a chord, drag it to the trash icon on the right. To clear all the chords at once, click on `clear all` button under the trash icon.

### Modules Menu

This menu lists available modules. To use a module, drag and drop it into the Module container.
Note that you can only drag one instance of each module.

### Module container

The module container is where you can add modules that connects with the Composer and enhance it.

When you drag a module from the menu, you will see the module menu and the module content.

##### Close and collapse

You can use the module menu buttons (top right of the module) to close (`x`) or collapse (`^`) the module. If you close it, you can always get it back by dragging it from the menu.

##### Ordering

Use drag and drop to reorder the modules within the Module container.

## Available modules

### Player

// TODO

### Keys & Scales

Keys & Scales is made to allow you to explore different keys and learn how they are built.

You can set the root and the scale by using the dropdown buttons on the top, and then see all the chords and notes in that key.

To add a chord into the Composer, just click on it.

### Chord Visualization

The Chord Visualization module will show you how to play the selected chord in the Composer on a piano. For this to work, you need to select one of the chord in the Composer by clicking on it.

### Library

The Library module allows you to save chord progressions to your browser's local storage.

Initially, you will have no saved files. Once you saved at least one file, you will see a list of all files in the bottom part of the module.

##### Save a new file

To save a new file, specify the file name, description (optional) and click the `Save as new` button.

##### Overriding files

To override an existing file, load the file, optionally modify the file name, description and chord progression in the Composer, and click the `Save` button.

##### Loading files

To load a file, click on it from the file list.

###### Deleting files

In the file list, click on the `Delete` action for the file you wish to delete.

##### IMPORTANT NOTE

If you clear your browser's cache, all files will be permanently lost.

## Adding new modules

Modules are just VUE components that run inside a special container called Module, that handles the drag and drop, collapsing and error handling in a generic way.
To add a new module, simply create a new VUE file under src/modules.
Make sure your module object (vue script) exposes a `displayName` property, as this will be used in the menu and container title of the module.
A script will read this folder every time you run `yarn start` and add it to the `modules-map.js` file.
