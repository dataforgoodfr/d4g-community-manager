import { Repository, User, Project } from "./types";

const users: User[] = [
  {
    id: 1,
    pk_id: "u1",
    username: "alice.martin",
    email: "alice.martin@example.com",
    projects: ["Cartographie Solidaire", "Eco-Score"],
    authentik_group: "volunteers",
    is_active: true,
  },
  {
    id: 2,
    pk_id: "u2",
    username: "bob.dupont",
    email: "bob.dupont@example.com",
    projects: ["Eco-Score"],
    authentik_group: "volunteers",
    is_active: true,
  },
  {
    id: 3,
    pk_id: "u3",
    username: "claire.bernard",
    email: "claire.bernard@example.com",
    projects: ["Cartographie Solidaire", "Refugies.info"],
    authentik_group: "volunteers",
    is_active: true,
  },
  {
    id: 4,
    pk_id: "u4",
    username: "david.leroy",
    email: "david.leroy@example.com",
    projects: ["Refugies.info"],
    authentik_group: "volunteers",
    is_active: false,
  },
];

const projects: Project[] = [
  {
    id: 1,
    pk_id: "p1",
    name: "Cartographie Solidaire",
    description: "Cartographie des associations et acteurs solidaires en France",
    season: "2024",
    users: [
      { id: 1, username: "alice.martin", email: "alice.martin@example.com" },
      { id: 3, username: "claire.bernard", email: "claire.bernard@example.com" },
    ],
  },
  {
    id: 2,
    pk_id: "p2",
    name: "Eco-Score",
    description: "Calcul de l'impact environnemental des produits alimentaires",
    season: "2024",
    users: [
      { id: 1, username: "alice.martin", email: "alice.martin@example.com" },
      { id: 2, username: "bob.dupont", email: "bob.dupont@example.com" },
    ],
  },
  {
    id: 3,
    pk_id: "p3",
    name: "Refugies.info",
    description: "Plateforme d'information pour les personnes refugiees",
    season: "2024",
    users: [
      { id: 3, username: "claire.bernard", email: "claire.bernard@example.com" },
      { id: 4, username: "david.leroy", email: "david.leroy@example.com" },
    ],
  },
];

export class InMemoryRepository implements Repository {
  async getUsers(): Promise<User[]> {
    return users;
  }

  async getProjects(): Promise<Project[]> {
    return projects;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return users.find((u) => u.id === Number(id));
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    return projects.find((p) => p.id === Number(id));
  }
}
