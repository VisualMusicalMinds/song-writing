// ===== AUDIO CONTEXT =====
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// ===== COLOR SYSTEM =====
const noteColorsByKey = {
  'C': { 'Do': '#FF3B30', 'Re': '#FF9500', 'Mi': '#FFCC00', 'Fa': '#34C759', 'So': '#5af5fa', 'La': '#007AFF', 'Ti': '#AF52DE' },
  'Db': { 'Do': '#FF9500', 'Re': '#FFCC00', 'Mi': '#34C759', 'Fa': '#5af5fa', 'So': '#007AFF', 'La': '#AF52DE', 'Ti': '#FF3B30' },
  'D': { 'Do': '#FF9500', 'Re': '#FFCC00', 'Mi': '#34C759', 'Fa': '#5af5fa', 'So': '#007AFF', 'La': '#AF52DE', 'Ti': '#FF3B30' },
  'Eb': { 'Do': '#FFCC00', 'Re': '#34C759', 'Mi': '#5af5fa', 'Fa': '#007AFF', 'So': '#AF52DE', 'La': '#FF3B30', 'Ti': '#FF9500' },
  'E': { 'Do': '#FFCC00', 'Re': '#34C759', 'Mi': '#5af5fa', 'Fa': '#007AFF', 'So': '#AF52DE', 'La': '#FF3B30', 'Ti': '#FF9500' },
  'F': { 'Do': '#34C759', 'Re': '#5af5fa', 'Mi': '#007AFF', 'Fa': '#AF52DE', 'So': '#FF3B30', 'La': '#FF9500', 'Ti': '#FFCC00' },
  'Gb': { 'Do': '#5af5fa', 'Re': '#007AFF', 'Mi': '#AF52DE', 'Fa': '#FF3B30', 'So': '#FF9500', 'La': '#FFCC00', 'Ti': '#34C759' },
  'G': { 'Do': '#5af5fa', 'Re': '#007AFF', 'Mi': '#AF52DE', 'Fa': '#FF3B30', 'So': '#FF9500', 'La': '#FFCC00', 'Ti': '#34C759' },
  'Ab': { 'Do': '#007AFF', 'Re': '#AF52DE', 'Mi': '#FF3B30', 'Fa': '#FF9500', 'So': '#FFCC00', 'La': '#34C759', 'Ti': '#5af5fa' },
  'A': { 'Do': '#007AFF', 'Re': '#AF52DE', 'Mi': '#FF3B30', 'Fa': '#FF9500', 'So': '#FFCC00', 'La': '#34C759', 'Ti': '#5af5fa' },
  'Bb': { 'Do': '#AF52DE', 'Re': '#FF3B30', 'Mi': '#FF9500', 'Fa': '#FFCC00', 'So': '#34C759', 'La': '#5af5fa', 'Ti': '#007AFF' },
  'B': { 'Do': '#AF52DE', 'Re': '#FF3B30', 'Mi': '#FF9500', 'Fa': '#FFCC00', 'So': '#34C759', 'La': '#5af5fa', 'Ti': '#007AFF' }
};

const letterNamesByKey = {
  'C': { 'Do': 'C', 'Re': 'D', 'Mi': 'E', 'Fa': 'F', 'So': 'G', 'La': 'A', 'Ti': 'B' },
  'Db': { 'Do': 'Db', 'Re': 'Eb', 'Mi': 'F', 'Fa': 'Gb', 'So': 'Ab', 'La': 'Bb', 'Ti': 'C' },
  'D': { 'Do': 'D', 'Re': 'E', 'Mi': 'F#', 'Fa': 'G', 'So': 'A', 'La': 'B', 'Ti': 'C#' },
  'Eb': { 'Do': 'Eb', 'Re': 'F', 'Mi': 'G', 'Fa': 'Ab', 'So': 'Bb', 'La': 'C', 'Ti': 'D' },
  'E': { 'Do': 'E', 'Re': 'F#', 'Mi': 'G#', 'Fa': 'A', 'So': 'B', 'La': 'C#', 'Ti': 'D#' },
  'F': { 'Do': 'F', 'Re': 'G', 'Mi': 'A', 'Fa': 'Bb', 'So': 'C', 'La': 'D', 'Ti': 'E' },
  'Gb': { 'Do': 'Gb', 'Re': 'Ab', 'Mi': 'Bb', 'Fa': 'B', 'So': 'Db', 'La': 'Eb', 'Ti': 'F' },
  'G': { 'Do': 'G', 'Re': 'A', 'Mi': 'B', 'Fa': 'C', 'So': 'D', 'La': 'E', 'Ti': 'F#' },
  'Ab': { 'Do': 'Ab', 'Re': 'Bb', 'Mi': 'C', 'Fa': 'Db', 'So': 'Eb', 'La': 'F', 'Ti': 'G' },
  'A': { 'Do': 'A', 'Re': 'B', 'Mi': 'C#', 'Fa': 'D', 'So': 'E', 'La': 'F#', 'Ti': 'G#' },
  'Bb': { 'Do': 'Bb', 'Re': 'C', 'Mi': 'D', 'Fa': 'Eb', 'So': 'F', 'La': 'G', 'Ti': 'A' },
  'B': { 'Do': 'B', 'Re': 'C#', 'Mi': 'D#', 'Fa': 'E', 'So': 'F#', 'La': 'G#', 'Ti': 'A#' }
};

// ===== MUSICAL DATA =====
let currentKey = 'C';
let showNames = false;
let accidentalMode = 'natural'; // 'flat', 'natural', 'sharp'

