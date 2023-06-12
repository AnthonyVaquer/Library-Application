import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { ApolloClient, ApolloProvider } from "@apollo/client";

var client = new ApolloClient({
  uri: "http://localhost:3010",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client = { client }>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
