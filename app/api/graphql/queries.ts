import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      name
      email
      subject
      message
      createdAt
      updatedAt
    }
  }
`;

export const GET_MESSAGE = gql`
  query GetMessage($id: ID!) {
    message(id: $id) {
      id
      name
      email
      subject
      message
      createdAt
      updatedAt
    }
  }
`;

export const GET_NEWSLETTER_SUBSCRIBERS = gql`
  query NewsletterSubscribers {
    newsletterSubscribers {
      id
      email
      subscribedAt
    }
  }
`;

export const GET_TAGS = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`;

export const GET_BLOG_POSTS = gql`
  query GetBlogPosts {
    blogPosts {
      id
      title
      slug
      thumbnail
      content
      tags {
        id
        name
      }
      reactions
      published
      publishedAt
      updatedAt
    }
  }
`;

export const GET_BLOG_POST = gql`
  query GetBlogPost($slug: String!) {
    blogPost(slug: $slug) {
      id
      title
      slug
      thumbnail
      content
      tags {
        id
        name
      }
      reactions
      published
      publishedAt
      updatedAt
    }
  }
`;

export const GET_PROJECTS = gql`
  query Projects {
    projects {
      id
      slug
      title
      subtitle
      client
      logo
      services
      technologies
      website
      thumbnail
      about
      goal
      execution
      results
      goalImages
      resultImages
      tags {
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROJECT = gql`
  query Project($slug: String!) {
    project(slug: $slug) {
      id
      slug
      title
      subtitle
      client
      logo
      services
      technologies
      website
      thumbnail
      about
      goal
      execution
      results
      goalImages
      resultImages
      tags {
        name
      }
      createdAt
      updatedAt
    }
  }
`;
