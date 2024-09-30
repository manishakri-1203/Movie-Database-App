import {Link, withRouter} from 'react-router-dom'

import SearchMoviesContext from '../../context/SearchMoviesContext'

import './index.css'

const Navbar = props => {
  const renderSearchBar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
          apiStatus,
        } = value

        const changeSearchInput = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }

        return(
          <div className="search-input-container">
        <input type="search" className="search-input" placeholder="Search" value={searchInput} onChange={changeSearchInput} />
        <button type="button" className="search-button" onClick={onSearchHandler}>
          Search
        </button>
      </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
return(
  <nav className="navbar-container">
    <div className="nav-content">
      <h1 className="logo-heading">movieDB</h1>
      <div className="nav-item-container">
        <Link to="/" className="nav-link">
          <h1 className="nav-item">Popular</h1>
        </Link>
        <Link to="/top-rated" className="nav-link">
          <h1 className="nav-item">Top Rated</h1>
        </Link>
        <Link to="/upcoming" className="nav-link">
          <h1 className="nav-item">Upcoming</h1>
        </Link>
      </div>
      {renderSearchBar()}
    </div>
  </nav>
)}

export default withRouter(Navbar)
