"use client";

import { DELETE_BLOG_POST } from "@/app/api/graphql/mutations";
import { GET_BLOG_POSTS } from "@/app/api/graphql/queries";
import DeleteDialog from "@/components/admin/delete-dialog";
import EditDialog from "@/components/admin/edit-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IBlogPost } from "@/types/globals";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import EditBlogPostForm from "./edit-blogpost-form";

const BlogPostTable = () => {
  const { data, loading, error, refetch } = useQuery(GET_BLOG_POSTS);
  const [deleteBlogPost] = useMutation(DELETE_BLOG_POST);

  const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([]);

  // Sync blogPosts state with fetched data
  useEffect(() => {
    if (data?.blogPosts) {
      setBlogPosts(data.blogPosts);
    }
  }, [data]);

  // Handle deletion with proper GraphQL variable
  const handleDelete = async (id: string) => {
    console.log(`Deleting blog post with id: ${id}`);
    try {
      await deleteBlogPost({
        variables: { deleteBlogPostId: id }, // ✅ Correct GraphQL variable
      });

      // Remove post from state after deletion
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

      // Refetch to keep data consistent
      await refetch();
    } catch (err) {
      console.error("Error deleting blog post:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full mx-auto">
      {blogPosts.length === 0 ? (
        <p className="p-4 text-center">No blog posts found.</p>
      ) : (
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b dark:border-gray-600 text-gray-900 dark:text-gray-100">
              <TableHead className="p-2">Sl.</TableHead>
              <TableHead className="p-2">Title</TableHead>
              <TableHead className="p-2">Created At</TableHead>
              <TableHead className="p-2">Edit</TableHead>
              <TableHead className="p-2">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post, index) => (
              <TableRow
                key={post.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b dark:border-gray-600 text-gray-900 dark:text-gray-100"
              >
                <TableCell className="p-2 text-center">{index + 1}</TableCell>
                <TableCell className="p-2">{post.title}</TableCell>
                <TableCell className="p-2 text-center">
                  {new Date(post.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="p-2 text-center">
                  <EditDialog>
                    <EditBlogPostForm blogPost={post} />
                  </EditDialog>
                </TableCell>
                <TableCell className="p-2 text-center">
                  <DeleteDialog
                    Id={post.id}
                    item="Blog Post"
                    onDelete={handleDelete}
                    prefetchAction={refetch}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BlogPostTable;
