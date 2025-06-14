// ===== AUDIO CONTEXT =====
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// ===== COLOR SYSTEM =====
const noteColorsByKey = {
  'C': { 'Do': '#FF3B30', 'Re': '#FF9500', 'Mi': '#FFCC00', 'Fa': '#34C759', 'So': '#48C4C8', 'La': '#007AFF', 'Ti': '#AF52DE' },
  'Db': { 'Do': '#FF9500', 'Re': '#FFCC00', 'Mi': '#34C759', 'Fa': '#48C4C8', 'So': '#007AFF', 'La': '#AF52DE', 'Ti': '#FF3B30' },
  'D': { 'Do': '#FF9500', 'Re': '#FFCC00', 'Mi': '#34C759', 'Fa': '#48C4C8', 'So': '#007AFF', 'La': '#AF52DE', 'Ti': '#FF3B30' },
  'Eb': { 'Do': '#FFCC00', 'Re': '#34C759', 'Mi': '#48C4C8', 'Fa': '#007AFF', 'So': '#AF52DE', 'La': '#FF3B30', 'Ti': '#FF9500' },
  'E': { 'Do': '#FFCC00', 'Re': '#34C759', 'Mi': '#48C4C8', 'Fa': '#007AFF', 'So': '#AF52DE', 'La': '#FF3B30', 'Ti': '#FF9500' },
  'F': { 'Do': '#34C759', 'Re': '#48C4C8', 'Mi': '#007AFF', 'Fa': '#AF52DE', 'So': '#FF3B30', 'La': '#FF9500', 'Ti': '#FFCC00' },
  'Gb': { 'Do': '#48C4C8', 'Re': '#007AFF', 'Mi': '#AF52DE', 'Fa': '#FF3B30', 'So': '#FF9500', 'La': '#FFCC00', 'Ti': '#34C759' },
  'G': { 'Do': '#48C4C8', 'Re': '#007AFF', 'Mi': '#AF52DE', 'Fa': '#FF3B30', 'So': '#FF9500', 'La': '#FFCC00', 'Ti': '#34C759' },
  'Ab': { 'Do': '#007AFF', 'Re': '#AF52DE', 'Mi': '#FF3B30', 'Fa': '#FF9500', 'So': '#FFCC00', 'La': '#34C759', 'Ti': '#48C4C8' },
  'A': { 'Do': '#007AFF', 'Re': '#AF52DE', 'Mi': '#FF3B30', 'Fa': '#FF9500', 'So': '#FFCC00', 'La': '#34C759', 'Ti': '#48C4C8' },
  'Bb': { 'Do': '#AF52DE', 'Re': '#FF3B30', 'Mi': '#FF9500', 'Fa': '#FFCC00', 'So': '#34C759', 'La': '#48C4C8', 'Ti': '#007AFF' },
  'B': { 'Do': '#AF52DE', 'Re': '#FF3B30', 'Mi': '#FF9500', 'Fa': '#FFCC00', 'So': '#34C759', 'La': '#48C4C8', 'Ti': '#007AFF' }
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

// ===== CHORD COLOR MAPPING =====
const chordColorMapping = {
  'I': 'Do',      'ii': 'Re',     'iii': 'Mi',    'IV': 'Fa',     'V': 'So',      'vi': 'La',     
  'V/V': 'Re',    'V/vi': 'Mi',   'IV/IV': 'Ti'
};

// ===== CHORD NAME MAPPING =====
const chordNamesByKey = {
  'C': { 'I': 'C', 'ii': 'Dm', 'iii': 'Em', 'IV': 'F', 'V': 'G', 'vi': 'Am', 'V/V': 'D', 'V/vi': 'E', 'IV/IV': 'Bb' },
  'Db': { 'I': 'Db', 'ii': 'Ebm', 'iii': 'Fm', 'IV': 'Gb', 'V': 'Ab', 'vi': 'Bbm', 'V/V': 'Eb', 'V/vi': 'F', 'IV/IV': 'B' },
  'D': { 'I': 'D', 'ii': 'Em', 'iii': 'F#m', 'IV': 'G', 'V': 'A', 'vi': 'Bm', 'V/V': 'E', 'V/vi': 'F#', 'IV/IV': 'C' },
  'Eb': { 'I': 'Eb', 'ii': 'Fm', 'iii': 'Gm', 'IV': 'Ab', 'V': 'Bb', 'vi': 'Cm', 'V/V': 'F', 'V/vi': 'G', 'IV/IV': 'Db' },
  'E': { 'I': 'E', 'ii': 'F#m', 'iii': 'G#m', 'IV': 'A', 'V': 'B', 'vi': 'C#m', 'V/V': 'F#', 'V/vi': 'G#', 'IV/IV': 'D' },
  'F': { 'I': 'F', 'ii': 'Gm', 'iii': 'Am', 'IV': 'Bb', 'V': 'C', 'vi': 'Dm', 'V/V': 'G', 'V/vi': 'A', 'IV/IV': 'Eb' },
  'Gb': { 'I': 'Gb', 'ii': 'Abm', 'iii': 'Bbm', 'IV': 'B', 'V': 'Db', 'vi': 'Ebm', 'V/V': 'Ab', 'V/vi': 'Bb', 'IV/IV': 'E' },
  'G': { 'I': 'G', 'ii': 'Am', 'iii': 'Bm', 'IV': 'C', 'V': 'D', 'vi': 'Em', 'V/V': 'A', 'V/vi': 'B', 'IV/IV': 'F' },
  'Ab': { 'I': 'Ab', 'ii': 'Bbm', 'iii': 'Cm', 'IV': 'Db', 'V': 'Eb', 'vi': 'Fm', 'V/V': 'Bb', 'V/vi': 'C', 'IV/IV': 'Gb' },
  'A': { 'I': 'A', 'ii': 'Bm', 'iii': 'C#m', 'IV': 'D', 'V': 'E', 'vi': 'F#m', 'V/V': 'B', 'V/vi': 'C#', 'IV/IV': 'G' },
  'Bb': { 'I': 'Bb', 'ii': 'Cm', 'iii': 'Dm', 'IV': 'Eb', 'V': 'F', 'vi': 'Gm', 'V/V': 'C', 'V/vi': 'D', 'IV/IV': 'Ab' },
  'B': { 'I': 'B', 'ii': 'C#m', 'iii': 'D#m', 'IV': 'E', 'V': 'F#', 'vi': 'G#m', 'V/V': 'C#', 'V/vi': 'D#', 'IV/IV': 'A' }
};

// ===== CHORD FREQUENCY DEFINITIONS =====
const NOTE_FREQUENCIES = {
  'C2': 65.41, 'C#2': 69.30, 'Db2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'Eb2': 77.78,
  'E2': 82.41, 'F2': 87.31, 'F#2': 92.50, 'Gb2': 92.50, 'G2': 98.00, 'G#2': 103.83,
  'Ab2': 103.83, 'A2': 110.00, 'A#2': 116.54, 'Bb2': 116.54, 'B2': 123.47,
  'C3': 130.81, 'C#3': 138.59, 'Db3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'Eb3': 155.56,
  'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'Gb3': 185.00, 'G3': 196.00, 'G#3': 207.65,
  'Ab3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'Bb3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'Db4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'Eb4': 311.13,
  'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'Gb4': 369.99, 'G4': 392.00, 'G#4': 415.30,
  'Ab4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'Bb4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'Db5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'Eb5': 622.25,
  'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'Gb5': 739.99, 'G5': 783.99, 'G#5': 830.61,
  'Ab5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'Bb5': 932.33, 'B5': 987.77,
  'C6': 1046.50, 'C#6': 1108.73, 'Db6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51, 'Eb6': 1244.51,
  'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98, 'Gb6': 1479.98, 'G6': 1567.98, 'G#6': 1661.22,
  'Ab6': 1661.22, 'A6': 1760.00, 'A#6': 1864.66, 'Bb6': 1864.66, 'B6': 1975.53
};

// ===== CHORD TRANSPOSITION SYSTEM =====
const BASE_CHORD_VOICINGS = {
  'I': ['C3', 'C4', 'E4', 'G4'],
  'ii': ['D3', 'D4', 'F4', 'A4'],
  'iii': ['E3', 'E4', 'G4', 'B4'],
  'IV': ['F3', 'F4', 'A4', 'C5'],
  'V': ['G3', 'D4', 'G4', 'B4'],
  'vi': ['A3', 'E4', 'A4', 'C5'],
  'V/V': ['D3', 'D4', 'F#4', 'A4'],
  'V/vi': ['E3', 'E4', 'G#4', 'B4'],
  'IV/IV': ['Bb3', 'D4', 'F4', 'Bb4']
};

const CHROMATIC_NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const KEY_TRANSPOSITION = {
  'C': { semitones: 0, octaveShift: 0 },
  'Db': { semitones: 1, octaveShift: 0 },
  'D': { semitones: 2, octaveShift: 0 },
  'Eb': { semitones: 3, octaveShift: 0 },
  'E': { semitones: 4, octaveShift: 0 },
  'F': { semitones: 5, octaveShift: 0 },
  'Gb': { semitones: 6, octaveShift: 0 },
  'G': { semitones: 7, octaveShift: 0 },
  'Ab': { semitones: 8, octaveShift: -1 },
  'A': { semitones: 9, octaveShift: -1 },
  'Bb': { semitones: 10, octaveShift: -1 },
  'B': { semitones: 11, octaveShift: -1 }
};

function transposeNote(noteWithOctave, semitonesUp, octaveShift = 0) {
  const noteMatch = noteWithOctave.match(/^([A-G][b#]?)(\d+)$/);
  if (!noteMatch) return null;
  
  const noteName = noteMatch[1];
  const octave = parseInt(noteMatch[2]);
  
  let noteIndex = CHROMATIC_NOTES.indexOf(noteName);
  if (noteIndex === -1) {
    const enharmonics = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb' };
    noteIndex = CHROMATIC_NOTES.indexOf(enharmonics[noteName]);
  }
  if (noteIndex === -1) return null;
  
  let newNoteIndex = (noteIndex + semitonesUp) % 12;
  if (newNoteIndex < 0) newNoteIndex += 12;
  
  let newOctave = octave + Math.floor((noteIndex + semitonesUp) / 12) + octaveShift;
  
  const newNoteName = CHROMATIC_NOTES[newNoteIndex];
  return `${newNoteName}${newOctave}`;
}

function generateChordForKey(key, chordSymbol) {
  const transposition = KEY_TRANSPOSITION[key];
  if (!transposition) return null;
  
  const baseVoicing = BASE_CHORD_VOICINGS[chordSymbol];
  if (!baseVoicing) return null;
  
  const transposedVoicing = baseVoicing.map(note => 
    transposeNote(note, transposition.semitones, transposition.octaveShift)
  ).filter(note => note !== null);
  
  return transposedVoicing;
}

// ===== MUSICAL DATA & CONSTANTS =====
let currentKey = 'C';
let showNames = false;
let accidentalMode = 'natural'; 
let chordMode = false;
let selectedChord = null;

const A4_HZ = 440.0;
const SEMITONES_IN_OCTAVE = 12;
const C0_HZ = A4_HZ * Math.pow(2, -57 / SEMITONES_IN_OCTAVE); 

const SOLFEGE_INTERVALS = { 
  'Do': 0, 'Re': 2, 'Mi': 4, 'Fa': 5, 'So': 7, 'La': 9, 'Ti': 11
};

const DEFAULT_SOLFEGE_OCTAVE = 4; 

const KEY_SIGNATURES_CHROMATIC_INDEX = {
    'C': 0, 'Db': 1, 'D': 2, 'Eb': 3, 'E': 4, 'F': 5, 'Gb': 6, 'G': 7, 'Ab': 8, 'A': 9, 'Bb': 10, 'B': 11
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
const newLineBtn = document.getElementById('newLineBtn');
const deleteBtn = document.getElementById('deleteBtn');
const accidentalToggle = document.getElementById('accidentalToggle');
const keySelector = document.getElementById('keySelector');
const newLinePopup = document.getElementById('newLinePopup');
const newLineText = document.getElementById('newLineText');
const cancelNewLine = document.getElementById('cancelNewLine');
const submitNewLine = document.getElementById('submitNewLine');
const editOnlyControls = document.getElementById('editOnlyControls');
const chordToggle = document.getElementById('chordToggle');
const chordBoxes = document.getElementById('chordBoxes');

// ===== STATE VARIABLES =====
let currentSyllableIndex = -1;
let navigationOffEndState = null;
let clickTimer = null;
let infoVisible = false;
let controlsMinimized = false;
let currentlyEditingText = null;
let currentEditingIndex = -1;
let isAdvancingToNext = false;
let deleteConfirmationState = false;
const DOUBLE_CLICK_DELAY = 300;
// ===== UTILITY FUNCTIONS =====
function getAllSyllables() {
  return document.querySelectorAll('.syllable');
}

function scrollToSyllable(syllable) {
  if (!syllable) return;
  
  const rect = syllable.getBoundingClientRect();
  const currentScrollY = window.pageYOffset;
  const syllableTop = rect.top + currentScrollY;
  const topOffset = 60;
  
  window.scrollTo({
    top: syllableTop - topOffset,
    behavior: 'smooth'
  });
}

function resetAccidentalToggleVisuals() {
    accidentalMode = 'natural';
    document.querySelectorAll('.accidental-option').forEach(option => {
        option.classList.remove('active');
    });
}

function resetDeleteConfirmation() {
    deleteConfirmationState = false;
    deleteBtn.classList.remove('confirm-delete');
}

function isPopupOpen() {
  return newLinePopup.classList.contains('show');
}

// ===== EDIT MODE VISIBILITY FUNCTIONS =====
function updateEditOnlyControlsVisibility() {
  if (editModeCheckbox.checked) {
    editOnlyControls.classList.add('show');
  } else {
    editOnlyControls.classList.remove('show');
  }
}

// ===== CHORD FUNCTIONS =====
function updateChordBoxesVisibility() {
  if (chordMode) {
    chordBoxes.classList.add('show');
    document.body.classList.add('chord-mode-active');
  } else {
    chordBoxes.classList.remove('show');
    document.body.classList.remove('chord-mode-active');
    selectedChord = null;
    document.querySelectorAll('.chord-box').forEach(box => box.classList.remove('selected'));
  }
}

function applyChordColors() {
  const colors = noteColorsByKey[currentKey];
  
  document.querySelectorAll('.chord-box').forEach(chordBox => {
    const chordName = chordBox.getAttribute('data-chord');
    const solfegeKey = chordColorMapping[chordName];
    
    if (solfegeKey && colors[solfegeKey]) {
      const color = colors[solfegeKey];
      chordBox.style.backgroundColor = color;
      chordBox.style.borderColor = color;
    }
  });
}

function updateChordBoxLabels() {
  const chordNames = chordNamesByKey[currentKey];
  
  document.querySelectorAll('.chord-box').forEach(chordBox => {
    const romanNumeral = chordBox.getAttribute('data-chord');
    const chordName = chordNames[romanNumeral];
    
    if (showNames && chordName) {
      chordBox.textContent = chordName;
    } else {
      chordBox.textContent = romanNumeral;
    }
  });
}

function handleChordBoxClick(chordBox) {
  const chordName = chordBox.getAttribute('data-chord');
  
  document.querySelectorAll('.chord-box').forEach(box => box.classList.remove('selected'));
  
  chordBox.classList.add('selected');
  selectedChord = chordName;
  
  playChord(chordName);
  
  console.log(`Selected chord: ${chordName}`);
}

function selectChordByKeyNumber(keyNumber) {
  if (!chordMode) return;
  
  const chordBox = document.querySelector(`[data-key="${keyNumber}"]`);
  if (chordBox) {
    handleChordBoxClick(chordBox);
  }
}

function playChord(chordSymbol) {
  const noteNames = generateChordForKey(currentKey, chordSymbol);
  if (!noteNames || noteNames.length === 0) {
    console.warn(`Chord ${chordSymbol} not found for key ${currentKey}`);
    return;
  }
  
  const frequencies = noteNames.map(noteName => NOTE_FREQUENCIES[noteName]).filter(freq => freq);
  
  if (frequencies.length === 0) {
    console.warn(`No valid frequencies found for chord ${chordSymbol} in key ${currentKey}`);
    console.log('Note names:', noteNames);
    return;
  }
  
  console.log(`Playing chord ${chordSymbol} in key ${currentKey}:`, noteNames, 'frequencies:', frequencies);
  
  const now = audioCtx.currentTime;
  const chordDuration = 1.5;
  
  frequencies.forEach(frequency => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, now);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.02);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, now + chordDuration);
    
    oscillator.start(now);
    oscillator.stop(now + chordDuration);
  });
}

// ===== FREQUENCY CALCULATION FUNCTIONS =====
function calculateFrequency(key, solfegeWithOctave, accidental = 'natural') {
  const tonicChromaticIndex = KEY_SIGNATURES_CHROMATIC_INDEX[key];
  if (typeof tonicChromaticIndex === 'undefined') {
    console.error(`Unknown key for frequency calculation: ${key}`);
    return null;
  }
  let baseSolfegeLowercase = solfegeWithOctave; 
  let octaveShift = 0;
  if (solfegeWithOctave.endsWith('-low')) {
    baseSolfegeLowercase = solfegeWithOctave.replace('-low', ''); 
    octaveShift = -1;
  } else if (solfegeWithOctave.endsWith('-high')) {
    baseSolfegeLowercase = solfegeWithOctave.replace('-high', ''); 
    octaveShift = 1;
  }
  const baseSolfegeCapitalized = baseSolfegeLowercase.charAt(0).toUpperCase() + baseSolfegeLowercase.slice(1); 
  const solfegeInterval = SOLFEGE_INTERVALS[baseSolfegeCapitalized];
  if (typeof solfegeInterval === 'undefined') {
    console.error(`Solfege interval not found for: ${baseSolfegeCapitalized} (derived from ${solfegeWithOctave})`);
    return null; 
  }
  let accidentalOffset = 0;
  if (accidental === 'sharp') accidentalOffset = 1;
  else if (accidental === 'flat') accidentalOffset = -1;
  const tonicNoteInDefaultOctaveSemitonesFromC0 = tonicChromaticIndex + DEFAULT_SOLFEGE_OCTAVE * SEMITONES_IN_OCTAVE;
  const targetNoteSemitonesFromC0 = tonicNoteInDefaultOctaveSemitonesFromC0 + 
                                    solfegeInterval + 
                                    accidentalOffset + 
                                    (octaveShift * SEMITONES_IN_OCTAVE);
  const frequency = C0_HZ * Math.pow(2, targetNoteSemitonesFromC0 / SEMITONES_IN_OCTAVE);
  if (isNaN(frequency)) {
    console.error(`Calculated frequency is NaN. Inputs: key=${key}, solfege=${solfegeWithOctave}, accidental=${accidental}`);
    return null;
  }
  return frequency;
}

function getFrequencyForNote(noteClass, key = currentKey) {
  return calculateFrequency(key, noteClass, 'natural');
}

function getModifiedFrequency(baseNote, accidental, key = currentKey) {
  return calculateFrequency(key, baseNote, accidental);
}

// ===== ACCIDENTAL FUNCTIONS =====
function addAccidentalToNote(noteElement, accidentalType) { 
  removeAccidentalFromNote(noteElement); 
  if (accidentalType === 'natural') return; 
  const accidentalSpan = document.createElement('span');
  accidentalSpan.className = 'accidental-symbol';
  accidentalSpan.textContent = accidentalType === 'sharp' ? '♯' : '♭';
  noteElement.appendChild(accidentalSpan);
}

function removeAccidentalFromNote(noteElement) {
  const existingAccidental = noteElement.querySelector('.accidental-symbol');
  if (existingAccidental) existingAccidental.remove();
}

function getAccidentalFromNote(noteElement) {
  const accidentalSymbol = noteElement.querySelector('.accidental-symbol');
  if (!accidentalSymbol) return 'natural';
  return accidentalSymbol.textContent === '♯' ? 'sharp' : 'flat';
}

function applyActiveAccidentalToCurrentNote() {
  if (!editModeCheckbox.checked) return; 
  const syllables = getAllSyllables();
  if (currentSyllableIndex >= 0 && currentSyllableIndex < syllables.length) {
    const currentSyllable = syllables[currentSyllableIndex];
    const noteElement = currentSyllable.querySelector('.note');
    if (noteElement) {
      addAccidentalToNote(noteElement, accidentalMode); 
      const noteClass = Array.from(noteElement.classList).find(c => noteOrder.includes(c));
      if (noteClass) {
        const frequency = getModifiedFrequency(noteClass, accidentalMode, currentKey); 
        if (frequency !== null) playNote(frequency);
      }
    }
  }
}

// ===== AUDIO FUNCTIONS =====
function playNote(frequency) {
  if (frequency === null || isNaN(frequency) || frequency <= 0) {
    console.warn("Attempted to play invalid frequency:", frequency);
    return;
  }
  const now = audioCtx.currentTime;
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(frequency, now); 
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
    const frequency = getModifiedFrequency(noteClass, accidental, currentKey);
    if (frequency !== null) playNote(frequency);
  }
}

