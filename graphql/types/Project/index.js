export default `
type Project {
    _id: ID!
    title: String!
    description: String
    owner: User!
}

type Query {
    project(_id: ID!): Project!
    projects: [Project!]!
}

type Mutation {
    createProject(project: CreateProjectInput): Project!
    updateProject(_id: ID!, project: UpdateProjectInput!): Project!
    deleteProject(_id: ID!): Project!
}

input CreateProjectInput {
    title: String!
    description: String
    owner: ID!
}

input UpdateProjectInput {
    title: String
    description: String
    owner: ID
}
`;



