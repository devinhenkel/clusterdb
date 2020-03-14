import User from "../../../server/models/User";
import Project from "../../../server/models/Project";

import { transformProject } from "../merge";

export default {
  Query: {
    project: async (parent, { _id }, context, info) => {
      return await Project.findOne({ _id }).exec();
    },
    projects: async (parent, args, context, info) => {
      const res = await Project.find({})
        .populate()
        .exec();

      return res.map(u => ({
        _id: u._id.toString(),
        title: u.title,
        description: u.description,
        owner: u.owner
      }));
    }
  },
  Mutation: {
    createProject: async (parent, { project }, context, info) => {
      const newProject = await new Project({
        title: project.title,
        description: project.description,
        owner: project.owner
      });
      let createdProject;
      try {
        // const result = await newPost.save();
        const result = await new Promise((resolve, reject) => {
         newProject.save((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
        createdProject = transformProject(result);
        const creator = await User.findById(project.owner);

        if (!creator) {
          throw new Error("User not found.");
        }
        creator.projects.push(newProject);
        await creator.save();
        return createdProject;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateProject: async (parent, { _id, project }, context, info) => {
      return new Promise((resolve, reject) => {
        Project.findByIdAndUpdate(_id, { $set: { ...project } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteProject: async (parent, { _id }, context, info) => {
      try {
        // searching for creator of the post and deleting it from the list
        const project = await Project.findById(_id);
        const creator = await User.findById(project.owner);
        if (!creator) {
          throw new Error("user not found.");
        }
        const index = creator.projects.indexOf(_id);
        if (index > -1) {
          creator.projects.splice(index, 1);
        }
        await creator.save();
        return new Promise((resolve, reject) => {
          Project.findByIdAndDelete(_id).exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  Project: {
    owner: async ({ owner }, args, context, info) => {
      return await User.findById(owner);
    }
  }
};
