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

// ===== MUSICAL DATA & CONSTANTS =====
let currentKey = 'C';
let showNames = false;
let accidentalMode = 'natural'; 

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

// ===== STATE VARIABLES =====
let currentSyllableIndex = -1; // -1 means nothing is selected
let navigationOffEndState = null; // null, 'beforeStart', or 'afterEnd'
let clickTimer = null;
let infoVisible = false;
let controlsMinimized = false;
let currentlyEditingText = null;
let currentEditingIndex = -1;
let isAdvancingToNext = false;
let deleteConfirmationState = false; // Track if delete button has been pressed once
const DOUBLE_CLICK_DELAY = 300;

// ===== UTILITY FUNCTIONS =====
function getAllSyllables() {
  return document.querySelectorAll('.syllable');
}

function scrollToSyllable(syllable) {
  if (!syllable) return;
  syllable.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
}

function resetAccidentalToggleVisuals() {
    accidentalMode = 'natural'; // Reset internal state of the toggle
    document.querySelectorAll('.accidental-option').forEach(option => {
        option.classList.remove('active'); // Reset visual state of flat/sharp buttons
    });
}

function resetDeleteConfirmation() {
    deleteConfirmationState = false;
    deleteBtn.classList.remove('confirm-delete');
}

// ===== EDIT MODE VISIBILITY FUNCTIONS =====
function updateEditOnlyControlsVisibility() {
  if (editModeCheckbox.checked) {
    editOnlyControls.classList.add('show');
  } else {
    editOnlyControls.classList.remove('show');
  }
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
  // Split text by spaces and filter out empty strings
  const syllables = text.trim().split(/\s+/).filter(syllable => syllable.length > 0);
  
  if (syllables.length === 0) {
    console.warn("No syllables found in input text");
    return;
  }

  // Create a new notation line
  const newLine = document.createElement('div');
  newLine.className = 'notation-line overflow';
  
  // Create syllables for each word
  syllables.forEach(syllableText => {
    const syllable = createNewSyllable(syllableText);
    addSyllableEventListeners(syllable);
    newLine.appendChild(syllable);
  });
  
  // Add the new line to the notation container
  const notationContainer = document.querySelector('.notation-container');
  notationContainer.appendChild(newLine);
  
  // Activate the first syllable of the new line
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
  const updatedSyllables = getAllSyllables();
  // currentSyllableIndex will be set by setSyllableAsActive
  setSyllableAsActive(newSyllable); 
}

function deleteSyllable() {
  if (!editModeCheckbox.checked || currentSyllableIndex < 0) return;
  
  const syllables = getAllSyllables();
  if (currentSyllableIndex >= syllables.length) return;
  
  const syllableToDelete = syllables[currentSyllableIndex];
  const syllableParent = syllableToDelete.parentNode;
  
  // Remove the syllable from the DOM
  syllableToDelete.remove();
  
  // Update currentSyllableIndex after deletion
  const remainingSyllables = getAllSyllables();
  if (remainingSyllables.length === 0) {
    currentSyllableIndex = -1;
    navigationOffEndState = null;
  } else {
    // If we deleted the last syllable, move to the new last syllable
    if (currentSyllableIndex >= remainingSyllables.length) {
      currentSyllableIndex = remainingSyllables.length - 1;
    }
    // Highlight the new current syllable
    setSyllableAsActive(remainingSyllables[currentSyllableIndex]);
  }
  
  // Reset delete confirmation state
  resetDeleteConfirmation();
}

function addSyllableEventListeners(syllable) {
  syllable.addEventListener('click', (event) => { event.stopPropagation(); handleSyllableClick(syllable); });
  const noteElement = syllable.querySelector('.note');
  if (noteElement) noteElement.addEventListener('click', (event) => { event.stopPropagation(); handleNoteClick(noteElement); });
  const textElement = syllable.querySelector('.text');
  if (textElement) textElement.addEventListener('click', (event) => handleTextClick(textElement, event));
}

