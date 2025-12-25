import { InvalidEmailError } from "../errors";

export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): Email {
    const normalized = value.trim().toLowerCase();

    if (!Email.isValid(normalized)) {
      throw new InvalidEmailError(value);
    }

    return new Email(normalized);
  }

  public getValue(): string {
    return this.value;
  }

  private static isValid(value: string): boolean {
    if (value.length < 3 || value.length > 254) {
      return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}
