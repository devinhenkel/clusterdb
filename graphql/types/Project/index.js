export default `
type Project {
    _id: ID! @unique @id
    title: String!
    description: String
    team: [User]!
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
}

input UpdateProjectInput {
    title: String
    description: String
    team: [User]
}
`;



