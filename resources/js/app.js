import React from "react";
import { render } from "react-dom";
import Routes from "./routes";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient();

render(
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>,
    document.getElementById("app")
);
