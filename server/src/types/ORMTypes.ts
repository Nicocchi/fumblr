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
    text: string;
    file: string;
    metadata: PostMetadata;
}

export interface PostMetadata {
    userID: string;
    hashtags: string;
}