// ===== TEXT EDITING FUNCTIONS (Largely unchanged) =====
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
  const syllables = getAllSyllables(); const nextIndex = currentEditingIndex + 1; isAdvancingToNext = true;
  const syllable = currentlyEditingText.closest('.syllable'); const input = syllable.querySelector('.text-input');
  if (input) { currentlyEditingText.textContent = input.value || 'text'; input.remove(); currentlyEditingText.style.display = 'flex'; }
  syllable.classList.remove('editing'); currentlyEditingText = null; currentEditingIndex = -1;
  if (nextIndex < syllables.length) {
    const nextSyllable = syllables[nextIndex]; const nextTextElement = nextSyllable.querySelector('.text');
    if (nextTextElement) { scrollToSyllable(nextSyllable); setTimeout(() => { isAdvancingToNext = false; startTextEdit(nextTextElement); }, 50); }
    else isAdvancingToNext = false;
  } else isAdvancingToNext = false;
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
  updateEditOnlyControlsVisibility(); // Update visibility of edit-only controls
  updateAddButtonState();
  updateDeleteButtonState();
  updateNewLineButtonState();
}
function syncEditButtonState() { editToggleBtn.classList.toggle('active', editModeCheckbox.checked); }
function toggleNames() {
  showNames = !showNames;
  document.querySelector('.notation-container').classList.toggle('show-names', showNames);
  nameToggle.classList.toggle('active', showNames);
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
    currentKey = newKey; applyNoteColors(); console.log(`Key changed to: ${newKey}`);
    resetAccidentalToggleVisuals(); // Also reset toggle when key changes
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

// Helper to enter the "deselected" state when navigating off ends
function enterDeselectedState(boundary) { // boundary is 'beforeStart' or 'afterEnd'
    const syllables = getAllSyllables();
    syllables.forEach(s => s.classList.remove('highlighted'));
    currentSyllableIndex = -1;
    navigationOffEndState = boundary;
    resetAccidentalToggleVisuals(); // Ensure toggle is off and internal state is natural
    resetDeleteConfirmation(); // Reset delete confirmation when deselecting
    updateDeleteButtonState(); // Update delete button state
}

function setSyllableAsActive(syllable) {
  const syllables = getAllSyllables();
  const newIndex = Array.from(syllables).indexOf(syllable);

  if (newIndex >= 0) { // Ensure a valid syllable was found
    const isNewNoteBeingSelected = newIndex !== currentSyllableIndex;

    // Reset toggle if it's a new note selection OR if we were in an "off-end" state and now selecting a note
    if (isNewNoteBeingSelected || navigationOffEndState !== null) {
      resetAccidentalToggleVisuals();
      resetDeleteConfirmation(); // Reset delete confirmation when selecting a new note
    }

    currentSyllableIndex = newIndex;
    navigationOffEndState = null; // Selecting a valid note clears any boundary state
    
    // Highlight and play the newly active syllable
    syllables.forEach(s => s.classList.remove('highlighted')); // Deselect all others
    const currentSyllableElement = syllables[currentSyllableIndex];
    currentSyllableElement.classList.add('highlighted');
    scrollToSyllable(currentSyllableElement);
    const noteElement = currentSyllableElement.querySelector('.note');
    if (noteElement) playNoteWithAccidental(noteElement);
    
    // Update delete button state
    updateDeleteButtonState();
  }
}

function navigateLeft() {
  const syllables = getAllSyllables();
  if (syllables.length === 0) return;

  if (currentSyllableIndex === 0) { // Was on the first note
    enterDeselectedState('beforeStart');
  } else if (navigationOffEndState === 'beforeStart') { // currentSyllableIndex is -1 here, coming from off-start
    setSyllableAsActive(syllables[syllables.length - 1]); // Wrap to last note
  } else { // Includes initial -1 state (navigationOffEndState === null) or navigating from middle/afterEnd
    let newIndex;
    if (currentSyllableIndex === -1) { // Initial state, or came from 'afterEnd' and now going left
        newIndex = syllables.length - 1; // Go to last note
    } else {
        newIndex = (currentSyllableIndex - 1 + syllables.length) % syllables.length;
    }
    setSyllableAsActive(syllables[newIndex]);
  }
}

function navigateRight() {
  const syllables = getAllSyllables();
  if (syllables.length === 0) return;

  if (currentSyllableIndex === syllables.length - 1) { // Was on the last note
    enterDeselectedState('afterEnd');
  } else if (navigationOffEndState === 'afterEnd') { // currentSyllableIndex is -1 here, coming from off-end
    setSyllableAsActive(syllables[0]); // Wrap to first note
  } else { // Includes initial -1 state (navigationOffEndState === null) or navigating from middle/beforeStart
    let newIndex;
    if (currentSyllableIndex === -1) { // Initial state, or came from 'beforeStart' and now going right
        newIndex = 0; // Go to first note
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
  
  // First, activate the syllable if it's not already active
  if (syllableIndex !== currentSyllableIndex) {
    setSyllableAsActive(syllable);
    return; // Exit early - only activate on first click
  }
  
  // If we get here, the syllable is already active, so handle note changing
  if (editModeCheckbox.checked) {
    // Double click logic for diatonic change (also resets accidental toggle via changeNote)
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
    // First click - show confirmation state (red glow)
    deleteConfirmationState = true;
    deleteBtn.classList.add('confirm-delete');
    
    // Auto-reset after 3 seconds if no second click
    setTimeout(() => {
      if (deleteConfirmationState) {
        resetDeleteConfirmation();
      }
    }, 3000);
  } else {
    // Second click - actually delete the syllable
    deleteSyllable();
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  accidentalMode = 'natural'; 
  currentSyllableIndex = -1; // Start with no note selected
  navigationOffEndState = null; // Start with no boundary state
  deleteConfirmationState = false; // Start with no delete confirmation
  applyNoteColors(); 
  updateAddButtonState(); 
  updateDeleteButtonState();
  updateNewLineButtonState();
  updateEditOnlyControlsVisibility(); // Initialize visibility state
  syncEditButtonState(); 
  if (keySelector) keySelector.value = currentKey;
  document.body.setAttribute('tabindex', '0');
  document.querySelectorAll('.syllable').forEach(syllable => addSyllableEventListeners(syllable));
});

// ===== EVENT LISTENERS (for dynamic elements or global) =====
infoIcon.addEventListener('click', toggleInfo);
minimizeBtn.addEventListener('click', toggleMinimize);
nameToggle.addEventListener('click', toggleNames);
leftArrowBtn.addEventListener('click', navigateLeft);
rightArrowBtn.addEventListener('click', navigateRight);
addBtn.addEventListener('click', addSyllableAfterCurrent);
newLineBtn.addEventListener('click', showNewLinePopup);
deleteBtn.addEventListener('click', handleDeleteClick);
editToggleBtn.addEventListener('click', toggleEditMode);

// New line popup event listeners
cancelNewLine.addEventListener('click', hideNewLinePopup);
submitNewLine.addEventListener('click', handleNewLineSubmit);

// Close popup when clicking outside
newLinePopup.addEventListener('click', (event) => {
  if (event.target === newLinePopup) {
    hideNewLinePopup();
  }
});

// Handle escape key in popup
newLineText.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideNewLinePopup();
  }
});

editModeCheckbox.addEventListener('change', () => { 
  syncEditButtonState(); 
  updateEditOnlyControlsVisibility(); // Update visibility when checkbox changes
  updateAddButtonState(); 
  updateDeleteButtonState();
  updateNewLineButtonState();
  if (!editModeCheckbox.checked) { // If turning edit mode off, reset toggle and boundary state
    resetAccidentalToggleVisuals();
    resetDeleteConfirmation();
    hideNewLinePopup();
    navigationOffEndState = null; 
    // Optionally, deselect current note too if desired when exiting edit mode
    // if (currentSyllableIndex !== -1) enterDeselectedState(null); // This would deselect the note
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
  // Reset delete confirmation if clicking elsewhere
  if (!event.target.closest('#deleteBtn') && deleteConfirmationState) {
    resetDeleteConfirmation();
  }
});
document.addEventListener('keydown', (event) => {
  if (currentlyEditingText) return;
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
