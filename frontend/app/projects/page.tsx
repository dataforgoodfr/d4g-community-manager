interface Project {
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
}

export default function Home() {
  const projects: Project[] = [
    {
      id: 1,
      pk_id: "pk_12345",
      name: "Project Alpha",
      description: "This is the first project.",
      season: "Spring 2024",
      users: [
        {
          id: 1,
          username: "John Doe",
          email: "john.doe@example.com",
        },
        {
          id: 3,
          username: "John Doe 2",
          email: "john.doe2@example.com",
        },
        {
          id: 4,
          username: "John Doe 3",
          email: "john.doe3@example.com",
        },
        {
          id: 5,
          username: "John Doe 4",
          email: "john.doe4@example.com",
        },
      ],
    },
    {
      id: 2,
      pk_id: "pk_67890",
      name: "Project Beta",
      description: "This is the second project.",
      season: "Summer 2026",
      users: [
        {
          id: 2,
          username: "Jane Smith",
          email: "jane.smith@example.com",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Projects</h1>
      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Pk ID</th>
            <th className="border border-gray-300 px-4 py-2">Project Name</th>
            <th className="border border-gray-300 px-4 py-2">Season</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Users</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="border border-gray-300 px-4 py-2">{project.id}</td>
              <td className="border border-gray-300 px-4 py-2">{project.pk_id}</td>
              <td className="border border-gray-300 px-4 py-2">{project.name}</td>
              <td className="border border-gray-300 px-4 py-2">{project.season}</td>
              <td className="border border-gray-300 px-4 py-2">{project.description}</td>
              <td className="border border-gray-300 px-4 py-2">
                {project.users.map((user) => `${user.username} (${user.email})`).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
