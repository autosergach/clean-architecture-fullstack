import { PasswordHasher } from "../../../application";
import bcrypt from "bcryptjs";

export class BcryptPasswordHasher implements PasswordHasher {
  private readonly rounds = 10;

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.rounds);
  }

  async verify(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
