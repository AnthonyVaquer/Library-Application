import { gql } from "@apollo/client";

export var SIGNUP_USER = gql`
mutation Mutation($username: String, $email: String, $password: String) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
      }
    }
  }

`