import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movie-item">
      <img src={posterPath} alt={title} className="movie-img" />
      <div className="title-rating-container">
        <h1 className="movie-title">{title}</h1>
        <p className="movie-rating">Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`}>
        <button type="button" className="view-details-btn">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
