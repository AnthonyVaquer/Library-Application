import { gql } from "@apollo/client";


// sign up new user mutation
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


// login user mutation
export var LOGIN_USER = gql `
mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
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