// Define frequency maps for each key with correct octaves
const frequencyMapsByKey = {
  'C': {
    'so-low': 196.00,   // G3
    'la-low': 220.00,   // A3
    'ti-low': 246.94,   // B3
    'do': 261.63,       // C4
    're': 293.66,       // D4
    'mi': 329.63,       // E4
    'fa': 349.23,       // F4
    'so': 392.00,       // G4
    'la': 440.00,       // A4
    'ti': 493.88,       // B4
    'do-high': 523.25,  // C5
    're-high': 587.33,  // D5
    'mi-high': 659.25   // E5
  },
  'Db': {
    'so-low': 207.65,   // G#3/Ab3
    'la-low': 233.08,   // A#3/Bb3
    'ti-low': 261.63,   // C4
    'do': 277.18,       // C#4/Db4
    're': 311.13,       // D#4/Eb4
    'mi': 349.23,       // F4
    'fa': 369.99,       // F#4/Gb4
    'so': 415.30,       // G#4/Ab4
    'la': 466.16,       // A#4/Bb4
    'ti': 523.25,       // C5
    'do-high': 554.37,  // C#5/Db5
    're-high': 622.25,  // D#5/Eb5
    'mi-high': 698.46   // F5
  },
  'D': {
    'so-low': 220.00,   // A3
    'la-low': 246.94,   // B3
    'ti-low': 277.18,   // C#4
    'do': 293.66,       // D4
    're': 329.63,       // E4
    'mi': 369.99,       // F#4
    'fa': 392.00,       // G4
    'so': 440.00,       // A4
    'la': 493.88,       // B4
    'ti': 554.37,       // C#5
    'do-high': 587.33,  // D5
    're-high': 659.25,  // E5
    'mi-high': 739.99   // F#5
  },
  'Eb': {
    'so-low': 233.08,   // A#3/Bb3
    'la-low': 261.63,   // C4
    'ti-low': 293.66,   // D4
    'do': 311.13,       // D#4/Eb4
    're': 349.23,       // F4
    'mi': 392.00,       // G4
    'fa': 415.30,       // G#4/Ab4
    'so': 466.16,       // A#4/Bb4
    'la': 523.25,       // C5
    'ti': 587.33,       // D5
    'do-high': 622.25,  // D#5/Eb5
    're-high': 698.46,  // F5
    'mi-high': 783.99   // G5
  },
  'E': {
    'so-low': 246.94,   // B3
    'la-low': 277.18,   // C#4
    'ti-low': 311.13,   // D#4
    'do': 329.63,       // E4
    're': 369.99,       // F#4
    'mi': 415.30,       // G#4
    'fa': 440.00,       // A4
    'so': 493.88,       // B4
    'la': 554.37,       // C#5
    'ti': 622.25,       // D#5
    'do-high': 659.25,  // E5
    're-high': 739.99,  // F#5
    'mi-high': 830.61   // G#5
  },
  'F': {
    'so-low': 261.63,   // C4
    'la-low': 293.66,   // D4
    'ti-low': 329.63,   // E4
    'do': 349.23,       // F4
    're': 392.00,       // G4
    'mi': 440.00,       // A4
    'fa': 466.16,       // A#4/Bb4
    'so': 523.25,       // C5
    'la': 587.33,       // D5
    'ti': 659.25,       // E5
    'do-high': 698.46,  // F5
    're-high': 783.99,  // G5
    'mi-high': 880.00   // A5
  },
  'Gb': {
    'so-low': 277.18,   // C#4/Db4
    'la-low': 311.13,   // D#4/Eb4
    'ti-low': 349.23,   // F4
    'do': 369.99,       // F#4/Gb4
    're': 415.30,       // G#4/Ab4
    'mi': 466.16,       // A#4/Bb4
    'fa': 493.88,       // B4
    'so': 554.37,       // C#5/Db5
    'la': 622.25,       // D#5/Eb5
    'ti': 698.46,       // F5
    'do-high': 739.99,  // F#5/Gb5
    're-high': 830.61,  // G#5/Ab5
    'mi-high': 932.33   // A#5/Bb5
  },
  'G': {
    'so-low': 293.66,   // D4
    'la-low': 329.63,   // E4
    'ti-low': 369.99,   // F#4
    'do': 392.00,       // G4
    're': 440.00,       // A4
    'mi': 493.88,       // B4
    'fa': 523.25,       // C5
    'so': 587.33,       // D5
    'la': 659.25,       // E5
    'ti': 739.99,       // F#5
    'do-high': 783.99,  // G5
    're-high': 880.00,  // A5
    'mi-high': 987.77   // B5
  },
  'Ab': {
    'so-low': 155.56,   // D#3/Eb3
    'la-low': 174.61,   // F3
    'ti-low': 196.00,   // G3
    'do': 207.65,       // G#3/Ab3
    're': 233.08,       // A#3/Bb3
    'mi': 261.63,       // C4
    'fa': 277.18,       // C#4/Db4
    'so': 311.13,       // D#4/Eb4
    'la': 349.23,       // F4
    'ti': 392.00,       // G4
    'do-high': 415.30,  // G#4/Ab4
    're-high': 466.16,  // A#4/Bb4
    'mi-high': 523.25   // C5
  },
  'A': {
    'so-low': 164.81,   // E3
    'la-low': 185.00,   // F#3
    'ti-low': 207.65,   // G#3
    'do': 220.00,       // A3
    're': 246.94,       // B3
    'mi': 277.18,       // C#4
    'fa': 293.66,       // D4
    'so': 329.63,       // E4
    'la': 369.99,       // F#4
    'ti': 415.30,       // G#4
    'do-high': 440.00,  // A4
    're-high': 493.88,  // B4
    'mi-high': 554.37   // C#5
  },
  'Bb': {
    'so-low': 174.61,   // F3
    'la-low': 196.00,   // G3
    'ti-low': 220.00,   // A3
    'do': 233.08,       // A#3/Bb3
    're': 261.63,       // C4
    'mi': 293.66,       // D4
    'fa': 311.13,       // D#4/Eb4
    'so': 349.23,       // F4
    'la': 392.00,       // G4
    'ti': 440.00,       // A4
    'do-high': 466.16,  // A#4/Bb4
    're-high': 523.25,  // C5
    'mi-high': 587.33   // D5
  },
  'B': {
    'so-low': 185.00,   // F#3
    'la-low': 207.65,   // G#3
    'ti-low': 233.08,   // A#3
    'do': 246.94,       // B3
    're': 277.18,       // C#4
    'mi': 311.13,       // D#4
    'fa': 329.63,       // E4
    'so': 369.99,       // F#4
    'la': 415.30,       // G#4
    'ti': 466.16,       // A#4
    'do-high': 493.88,  // B4
    're-high': 554.37,  // C#5
    'mi-high': 622.25   // D#5
  }
};

