import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaVk,
  FaXTwitter,
} from "react-icons/fa6";

export const SocialMediaLinks = () => {
  const links = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/khan-shifaul",
      icon: <FaLinkedin className="text-blue-700" />,
      description: "Connect with me on LinkedIn for professional updates.",
    },
    {
      name: "Github",
      href: "https://github.com/khanshifaul",
      icon: <FaGithub className="text-gray-700" />,
      description:
        "Check out my projects and open-source contributions on GitHub.",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/khanshifaul",
      icon: <FaXTwitter className="text-blue-400" />,
      description: "Catch my latest thoughts and threads on Twitter.",
    },
    {
      name: "Discord",
      href: "https://discord.com/khanshifaul",
      icon: <FaDiscord className="text-purple-500" />,
      description: "Join my Discord community and be part of the conversation!",
    },

    {
      name: "Facebook",
      href: "https://facebook.com/kh4nsh1f4ul",
      icon: <FaFacebook className="text-blue-600" />,
      description:
        "Follow me on Facebook for more personal insights and updates.",
    },
    {
      name: "VKontakte",
      href: "https://vk.com/khanshifaul",
      icon: <FaVk className="text-blue-600" />,
      description: "Follow me on VKontakte for social updates and content.",
    },
  ];

  return (
    <AnimatePresence>
      <motion.div className="flex flex-col items-center gap-6 p-6">
        <motion.h2
          animate={{
            opacity: [0, 100],
            transition: { duration: 1, ease: "easeInOut" },
          }}
          className="text-3xl font-bold mb-4 border-b-3 border-blue-500"
        >
          Connect with Me
        </motion.h2>
        {/* Intro Text */}
        <motion.p
          animate={{
            opacity: [0, 100],
            transition: { duration: 1, ease: "easeInOut" },
          }}
          className="text-gray-600 text-center max-w-lg"
        >
          I&apos;m active on various platforms! Follow me on social media to
          stay updated on my latest projects, thoughts, and more.
        </motion.p>

        {/* Social Links */}
        <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {links.map((link, index) => (
            <motion.div
              key={link.name}
              animate={{
                opacity: [0, 1],
                y: [0, 20],
                transition: { duration: 0.6, delay: index * 0.2 + 0.4 },
              }}
              className="flex flex-col items-center bg-light dark:bg-dark rounded-lg p-4 shadow-md shadow-blue-400 hover:shadow-lg transition duration-300"
            >
              <Link
                aria-label={link.name}
                className="flex flex-col items-center gap-2"
                href={link.href}
              >
                {link.icon}
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  {link.name}
                </span>
                <p className="text-sm text-gray-500 text-center max-w-xs">
                  {link.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
