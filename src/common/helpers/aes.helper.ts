import { AES as AES_ALGO, enc } from 'crypto-js';

const AES_KEY = process.env.AES_KEY;
export class AES {
  static encrypt(text: string): string {
    return AES_ALGO.encrypt(text, AES_KEY).toString();
  }

  static decrypt(cipherText: string): string {
    return AES_ALGO.decrypt(cipherText, AES_KEY).toString(enc.Utf8);
  }
}
