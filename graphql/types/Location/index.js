export default `
  type Location {
    _id: ID!
    name: String!
    description: String
    devices: [Device]
  }

  type Query {
    location(_id: ID!): [Location!]!
    locations: [Location!]!
  }

  type Mutation {
    createLocation(location: CreateLocationInput!): Location!
    updateLocation(_id: ID!, location: UpdateLocationInput): Location!
    deleteLocation(_id: ID!): Location!
  }

  input CreateLocationInput {
    name: String!
    description: String
    devices: [ID!]
  }
  
  input UpdateLocationInput {
    name: String
    description: String
    devices: [ID!]
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;
