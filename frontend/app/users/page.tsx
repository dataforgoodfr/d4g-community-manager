"use client";

import { Drawer } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // TODO: thead fix : https://stackoverflow.com/questions/21168521/table-fixed-header-and-scrollable-body

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Users</h1>

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
            <th className="border border-gray-300 px-4 py-2">Edit</th>
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
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setDrawerOpen(true);
                    setSelectedUser(user);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <DrawerContent user={selectedUser!} />
        </Drawer>
      </table>
    </div>
  );
}

const DrawerContent = ({ user }: { user: User }) => {
  const { register, handleSubmit } = useForm<User>({ defaultValues: user });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-96 p-4">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Username:
          <input type="text" {...register("username")} className="border border-gray-300 p-2 rounded" />
        </label>
        <label className="flex flex-col">
          Email:
          <input type="email" {...register("email")} className="border border-gray-300 p-2 rounded" />
        </label>
        <label className="flex flex-col">
          Authentik Group:
          <input type="text" {...register("authentik_group")} className="border border-gray-300 p-2 rounded" />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("is_active")} />
          Is Active
        </label>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};
