import * as Scrivito from "scrivito";
import defaultPageAttributes from "../_defaultPageAttributes";
import metadataAttributes from "../_metadataAttributes";

const BerlinRadarHomepage = Scrivito.provideObjClass("BerlinRadarHomepage", {
  attributes: {
    ...defaultPageAttributes,
    showAsLandingPage: ["enum", { values: ["yes", "no"] }],
    cookieConsentLink: "link",
    childOrder: "referencelist",
    footer: ["widgetlist", { only: "SectionWidget" }],
    logoDark: ["reference", { only: ["Image"] }],
    logoWhite: ["reference", { only: ["Image"] }],
    dividerLogo: ["reference", { only: ["Image"] }],
    facebookAppId: "string",
    twitterSite: "string",
    googleMapsApiKey: "string",
    googleAnalyticsTrackingId: "string",
    intercomAppId: "string",
    ...metadataAttributes,
  },
  extractTextAttributes: ["navigationSection", "body"],
});

export default BerlinRadarHomepage;
