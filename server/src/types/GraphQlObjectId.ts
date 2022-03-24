import { Scalar } from '@nestjs/graphql';
import { Kind, ASTNode } from "graphql";
import mongoose from 'mongoose';

@Scalar('MongoObjectId')
export class GraphQlObjectId {
    description = "Mongo object id scalar type";

    parseValue(value: string) {
        return new mongoose.Types.ObjectId(value); // Value from the client
    }

    serialize(value: mongoose.Types.ObjectId) {
        return value.toHexString(); // Value sent to the client
    }

    parseLiteral(ast: ASTNode) {
        if (ast.kind === Kind.STRING) {
            return new mongoose.Types.ObjectId(ast.value); // Value from the client query
        }
        return null;
    }
}