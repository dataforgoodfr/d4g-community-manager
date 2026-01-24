interface User {
  id: number;
  pk_id: string;
  username: string;
  email: string;
  projects: string[];
  authentik_group: string;
  is_active: boolean;
}

export default function Home() {
  const users: User[] = [
    {
      id: 1,
      pk_id: "pk_12345",
      username: "John Doe",
      email: "john.doe@example.com",
      projects: [
        "Project A",
        "Project B",
        "Project A",
        "Project B",
        "Project A",
        "Project B",
        "Project A",
        "Project B",
        "Project A",
        "Project B",
      ],
      authentik_group: "Group 1",
      is_active: true,
    },
    {
      id: 2,
      pk_id: "pk_67890",
      username: "Jane Smith",
      email: "jane.smith@example.com",
      projects: ["Project C"],
      authentik_group: "Group 2",
      is_active: false,
    },
  ];

  return (
    <div>
      <h1>Users</h1>
      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Pk ID</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Projects</th>
            <th className="border border-gray-300 px-4 py-2">Authentik Group</th>
            <th className="border border-gray-300 px-4 py-2">Is Active</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.pk_id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.projects.join(", ")}</td>
              <td className="border border-gray-300 px-4 py-2">{user.authentik_group}</td>
              <td className="border border-gray-300 px-4 py-2">{user.is_active ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
