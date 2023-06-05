import * as bcrypt from 'bcrypt';
export const BCRYPT_SALT = 10;
export class Bcrypt {
  static hashSync(pass: string): string {
    return bcrypt.hashSync(pass, BCRYPT_SALT);
  }

  static hash(pass: string): Promise<string> {
    return bcrypt.hash(pass, BCRYPT_SALT);
  }

  static compare(pass: string, hash: string): Promise<boolean> {
    return bcrypt.compare(pass, hash);
  }
}
