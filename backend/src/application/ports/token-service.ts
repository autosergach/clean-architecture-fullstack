export interface TokenPayload {
  userId: string;
}

export interface TokenService {
  issue(payload: TokenPayload): Promise<string>;
  verify(token: string): Promise<TokenPayload>;
}
