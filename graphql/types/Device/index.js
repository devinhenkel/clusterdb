export default `
  type Device {
    _id: ID!
    uuid: String!
    hardware: String!
    sensor: [String]
    actuator: [String]
    location: String
    activated: Boolean
    known: Boolean
  }

  type Query {
    device(_id: ID!): [Device!]!
    devices(where: DeviceWhereInput): [Device!]!
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
    location: String
  }
  
  input UpdateDeviceInput {
    hardware: String
    sensor: [String!]
    actuator: [String!]
    location: String
    known: Boolean
  }

  input DeviceWhereInput {
    hardware: String
    sensor: [String!]
    actuator: [String!]
    activated: Boolean
    known: Boolean
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;