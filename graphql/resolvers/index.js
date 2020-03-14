import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User/";
import Post from "./Post/";
import Project from "./Project/";
import Comment from "./Comment/";

const resolvers = [User, Post, Project, Comment];

export default mergeResolvers(resolvers);
