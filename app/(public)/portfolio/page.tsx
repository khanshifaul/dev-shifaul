"use client";
import { GET_PROJECTS } from "@/app/api/graphql/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { IProject } from "@/types/globals";
import { useQuery } from "@apollo/client";
import ProjectCard from "./_components/project-card";

const PortfolioPage = () => {
  const { loading, data } = useQuery(GET_PROJECTS);

  const projects: IProject[] = data?.projects || [];

  return (
    <div className="container mx-auto p-2">
      <div className="flex flex-col justify-center items-center text-center p-6">
        <div className="lg:w-1/2 flex flex-col justify-center items-center gap-6">
          <h1 className="w-fit text-3xl lg:text-5xl text-center font-semibold lg:font-extrabold border-t-8 border-slate-900 text-slate-900 dark:border-amber-50 dark:text-amber-50 py-3 lg:py-6">
            Portfolio
          </h1>
          <p className="lg:leading-loose text-lg lg:text-xl">
            {`Explore a curated selection of projects that represent the intersection of creativity, technology, and innovation. Each project is a testament to my commitment to developing practical, cutting-edge solutions.`}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-2 lg:p-0">
        {loading ? (
          <>
            <Skeleton className="w-full h-96 bg-slate-500 dark:bg-slate-900 rounded-4xl overflow-hidden" />

            <Skeleton className="w-full h-96 bg-slate-500 dark:bg-slate-900 rounded-4xl overflow-hidden" />
          </>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              client={project.client}
              title={project.title}
              slug={project.slug}
              tags={project.tags.map((tag) => tag.name)}
              logo={project.logo}
              thumbnail={project.thumbnail}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 text-xl p-12">
            No Projects Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
