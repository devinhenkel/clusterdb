import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  devices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Device"
    }
  ]
});

export default mongoose.model("Location", LocationSchema);