// ===== COLOR AND DISPLAY FUNCTIONS =====
function applyNoteColors() {
  const colors = noteColorsByKey[currentKey];
  const letterNamesMap = letterNamesByKey[currentKey]; 
  document.querySelectorAll('.note').forEach(noteElement => {
    const noteClass = Array.from(noteElement.classList).find(c => noteToSolfege[c]); 
    if (noteClass) {
      const solfegeKey = noteToSolfege[noteClass]; 
      const color = colors[solfegeKey];
      const letterName = letterNamesMap[solfegeKey];
      if (color) noteElement.style.backgroundColor = color;
      const letterNameElement = noteElement.querySelector('.letter-name');
      if (letterNameElement && letterName) {
        letterNameElement.textContent = letterName;
        letterNameElement.style.color = color;
      }
    }
  });
}

function updateNoteDisplay(noteElement, noteClass) { 
  const solfegeKey = noteToSolfege[noteClass]; 
  const color = noteColorsByKey[currentKey][solfegeKey];
  const letterName = letterNamesByKey[currentKey][solfegeKey];
  if (color) noteElement.style.backgroundColor = color;
  const letterNameElement = noteElement.querySelector('.letter-name');
  if (letterNameElement && letterName) {
    letterNameElement.textContent = letterName;
    letterNameElement.style.color = color;
  }
  const solfegeNameElement = noteElement.querySelector('.solfege-name');
  if (solfegeNameElement) {
    solfegeNameElement.textContent = solfegeKey.toLowerCase(); 
  }
}