// Extended chromatic frequency maps for each key (for accidentals)
const chromaticFrequencyMapsByKey = {
  'C': {
    'so-low': 196.00, 'so-low-sharp': 207.65, 'la-low-flat': 207.65, 'la-low': 220.00, 'la-low-sharp': 233.08, 'ti-low-flat': 233.08, 'ti-low': 246.94,
    'do': 261.63, 'do-sharp': 277.18, 're-flat': 277.18, 're': 293.66, 're-sharp': 311.13, 'mi-flat': 311.13, 'mi': 329.63, 'fa': 349.23, 'fa-sharp': 369.99, 'so-flat': 369.99,
    'so': 392.00, 'so-sharp': 415.30, 'la-flat': 415.30, 'la': 440.00, 'la-sharp': 466.16, 'ti-flat': 466.16, 'ti': 493.88,
    'do-high': 523.25, 'do-high-sharp': 554.37, 're-high-flat': 554.37, 're-high': 587.33, 're-high-sharp': 622.25, 'mi-high-flat': 622.25, 'mi-high': 659.25
  },
  'Db': {
    'so-low': 207.65, 'so-low-sharp': 220.00, 'la-low-flat': 220.00, 'la-low': 233.08, 'la-low-sharp': 246.94, 'ti-low-flat': 246.94, 'ti-low': 261.63,
    'do': 277.18, 'do-sharp': 293.66, 're-flat': 293.66, 're': 311.13, 're-sharp': 329.63, 'mi-flat': 329.63, 'mi': 349.23, 'fa': 369.99, 'fa-sharp': 392.00, 'so-flat': 392.00,
    'so': 415.30, 'so-sharp': 440.00, 'la-flat': 440.00, 'la': 466.16, 'la-sharp': 493.88, 'ti-flat': 493.88, 'ti': 523.25,
    'do-high': 554.37, 'do-high-sharp': 587.33, 're-high-flat': 587.33, 're-high': 622.25, 're-high-sharp': 659.25, 'mi-high-flat': 659.25, 'mi-high': 698.46
  },
  'D': {
    'so-low': 220.00, 'so-low-sharp': 233.08, 'la-low-flat': 233.08, 'la-low': 246.94, 'la-low-sharp': 261.63, 'ti-low-flat': 261.63, 'ti-low': 277.18,
    'do': 293.66, 'do-sharp': 311.13, 're-flat': 311.13, 're': 329.63, 're-sharp': 349.23, 'mi-flat': 349.23, 'mi': 369.99, 'fa': 392.00, 'fa-sharp': 415.30, 'so-flat': 415.30,
    'so': 440.00, 'so-sharp': 466.16, 'la-flat': 466.16, 'la': 493.88, 'la-sharp': 523.25, 'ti-flat': 523.25, 'ti': 554.37,
    'do-high': 587.33, 'do-high-sharp': 622.25, 're-high-flat': 622.25, 're-high': 659.25, 're-high-sharp': 698.46, 'mi-high-flat': 698.46, 'mi-high': 739.99
  },
  'Eb': {
    'so-low': 233.08, 'so-low-sharp': 246.94, 'la-low-flat': 246.94, 'la-low': 261.63, 'la-low-sharp': 277.18, 'ti-low-flat': 277.18, 'ti-low': 293.66,
    'do': 311.13, 'do-sharp': 329.63, 're-flat': 329.63, 're': 349.23, 're-sharp': 369.99, 'mi-flat': 369.99, 'mi': 392.00, 'fa': 415.30, 'fa-sharp': 440.00, 'so-flat': 440.00,
    'so': 466.16, 'so-sharp': 493.88, 'la-flat': 493.88, 'la': 523.25, 'la-sharp': 554.37, 'ti-flat': 554.37, 'ti': 587.33,
    'do-high': 622.25, 'do-high-sharp': 659.25, 're-high-flat': 659.25, 're-high': 698.46, 're-high-sharp': 739.99, 'mi-high-flat': 739.99, 'mi-high': 783.99
  },
  'E': {
    'so-low': 246.94, 'so-low-sharp': 261.63, 'la-low-flat': 261.63, 'la-low': 277.18, 'la-low-sharp': 293.66, 'ti-low-flat': 293.66, 'ti-low': 311.13,
    'do': 329.63, 'do-sharp': 349.23, 're-flat': 349.23, 're': 369.99, 're-sharp': 392.00, 'mi-flat': 392.00, 'mi': 415.30, 'fa': 440.00, 'fa-sharp': 466.16, 'so-flat': 466.16,
    'so': 493.88, 'so-sharp': 523.25, 'la-flat': 523.25, 'la': 554.37, 'la-sharp': 587.33, 'ti-flat': 587.33, 'ti': 622.25,
    'do-high': 659.25, 'do-high-sharp': 698.46, 're-high-flat': 698.46, 're-high': 739.99, 're-high-sharp': 783.99, 'mi-high-flat': 783.99, 'mi-high': 830.61
  },
  'F': {
    'so-low': 261.63, 'so-low-sharp': 277.18, 'la-low-flat': 277.18, 'la-low': 293.66, 'la-low-sharp': 311.13, 'ti-low-flat': 311.13, 'ti-low': 329.63,
    'do': 349.23, 'do-sharp': 369.99, 're-flat': 369.99, 're': 392.00, 're-sharp': 415.30, 'mi-flat': 415.30, 'mi': 440.00, 'fa': 466.16, 'fa-sharp': 493.88, 'so-flat': 493.88,
    'so': 523.25, 'so-sharp': 554.37, 'la-flat': 554.37, 'la': 587.33, 'la-sharp': 622.25, 'ti-flat': 622.25, 'ti': 659.25,
    'do-high': 698.46, 'do-high-sharp': 739.99, 're-high-flat': 739.99, 're-high': 783.99, 're-high-sharp': 830.61, 'mi-high-flat': 830.61, 'mi-high': 880.00
  },
  'Gb': {
    'so-low': 277.18, 'so-low-sharp': 293.66, 'la-low-flat': 293.66, 'la-low': 311.13, 'la-low-sharp': 329.63, 'ti-low-flat': 329.63, 'ti-low': 349.23,
    'do': 369.99, 'do-sharp': 392.00, 're-flat': 392.00, 're': 415.30, 're-sharp': 440.00, 'mi-flat': 440.00, 'mi': 466.16, 'fa': 493.88, 'fa-sharp': 523.25, 'so-flat': 523.25,
    'so': 554.37, 'so-sharp': 587.33, 'la-flat': 587.33, 'la': 622.25, 'la-sharp': 659.25, 'ti-flat': 659.25, 'ti': 698.46,
    'do-high': 739.99, 'do-high-sharp': 783.99, 're-high-flat': 783.99, 're-high': 830.61, 're-high-sharp': 880.00, 'mi-high-flat': 880.00, 'mi-high': 932.33
  },
  'G': {
    'so-low': 293.66, 'so-low-sharp': 311.13, 'la-low-flat': 311.13, 'la-low': 329.63, 'la-low-sharp': 349.23, 'ti-low-flat': 349.23, 'ti-low': 369.99,
    'do': 392.00, 'do-sharp': 415.30, 're-flat': 415.30, 're': 440.00, 're-sharp': 466.16, 'mi-flat': 466.16, 'mi': 493.88, 'fa': 523.25, 'fa-sharp': 554.37, 'so-flat': 554.37,
    'so': 587.33, 'so-sharp': 622.25, 'la-flat': 622.25, 'la': 659.25, 'la-sharp': 698.46, 'ti-flat': 698.46, 'ti': 739.99,
    'do-high': 783.99, 'do-high-sharp': 830.61, 're-high-flat': 830.61, 're-high': 880.00, 're-high-sharp': 932.33, 'mi-high-flat': 932.33, 'mi-high': 987.77
  },
  'Ab': {
    'so-low': 155.56, 'so-low-sharp': 164.81, 'la-low-flat': 164.81, 'la-low': 174.61, 'la-low-sharp': 185.00, 'ti-low-flat': 185.00, 'ti-low': 196.00,
    'do': 207.65, 'do-sharp': 220.00, 're-flat': 220.00, 're': 233.08, 're-sharp': 246.94, 'mi-flat': 246.94, 'mi': 261.63, 'fa': 277.18, 'fa-sharp': 293.66, 'so-flat': 293.66,
    'so': 311.13, 'so-sharp': 329.63, 'la-flat': 329.63, 'la': 349.23, 'la-sharp': 369.99, 'ti-flat': 369.99, 'ti': 392.00,
    'do-high': 415.30, 'do-high-sharp': 440.00, 're-high-flat': 440.00, 're-high': 466.16, 're-high-sharp': 493.88, 'mi-high-flat': 493.88, 'mi-high': 523.25
  },
  'A': {
    'so-low': 164.81, 'so-low-sharp': 174.61, 'la-low-flat': 174.61, 'la-low': 185.00, 'la-low-sharp': 196.00, 'ti-low-flat': 196.00, 'ti-low': 207.65,
    'do': 220.00, 'do-sharp': 233.08, 're-flat': 233.08, 're': 246.94, 're-sharp': 261.63, 'mi-flat': 261.63, 'mi': 277.18, 'fa': 293.66, 'fa-sharp': 311.13, 'so-flat': 311.13,
    'so': 329.63, 'so-sharp': 349.23, 'la-flat': 349.23, 'la': 369.99, 'la-sharp': 392.00, 'ti-flat': 392.00, 'ti': 415.30,
    'do-high': 440.00, 'do-high-sharp': 466.16, 're-high-flat': 466.16, 're-high': 493.88, 're-high-sharp': 523.25, 'mi-high-flat': 523.25, 'mi-high': 554.37
  },
  'Bb': {
    'so-low': 174.61, 'so-low-sharp': 185.00, 'la-low-flat': 185.00, 'la-low': 196.00, 'la-low-sharp': 207.65, 'ti-low-flat': 207.65, 'ti-low': 220.00,
    'do': 233.08, 'do-sharp': 246.94, 're-flat': 246.94, 're': 261.63, 're-sharp': 277.18, 'mi-flat': 277.18, 'mi': 293.66, 'fa': 311.13, 'fa-sharp': 329.63, 'so-flat': 329.63,
    'so': 349.23, 'so-sharp': 369.99, 'la-flat': 369.99, 'la': 392.00, 'la-sharp': 415.30, 'ti-flat': 415.30, 'ti': 440.00,
    'do-high': 466.16, 'do-high-sharp': 493.88, 're-high-flat': 493.88, 're-high': 523.25, 're-high-sharp': 554.37, 'mi-high-flat': 554.37, 'mi-high': 587.33
  },
  'B': {
    'so-low': 185.00, 'so-low-sharp': 196.00, 'la-low-flat': 196.00, 'la-low': 207.65, 'la-low-sharp': 220.00, 'ti-low-flat': 220.00, 'ti-low': 233.08,
    'do': 246.94, 'do-sharp': 261.63, 're-flat': 261.63, 're': 277.18, 're-sharp': 293.66, 'mi-flat': 293.66, 'mi': 311.13, 'fa': 329.63, 'fa-sharp': 349.23, 'so-flat': 349.23,
    'so': 369.99, 'so-sharp': 392.00, 'la-flat': 392.00, 'la': 415.30, 'la-sharp': 440.00, 'ti-flat': 440.00, 'ti': 466.16,
    'do-high': 493.88, 'do-high-sharp': 523.25, 're-high-flat': 523.25, 're-high': 554.37, 're-high-sharp': 587.33, 'mi-high-flat': 587.33, 'mi-high': 622.25
  }
};

