import { User } from "./../../entities/User";
import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOne({
      where: {
        id: user_id,
      },
      relations: ["games"],
    });

    if (!user) {
      throw new Error("User does not exists");
    }

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("SELECT * from users ORDER BY first_name");
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(
      `SELECT * from users WHERE LOWER(first_name) = LOWER('${first_name}') AND LOWER(last_name) = LOWER('${last_name}')`
    );
  }
}
