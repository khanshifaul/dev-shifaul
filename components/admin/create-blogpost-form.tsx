"use client";

import { CREATE_BLOG_POST } from "@/app/api/graphql/mutations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  thumbnail: z.string().url("Invalid URL format").optional(),
  content: z.string().min(1, "Content is required"),
  tags: z.string().optional(),
  published: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const NewBlogPostForm = () => {
  const [addBlogPost, { loading, error }] = useMutation(CREATE_BLOG_POST);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      thumbnail: "",
      content: "",
      tags: "",
      published: false,
    },
  });

  const content = form.watch("content");
  const title = form.watch("title");

  // Auto-generate slug from title using underscores
  useEffect(() => {
    if (!form.formState.touchedFields.slug) {
      const slug = title
        ?.toLowerCase()
        .replace(/\s+/g, "_") // Replace spaces with underscores
        .replace(/[^a-z0-9_]/g, ""); // Remove special characters
      form.setValue("slug", slug || "");
    }
  }, [title, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      await addBlogPost({
        variables: {
          input: {
            ...values,
            tags: values.tags
              ? values.tags.split(",").map((t) => t.trim())
              : [],
          },
        },
      });
      form.reset();
    } catch (err) {
      console.error("Error adding blog post:", err);
    }
  };

  return (
    <div className="w-full mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {["title", "slug", "thumbnail"].map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as keyof FormValues}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {field.name.charAt(0).toUpperCase() +
                          field.name.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="dark:bg-gray-800"
                          placeholder={
                            field.name === "thumbnail"
                              ? "https://example.com/image.jpg"
                              : `Enter ${field.name}`
                          }
                          value={field.value as string} // Ensure value is always a string
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="webdev, tutorial, nextjs"
                        className="dark:bg-gray-800"
                        value={field.value as string} // Ensure value is always a string
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content (Markdown)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={15}
                        className="dark:bg-gray-800 font-mono"
                        placeholder="Write your content in Markdown..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  onClick={() => form.setValue("published", false)}
                  variant="secondary"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Draft"}
                </Button>

                <Button
                  type="submit"
                  onClick={() => form.setValue("published", true)}
                  disabled={loading}
                >
                  {loading ? "Publishing..." : "Publish Now"}
                </Button>
              </div>

              {error && (
                <div className="text-red-500 mt-4">Error: {error.message}</div>
              )}
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Preview</h2>
              <div className="prose dark:prose-invert max-w-none border rounded-lg p-4 dark:bg-gray-800">
                {content ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    className="prose leading-relaxed w-full dark:prose-invert prose-headings:underline max-w-none"
                  >
                    {content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-gray-500">
                    Content preview will appear here
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewBlogPostForm;
