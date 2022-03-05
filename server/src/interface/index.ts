import { gql } from "apollo-server";
import { GetUser, AddUser, DeleteUser, UpdateUser, Login, GetPost, AddPost, DeletePost, UpdatePost } from "services";

export const typeDefs = gql`
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
        userID: String
        hashtags: [String]
    }

    input MetadataMutation {
        hashtags: [String!]
    }

    type Post {
        id: ID
        text: String
        file: String
        metadata: Metadata
        createdAt: String
        updatedAt: String
    }

    input PostMutation {
        text: String!
        file: String
        metadata: MetadataMutation!
    }

    type Query {
        user(id: ID): User
        users(ids: [ID]): [User]
        login(email: String!, password: String!): Auth
        post(id: ID): Post
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