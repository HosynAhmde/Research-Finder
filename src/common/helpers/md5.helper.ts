import hash from 'crypto-js/md5';
export class Md5 {
  static hash(text: string): string {
    return hash(text).toString();
  }
}
