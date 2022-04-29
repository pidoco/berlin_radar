import * as Scrivito from "scrivito";

const config = { tenant: process.env.SCRIVITO_TENANT };

if (process.env.SCRIVITO_ORIGIN) {
  config.origin = process.env.SCRIVITO_ORIGIN;
}

if (process.env.SCRIVITO_ENDPOINT) {
  config.endpoint = process.env.SCRIVITO_ENDPOINT;
}

config.baseUrlForSite = () => window.location.origin;

config.siteForUrl = (url) => ({ siteId: "a897dd8dbc6df808", baseUrl: window.location.origin });

Scrivito.configure(config);
