import { number, shortString } from "starknet";

export const numToFelt = (num: number.BigNumberish): string => number.toBN(num).toString(10);

export const strToFelt = (str: string): string => {
  return shortString.isShortString(str) ? number.toBN(shortString.encodeShortString(str)).toString(10) : "";
};

export const feltToNum = (felt: number.BigNumberish): number => Number(numToFelt(felt));

export const feltToStr = (felt: number.BigNumberish): string => {
  return shortString.decodeShortString(number.toHex(number.toBN(felt)));
};
