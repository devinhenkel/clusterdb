import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

export default mongoose.model("Project", ProjectSchema);
