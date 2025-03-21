import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

interface Tag {
  id: string;
  name: string;
}

export const GET_TAGS = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`;

const PostTags = () => {
  const { loading, data } = useQuery(GET_TAGS);

  const tags: Tag[] = data?.tags || [];

  return (
    <div className="mt-8">
      <div className="text-xl font-bold mb-4">Categories</div>
      <div className="flex flex-wrap gap-2">
        {loading ? (
          <>
            <Skeleton className="w-20 h-10 px-4 py-2 bg-amber-50 dark:bg-slate-600 dark:text-white text-slate-700 rounded-full hover:bg-amber-200 hover:dark:bg-slate-500 shadow transition-shadow" />
            <Skeleton className="w-18 h-10 px-4 py-2 bg-amber-50 dark:bg-slate-600 dark:text-white text-slate-700 rounded-full hover:bg-amber-200 hover:dark:bg-slate-500 shadow transition-shadow" />
            <Skeleton className="w-16 h-10 px-4 py-2 bg-amber-50 dark:bg-slate-600 dark:text-white text-slate-700 rounded-full hover:bg-amber-200 hover:dark:bg-slate-500 shadow transition-shadow" />
          </>
        ) : (
          tags.map((tag: Tag) => (
            <a
              key={tag.id}
              href="#"
              className="px-4 py-2 bg-amber-50 dark:bg-slate-600 dark:text-white text-slate-700 rounded-full hover:bg-amber-200 hover:dark:bg-slate-500 shadow transition-shadow"
            >
              {tag.name}
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default PostTags;
