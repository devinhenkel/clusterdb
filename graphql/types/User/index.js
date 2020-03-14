export default `
  type User {
    _id: ID!
    username: String!
    firstname: String
    lastname: String
    email: String!
    posts: [Post!]!
    projects: [Project!]!
    comments: [Comment!]!
  }

  type Query {
    user(_id: ID!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(user: CreateUserInput): User!
    updateUser(_id: ID!, user: UpdateUserInput!): User!
    deleteUser(_id: ID!): User!
  }

  input CreateUserInput {
    username: String!
    firstname: String
    lastname: String
    email: String!
  }
  
  input UpdateUserInput {
    username: String
    firstname: String
    lastname: String
    email: String
  } 
`;