// ===== SYLLABLE CREATION FUNCTIONS =====
function createNewSyllable(syllableText = '-') {
  const doColor = noteColorsByKey[currentKey]['Do'];
  const doLetterName = letterNamesByKey[currentKey]['Do'];
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
  textDiv.textContent = syllableText;
  noteDiv.appendChild(letterNameDiv);
  noteDiv.appendChild(solfegeNameDiv);
  syllableDiv.appendChild(noteDiv);
  syllableDiv.appendChild(textDiv);
  return syllableDiv;
}

function createNewLineFromText(text) {
  const syllables = text.trim().split(/\s+/).filter(syllable => syllable.length > 0);
  
  if (syllables.length === 0) {
    console.warn("No syllables found in input text");
    return;
  }

  const newLine = document.createElement('div');
  newLine.className = 'notation-line overflow';
  
  syllables.forEach(syllableText => {
    const syllable = createNewSyllable(syllableText);
    addSyllableEventListeners(syllable);
    newLine.appendChild(syllable);
  });
  
  const notationContainer = document.querySelector('.notation-container');
  notationContainer.appendChild(newLine);
  
  const firstSyllable = newLine.querySelector('.syllable');
  if (firstSyllable) {
    setSyllableAsActive(firstSyllable);
    scrollToSyllable(firstSyllable);
  }
  
  console.log(`Created new line with ${syllables.length} syllables:`, syllables);
}