const noteOrder = [
  'so-low', 'la-low', 'ti-low',
  'do', 're', 'mi', 'fa', 'so', 'la', 'ti',
  'do-high', 're-high', 'mi-high'
];

const noteToSolfege = {
  'so-low': 'So', 'la-low': 'La', 'ti-low': 'Ti',
  'do': 'Do', 're': 'Re', 'mi': 'Mi', 'fa': 'Fa', 
  'so': 'So', 'la': 'La', 'ti': 'Ti',
  'do-high': 'Do', 're-high': 'Re', 'mi-high': 'Mi'
};

// ===== ELEMENT REFERENCES =====
const editModeCheckbox = document.getElementById('editMode');
const editToggleBtn = document.getElementById('editToggle');
const leftArrowBtn = document.getElementById('leftArrow');
const rightArrowBtn = document.getElementById('rightArrow');
const infoIcon = document.getElementById('infoIcon');
const hints = document.getElementById('hints');
const minimizeBtn = document.getElementById('minimizeBtn');
const controlsGroup = document.getElementById('controlsGroup');
const nameToggle = document.getElementById('nameToggle');
const addBtn = document.getElementById('addBtn');
const accidentalToggle = document.getElementById('accidentalToggle');
const keySelector = document.getElementById('keySelector');

// ===== STATE VARIABLES =====
let currentSyllableIndex = -1;
let clickTimer = null;
let infoVisible = false;
let controlsMinimized = false;
let currentlyEditingText = null;
let currentEditingIndex = -1;
let isAdvancingToNext = false;
const DOUBLE_CLICK_DELAY = 300;

