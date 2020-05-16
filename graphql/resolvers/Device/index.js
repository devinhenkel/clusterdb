import Device from "../../../server/models/Device";

export default {
  Query: {
    device: async (parent, { _id }, context, info) => {
      return await Device.find({ _id });
    },
    devices: async (parent, args, context, info) => {
      let filter = args.where ? args.where : ''
      const res = await Device.find({filter})
        .populate()
        .exec();

      return res.map(u => ({
        _id: u._id.toString(),
        uuid: u.uuid,
        hardware: u.hardware,
        sensor: u.sensor,
        actuator: u.actuator,
        location: u.location,
        activated: u.activated,
        known: u.known
      }));
    }
  },
  Mutation: {
    createDevice: async (parent, { device }, context, info) => {
      const newDevice = await new Device({
        uuid: device.uuid,
        hardware: device.hardware,
        sensor: device.sensor,
        actuator: device.actuator,
        location: device.location,
        activated: false,
        known: false
      });

      return new Promise((resolve, reject) => {
        newDevice.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    activateDevice: async (parent, { _id, activate }, context, info) => {
      return new Promise((resolve, reject) => {
        Device.findByIdAndUpdate(
          _id,
          { $set: { ...{activated: activate, known: true} } },
          { new: true }
        ).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateDevice: async (parent, { _id, device }, context, info) => {
      return new Promise((resolve, reject) => {
        Device.findByIdAndUpdate(
          _id,
          { $set: { ...device } }
        ).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteDevice: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Device.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  Device: {
  }
};
