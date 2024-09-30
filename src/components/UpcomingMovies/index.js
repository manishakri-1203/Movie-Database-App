import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

import './index.css'

class UpcomingMovies extends Component {
  state = {
    isLoading: true,
    upcomingMoviesData: {},
  }

  componentDidMount() {
    this.getUpcomingMovies()
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

  getUpcomingMovies = async (page = 1) => {
    const API_KEY = '81fbddb9501b125b5bf7f1cbf1f9b52f'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const updatedData = this.getUpdatedData(fetchedData)
      this.setState({isLoading: false, upcomingMoviesData: updatedData})
    }
  }

  renderLoadingView = () => (
    <div className="loader-view-container">
      <Loader type="ThreeDots" color="#101336" height="50" width="50" />
    </div>
  )

  renderUpcomingMoviesView = () => {
    const {upcomingMoviesData} = this.state
    const {results} = upcomingMoviesData

    return (
      <ul className="upcoming-movies-list">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, upcomingMoviesData} = this.state

    return (
      <>
        <Navbar />
        <div>
          {isLoading
            ? this.renderLoadingView()
            : this.renderUpcomingMoviesView()}
        </div>
        <Pagination
          totalPages={upcomingMoviesData.totalPages}
          apiCallback={this.getUpcomingMovies}
        />
      </>
    )
  }
}

export default UpcomingMovies
