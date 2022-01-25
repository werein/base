import { Auth0Provider } from "@auth0/auth0-react";
import { BaseProvider, LightTheme } from "baseui";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import ApolloProvider from "./apollo-provider";
import App from "./app";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const engine = new Styletron();

const { REACT_APP_AUTH0_CLIENT = "", REACT_APP_AUTH0_DOMAIN = "" } =
  process.env;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN}
      clientId={REACT_APP_AUTH0_CLIENT}
      redirectUri={window.location.origin}
    >
      <ApolloProvider>
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </BaseProvider>
        </StyletronProvider>
      </ApolloProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
