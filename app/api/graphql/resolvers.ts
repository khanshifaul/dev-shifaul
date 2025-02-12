import {
  BlogPost,
  Message,
  NewsletterSubscriber,
  Project,
  Tag,
} from "@prisma/client";
import { Context } from "./route";
import { dateTimeScalar } from "./scalar";

interface CreateMessageInput {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface UpdateMessageInput {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface CreateNewsletterSubscriberInput {
  email: string;
}

interface CreateBlogPostInput {
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  tags: string[];
  reactions?: number;
  published: boolean;
  publishedAt?: Date | null;
}

interface UpdateBlogPostInput {
  title?: string;
  slug?: string;
  thumbnail?: string;
  content?: string;
  tags?: string[];
  reactions?: number;
  published?: boolean;
  publishedAt?: Date | null;
}

interface CreateTagInput {
  name: string;
}

interface UpdateTagInput {
  name?: string;
}

interface CreateProjectInput {
  slug: string;
  title: string;
  subtitle?: string;
  client?: string;
  logo?: string;
  services: string[];
  technologies: string[];
  website: string;
  thumbnail: string;
  about: string;
  goal: string;
  execution: string;
  results: string;
  goalImages: string[];
  resultImages: string[];
  tags?: string[];
}

interface UpdateProjectInput {
  id: string;
  slug?: string;
  title?: string;
  subtitle?: string;
  client?: string;
  logo?: string;
  services?: string[];
  technologies?: string[];
  website?: string;
  thumbnail?: string;
  about?: string;
  goal?: string;
  execution?: string;
  results?: string;
  goalImages?: string[];
  resultImages?: string[];
  tags?: string[];
}

export const resolvers = {
  DateTime: dateTimeScalar,

  Query: {
    messages: async (
      _: unknown,
      __: unknown,
      context: Context
    ): Promise<Message[]> => {
      return context.db.message.findMany();
    },
    message: async (
      _: unknown,
      { id }: { id: string },
      context: Context
    ): Promise<Message | null> => {
      return context.db.message.findUnique({ where: { id } });
    },
    newsletterSubscribers: async (
      _: unknown,
      __: unknown,
      context: Context
    ): Promise<NewsletterSubscriber[]> => {
      return context.db.newsletterSubscriber.findMany();
    },
    newsletterSubscriber: async (
      _: unknown,
      { id }: { id: string },
      context: Context
    ): Promise<NewsletterSubscriber | null> => {
      return context.db.newsletterSubscriber.findUnique({ where: { id } });
    },
    blogPosts: async (
      _: unknown,
      __: unknown,
      context: Context
    ): Promise<BlogPost[]> => {
      return context.db.blogPost.findMany({ include: { tags: true } });
    },
    blogPost: async (
      _: unknown,
      { slug }: { slug: string },
      context: Context
    ): Promise<BlogPost | null> => {
      return context.db.blogPost.findUnique({
        where: { slug },
        include: { tags: true },
      });
    },
    tags: async (_: unknown, __: unknown, context: Context): Promise<Tag[]> => {
      return context.db.tag.findMany({
        include: { blogPosts: true, projects: true },
      });
    },
    tag: async (
      _: unknown,
      { id }: { id: string },
      context: Context
    ): Promise<Tag | null> => {
      return context.db.tag.findUnique({
        where: { id },
        include: { blogPosts: true, projects: true },
      });
    },
    projects: async (
      _: unknown,
      __: unknown,
      context: Context
    ): Promise<Project[]> => {
      return context.db.project.findMany({
        include: { tags: true },
      });
    },
    project: async (
      _: unknown,
      { slug }: { slug: string },
      context: Context
    ): Promise<Project | null> => {
      return context.db.project.findUnique({
        where: { slug },
        include: { tags: true },
      });
    },
  },

  Mutation: {
    createMessage: async (
      _: unknown,
      { input }: { input: CreateMessageInput },
      context: Context
    ): Promise<Message> => {
      const createdAt = new Date();
      return context.db.message.create({
        data: { ...input, createdAt, updatedAt: createdAt },
      });
    },
    updateMessage: async (
      _: unknown,
      { id, input }: { id: string; input: UpdateMessageInput },
      context: Context
    ): Promise<Message> => {
      const data = { ...input, updatedAt: new Date() };
      return context.db.message.update({ where: { id }, data });
    },
    deleteMessage: async (
      _: unknown,
      { id }: { id: string },
      context: Context
    ): Promise<Message> => {
      return context.db.message.delete({ where: { id } });
    },
    createNewsletterSubscriber: async (
      _: unknown,
      { input }: { input: CreateNewsletterSubscriberInput },
      context: Context
    ): Promise<NewsletterSubscriber> => {
      return context.db.newsletterSubscriber.create({
        data: { ...input },
      });
    },
    deleteNewsletterSubscriber: async (
      _: unknown,
      { id }: { id: string },
      context: Context
    ): Promise<NewsletterSubscriber> => {
      return context.db.newsletterSubscriber.delete({ where: { id } });
    },
    createBlogPost: async (
      _: unknown,
      { input }: { input: CreateBlogPostInput },
      context: Context
    ): Promise<BlogPost> => {
      const { tags, published, ...rest } = input;
      const publishedAt = published ? new Date() : null; // Use `null` if `published` is false
      return context.db.blogPost.create({
        data: {
          ...rest,
          published,
          publishedAt,
          updatedAt: new Date(),
          tags: {
            connectOrCreate: tags.map((name) => ({
              where: { name },
              create: { name, createdAt: new Date(), updatedAt: new Date() },
            })),
          },
        },
        include: { tags: true },
      });
    },

    updateBlogPost: async (
      _: unknown,
      { id, input }: { id: string; input: UpdateBlogPostInput },
      context: Context
    ): Promise<BlogPost> => {
      const currentPost = await context.db.blogPost.findUnique({
        where: { id },
        include: { tags: true },
      });

      if (!currentPost) throw new Error("BlogPost not found");

      let publishedAt = currentPost.publishedAt;
      if (input.published !== undefined) {
        publishedAt = input.published ? new Date() : null;
      }

      const disconnectTags = currentPost.tags.map((tag) => ({ id: tag.id }));

      return context.db.blogPost.update({
        where: { id },
        data: {
          ...input,
          publishedAt, // Pass `null` or a valid `Date`
          updatedAt: new Date(),
          tags: {
            disconnect: disconnectTags,
            connectOrCreate:
              input.tags?.map((name) => ({
                where: { name },
                create: { name, createdAt: new Date(), updatedAt: new Date() },
              })) || [],
          },
        },
        include: { tags: true },
      });
    },
    deleteBlogPost: async (
      _: unknown,
      { id }: { id: string },
      context: Context
    ): Promise<BlogPost> => {
      return context.db.blogPost.delete({ where: { id } });
    },
    createTag: async (
      _: unknown,
      { input }: { input: CreateTagInput },
      context: Context
    ): Promise<Tag> => {
      return context.db.tag.create({
        data: {
          ...input,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    },
    updateTag: async (
      _: unknown,
      { id, input }: { id: string; input: UpdateTagInput },
      context: Context
    ): Promise<Tag> => {
      return context.db.tag.update({
        where: { id },
        data: { ...input, updatedAt: new Date() }, // Add required fields
      });
    },
    deleteTag: async (
      _: unknown,
      { id }: { id: string },
      context: Context
    ): Promise<Tag> => {
      return context.db.tag.delete({ where: { id } });
    },
    createProject: async (
      _: unknown,
      { input }: { input: CreateProjectInput },
      context: Context
    ): Promise<Project> => {
      const { tags, ...data } = input;
      return context.db.project.create({
        data: {
          ...data,
          tags: {
            connectOrCreate: tags?.map((name) => ({
              where: { name },
              create: { name, createdAt: new Date(), updatedAt: new Date() },
            })),
          },
        },
        include: { tags: true },
      });
    },

    updateProject: async (
      _: unknown,
      { id, input }: { id: string; input: UpdateProjectInput },
      context: Context
    ): Promise<Project> => {
      const { tags, ...data } = input;
      return context.db.project.update({
        where: { id },
        data: {
          ...data,
          tags: {
            set: tags?.map((name) => ({ name })),
          },
        },
        include: { tags: true },
      });
    },

    deleteProject: async (
      _: unknown,
      { id }: { id: string },
      context: Context
    ): Promise<Project> => {
      return context.db.project.delete({ where: { id } });
    },
  },
};
