import {
  BlogPost,
  Message,
  NewsletterSubscriber,
  Project,
  Tag,
} from "@prisma/client";
export interface IMessage extends Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface INewsletterSubscriber extends NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: Date;
}

export interface ITag extends Tag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlogPost extends BlogPost {
  id: string;
  title: string;
  slug: string;
  author?: {
    name: string;
    avatar: string;
  };
  thumbnail: string;
  excerpt: string;
  content: string;
  tags: Tag[];
  reactions: unknown;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface IProject extends Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  client: string;
  logo: string;
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
  tags: ITag[];
  createdAt: Date;
  updatedAt: Date;
}
