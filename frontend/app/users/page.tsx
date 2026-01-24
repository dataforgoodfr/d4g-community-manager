"use client";

import { Drawer, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "../lib/repository/types";
import { getRepository } from "../lib/repository";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    getRepository()
      .getUsers()
      .then((v) => setUsers(v.users));
  }, []);

  const [filterKey, setFilterKey] = useState<string>("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function filterUserFn(value: User): boolean {
    return `${value.username}${value.projects}${value.email}${value.id}${value.authentik_group}`
      .toLocaleLowerCase()
      .includes(filterKey.toLocaleLowerCase());
  }

  console.log(users);
  // TODO: thead fix : https://stackoverflow.com/questions/21168521/table-fixed-header-and-scrollable-body

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <Input
          placeholder="filter users"
          onChange={(e) => setFilterKey(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </div>
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
          {users.filter(filterUserFn).map((user) => (
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

  const onSubmit = (data: unknown) => {
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
