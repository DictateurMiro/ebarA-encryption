// Linear Congruential Generator
function* lcg(seed, a, c, m) {
  while (true) {
    seed = (a * seed + c) % m;
    yield seed;e
  }
}

// Function to generate a random key
function generateKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to create a cipher dictionary from a key
function createCipherDict(key) {
  let seed = key.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const generator = lcg(seed, 1664525, 1013904223, Math.pow(2, 32));
  const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  const charToNum = {};
  for (const char of allChars) {
    charToNum[char] = generator.next().value % 1000000;
  }
  return charToNum;
}

// Function to encrypt text
function encryptText(text, cipherDict) {
  text = text.toLowerCase().replace(/ /g, 'X');
  const encryptedText = text.split('').map(char => cipherDict[char]).join(' ');
  return encryptedText;
}

// Function to decrypt text
function decryptText(encryptedText, cipherDict) {
  const numToChar = {};
  for (const [char, num] of Object.entries(cipherDict)) {
    numToChar[num] = char;
  }
  const decryptedText = encryptedText.split(' ').map(num => numToChar[parseInt(num)]).join('');
  return decryptedText.replace(/X/g, ' ');
}

function performAction() {
  const action = document.getElementById('action').value;
  let key = document.getElementById('key').value;
  if (!key) {
    key = generateKey();
    document.getElementById('key').value = key;
  }
  const cipherDict = createCipherDict(key);
  const text = document.getElementById('text').value;
  let output = '';

  if (action === 'encoder') {
    output = encryptText(text, cipherDict);
  } else if (action === 'décoder') {
    output = decryptText(text, cipherDict);
  }

  document.getElementById('output').value = output;
}

# Merci à Chat Gpt, d'ailleurs cette version n'a pas la meme génération de chiffrement a partir d'une clé donc un texte encoder via ce script js ne donneras pas la meme choses dans celui en python 
