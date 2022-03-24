import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        email
        token
        }
    }

`

export const GET_USER_POSTS = gql`
query Post {
    post {
      id
      text
      file
      metadata {
        userID
        hashtags
      }
      createdAt
    }
  }
`