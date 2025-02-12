import NewBlogPostForm from "@/components/admin/create-blogpost-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New BlogPost",
};
const NewBlogPost = () => {
  return (
    <div>
      <NewBlogPostForm />
    </div>
  );
};

export default NewBlogPost;
