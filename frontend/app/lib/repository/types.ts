export type User = {
  id: string;
  firstname: string;
  lastname: string;
  projects: Project[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  users: User[];
};

export interface Repository {
  getUsers(): Promise<User[]>;
  getProjects(): Promise<Project[]>;
  getUserById(id: string): Promise<User | undefined>;
  getProjectById(id: string): Promise<Project | undefined>;
}
