import {
  ApolloClient,
  ApolloLink,
  ApolloProvider as Provider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { IdToken } from "@auth0/auth0-spa-js";
import { PropsWithChildren, useEffect, useState } from "react";

const httpLink = new HttpLink({ uri: "/graphql" });

export default function ApolloProvider({ children }: PropsWithChildren<{}>) {
  const { isLoading, loginWithRedirect, isAuthenticated, getIdTokenClaims } =
    useAuth0();
  const [token, setToken] = useState<IdToken | undefined>(undefined);

  useEffect(() => {
    async function storeToken() {
      const t = await getIdTokenClaims();
      setToken(t);
    }

    if (isAuthenticated) {
      storeToken();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!isAuthenticated) {
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  }

  if (!token) {
    return <div>loading</div>;
  }

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: token.__raw,
      },
    });

    return forward(operation);
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <Provider client={client}>{children}</Provider>;
}
