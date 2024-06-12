import Loader from 'react-loader-spinner'

import {Component} from 'react'

import MovieCard from '../MovieCard'

import Context from '../../context/Context'

class SearchMovieDetails extends Component {
  render() {
    // console.log(MovieList);
    return (
      <Context.Consumer>
        {value => {
          const {searchList, loading, currentPage, turnPage} = value
          return (
            <>
              {loading ? (
                <section className="loader-container">
                  <Loader type="Oval" color="green" className="loader-style" />
                </section>
              ) : (
                <section className="section-container">
                  <div className="popular-container ">
                    <p className="route-heading">Your Search Movies</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1l-5.35 5.35a.5.5 0 0 1-.707-.707L14.146 8.146a.5.5 0 0 1 0-.707z"
                      />
                    </svg>

                    <p className="page-numbers">
                      {currentPage}
                      <button
                        onClick={turnPage}
                        className="next-page"
                        type="button"
                      >
                        Search
                      </button>
                    </p>
                    <ul className="movie-list-container">
                      {searchList.map(item => (
                        <MovieCard key={item.id} details={item} />
                      ))}
                    </ul>
                  </div>
                </section>
              )}
            </>
          )
        }}
      </Context.Consumer>
    )
  }
}
export default SearchMovieDetails
