import { gql } from "apollo-server";

export const userType = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    token: String!
    image: String
    recipes(page: Int!, limit: Int!): Recipes
  }

  extend type Query {
    user(id: ID!): User!
  }

  extend type Mutation {
    login(input: LoginInput): User!
    register(input: RegisterInput): User!
    loginViaToken: User!
  }
`;
