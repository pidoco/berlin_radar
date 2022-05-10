import "./polyfills";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import * as Scrivito from "scrivito";
import "./Objs";
import "./Widgets";
import App from "./App";
import "./config";
import client from "./api/client";
import "./assets/stylesheets/index.scss";
import { ApolloProvider } from "@apollo/client";

if (window.preloadDump) {
  Scrivito.preload(window.preloadDump).then(({ dumpLoaded }) => {
    dumpLoaded ? hydrateApp() : renderApp();
  });
} else {
  window.prerenderReady = false;
  renderApp();
  Scrivito.finishLoading().then(() => {
    window.prerenderReady = true;
  });
}

function renderApp() {
  const root = ReactDOM.createRoot(document.getElementById("application"));
  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

function hydrateApp() {
  ReactDOM.hydrate(<App />, document.getElementById("application"), () =>
    Scrivito.updateContent()
  );
}
