import { gql } from "@apollo/client";

export const GET_ADRESS_SUGGESTION_GQL = gql`
    query Address($searchTerm: String!) {
        addressSuggestions(searchTerm: $searchTerm) {
            searchField
            id
        }
    }`;