"use client";

import { motion } from "framer-motion";
import {
  FaBullseye,
  FaCamera,
  FaCode,
  FaGraduationCap,
  FaHeart,
  FaLanguage,
} from "react-icons/fa6";

const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
export default function AboutPage() {
  return (
    <>
      {/* About Me Section */}
      <section className="snap-start flex flex-col justify-center items-center min-h-screen px-4 py-20 relative">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={sectionVariants}
            className="flex flex-col justify-center items-center gap-6"
          >
            <h1 className="w-fit text-3xl lg:text-5xl text-center font-semibold lg:font-extrabold border-t-8 border-slate-900 text-slate-900 dark:border-amber-50 dark:text-amber-50 py-3 lg:py-6">
              About Me
            </h1>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            className="flex flex-col md:flex-row items-center gap-8 mt-12"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="/images/shifaul.png"
              alt="Photo of Shifaul"
              className="w-64 h-64 rounded-full border-4 border-amber-50 object-cover shadow-xl"
            />
            <motion.p
              variants={sectionVariants}
              className="text-lg md:text-xl dark:text-gray-300 leading-relaxed"
            >
              {
                "I’m Md Shifaul Islam, a passionate software engineer and aspiring researcher dedicated to integrating Artificial Intelligence (AI) and Brain-Computer Interfaces (BCIs). My vision is to create thought-controlled systems that empower individuals with physical disabilities, enabling them to interact with the digital world in revolutionary ways. With a solid background in web development, virtual assistance, and neurotechnologies, I’m committed to advancing technology for greater accessibility and personalization."
              }
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section className="snap-start flex flex-col justify-center items-center min-h-screen px-4 py-20 bg-gray-800 text-white">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-semibold flex items-center gap-3 mb-8"
        >
          <FaGraduationCap
            size={30}
            className="text-amber-400 mix-blend-difference"
          />
          Education
        </motion.h2>
        <motion.ul
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="list-disc ml-6 space-y-4 text-lg"
        >
          <li>
            Diploma in Engineering (Computer) – Bangladesh Technical Education
            Board (CGPA 3.67/4.00)
          </li>
          <li>
            Secondary School Certificate (Science) – Rajshahi Education Board
            (GPA 5.00/5.00)
          </li>
        </motion.ul>
      </section>

      {/* Skills & Expertise Section */}
      <section className="snap-start flex flex-col justify-center items-center min-h-screen px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-semibold flex items-center gap-3 mb-8"
        >
          <FaCode size={30} className="text-amber-400 mix-blend-difference" />
          Skills & Expertise
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h3 className="text-2xl font-medium mb-4">Technical Skills</h3>
            <ul className="list-disc ml-6 space-y-2 text-lg">
              <li>Programming Languages: JavaScript, Python, C++, C#</li>
              <li>
                Web Development: React.js, Vue.js, Tailwind CSS, TypeScript
              </li>
              <li>Frameworks: Next.js, Nuxt.js, Django, Node.js, Prisma</li>
              <li>
                Embedded Systems: Arduino, ESP32 (proficient in MicroPython and
                C++ for IoT projects)
              </li>
            </ul>
          </motion.div>
          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h3 className="text-2xl font-medium mb-4">Soft Skills</h3>
            <ul className="list-disc ml-6 space-y-2 text-lg">
              <li>
                Problem Solving: Strong analytical skills to break down complex
                challenges
              </li>
              <li>
                Communication: Effectively convey technical ideas to
                non-technical audiences
              </li>
              <li>
                Adaptability: Willingness to learn and adapt to rapidly evolving
                tech landscapes
              </li>
              <li>
                Collaboration: Enjoys teamwork and values diverse perspectives
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Language Proficiency Section */}
      <section className="snap-start flex flex-col justify-center items-center min-h-screen px-4 py-20 bg-gray-800 text-white">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-semibold flex items-center gap-3 mb-8"
        >
          <FaLanguage
            size={30}
            className="text-amber-400 mix-blend-difference"
          />
          Language Proficiency
        </motion.h2>
        <motion.ul
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="list-disc ml-6 space-y-2 text-lg"
        >
          <li>Bengali: Native</li>
          <li>English: Fluent</li>
          <li>Russian: Beginner</li>
          <li>Hindi: Conversational</li>
          <li>Arabic: Basic reading comprehension</li>
          <li>Urdu: Limited understanding</li>
        </motion.ul>
      </section>

      {/* Future Goals Section */}
      <section className="snap-start flex flex-col justify-center items-center min-h-screen px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-semibold flex items-center gap-3 mb-8"
        >
          <FaBullseye
            size={30}
            className="text-amber-400 mix-blend-difference"
          />
          Future Goals
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Research Interests */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h3 className="text-2xl font-medium mb-4">Research Interests</h3>
            <ul className="list-disc ml-6 space-y-2 text-lg">
              <li>
                Brain-Computer Interfaces (BCI): Decoding brain signals for
                seamless human-computer interaction.
              </li>
              <li>
                AI in Accessibility: Leveraging AI to create assistive
                technology for individuals with physical limitations.
              </li>
              <li>
                Human-Robot Interaction: Integrating BCI and robotics for
                thought-controlled devices.
              </li>
            </ul>
          </motion.div>
          {/* Career Aspirations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h3 className="text-2xl font-medium mb-4">Career Aspirations</h3>
            <ul className="list-disc ml-6 space-y-2 text-lg">
              <li>Contribute to AI-BCI research and collaborative projects.</li>
              <li>
                Develop a thought-controlled operating system using EEG-based
                interfaces.
              </li>
              <li>
                Connect with global research communities to push technological
                boundaries.
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Personal Reflections Section */}
      <section className="snap-start flex flex-col justify-center items-center min-h-screen px-4 py-20 bg-gray-800 text-white">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-semibold flex items-center gap-3 mb-8 pb-2"
        >
          <FaHeart size={30} className="text-amber-400 mix-blend-difference" />
          Personal Reflections
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg max-w-2xl text-center"
        >
          My passion for technology goes beyond curiosity; it’s driven by a deep
          desire to make a meaningful impact. By merging AI with BCI, I aim to
          develop tools that improve lives and foster a more inclusive future.
        </motion.p>
      </section>

      {/* Hobbies & Interests Section  */}
      <section className="snap-start flex flex-col justify-center items-center min-h-screen px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-semibold flex items-center gap-3 mb-8"
        >
          <FaCamera size={30} className="text-amber-400 mix-blend-difference" />
          Hobbies & Interests
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/images/hobby.jpg"
            alt="Hobby"
            className="w-64 h-64 rounded-lg object-cover shadow-lg"
          />
          <motion.p className="text-lg max-w-xl">
            In my free time, I enjoy photography, exploring nature, and diving
            into topics like technology, science fiction, and the ethics of AI.
          </motion.p>
        </motion.div>
      </section>
      {/* <ScrollSnapButton className="fixed bottom-10 w-screen flex justify-center z-50" /> */}
    </>
  );
}
