import { Post } from "@types";
import { PostModel } from "orm";
import { CheckAuthorization } from "utils";

export async function GetPost(
    parent: any,
    args: { id: string },
    context: any,
    info: any
): Promise<Post | null> {
    try {
        const { id } = args;

        if (!id) throw new Error();
        const findPost = await PostModel.findById(id);

        if (!findPost) throw new Error();

        return findPost;
    } catch (err) {
        console.error(err);
    }

    return null;
}

export async function UpdatePost(
    parent: any,
    args: { id: string; post: Post },
    context: any,
    info: any
): Promise<Post | null> {
    try {
        CheckAuthorization(context.auth);

        const { id, post } = args;

        const updatePost = await PostModel.findByIdAndUpdate(id, post);

        if (!updatePost) throw new Error();

        return updatePost;
    } catch (err) {
        console.error(err);
    }

    return null;
}

export async function AddPost(
    parent: any,
    args: { post: Post },
    context: any,
    info: any
): Promise<Post | null> {
    try {
        CheckAuthorization(context.auth);

        console.log("CONTEXT", context);

        const { post } = args;

        post.metadata = {
            ...post.metadata,
            userID: context.auth.id,
        }

        const createdPost = await PostModel.create(post);

        return createdPost;

    } catch (err) {
        console.error(err);
    }

    return null;
}

export async function DeletePost(
    parent: any,
    args: { id: string },
    context: any,
    info: any
): Promise<{ id: string } | null> {
    try {
        CheckAuthorization(context.auth);

        const { id } = args;
        const result = await PostModel.findByIdAndDelete(id);

        if (!result?.$isDeleted) throw new Error();

        return { id };
    } catch (err) {
        console.error(err);
    }

    return null;
}