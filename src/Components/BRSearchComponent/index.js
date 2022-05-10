import React from "react";
import * as Scrivito from "scrivito";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import "./BRSearchComponent.scss";
import { useQuery } from "@apollo/client";
import { GET_ADRESS_SUGGESTION_GQL } from "../../api/queries";

const transformRawToSuggestions = (rawDataArray = []) => rawDataArray.map(res => ({ name: res.searchField, id: res.id }));

const handelSearchResults = (data) => {
  const rawResults = data != null ? data.addressSuggestions : [];
  const results = transformRawToSuggestions(rawResults);
  console.log("results: ", results)
  return results;
};

const handleOnHover = (result) => {
  // the item hovered
  console.log(result)
};

const handleOnSelect = (item) => {
  // the item selected
  console.log(item)
};

const handleOnFocus = () => {
  console.log('Focused')
};

const SearchComponent = ({
  // queryType = "",
  // tags = [],
  publishedIn: _publishedIn = 0,
  region: _region = "",
  pageNumber: _pageNumber = 1,
  marginTopSize = 0,
  colorSelect: _colorSelect = ""
}) => {
  const { data, refetch } = useQuery(GET_ADRESS_SUGGESTION_GQL, {
    variables: { searchTerm: "Kul" },
  });

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // console.log("term: " + string + " has results -> ", results)
    refetch({
      searchTerm: string
    });
  }

  const formatResult = (item) => (
    <span key={item.id}>
      {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
      <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
    </span>
  );

  const marginTop = Scrivito.isInPlaceEditingActive()
    ? "initial"
    : `${marginTopSize}em`;
  const style = { marginTop };

  return (
    <div className="br-search" style={style}>
      <ReactSearchAutocomplete
        items={handelSearchResults(data)}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
      />
    </div>
  );
};

export default SearchComponent;