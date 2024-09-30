import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import SearchQuery from './components/SearchQuery'

import SearchMoviesContext from './context/SearchMoviesContext'

import './App.css'

const API_KEY = '81fbddb9501b125b5bf7f1cbf1f9b52f'

// write your code here
const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = data => ({
    totalPages: data.total_pages,
    totalResults: data.total_results,
    results: data.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const onTriggerSearchingQuery = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = getUpdatedData(fetchedData)
      setSearchResponse(updatedData)
      setApiStatus('SUCCESS')
    }
  }

  return (
    <SearchMoviesContext.Provider
      value={{
        searchResponse,
        apiStatus,
        onTriggerSearchingQuery,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <Switch>
        <Route exact path="/" component={PopularMovies} />
        <Route exact path="/top-rated" component={TopRatedMovies} />
        <Route exact path="/upcoming" component={UpcomingMovies} />
        <Route exact path="/search" component={SearchQuery} />
      </Switch>
    </SearchMoviesContext.Provider>
  )
}

export default App
