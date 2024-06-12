export const enum Bar {
  SHORT = "SHORT",
  UP = "UP",
  DOWN = "DOWN",
  LONG = "LONG",
}

export type RegularCharacter = [Bar, Bar, Bar, Bar];

export const regularCharacterMap: Record<string, RegularCharacter> = {
  "0": [Bar.SHORT, Bar.SHORT, Bar.LONG, Bar.LONG],
  "1": [Bar.SHORT, Bar.DOWN, Bar.UP, Bar.LONG],
  "2": [Bar.SHORT, Bar.DOWN, Bar.LONG, Bar.UP],
  "3": [Bar.DOWN, Bar.SHORT, Bar.UP, Bar.LONG],
  "4": [Bar.DOWN, Bar.SHORT, Bar.LONG, Bar.UP],
  "5": [Bar.DOWN, Bar.DOWN, Bar.UP, Bar.UP],
  "6": [Bar.SHORT, Bar.UP, Bar.DOWN, Bar.LONG],
  "7": [Bar.SHORT, Bar.LONG, Bar.SHORT, Bar.LONG],
  "8": [Bar.SHORT, Bar.LONG, Bar.DOWN, Bar.UP],
  "9": [Bar.DOWN, Bar.UP, Bar.SHORT, Bar.LONG],
  A: [Bar.DOWN, Bar.UP, Bar.DOWN, Bar.UP],
  B: [Bar.DOWN, Bar.LONG, Bar.SHORT, Bar.UP],
  C: [Bar.SHORT, Bar.UP, Bar.LONG, Bar.DOWN],
  D: [Bar.SHORT, Bar.LONG, Bar.UP, Bar.DOWN],
  E: [Bar.SHORT, Bar.LONG, Bar.LONG, Bar.SHORT],
  F: [Bar.DOWN, Bar.UP, Bar.UP, Bar.DOWN],
  G: [Bar.DOWN, Bar.UP, Bar.LONG, Bar.SHORT],
  H: [Bar.DOWN, Bar.LONG, Bar.UP, Bar.SHORT],
  I: [Bar.UP, Bar.SHORT, Bar.DOWN, Bar.LONG],
  J: [Bar.UP, Bar.DOWN, Bar.SHORT, Bar.LONG],
  K: [Bar.UP, Bar.DOWN, Bar.DOWN, Bar.UP],
  L: [Bar.LONG, Bar.SHORT, Bar.SHORT, Bar.LONG],
  M: [Bar.LONG, Bar.SHORT, Bar.DOWN, Bar.UP],
  N: [Bar.LONG, Bar.DOWN, Bar.SHORT, Bar.UP],
  O: [Bar.UP, Bar.SHORT, Bar.LONG, Bar.DOWN],
  P: [Bar.UP, Bar.DOWN, Bar.UP, Bar.DOWN],
  Q: [Bar.UP, Bar.DOWN, Bar.LONG, Bar.SHORT],
  R: [Bar.LONG, Bar.SHORT, Bar.UP, Bar.DOWN],
  S: [Bar.LONG, Bar.SHORT, Bar.LONG, Bar.SHORT],
  T: [Bar.LONG, Bar.DOWN, Bar.UP, Bar.SHORT],
  U: [Bar.UP, Bar.UP, Bar.DOWN, Bar.DOWN],
  V: [Bar.UP, Bar.LONG, Bar.SHORT, Bar.DOWN],
  W: [Bar.UP, Bar.LONG, Bar.DOWN, Bar.SHORT],
  X: [Bar.LONG, Bar.UP, Bar.SHORT, Bar.DOWN],
  Y: [Bar.LONG, Bar.UP, Bar.DOWN, Bar.SHORT],
  Z: [Bar.LONG, Bar.LONG, Bar.SHORT, Bar.SHORT],
};

export const enum SpecialCharacters {
  START,
  STOP,
}

export type SpecialCharacter = [Bar];

export const specialCharacterMap: Record<string, SpecialCharacter> = {
  [SpecialCharacters.START]: [Bar.UP],
  [SpecialCharacters.STOP]: [Bar.LONG],
};

