import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ADRESS_SUGGESTION_GQL } from "../api/queries";

/**
 * The useAddressSuggestions hook provides data and business logic for the AddressSearchSuggestions component
 *
 * @return {
 *  hasSuggestions {bool} - determines suggestions based on a search term
 *  isLoading {bool} - determines is data is currently loading
 *  results {array} - array with products returned from the API based on provided search query
 * }
 */
export default function useAddressSuggestions(props) {
    const { searchTerm, field = "addressSuggestions" } = props;
    const [hasSuggestions, setHasSuggestions] = useState(false);
    const [fetchSuggestions, { loading, data }] = useLazyQuery(GET_ADRESS_SUGGESTION_GQL);

    useEffect(() => {
        console.log("searchTerm: ", searchTerm)
        if (searchTerm != null) {
            
            fetchSuggestions({
                variables: {
                    searchTerm
                }
            });
        }
    }, [fetchSuggestions, searchTerm]);

    useEffect(() => {
        data && data[field] && data[field].length ?
            setHasSuggestions(true) : setHasSuggestions(false);
    }, [data]);

    return Object.freeze({
        hasSuggestions,
        isLoading: loading,
        data,
        refetch: fetchSuggestions
    })
}
