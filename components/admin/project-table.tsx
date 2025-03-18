"use client";

import { DELETE_PROJECT } from "@/app/api/graphql/mutations";
import { GET_PROJECTS } from "@/app/api/graphql/queries";
import DeleteDialog from "@/components/admin/delete-dialog";
import EditDialog from "@/components/admin/edit-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProject } from "@/types/globals";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import EditProjectForm from "./edit-project-form";

const ProjectTable = () => {
  const { data, loading, error, refetch } = useQuery(GET_PROJECTS);
  const [deleteProject] = useMutation(DELETE_PROJECT);

  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    if (data?.projects) {
      setProjects(data.projects);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    try {
      await deleteProject({
        variables: { deleteProjectId: id },
      });

      setProjects((prev) => prev.filter((project) => project.id !== id));
      await refetch();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full mx-auto">
      {projects.length === 0 ? (
        <p className="p-4 text-center">No projects found.</p>
      ) : (
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b dark:border-gray-600 text-gray-900 dark:text-gray-100">
              <TableHead className="p-2">Sl.</TableHead>
              <TableHead className="p-2">Title</TableHead>
              <TableHead className="p-2">Client</TableHead>
              <TableHead className="p-2">Status</TableHead>
              <TableHead className="p-2">Tags</TableHead>
              <TableHead className="p-2">Edit</TableHead>
              <TableHead className="p-2">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow
                key={project.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b dark:border-gray-600 text-gray-900 dark:text-gray-100"
              >
                <TableCell className="p-2 text-center">{index + 1}</TableCell>
                <TableCell className="p-2">{project.title}</TableCell>
                <TableCell className="p-2">{project.client}</TableCell>
                <TableCell className="p-2 text-center">
                  <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 rounded-full">
                    {/* {project.status} */}
                  </span>
                </TableCell>
                <TableCell className="p-2">
                  {project.tags.map((tag) => tag.name).join(", ")}
                </TableCell>
                <TableCell className="p-2 text-center">
                  <EditDialog>
                    <EditProjectForm />
                  </EditDialog>
                </TableCell>
                <TableCell className="p-2 text-center">
                  <DeleteDialog
                    Id={project.id}
                    item="Project"
                    onDelete={handleDelete}
                    prefetchAction={refetch}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ProjectTable;
