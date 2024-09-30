import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Pagination from '../Pagination'

import SearchMoviesContext from '../../context/SearchMoviesContext'

import './index.css'

const SearchQuery = () => {
  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h1 className="empty-heading">No Search Results Found.</h1>
      <p className="empty-description">Try to Search Again.</p>
    </div>
  )

  const renderLoadingView = () => (
    <div className="loader-view-container">
      <Loader type="ThreeDots" color="#101336" height="50" width="50" />
    </div>
  )

  const renderMoviesList = searchResponse => {
    const {results} = searchResponse

    if (!results.length) {
      return renderEmptyView()
    }
    return (
      <ul className="search-movies-list">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  const renderSearchResults = value => {
    const {searchResponse, apiStatus} = value

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMoviesList(searchResponse)
      default:
        return renderEmptyView()
    }
  }

  return (
    <SearchMoviesContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchingQuery} = value

        return (
          <>
            <Navbar />
            <div className="search-results-container">
              {renderSearchResults(value)}
            </div>
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallback={onTriggerSearchingQuery}
            />
          </>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
}

export default SearchQuery
