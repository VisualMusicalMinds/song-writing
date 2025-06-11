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

const freqMap = {
  'so-low': 196.00, 'la-low': 220.00, 'ti-low': 246.94,
  'do': 261.63, 're': 293.66, 'mi': 329.63, 'fa': 349.23, 
  'so': 392.00, 'la': 440.00, 'ti': 493.88,
  'do-high': 523.25, 're-high': 587.33, 'mi-high': 659.25
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
const leftArrowBtn = document.getElementById('leftArrow');
const rightArrowBtn = document.getElementById('rightArrow');
const infoIcon = document.getElementById('infoIcon');
const hints = document.getElementById('hints');
const minimizeBtn = document.getElementById('minimizeBtn');
const controlsGroup = document.getElementById('controlsGroup');
const nameToggle = document.getElementById('nameToggle');
const addBtn = document.getElementById('addBtn');

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
  // Get the colors and letter names for 'Do' in current key
  const colors = noteColorsByKey[currentKey];
  const letterNames = letterNamesByKey[currentKey];
  const doColor = colors['Do'];
  const doLetterName = letterNames['Do'];
  
  // Create the syllable structure
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
  
  // Assemble the syllable
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
    // Add after the currently highlighted syllable
    targetSyllable = syllables[currentSyllableIndex];
    targetLine = targetSyllable.closest('.notation-line');
  } else {
    // No syllable selected, add to the last line
    const lines = document.querySelectorAll('.notation-line');
    targetLine = lines[lines.length - 1];
    const lastLineSyllables = targetLine.querySelectorAll('.syllable');
    targetSyllable = lastLineSyllables[lastLineSyllables.length - 1];
  }
  
  if (!targetLine || !targetSyllable) return;
  
  // Create new syllable
  const newSyllable = createNewSyllable();
  
  // Insert after the target syllable
  targetSyllable.insertAdjacentElement('afterend', newSyllable);
  
  // Add event listeners to the new syllable
  addSyllableEventListeners(newSyllable);
  
  // Update the current syllable index to point to the new syllable
  const updatedSyllables = getAllSyllables();
  const newIndex = Array.from(updatedSyllables).indexOf(newSyllable);
  currentSyllableIndex = newIndex;
  
  // Highlight and scroll to the new syllable
  highlightAndPlaySyllable(currentSyllableIndex);
  
  // Apply colors in case the key is not C
  applyNoteColors();
}

function addSyllableEventListeners(syllable) {
  // Add click listener to syllable
  syllable.addEventListener('click', (event) => {
    event.stopPropagation();
    handleSyllableClick(syllable);
  });
  
  // Add click listener to note
  const noteElement = syllable.querySelector('.note');
  if (noteElement) {
    noteElement.addEventListener('click', (event) => {
      event.stopPropagation();
      handleNoteClick(noteElement);
    });
  }
  
  // Add click listener to text
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
  
  // Track which syllable we're editing
  const syllables = getAllSyllables();
  currentEditingIndex = Array.from(syllables).indexOf(syllable);
  
  const currentText = textElement.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'text-input';
  input.value = currentText;
  
  // Replace the text element with input
  textElement.style.display = 'none';
  textElement.parentNode.insertBefore(input, textElement);
  
  // Focus and select all text
  input.focus();
  input.select();
  
  // Handle input events
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
  
  updateNoteDisplay(noteElement, nextNote);
  
  if (playSound) {
    const frequency = freqMap[nextNote];
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
    const noteClass = Array.from(noteElement.classList).find(c => freqMap[c]);
    if (noteClass) {
      playNote(freqMap[noteClass]);
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
  if (!editModeCheckbox.checked) {
    const noteClass = Array.from(noteElement.classList).find(c => freqMap[c]);
    if (noteClass) playNote(freqMap[noteClass]);
    return;
  }
  
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

editModeCheckbox.addEventListener('change', updateAddButtonState);

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
