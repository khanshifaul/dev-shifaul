export const typeDefs = `#graphql
# Custom scalar types
scalar JSON
scalar DateTime

type Message {
  id: ID!
  name: String!
  email: String!
  subject: String!
  message: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type NewsletterSubscriber {
  id: ID!
  email: String!
  subscribedAt: DateTime!
}

type BlogPost {
  id: ID!
  title: String!
  slug: String!
  thumbnail: String!
  content: String!
  tags: [Tag!]
  reactions: Int
  published: Boolean!
  publishedAt: DateTime
  updatedAt: DateTime!
}

type Tag {
  id: ID!
  name: String!
  blogPosts: [BlogPost!]
  projects: [Project!]
  createdAt: String!
  updatedAt: String!
}

type Project {
  id: ID!
  slug: String!
  title: String!
  subtitle: String
  client: String
  logo: String
  services: [String!]
  technologies: [String!]
  website: String!
  thumbnail: String!
  about: String!
  goal: String!
  execution: String!
  results: String!
  goalImages: [String!]
  resultImages: [String!]
  tags: [Tag!]
  createdAt: String!
  updatedAt: String!
}

input CreateMessageInput {
  name: String!
  email: String!
  subject: String!
  message: String!
}

input UpdateMessageInput {
  name: String
  email: String
  subject: String
  message: String
}

input CreateNewsletterSubscriberInput {
  email: String!
}

input CreateBlogPostInput {
  title: String!
  slug: String
  thumbnail: String!
  content: String!
  tags: [String!]
  reactions: Int
  published: Boolean!
}

input UpdateBlogPostInput {
  title: String
  slug: String
  thumbnail: String
  content: String
  tags: [String!]
  reactions: Int
  published: Boolean
}

input CreateTagInput {
  name: String!
}

input UpdateTagInput {
  name: String
}

input CreateProjectInput {
  slug: String!
  title: String!
  subtitle: String
  client: String
  logo: String
  services: [String!]
  technologies: [String!]
  website: String!
  thumbnail: String!
  about: String!
  goal: String!
  execution: String!
  results: String!
  goalImages: [String!]
  resultImages: [String!]
  tags: [String!]
}

input UpdateProjectInput {
  id: ID!
  slug: String
  title: String
  subtitle: String
  client: String
  logo: String
  services: [String!]
  technologies: [String!]
  website: String
  thumbnail: String
  about: String
  goal: String
  execution: String
  results: String
  goalImages: [String!]
  resultImages: [String!]
  tags: [String!]
}


type Query {
  messages: [Message!]!
  message(id: ID!): Message
  newsletterSubscribers: [NewsletterSubscriber!]!
  newsletterSubscriber(id: ID!): NewsletterSubscriber
  blogPosts: [BlogPost!]!
  blogPost(slug: String): BlogPost
  tags: [Tag!]!
  tag(id: ID!): Tag
  projects: [Project!]!
  project(slug: String!): Project
}

type Mutation {
  createMessage(input: CreateMessageInput!): Message!
  updateMessage(id: ID!, input: UpdateMessageInput!): Message!
  deleteMessage(id: ID!): Message!
  createNewsletterSubscriber(input: CreateNewsletterSubscriberInput!): NewsletterSubscriber!
  deleteNewsletterSubscriber(id: ID!): NewsletterSubscriber!
  createBlogPost(input: CreateBlogPostInput!): BlogPost!
  updateBlogPost(id: ID!, input: UpdateBlogPostInput!): BlogPost!
  deleteBlogPost(id: ID!): BlogPost!
  createTag(input: CreateTagInput!): Tag!
  updateTag(id: ID!, input: UpdateTagInput!): Tag!
  deleteTag(id: ID!): Tag!
  createProject(input: CreateProjectInput!): Project!
  updateProject(input: UpdateProjectInput!): Project!
  deleteProject(id: ID!): Boolean!
}
`;
