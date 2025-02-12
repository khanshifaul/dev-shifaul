"use client";
import { IBlogPost } from "@/types/globals";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FcBusinessman } from "react-icons/fc";

interface PostCardProps {
  post: IBlogPost;
}

const motion_image = {
  animate: {
    rotate: [0, 3],
    transition: {
      duration: 1,
    },
  },
};

const motion_card = {
  animate: {
    scale: [1, 1.05],
    transition: {
      duration: 1,
    },
  },
};

const PostCard = ({ post }: PostCardProps) => (
  <Link href={`/blog/${post.slug}`} className="w-full">
    <motion.div
      whileHover="animate"
      variants={motion_card}
      whileTap={{ scale: [1, 0.9], transition: { duration: 1 } }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <motion.div variants={motion_image}>
        <Image
          src={post.thumbnail}
          alt={post.title}
          width={400}
          height={250}
          className="w-full h-60 rounded-xl object-cover"
        />
      </motion.div>
      <div className="grid grid-cols-1 gap-4">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
        <div className="flex items-center gap-4 text-sm">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
            <FcBusinessman className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex flex-col">
            <span className="dark:text-white">
              By {post.author?.name || "Admin"}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Unknown date"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
);

export default PostCard;
