export const allowedCharacters =
  /^[A-Za-z0-9 .,?'!/()&:;=+\-_"$@ㄱ-ㅎ가-힣ㅏ-ㅣéÉ\n]*$/;

/** Translate Tables */
export const morseCodeIndex = {
  '.-': 0,
  '-...': 1,
  '-.-.': 2,
  '-..': 3,
  '.': 4,
  '..-..': 5,
  '..-.': 6,
  '--.': 7,
  '....': 8,
  '..': 9,
  '.---': 10,
  '-.-': 11,
  '.-..': 12,
  '--': 13,
  '-.': 14,
  '---': 15,
  '.--.': 16,
  '--.-': 17,
  '.-.': 18,
  '...': 19,
  '-': 20,
  '..-': 21,
  '...-': 22,
  '.--': 23,
  '-..-': 24,
  '-.--': 25,
  '--..': 26,
  '-----': 27,
  '.----': 28,
  '..---': 29,
  '...--': 30,
  '....-': 31,
  '.....': 32,
  '-....': 33,
  '--...': 34,
  '---..': 35,
  '----.': 36,
  '.-.-.-': 37,
  '--..--': 38,
  '..--..': 39,
  '.----.': 40,
  '-.-.--': 41,
  '-..-.': 42,
  '-.--.': 43,
  '-.--.-': 44,
  '.-...': 45,
  '---...': 46,
  '-.-.-.': 47,
  '-...-': 48,
  '.-.-.': 49,
  '-....-': 50,
  '..--.-': 51,
  '.-..-.': 52,
  '...-..-': 53,
  '.--.-.': 54,
  '......': 55,
  '.....-': 56,
  '....-.': 57,
  '....--': 58,
  '...-..': 59,
  '...--.': 60,
  '...---': 61,
  '..-...': 62,
  '..-..-': 63,
  '..-.-.': 64,
  '..-.--': 65,
  '..---.': 66,
  '..----': 67,
  '.-....': 68,
  '.-...-': 69,
  '.-..--': 70,
  '.-.-..': 71,
  '.-.--.': 72,
  '.-.---': 73,
  '.--...': 74,
  '.--..-': 75,
  '.--.--': 76,
  '.---..': 77,
  '.---.-': 78,
  '.-----': 79,
  '---..-': 80,
  '---.-.': 81,
  '---.--': 82,
  '----..': 83,
  '-.....': 84,
  '-...-.': 85,
  '-...--': 86,
  '-..-..': 87,
  '-..-.-': 88,
  '-..--.': 89,
  '-..---': 90,
  '-.-...': 91,
  '-.-..-': 92,
  '-.--..': 93,
  '-.---.': 94,
  '-.----': 95,
  '--....': 96,
  '--...-': 97,
  '--..-.': 98,
  '--.-..': 99,
  '--.-.-': 100,
  '--.--.': 101,
  '--.---': 102,
  '----.-': 103,
  '-----.': 104,
  '------': 105,
};

export type MorseCode = keyof typeof morseCodeIndex;

export const DecryptingDisplay = {
  CodeLineCount: 6,
  CodeCount: 14,
};

function transfromShape(chunks: MorseCode[]): MorseCode[][][] {
  const result: MorseCode[][][] = [[[]]];
  let currentPageIndex = 0;
  let currentChunkIndex = 0;
  let currentChunkLength = 0;

  chunks.forEach((chunk: MorseCode) => {
    const chunkLength = chunk.length;
    if (
      currentChunkLength +
        result[currentPageIndex][currentChunkIndex].length +
        chunkLength >
      DecryptingDisplay.CodeCount
    ) {
      if (result[currentPageIndex].length < DecryptingDisplay.CodeLineCount) {
        currentChunkIndex += 1;
        result[currentPageIndex].push([]);
        currentChunkLength = 0;
      } else {
        currentPageIndex += 1;
        result.push([[]]);
        currentChunkIndex = 0;
        currentChunkLength = 0;
      }
    }
    result[currentPageIndex][currentChunkIndex].push(chunk);
    currentChunkLength += chunkLength;
  });

  return result;
}

export function convertStringToMorseCode(message: string): MorseCode[][][] {
  const chunks: MorseCode[] = [];

  message.split(' ').forEach((value) => {
    if (Object.prototype.hasOwnProperty.call(morseCodeIndex, value)) {
      chunks.push(value as MorseCode);
    }
  });

  return transfromShape(chunks);
}
