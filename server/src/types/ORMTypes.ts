import mongoose from "mongoose";

export interface User {
    avatar: string;
    username: string;
    email: string;
    password: string;
    userSettings: UserSettings;
}

export interface UserSettings {
    exampleNotification: boolean;
}

export interface Post {
    content: string;
    file: string;
    user_id: mongoose.Types.ObjectId;
    metadata: PostMetadata;
}

export interface PostMetadata {
    hashtags: string;
}