export function barTopValue(bar: Bar): 0 | 1 {
  switch (bar) {
    case Bar.SHORT:
    case Bar.DOWN:
      return 0;

    case Bar.UP:
    case Bar.LONG:
      return 1;
  }
}

export function barBottomValue(bar: Bar): 0 | 1 {
  switch (bar) {
    case Bar.SHORT:
    case Bar.UP:
      return 0;

    case Bar.LONG:
    case Bar.DOWN:
      return 1;
  }
}

export const weights = [4, 2, 1, 0];

export function characterTopValue(character: RegularCharacter): number {
  return sum(
    character.map((char, index) => barTopValue(char) * weights[index])
  );
}

export function characterBottomValue(character: RegularCharacter): number {
  return sum(
    character.map((char, index) => barBottomValue(char) * weights[index])
  );
}

function lookupBar(extendTop: boolean, extendBottom: boolean): Bar {
  if (!extendTop && !extendBottom) {
    return Bar.SHORT;
  }
  if (extendTop && !extendBottom) {
    return Bar.UP;
  }
  if (!extendTop && extendBottom) {
    return Bar.DOWN;
  }
  return Bar.LONG;
}

function shouldExtend(sum: number): [boolean, boolean, boolean, boolean] {
  switch (sum % 6) {
    case 0:
      return [true, true, false, false];
    case 1:
      return [false, false, true, true];
    case 2:
      return [false, true, false, true];
    case 3:
      return [false, true, true, false];
    case 4:
      return [true, false, false, true];
    case 5:
      return [true, false, true, false];
    default:
      throw new Error("Unexpected");
  }
}

export function checksum(characters: RegularCharacter[]): RegularCharacter {
  let top = sum(characters.map(characterTopValue));
  let topExtensions = shouldExtend(top);

  let bottom = sum(characters.map(characterBottomValue));
  let bottomExtensions = shouldExtend(bottom);

  return [
    lookupBar(topExtensions[0], bottomExtensions[0]),
    lookupBar(topExtensions[1], bottomExtensions[1]),
    lookupBar(topExtensions[2], bottomExtensions[2]),
    lookupBar(topExtensions[3], bottomExtensions[3]),
  ];
}

export function buildBarcode(input: string): Bar[] {
  const characters = input.split("").map((char) => {
    const found = regularCharacterMap[char.toUpperCase()];
    if (!found) {
      throw new Error(`Unexpected character ${char}`);
    }
    return found;
  });
  return [
    specialCharacterMap[SpecialCharacters.START],
    ...characters,
    checksum(characters),
    specialCharacterMap[SpecialCharacters.STOP],
  ].flat();
}

export function validateData() {
  const chars = Object.values(regularCharacterMap);
  const setChars = new Set<string>();

  chars.forEach((char) => {
    if (char.length !== 4) {
      throw new Error("Invalid character length");
    }

    let topSum = sum(char.map(barTopValue));
    if (topSum !== 2) {
      throw new Error("Character should extend up twice");
    }

    let bottomSum = sum(char.map(barTopValue));
    if (bottomSum !== 2) {
      throw new Error("Character should extend down twice");
    }

    setChars.add(char.join(""));
  });

  if (Array.from(setChars).length !== chars.length) {
    throw new Error("Characters were not unique");
  }

  const sampleInput = "BX11LT1A";
  const sampleOutput = `UP
DOWN
LONG
SHORT
UP
LONG
UP
SHORT
DOWN
SHORT
DOWN
UP
LONG
SHORT
DOWN
UP
LONG
LONG
SHORT
SHORT
LONG
LONG
DOWN
UP
SHORT
SHORT
DOWN
UP
LONG
DOWN
UP
DOWN
UP
UP
SHORT
DOWN
LONG
LONG`;

  const sample = buildBarcode(sampleInput).join("\n");
  if (sample !== sampleOutput) {
    throw new Error("Sample was not valid");
  }

  console.log("Barcode data validated");
}

function sum(array: number[]): number {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += array[i];
  }
  return result;
}
