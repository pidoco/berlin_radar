import * as Scrivito from "scrivito";

const BRSearchWidget = Scrivito.provideWidgetClass("BRSearchWidget", {
  attributes: {
    tags: "stringlist",
    category: "string",
    categoryVisible: ["enum", { values: ["yes", "no"] }],
    marginTopSize: "float",
    colorSelect: ["enum", { values: ["normal", "transparent"] }],
  },
});

export default BRSearchWidget;