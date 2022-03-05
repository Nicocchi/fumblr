import { User } from "types";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create and return hash
export function Hash(pwd: string): string {
    const ENV_SALT = process.env.ENCRYPT_SALT_LEVEL as string;
    const saltLevel = parseInt(ENV_SALT);
    const hash = bcrypt.hashSync(pwd, saltLevel);
    return hash;
}

// Create and return JWT Token
export function GenerateToken(data: any): string {
    const TOKEN_SECRET = process.env.ENCRYPT_TOKEN_SECRET as string;
    const expiresIn = process.env.ENCRYPT_TOKEN_EXPIRES_IN + " days";
    const token = jwt.sign(data, TOKEN_SECRET, { expiresIn });
    return token;
}

// Compare and return if string matches or not
export function CompareSync(pwd: string, pwdToCompare: string): boolean {
    const SECRET = process.env.ENCRYPT_SECRET as string;
    const isMatch = bcrypt.compareSync(pwd, pwdToCompare);
    return isMatch;
}

export function ValidateToken(token: string): any {
    try {
        const TOKEN_SECRET = process.env.ENCRYPT_TOKEN_SECRET as string;
        const tokenToValidate = token.replace("Bearer ", "");
        const user = jwt.verify(tokenToValidate, TOKEN_SECRET);
        return user;
    } catch (err) {
        console.log(err);
    }

    return null;
}

export function CheckAuthorization(user: User | undefined) {
    const node_env = <string>process.env.TS_NODE_DEV;
    console.log("CHECK AUTHORIZATION", user)
    if (!user) throw new Error("Private route, auth not found.");
    if (node_env === "true") {
        return undefined;
        console.log("node_env true")
    } else {
        if (!user) throw new Error("Private route, auth not found.");
    }

    return undefined;
}