import BlogPostTable from "@/components/admin/blogpost-table";
import PageTitle from "@/components/admin/page-title";
import RefreshBtn from "@/components/admin/refresh-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BlogPosts = async () => {
  return (
    <div>
      <PageTitle title="Blog Posts">
        <div className="flex gap-2">
          <RefreshBtn />
          <Button size={"sm"}>
            <Link href={"/admin/blog-posts/new"}>Add New BlogPost</Link>
          </Button>
        </div>
      </PageTitle>
      <BlogPostTable />
    </div>
  );
};

export default BlogPosts;
