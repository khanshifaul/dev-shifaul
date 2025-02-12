"use client";
import { siteConfig } from "@/config/site.config";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className={`container mx-auto w-full max-h-full`}>
      <motion.section
        animate={{
          y: [25, 1],
          opacity: [0, 100],
          transition: {
            duration: 0.5,
            ease: "easeIn",
          },
        }}
        className="flex flex-col items-center justify-center p-2"
      >
        <div className="md:w-1/2 max-w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-xl text-center justify-center">
            <span className="border rounded-2xl font-mono font-semibold p-2 m-2 bg-gradient-to-b dark:from-slate-900 from-slate-300 to-transparent">
              {"Welcome to my portfolio!"}
            </span>
          </div>
          <div className="inline-block max-w-xl text-center text-5xl font-extrabold justify-center">
            <span
              className={
                "tracking-tight inline font-semibold text-3xl lg:text-4xl"
              }
            >{`I'm `}</span>
            <span
              className={
                "font-[AmadeusAP] leading-relaxed p-2 tracking-tight inline font-semibold from-[#325334] to-[#6e743a] text-4xl lg:text-6xl bg-clip-text dark:text-transparent bg-gradient-to-b"
              }
            >
              {"Shifaul Islam"}
            </span>
          </div>
          <div className="inline-block max-w-xl text-center justify-center">
            <div
              className={
                "w-full max-w-full text-lg lg:text-xl text-default-600 block  mt-4"
              }
            >
              {"Aspiring Software Engineer | AI & BCI Enthusiast"}
            </div>
          </div>
          <div className="mt-8 leading-relaxed text-center">
            <span
              className={
                "w-full max-w-full text-lg lg:text-xl text-default-600 block mt-4 text-center"
              }
            >
              {`Explore my journey in software engineering, AI, and BCI technology
            through my projects, skills, and vision for the future.`}
            </span>
            <div className="flex gap-3 text-center justify-center items-center mt-8">
              <motion.div
                animate={{
                  x: [-25, 1],
                  opacity: [0, 100],
                  transition: {
                    duration: 0.5,
                    ease: "easeIn",
                    delay: 0.5,
                  },
                }}
              >
                <Link
                  className={
                    "font-normal md:font-semibold text-white text-nowrap p-2 md:p-4 rounded-full border-2 border-blue-500 hover:border-blue-700 dark:text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-700 bg-blue-500 hover:bg-blue-700"
                  }
                  href={siteConfig.links.about}
                >
                  Know about me
                </Link>
              </motion.div>
              <motion.div
                animate={{
                  x: [25, 1],
                  opacity: [0, 100],
                  transition: {
                    duration: 0.5,
                    ease: "easeIn",
                    delay: 0.5,
                  },
                }}
              >
                <Link
                  className={
                    "font-normal md:font-semibold text-nowrap p-2 md:p-4 rounded-full border-2 border-slate-500 dark:text-white shadow-lg shadow-slate-500/50 hover:shadow-slate-700 hover:bg-slate-500"
                  }
                  href={siteConfig.links.contact}
                >
                  Connect with me
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
