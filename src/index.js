import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const httpLink = new HttpLink({ uri: process.env.REACT_APP_API_URL });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("auth_token");

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      "X-Hasura-Admin-Secret": process.env.HEADER_HASURA
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