function addSyllableAfterCurrent() {
  if (!editModeCheckbox.checked) return;
  const syllables = getAllSyllables();
  let targetSyllable, targetLine;
  if (currentSyllableIndex >= 0 && currentSyllableIndex < syllables.length) {
    targetSyllable = syllables[currentSyllableIndex];
    targetLine = targetSyllable.closest('.notation-line');
  } else {
    const lines = document.querySelectorAll('.notation-line');
    if (lines.length > 0) {
      targetLine = lines[lines.length - 1];
      const lastLineSyllables = targetLine.querySelectorAll('.syllable');
      targetSyllable = lastLineSyllables.length > 0 ? lastLineSyllables[lastLineSyllables.length - 1] : null;
    } else { console.warn("No notation lines to add syllable to."); return; }
  }
  if (!targetLine) { console.warn("Target line not found for adding syllable."); return; }
  const newSyllable = createNewSyllable();
  if (targetSyllable) targetSyllable.insertAdjacentElement('afterend', newSyllable);
  else targetLine.appendChild(newSyllable);
  addSyllableEventListeners(newSyllable);
  setSyllableAsActive(newSyllable); 
  return newSyllable;
}

function deleteSyllable() {
  if (!editModeCheckbox.checked || currentSyllableIndex < 0) return;
  
  const syllables = getAllSyllables();
  if (currentSyllableIndex >= syllables.length) return;
  
  const syllableToDelete = syllables[currentSyllableIndex];
  syllableToDelete.remove();
  
  const remainingSyllables = getAllSyllables();
  if (remainingSyllables.length === 0) {
    currentSyllableIndex = -1;
    navigationOffEndState = null;
  } else {
    if (currentSyllableIndex >= remainingSyllables.length) {
      currentSyllableIndex = remainingSyllables.length - 1;
    }
    setSyllableAsActive(remainingSyllables[currentSyllableIndex]);
  }
  
  resetDeleteConfirmation();
}

