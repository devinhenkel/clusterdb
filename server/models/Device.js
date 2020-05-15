import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const DeviceSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  hardware: {
    type: String,
    required: false
  },
  sensor: [
    {
      type: String,
      required: false
    }
  ] ,
  actuator: [
    {
      type: String,
      required: false
    }
  ],
  location: {
    type: String,
    required: false
  },
  activated: {
    type: Boolean,
    required: false
  },
  known: {
    type: Boolean,
    required: false
  }
});

export default mongoose.model("Device", DeviceSchema);
