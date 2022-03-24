
import { gql } from "apollo-server";

import { GetUser, AddUser, DeleteUser, UpdateUser, Login, GetPost, AddPost, DeletePost, UpdatePost, GetAllUserPosts } from "services";

// scalar GraphQlObjectId

export const typeDefs = gql`
    scalar GraphQlObjectId

    type User {
        id: ID,
        avatar: String
        username: String
        email: String
        createdAt: String
        updatedAt: String
    }

    input UserMutation {
        avatar: String
        username: String
        email: String
        password: String
    }

    type Auth {
        email: String
        token: String
    }

    type Metadata {
        hashtags: [String]
    }

    input MetadataMutation {
        hashtags: [String!]
    }

    type Post {
        id: ID
        content: String
        file: String
        metadata: Metadata
        user_id: GraphQlObjectId
        createdAt: String
        updatedAt: String
    }

    input PostMutation {
        content: String!
        file: String
        metadata: MetadataMutation!
    }

    type Query {
        user(id: ID): User
        users(ids: [ID]): [User]
        login(email: String!, password: String!): Auth
        post(id: ID): Post
        userPosts(id: ID): [Post]
    }

    type Mutation {
        addUser(user: UserMutation!): User
        updateUser(id: ID!, user: UserMutation!): User
        deleteUser(id: ID!): User
        addPost(post: PostMutation!): Post
        deletePost(id: ID!): Post
    }

    
`;

export const resolvers = {
    Query: {
        user: GetUser,
        post: GetPost,
        userPosts: GetAllUserPosts,
        // users: GetUsers
        login: Login,
    },
    Mutation: {
        addUser: AddUser,
        updateUser: UpdateUser,
        deleteUser: DeleteUser,
        addPost: AddPost,
        deletePost: DeletePost
    },
};