function addSyllableEventListeners(syllable) {
  syllable.addEventListener('click', (event) => { event.stopPropagation(); handleSyllableClick(syllable); });
  const noteElement = syllable.querySelector('.note');
  if (noteElement) noteElement.addEventListener('click', (event) => { event.stopPropagation(); handleNoteClick(noteElement); });
  const textElement = syllable.querySelector('.text');
  if (textElement) textElement.addEventListener('click', (event) => handleTextClick(textElement, event));
}

// ===== TEXT EDITING FUNCTIONS =====
function startTextEdit(textElement) {
  if (currentlyEditingText && currentlyEditingText !== textElement) finishTextEdit();
  currentlyEditingText = textElement;
  const syllable = textElement.closest('.syllable');
  syllable.classList.add('editing');
  currentEditingIndex = Array.from(getAllSyllables()).indexOf(syllable);
  const input = document.createElement('input');
  input.type = 'text'; input.className = 'text-input'; input.value = textElement.textContent;
  textElement.style.display = 'none'; textElement.parentNode.insertBefore(input, textElement);
  input.focus(); input.select();
  input.addEventListener('blur', () => { if (!isAdvancingToNext) finishTextEdit(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finishTextEdit();
    else if (e.key === 'Escape') cancelTextEdit();
    else if (e.key === ' ' && e.target.selectionStart === e.target.value.length) { e.preventDefault(); finishTextEditAndAdvance(); }
  });
  input.addEventListener('click', (e) => e.stopPropagation());
}

function finishTextEdit() {
  if (!currentlyEditingText) return;
  const syllable = currentlyEditingText.closest('.syllable');
  const input = syllable.querySelector('.text-input');
  if (input) { currentlyEditingText.textContent = input.value || 'text'; input.remove(); currentlyEditingText.style.display = 'flex'; }
  syllable.classList.remove('editing'); currentlyEditingText = null; currentEditingIndex = -1; isAdvancingToNext = false;
}

function finishTextEditAndAdvance() {
  if (!currentlyEditingText) return;
  
  const syllables = getAllSyllables(); 
  const currentSyllable = syllables[currentEditingIndex];
  const currentLine = currentSyllable.closest('.notation-line');
  const syllablesInCurrentLine = currentLine.querySelectorAll('.syllable');
  const indexInLine = Array.from(syllablesInCurrentLine).indexOf(currentSyllable);
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
    const nextLine = nextSyllable.closest('.notation-line');
    
    if (nextLine === currentLine) {
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
      if (editModeCheckbox.checked) {
        setSyllableAsActive(currentSyllable);
        
        const newSyllable = addSyllableAfterCurrent();
        
        if (newSyllable) {
          const newTextElement = newSyllable.querySelector('.text');
          if (newTextElement) {
            scrollToSyllable(newSyllable);
            setTimeout(() => {
              isAdvancingToNext = false;
              startTextEdit(newTextElement);
            }, 50);
          } else {
            isAdvancingToNext = false;
          }
        } else {
          isAdvancingToNext = false;
        }
      } else {
        isAdvancingToNext = false;
      }
    }
  } else {
    if (editModeCheckbox.checked) {
      setSyllableAsActive(currentSyllable);
      
      const newSyllable = addSyllableAfterCurrent();
      
      if (newSyllable) {
        const newTextElement = newSyllable.querySelector('.text');
        if (newTextElement) {
          scrollToSyllable(newSyllable);
          setTimeout(() => {
            isAdvancingToNext = false;
            startTextEdit(newTextElement);
          }, 50);
        } else {
          isAdvancingToNext = false;
        }
      } else {
        isAdvancingToNext = false;
      }
    } else {
      isAdvancingToNext = false;
    }
  }
}