// ===== UTILITY FUNCTIONS =====
function getAllSyllables() {
  return document.querySelectorAll('.syllable');
}

function scrollToSyllable(syllable) {
  if (!syllable) return;
  syllable.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
  });
}

// ===== FREQUENCY FUNCTIONS =====
function getFrequencyForNote(noteClass, key = currentKey) {
  const freqMap = frequencyMapsByKey[key];
  return freqMap ? freqMap[noteClass] : null;
}

function getModifiedFrequency(baseNote, accidental, key = currentKey) {
  const chromaticMap = chromaticFrequencyMapsByKey[key];
  
  if (!chromaticMap) {
    // Fallback to base frequency if chromatic map not available
    return getFrequencyForNote(baseNote, key);
  }
  
  if (accidental === 'natural') {
    return chromaticMap[baseNote];
  } else if (accidental === 'sharp') {
    return chromaticMap[baseNote + '-sharp'] || chromaticMap[baseNote];
  } else if (accidental === 'flat') {
    return chromaticMap[baseNote + '-flat'] || chromaticMap[baseNote];
  }
  return chromaticMap[baseNote];
}

// ===== ACCIDENTAL FUNCTIONS =====
function addAccidentalToNote(noteElement, accidentalType) {
  // Remove any existing accidental
  removeAccidentalFromNote(noteElement);
  
  if (accidentalType === 'natural') return; // No symbol needed for natural
  
  const accidentalSpan = document.createElement('span');
  accidentalSpan.className = 'accidental-symbol';
  accidentalSpan.textContent = accidentalType === 'sharp' ? '♯' : '♭';
  noteElement.appendChild(accidentalSpan);
}

function removeAccidentalFromNote(noteElement) {
  const existingAccidental = noteElement.querySelector('.accidental-symbol');
  if (existingAccidental) {
    existingAccidental.remove();
  }
}

function getAccidentalFromNote(noteElement) {
  const accidentalSymbol = noteElement.querySelector('.accidental-symbol');
  if (!accidentalSymbol) return 'natural';
  return accidentalSymbol.textContent === '♯' ? 'sharp' : 'flat';
}

function applyAccidentalToCurrentNote() {
  if (!editModeCheckbox.checked || accidentalMode === 'natural') return;
  
  const syllables = getAllSyllables();
  if (currentSyllableIndex >= 0 && currentSyllableIndex < syllables.length) {
    const currentSyllable = syllables[currentSyllableIndex];
    const noteElement = currentSyllable.querySelector('.note');
    
    if (noteElement) {
      const currentAccidental = getAccidentalFromNote(noteElement);
      
      // Only apply if different from current state
      if (currentAccidental !== accidentalMode) {
        addAccidentalToNote(noteElement, accidentalMode);
        
        // Play the modified note
        const noteClass = Array.from(noteElement.classList).find(c => noteOrder.includes(c));
        if (noteClass) {
          const frequency = getModifiedFrequency(noteClass, accidentalMode);
          if (frequency) playNote(frequency);
        }
      }
    }
  }
}

