import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User/";
import Post from "./Post/";
import Project from "./Project/";
import Comment from "./Comment/";
import Device from "./Device/";
import Location from "./Location/";

const resolvers = [User, Post, Project, Comment, Device, Location];

export default mergeResolvers(resolvers);
