import { Repository } from "./types";
import { InMemoryRepository } from "./inMemoryRepository";
import { ApiRepository } from "./apiRepository";

export type { Repository, User, Project } from "./types";

let repository: Repository | null = null;

export function getRepository(): Repository {
  if (!repository) {
    repository =
      process.env.NODE_ENV === "development"
        ? new InMemoryRepository()
        : new ApiRepository();
  }
  return repository;
}
