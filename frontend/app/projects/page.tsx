"use client";

import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
            <th className="border border-gray-300 px-4 py-2">Edit</th>
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
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setDrawerOpen(true);
                    setSelectedProject(project);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerContent project={selectedProject!} />
      </Drawer>
    </div>
  );
}

const DrawerContent = ({ project }: { project: Project }) => {
  const { register, handleSubmit } = useForm<Project>({ defaultValues: project });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-96 p-4">
      <h2 className="text-xl font-bold mb-4">Edit Project</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Project Name:
          <input type="text" {...register("name")} className="border border-gray-300 p-2 rounded" />
        </label>
        <label className="flex flex-col">
          Season:
          <input type="text" {...register("season")} className="border border-gray-300 p-2 rounded" />
        </label>
        <label className="flex flex-col">
          Description:
          <textarea {...register("description")} className="border border-gray-300 p-2 rounded" />
        </label>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};
