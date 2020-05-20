import Device from "../../../server/models/Device";
import Location from "../../../server/models/Location";

export default {
  Query: {
    device: async (parent, { _id }, context, info) => {
      return await Device.find({ _id });
    },
    devices: async (parent, args, context, info) => {
      let filter = args.where ? args.where : {}
      const res = await Device.find(filter)
        .populate()
        .exec();

      return res.map(u => ({
        _id: u._id.toString(),
        uuid: u.uuid,
        hardware: u.hardware,
        sensor: u.sensor,
        actuator: u.actuator,
        name: u.name,
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
        name: device.name,
        location: {_id:"5ec47ae3aa2239244c26f7c7"},
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
          { $set: { ...device } },
          { new: true }
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
    location: async ({ location }, args, context, info) => {
      return await Location.findById({ _id: location });
    }
  }
};
