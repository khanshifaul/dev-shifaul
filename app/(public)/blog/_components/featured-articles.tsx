import { GET_BLOG_POSTS } from "@/app/api/graphql/queries"; // Adjust the import path as needed
import { Skeleton } from "@/components/ui/skeleton";
import { IBlogPost } from "@/types/globals";
import { useQuery } from "@apollo/client";
import Image from "next/image";

interface FeaturedArticlesProps {
  posts?: IBlogPost[];
}

const FeaturedArticles = ({ posts }: FeaturedArticlesProps) => {
  const { loading, data } = useQuery<{ blogPosts: IBlogPost[] }>(
    GET_BLOG_POSTS
  );

  // Use provided posts or fetch from query result
  const publishedPosts =
    posts ||
    data?.blogPosts?.filter(
      (post: IBlogPost) => post.published && post.publishedAt !== null
    ) ||
    [];

  // Sort posts by publishedAt in descending order and take the latest 5
  const featuredPosts = publishedPosts
    .filter((post) => post.publishedAt !== null) // Ensure publishedAt is not null
    .sort(
      (a: IBlogPost, b: IBlogPost) =>
        new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
    )
    .slice(0, 5);

  return (
    <div className="mt-8">
      <div className="text-xl font-bold mb-4">Featured</div>
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center space-x-4 hover:bg-gray-100 hover:dark:bg-slate-800 p-2 rounded-lg">
            <Skeleton className="w-16 h-16 rounded-lg aspect-square bg-amber-50 dark:bg-slate-600" />
            <Skeleton className="w-full h-16 bg-amber-50 dark:bg-slate-600" />
          </div>
        ) : (
          featuredPosts.map((post: IBlogPost) => (
            <a
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex items-center space-x-4 hover:bg-gray-100 hover:dark:bg-slate-800 p-2 rounded-lg"
            >
              <Image
                src={post.thumbnail}
                alt={post.title}
                width={64}
                height={64}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="text-sm font-medium">{post.title}</div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedArticles;
