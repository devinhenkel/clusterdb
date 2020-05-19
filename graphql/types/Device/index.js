export default `
  type Device {
    _id: ID!
    uuid: String!
    hardware: String!
    sensor: [String]
    actuator: [String]
    name: String
    location: Location
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
    name: String
    location: ID
  }
  
  input UpdateDeviceInput {
    hardware: String
    sensor: [String!]
    actuator: [String!]
    name: String
    location: ID
    known: Boolean
  }

  input DeviceWhereInput {
    hardware: String
    sensor: [String!]
    actuator: [String!]
    activated: Boolean
    name: String
    known: Boolean
  }

  input DeviceUniqueInput {
    _id: ID
    uuid: String
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;