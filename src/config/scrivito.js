import * as Scrivito from "scrivito";

const config = { tenant: process.env.SCRIVITO_TENANT };

if (process.env.SCRIVITO_ENDPOINT) {
  config.endpoint = process.env.SCRIVITO_ENDPOINT;
}

config.baseUrlForSite = (siteId) => {
  switch (siteId) {
    case process.env.BERLIN_RADAR_SITE_ID:
      return process.env.BERLIN_RADAR_ORIGIN;
    case process.env.AFS_SITE_ID:
      return process.env.AFS_ORIGIN;
  }
};

config.siteForUrl = (url) => {
  const { origin } = new URL(url);
  switch (origin) {
    case process.env.BERLIN_RADAR_ORIGIN:
      return {
        siteId: process.env.BERLIN_RADAR_SITE_ID,
        baseUrl: config.baseUrlForSite(process.env.BERLIN_RADAR_SITE_ID),
      };

    case process.env.AFS_ORIGIN:
      return {
        siteId: process.env.AFS_SITE_ID,
        baseUrl: config.baseUrlForSite(process.env.AFS_SITE_ID),
      };

    default:
      console.error(`Origin ${origin} not found.`);
  }
};

Scrivito.configure(config);
