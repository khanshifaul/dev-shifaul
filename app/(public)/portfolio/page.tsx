"use client";
import { GET_PROJECTS } from "@/app/api/graphql/queries";
import { IProject } from "@/types/globals";
import { useQuery } from "@apollo/client";
import ProjectCard from "./_components/project-card";

const PortfolioPage = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">Error: {error.message}</div>
    );

  const projects: IProject[] = data?.projects || [];

  return (
    <div className="container mx-auto p-2">
      <div className="flex flex-col justify-center items-center text-center p-6">
        <div className="lg:w-1/2 flex flex-col justify-center items-center gap-6">
          <h1 className="w-fit text-3xl lg:text-5xl text-center font-semibold lg:font-extrabold border-t-8 border-slate-900 text-slate-900 dark:border-amber-50 dark:text-amber-50 py-3 lg:py-6">
            Portfolio
          </h1>
          <p className="lg:leading-loose text-lg lg:text-xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
            voluptatum provident dignissimos dolorem esse omnis praesentium
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-2 lg:p-0">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            client={project.client}
            title={project.title}
            slug={project.slug}
            tags={project.tags.map((tag) => tag.name)}
            logo={project.logo}
            thumbnail={project.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
