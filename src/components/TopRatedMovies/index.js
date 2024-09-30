import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

import './index.css'

class TopRatedMovies extends Component {
  state = {
    isLoading: true,
    topRatedMoviesData: {},
  }

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getUpdatedData = data => ({
    totalPages: data.total_pages,
    totalResults: data.total_results,
    results: data.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getTopRatedMovies = async (page = 1) => {
    const API_KEY = '81fbddb9501b125b5bf7f1cbf1f9b52f'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    // console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const updatedData = this.getUpdatedData(fetchedData)
      // console.log(updatedData)
      this.setState({isLoading: false, topRatedMoviesData: updatedData})
    }
  }

  renderLoadingView = () => (
    <div className="loader-view-container">
      <Loader type="ThreeDots" color="#101336" height="50" width="50" />
    </div>
  )

  renderTopRatedMoviesView = () => {
    const {topRatedMoviesData} = this.state
    const {results} = topRatedMoviesData

    return (
      <ul className="top-rated-movies-list">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, topRatedMoviesData} = this.state
    return (
      <>
        <Navbar />
        <div>
          {isLoading
            ? this.renderLoadingView()
            : this.renderTopRatedMoviesView()}
        </div>
        <Pagination
          totalPages={topRatedMoviesData.totalPages}
          apiCallback={this.getTopRatedMovies}
        />
      </>
    )
  }
}

export default TopRatedMovies
