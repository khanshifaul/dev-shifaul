"use client";
import { GET_BLOG_POSTS } from "@/app/api/graphql/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { IBlogPost } from "@/types/globals";
import { useQuery } from "@apollo/client";
import FeaturedArticles from "./_components/featured-articles";
import NewsletterForm from "./_components/newsletter-form";
import PostCard from "./_components/post-card";
import PostTags from "./_components/post-tags";
import SearchForm from "./_components/search-form";

interface BlogPostsQueryResult {
  blogPosts: IBlogPost[];
}

const BlogPage = () => {
  const { loading, data } = useQuery<BlogPostsQueryResult>(GET_BLOG_POSTS);

  // Filter published posts and exclude those with null publishedAt
  const publishedPosts =
    data?.blogPosts?.filter(
      (post) => post.published && post.publishedAt !== null
    ) || [];

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center text-center p-6">
        <div className="lg:w-1/2 flex flex-col justify-center items-center gap-6">
          <h1 className="w-fit text-3xl lg:text-5xl text-center font-semibold lg:font-extrabold border-t-8 border-slate-900 text-slate-900 dark:border-amber-50 dark:text-amber-50 py-3 lg:py-6">
            Blog
          </h1>
          <p className="lg:leading-loose text-lg lg:text-xl">
            {`Explore my latest insights and musings on a wide range of topics, from technology and software development to personal growth and self-improvement. Join me on this journey of continuous learning and discovery.`}
          </p>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-12 p-2">
        <div className="lg:col-span-2 w-full grid grid-cols-1 gap-8 ">
          {loading ? (
            <>
              <Skeleton className="w-full h-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg" />
              <Skeleton className="w-full h-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg" />
            </>
          ) : publishedPosts.length > 0 ? (
            publishedPosts.map((post: IBlogPost) => {
              const safeExcerpt = post.content
                ? `${post.content.substring(0, 100)}...`
                : "No content available";

              return (
                <PostCard
                  key={post.id}
                  post={{
                    ...post,
                    author: {
                      name: "Admin",
                      avatar: "",
                    },
                    excerpt: safeExcerpt,
                  }}
                />
              );
            })
          ) : (
            // Show "No Posts Found" if no posts are available
            <div className="text-center text-gray-500 dark:text-gray-400 text-xl p-12">
              No Posts Found!
            </div>
          )}
        </div>
        <div className="relative col-span-1 w-full">
          <div className="sticky top-20 w-full flex flex-col gap-8">
            <SearchForm />
            <NewsletterForm />
            <FeaturedArticles posts={publishedPosts} />
            <PostTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
