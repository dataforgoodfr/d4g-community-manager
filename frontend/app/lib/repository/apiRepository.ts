import { Repository, User, Project } from "./types";

export class ApiRepository implements Repository {
  private baseUrl: string;

  constructor() {
    const url = process.env.API_URL;
    if (!url) {
      throw new Error("API_URL environment variable is not set");
    }
    this.baseUrl = url;
  }

  async getUsers(): Promise<User[]> {
    const res = await fetch(`${this.baseUrl}/users`);
    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status}`);
    }
    return res.json().then((data) => data.users);
  }

  async getProjects(): Promise<Project[]> {
    const res = await fetch(`${this.baseUrl}/projects`);
    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status}`);
    }
    return res.json().then((data) => data.data);
  }

  async getUserById(id: string): Promise<User | undefined> {
    const res = await fetch(`${this.baseUrl}/users/${id}`);
    if (res.status === 404) {
      return undefined;
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch user ${id}: ${res.status}`);
    }
    return res.json();
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    const res = await fetch(`${this.baseUrl}/projects/${id}`);
    if (res.status === 404) {
      return undefined;
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch project ${id}: ${res.status}`);
    }
    return res.json();
  }
}