// ===== AUDIO FUNCTIONS =====
function playNote(frequency) {
  const now = audioCtx.currentTime;
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.value = frequency;
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.5, now + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
  oscillator.start(now);
  oscillator.stop(now + 0.5);
}

function playNoteWithAccidental(noteElement) {
  const noteClass = Array.from(noteElement.classList).find(c => noteOrder.includes(c));
  if (noteClass) {
    const accidental = getAccidentalFromNote(noteElement);
    const frequency = getModifiedFrequency(noteClass, accidental);
    if (frequency) playNote(frequency);
  }
}

// ===== COLOR AND DISPLAY FUNCTIONS =====
function applyNoteColors() {
  const colors = noteColorsByKey[currentKey];
  const letterNames = letterNamesByKey[currentKey];
  
  document.querySelectorAll('.note').forEach(noteElement => {
    const noteClass = Array.from(noteElement.classList).find(c => noteToSolfege[c]);
    if (noteClass) {
      const solfegeName = noteToSolfege[noteClass];
      const color = colors[solfegeName];
      const letterName = letterNames[solfegeName];
      
      if (color) {
        noteElement.style.backgroundColor = color;
      }
      
      const letterNameElement = noteElement.querySelector('.letter-name');
      if (letterNameElement && letterName) {
        letterNameElement.textContent = letterName;
        letterNameElement.style.color = color;
      }
    }
  });
}

function updateNoteDisplay(noteElement, noteClass) {
  const solfegeName = noteToSolfege[noteClass];
  const color = noteColorsByKey[currentKey][solfegeName];
  const letterName = letterNamesByKey[currentKey][solfegeName];
  
  if (color) {
    noteElement.style.backgroundColor = color;
  }
  
  const letterNameElement = noteElement.querySelector('.letter-name');
  if (letterNameElement && letterName) {
    letterNameElement.textContent = letterName;
    letterNameElement.style.color = color;
  }
  
  const solfegeNameElement = noteElement.querySelector('.solfege-name');
  if (solfegeNameElement) {
    solfegeNameElement.textContent = solfegeName.toLowerCase();
  }
}

// ===== SYLLABLE CREATION FUNCTIONS =====
function createNewSyllable() {
  const colors = noteColorsByKey[currentKey];
  const letterNames = letterNamesByKey[currentKey];
  const doColor = colors['Do'];
  const doLetterName = letterNames['Do'];
  
  const syllableDiv = document.createElement('div');
  syllableDiv.className = 'syllable';
  
  const noteDiv = document.createElement('div');
  noteDiv.className = 'note do';
  noteDiv.style.backgroundColor = doColor;
  
  const letterNameDiv = document.createElement('div');
  letterNameDiv.className = 'letter-name';
  letterNameDiv.textContent = doLetterName;
  letterNameDiv.style.color = doColor;
  
  const solfegeNameDiv = document.createElement('div');
  solfegeNameDiv.className = 'solfege-name';
  solfegeNameDiv.textContent = 'do';
  
  const textDiv = document.createElement('div');
  textDiv.className = 'text';
  textDiv.textContent = '-';
  
  noteDiv.appendChild(letterNameDiv);
  noteDiv.appendChild(solfegeNameDiv);
  syllableDiv.appendChild(noteDiv);
  syllableDiv.appendChild(textDiv);
  
  return syllableDiv;
}

function addSyllableAfterCurrent() {
  if (!editModeCheckbox.checked) return;
  
  const syllables = getAllSyllables();
  let targetSyllable;
  let targetLine;
  
  if (currentSyllableIndex >= 0 && currentSyllableIndex < syllables.length) {
    targetSyllable = syllables[currentSyllableIndex];
    targetLine = targetSyllable.closest('.notation-line');
  } else {
    const lines = document.querySelectorAll('.notation-line');
    targetLine = lines[lines.length - 1];
    const lastLineSyllables = targetLine.querySelectorAll('.syllable');
    targetSyllable = lastLineSyllables[lastLineSyllables.length - 1];
  }
  
  if (!targetLine || !targetSyllable) return;
  
  const newSyllable = createNewSyllable();
  targetSyllable.insertAdjacentElement('afterend', newSyllable);
  addSyllableEventListeners(newSyllable);
  
  const updatedSyllables = getAllSyllables();
  const newIndex = Array.from(updatedSyllables).indexOf(newSyllable);
  currentSyllableIndex = newIndex;
  
  highlightAndPlaySyllable(currentSyllableIndex);
  applyNoteColors();
}

function addSyllableEventListeners(syllable) {
  syllable.addEventListener('click', (event) => {
    event.stopPropagation();
    handleSyllableClick(syllable);
  });
  
  const noteElement = syllable.querySelector('.note');
  if (noteElement) {
    noteElement.addEventListener('click', (event) => {
      event.stopPropagation();
      handleNoteClick(noteElement);
    });
  }
  
  const textElement = syllable.querySelector('.text');
  if (textElement) {
    textElement.addEventListener('click', (event) => {
      handleTextClick(textElement, event);
    });
  }
}

