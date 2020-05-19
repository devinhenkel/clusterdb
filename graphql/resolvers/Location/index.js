import Location from "../../../server/models/Location";
import Device from "../../../server/models/Device";

export default {
  Query: {
    location: async (parent, { _id }, context, info) => {
      return await Location.find({ _id });
    },
    locations: async (parent, args, context, info) => {
      let filter = args.where ? args.where : {}
      const res = await Location.find(filter)
        .populate()
        .exec();

      return res.map(u => ({
        _id: u._id.toString(),
        name: u.name,
        description: u.description,
        devices: u.devices
      }));
    }
  },
  Mutation: {
    createLocation: async (parent, { location }, context, info) => {
      const newLocation = await new Location({
        name: location.name,
        description: location.description,
        devices: location.devices
      });

      return new Promise((resolve, reject) => {
        newLocation.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateLocation: async (parent, { _id, location }, context, info) => {
      return new Promise((resolve, reject) => {
        Location.findByIdAndUpdate(
          _id,
          { $set: { ...location } },
          { new: true }
        ).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteLocation: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Location.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  Location: {
    devices: async ({ device }, args, context, info) => {
      return await Device.findById({ _id });
    }
  }
};
