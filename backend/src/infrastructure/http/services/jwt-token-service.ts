import { TokenPayload, TokenService } from "../../../application";
import jwt from "jsonwebtoken";

export class JwtTokenService implements TokenService {
  private readonly secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || "dev-secret";
  }

  async issue(payload: TokenPayload): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  async verify(token: string): Promise<TokenPayload> {
    const decoded = jwt.verify(token, this.secret);
    if (typeof decoded !== "object" || decoded === null || !("userId" in decoded)) {
      throw new Error("Invalid token payload.");
    }

    return { userId: String(decoded.userId) };
  }
}