function cancelTextEdit() {
  if (!currentlyEditingText) return;
  const syllable = currentlyEditingText.closest('.syllable'); const input = syllable.querySelector('.text-input');
  if (input) { input.remove(); currentlyEditingText.style.display = 'flex'; }
  syllable.classList.remove('editing'); currentlyEditingText = null; currentEditingIndex = -1; isAdvancingToNext = false;
}

// ===== TOGGLE FUNCTIONS =====
function toggleEditMode() {
  editModeCheckbox.checked = !editModeCheckbox.checked;
  editToggleBtn.classList.toggle('active', editModeCheckbox.checked);
  updateEditOnlyControlsVisibility();
  updateAddButtonState();
  updateDeleteButtonState();
  updateNewLineButtonState();
}
function syncEditButtonState() { editToggleBtn.classList.toggle('active', editModeCheckbox.checked); }
function toggleNames() {
  showNames = !showNames;
  document.querySelector('.notation-container').classList.toggle('show-names', showNames);
  document.body.classList.toggle('show-names', showNames);
  nameToggle.classList.toggle('active', showNames);
  updateChordBoxLabels();
}
function toggleChords() {
  chordMode = !chordMode;
  chordToggle.classList.toggle('active', chordMode);
  updateChordBoxesVisibility();
  console.log(`Chord mode ${chordMode ? 'enabled' : 'disabled'}`);
}
function toggleInfo() {
  infoVisible = !infoVisible;
  hints.classList.toggle('show', infoVisible);
  infoIcon.classList.toggle('active', infoVisible);
}
function toggleMinimize() {
  controlsMinimized = !controlsMinimized;
  controlsGroup.classList.toggle('minimized', controlsMinimized);
  minimizeBtn.textContent = controlsMinimized ? '▲' : '▼';
}
function updateAddButtonState() {
  addBtn.disabled = !editModeCheckbox.checked;
  addBtn.classList.toggle('active', editModeCheckbox.checked);
}
function updateDeleteButtonState() {
  deleteBtn.disabled = !editModeCheckbox.checked || currentSyllableIndex < 0;
  deleteBtn.classList.toggle('active', editModeCheckbox.checked && currentSyllableIndex >= 0);
}
function updateNewLineButtonState() {
  newLineBtn.disabled = !editModeCheckbox.checked;
  newLineBtn.classList.toggle('active', editModeCheckbox.checked);
}
function changeKey(newKey) {
  if (KEY_SIGNATURES_CHROMATIC_INDEX.hasOwnProperty(newKey)) {
    currentKey = newKey; 
    applyNoteColors(); 
    applyChordColors();
    updateChordBoxLabels();
    console.log(`Key changed to: ${newKey}`);
    resetAccidentalToggleVisuals();
  } else console.warn(`Attempted to change to invalid key: ${newKey}`);
}

