import Loader from 'react-loader-spinner'

import {Component} from 'react'

import MovieCard from '../MovieCard'

import './index.css'

class Popular extends Component {
  state = {loading: true, results: [], currentPage: 1}

  componentDidMount() {
    this.getPopularMovies()
  }

  caseConvert = arr =>
    arr.map(item => ({
      id: item.id,
      posterPath: item.poster_path,
      title: item.title,
      voteAverage: item.vote_average,
    }))

  getPopularMovies = async () => {
    const {currentPage} = this.state
    const PopularApi = `https://api.themoviedb.org/3/movie/popular?api_key=b24ca4a28f7cce57aca325b6f144c729&language=en-US&page=${currentPage}`
    const response = await fetch(PopularApi)
    if (response.ok === true) {
      const dataObj = await response.json()
      const modifiedMovieList = this.caseConvert(dataObj.results)
      this.setState(prevState => ({
        results: modifiedMovieList,
        loading: !prevState.loading,
      }))
    }
  }

  turnPage = () => {
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
        loading: !prevState.loading,
      }),
      this.getPopularMovies,
    )
  }

  prevPage = () => {
    const {currentPage} = this.state

    if (currentPage > 1) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage - 1,
          loading: !prevState.loading,
        }),
        this.getPopularMovies,
      )
    }
  }

  render() {
    const {results, loading, currentPage} = this.state
    // console.log(MovieList);
    return (
      <>
        {loading ? (
          <section className="loader-container">
            <Loader type="Oval" color="green" className="loader-style" />
          </section>
        ) : (
          <section className="section-container">
            <div className="popular-container ">
              <p className="route-heading">Popular Movies</p>
              <div className="pagination">
                <button
                  onClick={this.prevPage}
                  className="next-page"
                  type="button"
                >
                  Prev
                </button>
                <p className="page-numbers">{currentPage}</p>
                <button
                  onClick={this.turnPage}
                  className="next-page"
                  type="button"
                >
                  Next
                </button>
              </div>

              <ul className="movie-list-container">
                {results.map(item => (
                  <MovieCard key={item.id} details={item} />
                ))}
              </ul>
            </div>
          </section>
        )}
      </>
    )
  }
}
export default Popular
