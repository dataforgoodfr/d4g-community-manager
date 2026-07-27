export type User = {
  id: number;
  pk_id: string;
  username: string;
  email: string;
  projects: string[];
  authentik_group: string;
  is_active: boolean;
};

export type Project = {
  id: number;
  pk_id: string;
  name: string;
  description: string;
  season: string;
  users: {
    id: number;
    username: string;
    email: string;
  }[];
};

export interface Repository {
  getUsers(): Promise<User[]>;
  getProjects(): Promise<Project[]>;
  getUserById(id: string): Promise<User | undefined>;
  getProjectById(id: string): Promise<Project | undefined>;
}
