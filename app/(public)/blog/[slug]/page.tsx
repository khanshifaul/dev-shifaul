"use client";

import { GET_BLOG_POST } from "@/app/api/graphql/queries"; // Adjust the import path as needed
import { IBlogPost } from "@/types/globals";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FcBusinessman } from "react-icons/fc";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import FeaturedArticles from "../_components/featured-articles";
import NewsletterForm from "../_components/newsletter-form";
import PostTags from "../_components/post-tags";

const BlogArticlePage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { loading, error, data } = useQuery(GET_BLOG_POST, {
    variables: { slug },
  });

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">Error: {error.message}</div>
    );

  const fetchedPost: IBlogPost = data?.blogPost;

  if (!fetchedPost) {
    return <div className="text-center p-8">Post not found.</div>;
  }

  return (
    <div className="container mx-auto p-2">
      <div className="flex flex-col justify-center items-center gap-2 p-4">
        <h1 className="text-4xl text-center font-bold mb-6">
          {fetchedPost.title}
        </h1>
        <div className="flex items-center gap-4 text-sm">
          {fetchedPost.author ? (
            <Image
              src={fetchedPost.author.avatar}
              alt={fetchedPost.author.name}
              width={100}
              height={100}
              className="w-10 h-10 aspect-square rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
              <FcBusinessman className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
          )}
          <div className="flex flex-col justify-between text-sm">
            <span>By {fetchedPost.author?.name || "Admin"}</span>
            <span className="text-gray-500">
              {fetchedPost.publishedAt
                ? new Date(fetchedPost.publishedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )
                : "Unknown date"}
            </span>
          </div>
        </div>
      </div>
      <Image
        src={fetchedPost.thumbnail}
        alt={fetchedPost.title}
        width={1200}
        height={600}
        className="w-full h-96 object-cover rounded-xl mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 w-full grid grid-cols-1 gap-8">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            className="prose leading-relaxed w-full dark:prose-invert prose-headings:underline max-w-none"
          >
            {fetchedPost.content}
          </ReactMarkdown>
        </div>
        <div className="relative md:col-span-1 w-full">
          <div className="sticky top-8 w-full flex flex-col gap-8">
            <NewsletterForm />
            <FeaturedArticles />
            <PostTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticlePage;