// ===== TEXT EDITING FUNCTIONS =====
function startTextEdit(textElement) {
  if (currentlyEditingText && currentlyEditingText !== textElement) {
    finishTextEdit();
  }
  
  currentlyEditingText = textElement;
  const syllable = textElement.closest('.syllable');
  syllable.classList.add('editing');
  
  const syllables = getAllSyllables();
  currentEditingIndex = Array.from(syllables).indexOf(syllable);
  
  const currentText = textElement.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'text-input';
  input.value = currentText;
  
  textElement.style.display = 'none';
  textElement.parentNode.insertBefore(input, textElement);
  
  input.focus();
  input.select();
  
  input.addEventListener('blur', () => {
    if (!isAdvancingToNext) {
      finishTextEdit();
    }
  });
  
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      finishTextEdit();
    } else if (e.key === 'Escape') {
      cancelTextEdit();
    } else if (e.key === ' ' && e.target.selectionStart === e.target.value.length) {
      e.preventDefault();
      finishTextEditAndAdvance();
    }
  });
  
  input.addEventListener('click', (e) => e.stopPropagation());
}

function finishTextEdit() {
  if (!currentlyEditingText) return;
  
  const syllable = currentlyEditingText.closest('.syllable');
  const input = syllable.querySelector('.text-input');
  
  if (input) {
    currentlyEditingText.textContent = input.value || 'text';
    input.remove();
    currentlyEditingText.style.display = 'flex';
  }
  
  syllable.classList.remove('editing');
  currentlyEditingText = null;
  currentEditingIndex = -1;
  isAdvancingToNext = false;
}

function finishTextEditAndAdvance() {
  if (!currentlyEditingText) return;
  
  const syllables = getAllSyllables();
  const nextIndex = currentEditingIndex + 1;
  
  isAdvancingToNext = true;
  
  const syllable = currentlyEditingText.closest('.syllable');
  const input = syllable.querySelector('.text-input');
  
  if (input) {
    currentlyEditingText.textContent = input.value || 'text';
    input.remove();
    currentlyEditingText.style.display = 'flex';
  }
  
  syllable.classList.remove('editing');
  currentlyEditingText = null;
  currentEditingIndex = -1;
  
  if (nextIndex < syllables.length) {
    const nextSyllable = syllables[nextIndex];
    const nextTextElement = nextSyllable.querySelector('.text');
    if (nextTextElement) {
      scrollToSyllable(nextSyllable);
      setTimeout(() => {
        isAdvancingToNext = false;
        startTextEdit(nextTextElement);
      }, 50);
    } else {
      isAdvancingToNext = false;
    }
  } else {
    isAdvancingToNext = false;
  }
}

function cancelTextEdit() {
  if (!currentlyEditingText) return;
  
  const syllable = currentlyEditingText.closest('.syllable');
  const input = syllable.querySelector('.text-input');
  
  if (input) {
    input.remove();
    currentlyEditingText.style.display = 'flex';
  }
  
  syllable.classList.remove('editing');
  currentlyEditingText = null;
  currentEditingIndex = -1;
  isAdvancingToNext = false;
}

// ===== TOGGLE FUNCTIONS =====
function toggleEditMode() {
  editModeCheckbox.checked = !editModeCheckbox.checked;
  
  if (editModeCheckbox.checked) {
    editToggleBtn.classList.add('active');
  } else {
    editToggleBtn.classList.remove('active');
  }
  
  updateAddButtonState();
}

function syncEditButtonState() {
  if (editModeCheckbox.checked) {
    editToggleBtn.classList.add('active');
  } else {
    editToggleBtn.classList.remove('active');
  }
}

function toggleNames() {
  showNames = !showNames;
  const notationContainer = document.querySelector('.notation-container');
  
  if (showNames) {
    nameToggle.classList.add('active');
    notationContainer.classList.add('show-names');
  } else {
    nameToggle.classList.remove('active');
    notationContainer.classList.remove('show-names');
  }
}

function toggleInfo() {
  infoVisible = !infoVisible;
  
  if (infoVisible) {
    hints.classList.add('show');
    infoIcon.classList.add('active');
  } else {
    hints.classList.remove('show');
    infoIcon.classList.remove('active');
  }
}

function toggleMinimize() {
  controlsMinimized = !controlsMinimized;
  
  if (controlsMinimized) {
    controlsGroup.classList.add('minimized');
    minimizeBtn.textContent = '▲';
  } else {
    controlsGroup.classList.remove('minimized');
    minimizeBtn.textContent = '▼';
  }
}

function updateAddButtonState() {
  if (editModeCheckbox.checked) {
    addBtn.classList.add('active');
    addBtn.disabled = false;
  } else {
    addBtn.classList.remove('active');
    addBtn.disabled = true;
  }
}

function changeKey(newKey) {
  if (noteColorsByKey[newKey]) {
    currentKey = newKey;
    applyNoteColors();
    console.log(`Key changed to: ${newKey}`);
  }
}

// ===== ACCIDENTAL TOGGLE FUNCTION =====
function setAccidentalMode(mode) {
  accidentalMode = mode;
  
  // Remove active class from all options
  const accidentalOptions = document.querySelectorAll('.accidental-option');
  accidentalOptions.forEach(option => option.classList.remove('active'));
  
  // Add active class to selected option
  const selectedOption = document.querySelector(`[data-type="${mode}"]`);
  if (selectedOption) {
    selectedOption.classList.add('active');
  }
  
  console.log(`Accidental mode changed to: ${mode}`);
  
  // Apply accidental to currently highlighted note
  applyAccidentalToCurrentNote();
}

