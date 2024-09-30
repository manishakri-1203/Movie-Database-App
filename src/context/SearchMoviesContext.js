import {createContext} from 'react'

const SearchMoviesContext = createContext({
    searchResponse: {},
    onTriggerSearchingQuering: () => {}
})

export default SearchMoviesContext