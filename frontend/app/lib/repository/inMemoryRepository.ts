import { Repository, User, Project } from "./types";

const projects: Project[] = [
  {
    id: "1",
    name: "Cartographie Solidaire",
    description: "Cartographie des associations et acteurs solidaires en France",
    users: [],
  },
  {
    id: "2",
    name: "Eco-Score",
    description: "Calcul de l'impact environnemental des produits alimentaires",
    users: [],
  },
  {
    id: "3",
    name: "Refugies.info",
    description: "Plateforme d'information pour les personnes refugiees",
    users: [],
  },
];

const users: User[] = [
  {
    id: "1",
    firstname: "Alice",
    lastname: "Martin",
    projects: [projects[0], projects[1]],
  },
  {
    id: "2",
    firstname: "Bob",
    lastname: "Dupont",
    projects: [projects[1]],
  },
  {
    id: "3",
    firstname: "Claire",
    lastname: "Bernard",
    projects: [projects[0], projects[2]],
  },
  {
    id: "4",
    firstname: "David",
    lastname: "Leroy",
    projects: [projects[2]],
  },
];

// Wire up the reverse relationships
projects[0].users = [users[0], users[2]];
projects[1].users = [users[0], users[1]];
projects[2].users = [users[2], users[3]];

export class InMemoryRepository implements Repository {
  async getUsers(): Promise<User[]> {
    return users;
  }

  async getProjects(): Promise<Project[]> {
    return projects;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return users.find((u) => u.id === id);
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    return projects.find((p) => p.id === id);
  }
}
