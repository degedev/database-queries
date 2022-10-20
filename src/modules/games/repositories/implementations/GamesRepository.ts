import { User } from "./../../../users/entities/User";
import { getRepository, Repository } from "typeorm";

import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("games")
      .where(`games.title ILIKE '%${param}%'`)
      .getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`SELECT COUNT(games.id) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const userRepository = getRepository(User);

    return userRepository
      .createQueryBuilder("users")
      .innerJoin(
        "users_games_games",
        "users_games_games",
        "users_games_games.usersId = users.id"
      )
      .where("users_games_games.gamesId = :pId", { pId: id })
      .getMany();
    // Complete usando query builder
  }
}