// ===== NOTE EDITING FUNCTIONS =====
function changeNote(noteElement, direction = 'up', playSound = true) {
  const currentNoteClass = Array.from(noteElement.classList).find(c => noteOrder.includes(c));
  if (!currentNoteClass) return;
  
  const currentIndex = noteOrder.indexOf(currentNoteClass);
  let nextIndex;
  
  if (direction === 'up') {
    nextIndex = (currentIndex + 1) % noteOrder.length;
  } else {
    nextIndex = currentIndex <= 0 ? noteOrder.length - 1 : currentIndex - 1;
  }
  
  const nextNote = noteOrder[nextIndex];
  noteElement.classList.remove(currentNoteClass);
  noteElement.classList.add(nextNote);
  
  // Remove any existing accidental when changing notes
  removeAccidentalFromNote(noteElement);
  
  updateNoteDisplay(noteElement, nextNote);
  
  if (playSound) {
    const frequency = getFrequencyForNote(nextNote);
    if (frequency) playNote(frequency);
  }
}

// ===== NAVIGATION FUNCTIONS =====
function highlightAndPlaySyllable(index) {
  const syllables = getAllSyllables();
  syllables.forEach(syllable => syllable.classList.remove('highlighted'));
  
  if (index >= 0 && index < syllables.length) {
    const currentSyllable = syllables[index];
    currentSyllable.classList.add('highlighted');
    
    scrollToSyllable(currentSyllable);
    
    const noteElement = currentSyllable.querySelector('.note');
    if (noteElement) {
      playNoteWithAccidental(noteElement);
    }
  }
}

function setSyllableAsActive(syllable) {
  const syllables = getAllSyllables();
  const index = Array.from(syllables).indexOf(syllable);
  if (index >= 0) {
    currentSyllableIndex = index;
    highlightAndPlaySyllable(index);
  }
}

function navigateRight() {
  const syllables = getAllSyllables();
  currentSyllableIndex = (currentSyllableIndex + 1) % syllables.length;
  highlightAndPlaySyllable(currentSyllableIndex);
}

function navigateLeft() {
  const syllables = getAllSyllables();
  currentSyllableIndex = currentSyllableIndex <= 0 ? syllables.length - 1 : currentSyllableIndex - 1;
  highlightAndPlaySyllable(currentSyllableIndex);
}

function editCurrentNote(direction) {
  const syllables = getAllSyllables();
  if (currentSyllableIndex >= 0 && currentSyllableIndex < syllables.length && editModeCheckbox.checked) {
    const currentSyllable = syllables[currentSyllableIndex];
    const noteElement = currentSyllable.querySelector('.note');
    changeNote(noteElement, direction, true);
  }
}

// ===== EVENT HANDLERS =====
function handleNoteClick(noteElement) {
  const syllable = noteElement.closest('.syllable');
  const syllables = getAllSyllables();
  const clickedIndex = Array.from(syllables).indexOf(syllable);
  const isCurrentlyActive = clickedIndex === currentSyllableIndex;
  
  // Always activate the syllable and play the note first
  if (!isCurrentlyActive) {
    setSyllableAsActive(syllable);
  } else {
    // If already active, just play the current note
    playNoteWithAccidental(noteElement);
  }
  
  // If in edit mode and this syllable is already active, handle note changing
  if (editModeCheckbox.checked && isCurrentlyActive) {
    if (clickTimer) {
      // Double click - change note down
      clearTimeout(clickTimer);
      clickTimer = null;
      changeNote(noteElement, 'down', true);
    } else {
      // Single click - change note up (after delay to detect double click)
      clickTimer = setTimeout(() => {
        changeNote(noteElement, 'up', true);
        clickTimer = null;
      }, DOUBLE_CLICK_DELAY);
    }
  }
}

function handleSyllableClick(syllable) {
  setSyllableAsActive(syllable);
}

function handleTextClick(textElement, event) {
  if (editModeCheckbox.checked && !currentlyEditingText) {
    event.stopPropagation();
    startTextEdit(textElement);
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  applyNoteColors();
  updateAddButtonState();
  syncEditButtonState();
  setAccidentalMode('natural'); // Initialize with natural mode
  
  // Set key selector to current key
  if (keySelector) {
    keySelector.value = currentKey;
  }
  
  document.body.setAttribute('tabindex', '0');
  document.body.focus();
});

// ===== EVENT LISTENERS =====
document.querySelectorAll('.syllable').forEach(syllable => {
  addSyllableEventListeners(syllable);
});

infoIcon.addEventListener('click', toggleInfo);
minimizeBtn.addEventListener('click', toggleMinimize);
nameToggle.addEventListener('click', toggleNames);
leftArrowBtn.addEventListener('click', navigateLeft);
rightArrowBtn.addEventListener('click', navigateRight);
addBtn.addEventListener('click', addSyllableAfterCurrent);

// Construction hat edit toggle
editToggleBtn.addEventListener('click', toggleEditMode);

editModeCheckbox.addEventListener('change', () => {
  syncEditButtonState();
  updateAddButtonState();
});

// Accidental toggle event listeners
accidentalToggle.addEventListener('click', (event) => {
  const clickedOption = event.target.closest('.accidental-option');
  if (clickedOption) {
    const mode = clickedOption.getAttribute('data-type');
    setAccidentalMode(mode);
  }
});

// Key selector event listener
keySelector.addEventListener('change', (event) => {
  const newKey = event.target.value;
  changeKey(newKey);
});

document.addEventListener('click', (event) => {
  if (currentlyEditingText && !event.target.closest('.syllable.editing') && !isAdvancingToNext) {
    finishTextEdit();
  }
});

document.addEventListener('keydown', (event) => {
  if (currentlyEditingText) return;
  
  switch(event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      navigateLeft();
      break;
    case 'ArrowRight':
      event.preventDefault();
      navigateRight();
      break;
    case 'ArrowUp':
      event.preventDefault();
      editCurrentNote('up');
      break;
    case 'ArrowDown':
      event.preventDefault();
      editCurrentNote('down');
      break;
  }
});

// ===== GLOBAL FUNCTIONS =====
window.changeKey = changeKey;
