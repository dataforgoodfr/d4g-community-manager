"use client";

import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Project } from "../lib/repository/types";
import { getRepository } from "../lib/repository";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    getRepository().getProjects().then(setProjects);
  }, []);

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
  const { register, handleSubmit } = useForm<Project>({
    defaultValues: project,
  });

  const onSubmit = (data: unknown) => {
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
