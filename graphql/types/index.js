import { mergeTypes } from "merge-graphql-schemas";

import User from "./User/";
import Post from "./Post/";
import Project from "./Project/";
import Comment from "./Comment/";
import Device from "./Device/";
import Location from "./Location/";

const typeDefs = [User, Post, Project, Comment, Device, Location];

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
export default mergeTypes(typeDefs, { all: true });
