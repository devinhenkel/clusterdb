export default `
  type Device {
    _id: ID!
    uuid: String!
    hardware: String!
    sensor: [String]
    actuator: [String]
    activated: Boolean
  }

  type Query {
    device(_id: ID!): [Device!]!
    devices: [Device!]!
  }

  type Mutation {
    createDevice(device: CreateDeviceInput!): Device!
    activateDevice(_id: ID!, activate: Boolean!): Device!
    updateDevice(_id: ID!, device: UpdateDeviceInput): Device!
    deleteDevice(_id: ID!): Device!
  }

  input CreateDeviceInput {
    uuid: String!
    hardware: String
    sensor: [String!]
    actuator: [String!]
  }
  
  input UpdateDeviceInput {
    hardware: String
    sensor: [String!]
    actuator: [String!]
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;