import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
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

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($updateMessageId: ID!, $input: UpdateMessageInput!) {
    updateMessage(id: $updateMessageId, input: $input) {
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

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($deleteMessageId: ID!) {
    deleteMessage(id: $deleteMessageId) {
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

export const CREATE_TAG = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UpdateTag($updateTagId: ID!, $input: UpdateTagInput!) {
    updateTag(id: $updateTagId, input: $input) {
      id
      name
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($deleteTagId: ID!) {
    deleteTag(id: $deleteTagId) {
      id
      name
    }
  }
`;

export const CREATE_BLOG_POST = gql`
  mutation CreateBlogPost($input: CreateBlogPostInput!) {
    createBlogPost(input: $input) {
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

export const UPDATE_BLOG_POST = gql`
  mutation UpdateBlogPost(
    $updateBlogPostId: ID!
    $input: UpdateBlogPostInput!
  ) {
    updateBlogPost(id: $updateBlogPostId, input: $input) {
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

export const DELETE_BLOG_POST = gql`
  mutation DeleteBlogPost($deleteBlogPostId: ID!) {
    deleteBlogPost(id: $deleteBlogPostId) {
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

export const CREATE_NEWSLETTER_SUBSCRIBER = gql`
  mutation CreateNewsletterSubscriber(
    $input: CreateNewsletterSubscriberInput!
  ) {
    createNewsletterSubscriber(input: $input) {
      id
      email
      subscribedAt
    }
  }
`;

export const DELETE_NEWSLETTER_SUBSCRIBER = gql`
  mutation DeleteNewsletterSubscriber($deleteNewsletterSubscriberId: ID!) {
    deleteNewsletterSubscriber(id: $deleteNewsletterSubscriberId) {
      id
      email
      subscribedAt
    }
  }
`;
