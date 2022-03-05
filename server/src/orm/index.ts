import { connect, Schema, model, Mongoose } from "mongoose";
import { User, UserSettings, Post } from "@types";

export const DatabaseInit = async () => {
    try {
        await connect(
            `${process.env.DB_MONGO_URL!}/${process.env.DB_MONGO_DATABASE}`
        );
        console.log("Connection Mongo: OK");
    } catch (err) {
        throw new Error("Unable to connect to the database: " + err);
    }
};

// Mongoose models
const UserSchema = new Schema<User>(
    {
        avatar: { type: String, required: false },
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        userSettings: Object,
    },
    { timestamps: true }
);

const PostSchema = new Schema<Post>(
    {
        text: { type: String, required: true },
        file: { type: String, required: false },
        metadata: { type: Object, required: true }
    },
    { timestamps: true }
);

export const UserModel = model<User>("User", UserSchema);
export const PostModel = model<Post>("Post", PostSchema);