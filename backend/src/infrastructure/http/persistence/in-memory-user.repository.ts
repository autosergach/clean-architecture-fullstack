import { User } from "../../../domain";
import { UserRepository } from "../../../application";

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<void> {
    const index = this.users.findIndex((stored) => stored.getId() === user.getId());
    if (index >= 0) {
      this.users[index] = user;
      return;
    }
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.getEmail() === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.getId() === id) ?? null;
  }
}
