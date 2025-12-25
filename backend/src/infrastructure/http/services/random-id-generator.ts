import { IdGenerator } from "../../../application";
import { randomUUID } from "crypto";

export class RandomIdGenerator implements IdGenerator {
  generate(): string {
    return randomUUID();
  }
}
