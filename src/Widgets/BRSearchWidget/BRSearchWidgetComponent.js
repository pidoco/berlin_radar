import * as React from "react";
import * as Scrivito from "scrivito";
import loadable from "@loadable/component";

const BRSearchComponent = loadable(() =>
  import("../../Components/BRSearchComponent")
);

Scrivito.provideComponent("BRSearchWidget", ({ widget }) => {
  const queryType = widget.get("queryType");
  const tags = widget.get("tags");
  const marginTopSize = widget.get("marginTopSize");
  const colorSelect = widget.get("colorSelect");
  const categoryVisible = widget.get("categoryVisible");
  const category = widget.get("category") || "";

  return (
    <BRSearchComponent
      queryType={queryType}
      tags={tags}
      marginTopSize={marginTopSize}
      colorSelect={colorSelect}
      categoryVisible={categoryVisible}
      predefinedCategory={category}
    />
  );
});