"use client";
import { GET_PROJECT } from "@/app/api/graphql/queries"; // Adjust the import path as needed
import { IProject } from "@/types/globals"; // Import the IProject interface
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

const ProjectPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { slug },
  });

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">Error: {error.message}</div>
    );

  const project: IProject = data?.project;

  if (!project) {
    return <div className="text-center p-8">Project not found.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      {/* Project Header */}
      <div className="mb-12">
        <div className="w-36 border-t-8 py-8 border-white" />
        <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          {project.subtitle}
        </p>
      </div>

      {/* Project Thumbnail */}
      <div className="w-full h-[75vh] relative mb-12 bg-slate-800 rounded-lg">
        <Image
          src={project.thumbnail}
          alt={`${project.title} Thumbnail`}
          fill
          className="object-cover rounded-2xl"
        />
      </div>

      {/* Project Details */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column: Services, Technologies, and Website Link */}
        <div className="lg:sticky top-8 h-fit lg:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-6 font-bold">
          <div>
            <h2 className="text-slate-500 text-xl lg:text-2xl mb-4 uppercase">
              Client
            </h2>
            <p className="font-mono text-lg lg:text-xl dark:text-slate-300">
              {project.client}
            </p>
          </div>
          <div>
            <h2 className="text-slate-500 text-xl lg:text-2xl mb-4 uppercase">
              Services
            </h2>
            <p className="font-mono text-lg lg:text-xl dark:text-slate-300">
              {project.services.join(", ")}
            </p>
          </div>
          <div>
            <h2 className="text-slate-500 text-xl lg:text-2xl mb-4 uppercase">
              Technologies
            </h2>
            <p className="font-mono text-lg lg:text-xl dark:text-slate-300">
              {project.technologies.join(", ")}
            </p>
          </div>
          <div>
            <h2 className="text-slate-500 text-xl lg:text-2xl mb-4 uppercase">
              Website
            </h2>
            <Link
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-lg lg:text-xl hover:cursor-pointer relative group dark:text-slate-300 pb-2"
            >
              {`Live preview ↗`}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        {/* Right Column: About, Goals, Execution, and Results */}
        <div className="md:col-span-2 space-y-12">
          {/* About the Project */}
          <div className="w-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4">About the Project</h2>
            <ReactMarkdown className="prose leading-relaxed w-full dark:prose-invert prose-headings:underline max-w-none text-slate-600 dark:text-slate-300 overscroll-none text-lg">
              {project.about}
            </ReactMarkdown>
          </div>

          {/* Goal of the Project */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              What was the goal of the project?
            </h2>
            <ReactMarkdown className="prose leading-relaxed w-full dark:prose-invert prose-headings:underline max-w-none text-slate-600 dark:text-slate-300 overscroll-none text-lg">
              {project.goal}
            </ReactMarkdown>
            <div className="relative w-full grid grid-cols-1 gap-4 mt-4">
              {project.goalImages.map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative h-100 rounded-xl border-t-8 border-slate-800 dark:bg-slate-800 overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${project.title}_Goal_Image_${index}`}
                    fill
                    className="object-top object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Project Execution */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Project Execution</h2>
            <ReactMarkdown className="prose leading-relaxed w-full dark:prose-invert prose-headings:underline max-w-none text-slate-600 dark:text-slate-300 overscroll-none text-lg">
              {project.execution}
            </ReactMarkdown>
          </div>

          {/* Project Results */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Project Results</h2>
            <ReactMarkdown className="prose leading-relaxed w-full dark:prose-invert prose-headings:underline max-w-none text-slate-600 dark:text-slate-300 overscroll-none text-lg">
              {project.results}
            </ReactMarkdown>
            <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              {project.resultImages.map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative h-100 rounded-xl border-t-8 border-slate-800 dark:bg-slate-800 overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${project.title}_Result_Image_${index}`}
                    fill
                    className="object-top object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