// ===== NEW LINE POPUP FUNCTIONS =====
function showNewLinePopup() {
  if (!editModeCheckbox.checked) return;
  newLinePopup.classList.add('show');
  newLineText.value = '';
  newLineText.focus();
}

function hideNewLinePopup() {
  newLinePopup.classList.remove('show');
  newLineText.value = '';
}

function handleNewLineSubmit() {
  const text = newLineText.value.trim();
  if (text) {
    createNewLineFromText(text);
  }
  hideNewLinePopup();
}

// ===== NOTE EDITING FUNCTIONS =====
function changeNote(noteElement, direction = 'up', playSound = true) {
  const currentNoteClass = Array.from(noteElement.classList).find(c => noteOrder.includes(c));
  if (!currentNoteClass) return;
  const currentIndex = noteOrder.indexOf(currentNoteClass);
  let nextIndex = direction === 'up' ? (currentIndex + 1) % noteOrder.length : (currentIndex - 1 + noteOrder.length) % noteOrder.length;
  const nextNote = noteOrder[nextIndex];
  noteElement.classList.remove(currentNoteClass); noteElement.classList.add(nextNote);
  removeAccidentalFromNote(noteElement); 
  resetAccidentalToggleVisuals(); 
  updateNoteDisplay(noteElement, nextNote);
  if (playSound) {
    const frequency = getFrequencyForNote(nextNote); 
    if (frequency !== null) playNote(frequency);
  }
}

// ===== NAVIGATION FUNCTIONS =====
function enterDeselectedState(boundary) {
    const syllables = getAllSyllables();
    syllables.forEach(s => s.classList.remove('highlighted'));
    currentSyllableIndex = -1;
    navigationOffEndState = boundary;
    resetAccidentalToggleVisuals();
    resetDeleteConfirmation();
    updateDeleteButtonState();
}

function setSyllableAsActive(syllable) {
  const syllables = getAllSyllables();
  const newIndex = Array.from(syllables).indexOf(syllable);

  if (newIndex >= 0) {
    const isNewNoteBeingSelected = newIndex !== currentSyllableIndex;

    if (isNewNoteBeingSelected || navigationOffEndState !== null) {
      resetAccidentalToggleVisuals();
      resetDeleteConfirmation();
    }

    currentSyllableIndex = newIndex;
    navigationOffEndState = null;
    
    syllables.forEach(s => s.classList.remove('highlighted'));
    const currentSyllableElement = syllables[currentSyllableIndex];
    currentSyllableElement.classList.add('highlighted');
    scrollToSyllable(currentSyllableElement);
    const noteElement = currentSyllableElement.querySelector('.note');
    if (noteElement) playNoteWithAccidental(noteElement);
    
    updateDeleteButtonState();
  }
}

function navigateLeft() {
  const syllables = getAllSyllables();
  if (syllables.length === 0) return;

  if (currentSyllableIndex === 0) {
    enterDeselectedState('beforeStart');
  } else if (navigationOffEndState === 'beforeStart') {
    setSyllableAsActive(syllables[syllables.length - 1]);
  } else {
    let newIndex;
    if (currentSyllableIndex === -1) {
        newIndex = syllables.length - 1;
    } else {
        newIndex = (currentSyllableIndex - 1 + syllables.length) % syllables.length;
    }
    setSyllableAsActive(syllables[newIndex]);
  }
}

function navigateRight() {
  const syllables = getAllSyllables();
  if (syllables.length === 0) return;

  if (currentSyllableIndex === syllables.length - 1) {
    enterDeselectedState('afterEnd');
  } else if (navigationOffEndState === 'afterEnd') {
    setSyllableAsActive(syllables[0]);
  } else {
    let newIndex;
    if (currentSyllableIndex === -1) {
        newIndex = 0;
    } else {
        newIndex = (currentSyllableIndex + 1) % syllables.length;
    }
    setSyllableAsActive(syllables[newIndex]);
  }
}

function editCurrentNote(direction) { 
  const syllables = getAllSyllables();
  if (currentSyllableIndex >= 0 && currentSyllableIndex < syllables.length && editModeCheckbox.checked) {
    const noteElement = syllables[currentSyllableIndex].querySelector('.note');
    if (noteElement) changeNote(noteElement, direction, true);
  }
}

