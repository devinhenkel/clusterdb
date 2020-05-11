import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User/";
import Post from "./Post/";
import Project from "./Project/";
import Comment from "./Comment/";
import Device from "./Device/";

const resolvers = [User, Post, Project, Comment, Device];

export default mergeResolvers(resolvers);
