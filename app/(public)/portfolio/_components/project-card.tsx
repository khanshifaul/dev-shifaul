"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  client: string;
  title: string;
  slug: string;
  tags: string[];
  logo: string;
  thumbnail: string;
}

const motion_card = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: [1, 1.05],
  },
  animate: {
    scale: [1.05, 1],
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};
const motion_image = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: [1, 1.05],
    delay: 0.2,
    transition: {
      duration: 1,
    },
  },
  animate: {
    scale: [1.05, 1],
  },
};

const ProjectCard = ({
  client,
  title,
  slug,
  tags,
  logo,
  thumbnail,
}: ProjectCardProps) => {
  return (
    <Link href={`/portfolio/${slug}`}>
      <motion.div
        initial="initial"
        whileHover="hover"
        variants={motion_card}
        whileTap="tap"
        className="relative h-fit bg-slate-500 dark:bg-slate-900 rounded-4xl overflow-hidden"
      >
        {/* Tags Section */}
        <div className="flex justify-end gap-4 pt-4 px-4 md:pt-12 md:px-12">
          {tags.slice(0, 3).map((tag, index) => (
            <div
              key={index}
              className="bg-slate-500 px-4 py-3 rounded-xl font-bold drop-shadow-md shadow-slate-900 dark:shadow-slate-500"
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Title and Logo Section */}
        <div className="flex flex-col gap-6 md:px-12 p-4 bg-transparent">
          <div className="flex justify-start items-center gap-4">
            <Image
              src={logo}
              alt={`${title} Logo`}
              width={100}
              height={100}
              className="rounded-xl w-8 h-8"
            />
            <h1 className="text-lg lg:text-2xl font-mono">{client}</h1>
          </div>
          <h2 className="text-xl lg:text-3xl font-bold lg:leading-loose">
            {title}
          </h2>
        </div>

        {/* Main Image Section */}
        <motion.div
          initial="initial"
          whileHover="hover"
          variants={motion_image}
          className="w-full h-[50vh] lg:h-[75vh] relative overflow-hidden"
        >
          <Image
            src={thumbnail}
            alt={`${title} Image`}
            fill
            className="object-top object-cover w-full h-full rounded-b-4xl"
          />
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