// ===== EVENT HANDLERS =====
function handleNoteClick(noteElement) {
  const syllable = noteElement.closest('.syllable');
  const syllableIndex = Array.from(getAllSyllables()).indexOf(syllable);
  
  if (syllableIndex !== currentSyllableIndex) {
    setSyllableAsActive(syllable);
    return;
  }
  
  if (editModeCheckbox.checked) {
    if (clickTimer) { 
      clearTimeout(clickTimer); 
      clickTimer = null; 
      changeNote(noteElement, 'down', true); 
    } else { 
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
  if (editModeCheckbox.checked && !currentlyEditingText) { event.stopPropagation(); startTextEdit(textElement); }
}

function handleDeleteClick() {
  if (!editModeCheckbox.checked || currentSyllableIndex < 0) return;
  
  if (!deleteConfirmationState) {
    deleteConfirmationState = true;
    deleteBtn.classList.add('confirm-delete');
    
    setTimeout(() => {
      if (deleteConfirmationState) {
        resetDeleteConfirmation();
      }
    }, 3000);
  } else {
    deleteSyllable();
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  accidentalMode = 'natural'; 
  currentSyllableIndex = -1;
  navigationOffEndState = null;
  deleteConfirmationState = false;
  chordMode = false;
  selectedChord = null;
  showNames = false;
  applyNoteColors(); 
  applyChordColors();
  updateChordBoxLabels();
  updateAddButtonState(); 
  updateDeleteButtonState();
  updateNewLineButtonState();
  updateEditOnlyControlsVisibility();
  updateChordBoxesVisibility();
  syncEditButtonState(); 
  if (keySelector) keySelector.value = currentKey;
  document.body.setAttribute('tabindex', '0');
  document.querySelectorAll('.syllable').forEach(syllable => addSyllableEventListeners(syllable));
  
  document.querySelectorAll('.chord-box').forEach(chordBox => {
    chordBox.addEventListener('click', () => handleChordBoxClick(chordBox));
  });
});

// ===== EVENT LISTENERS =====
infoIcon.addEventListener('click', toggleInfo);
minimizeBtn.addEventListener('click', toggleMinimize);
nameToggle.addEventListener('click', toggleNames);
chordToggle.addEventListener('click', toggleChords);
leftArrowBtn.addEventListener('click', navigateLeft);
rightArrowBtn.addEventListener('click', navigateRight);
addBtn.addEventListener('click', addSyllableAfterCurrent);
newLineBtn.addEventListener('click', showNewLinePopup);
deleteBtn.addEventListener('click', handleDeleteClick);
editToggleBtn.addEventListener('click', toggleEditMode);

cancelNewLine.addEventListener('click', hideNewLinePopup);
submitNewLine.addEventListener('click', handleNewLineSubmit);

newLinePopup.addEventListener('click', (event) => {
  if (event.target === newLinePopup) {
    hideNewLinePopup();
  }
});

newLineText.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideNewLinePopup();
  }
});

editModeCheckbox.addEventListener('change', () => { 
  syncEditButtonState(); 
  updateEditOnlyControlsVisibility();
  updateAddButtonState(); 
  updateDeleteButtonState();
  updateNewLineButtonState();
  if (!editModeCheckbox.checked) {
    resetAccidentalToggleVisuals();
    resetDeleteConfirmation();
    hideNewLinePopup();
    navigationOffEndState = null; 
  }
});

accidentalToggle.addEventListener('click', (event) => {
  const clickedOption = event.target.closest('.accidental-option');
  if (!clickedOption || !editModeCheckbox.checked || currentSyllableIndex < 0) {
    return;
  }
  const intendedAccidentalType = clickedOption.getAttribute('data-type'); 
  let actionAllowed = true;
  const syllables = getAllSyllables();
  const currentSyllableElement = syllables[currentSyllableIndex];
  const noteElement = currentSyllableElement.querySelector('.note');
  const noteClass = Array.from(noteElement.classList).find(c => noteOrder.includes(c));
  const baseSolfegeName = noteToSolfege[noteClass]; 
  if (accidentalMode !== intendedAccidentalType) { 
    if (intendedAccidentalType === 'flat') {
      if (baseSolfegeName === 'Do' || baseSolfegeName === 'Fa') {
        actionAllowed = false;
        console.log(`${baseSolfegeName} cannot be flat.`);
      }
    } else if (intendedAccidentalType === 'sharp') {
      if (baseSolfegeName === 'Mi' || baseSolfegeName === 'Ti') {
        actionAllowed = false;
        console.log(`${baseSolfegeName} cannot be sharp.`);
      }
    }
  }
  if (!actionAllowed) {
    return; 
  }
  if (accidentalMode === intendedAccidentalType) { 
    accidentalMode = 'natural'; 
    clickedOption.classList.remove('active'); 
  } else { 
    accidentalMode = intendedAccidentalType; 
    document.querySelectorAll('.accidental-option').forEach(opt => opt.classList.remove('active'));
    clickedOption.classList.add('active'); 
  }
  applyActiveAccidentalToCurrentNote(); 
});

keySelector.addEventListener('change', (event) => changeKey(event.target.value));
document.addEventListener('click', (event) => {
  if (currentlyEditingText && !event.target.closest('.syllable.editing') && !isAdvancingToNext) finishTextEdit();
  if (!event.target.closest('#deleteBtn') && deleteConfirmationState) {
    resetDeleteConfirmation();
  }
});

document.addEventListener('keydown', (event) => {
  if (isPopupOpen() || currentlyEditingText) return;
  
  if (event.key >= '1' && event.key <= '9') {
    event.preventDefault();
    selectChordByKeyNumber(event.key);
    return;
  }
  
  switch(event.key) {
    case 'ArrowLeft': event.preventDefault(); navigateLeft(); break;
    case 'ArrowRight': event.preventDefault(); navigateRight(); break;
    case 'ArrowUp': event.preventDefault(); editCurrentNote('up'); break;
    case 'ArrowDown': event.preventDefault(); editCurrentNote('down'); break;
    case 'Delete':
    case 'Backspace':
      if (editModeCheckbox.checked && currentSyllableIndex >= 0) {
        event.preventDefault();
        handleDeleteClick();
      }
      break;
  }
});
