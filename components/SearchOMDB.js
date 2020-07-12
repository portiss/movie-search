import React from 'react'
import { connect } from 'react-redux'
import _ from "lodash"

import Spinner from 'react-spinner-material'
import { loadMovies, toggleDisplayMoviesWithPoster } from '../reducers/movies'
import MovieDetails from './MovieDetails'
import { filterInput } from '../app/utils'

class SearchOMDB extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            year: '',
            type: '',
            loading: false,
        }
    }

    onChange = (event, by, query) => {
        // signal to React not to nullify the event object
        event.persist();
        if (!this.debouncedFn) {
          this.debouncedFn =  _.debounce(() => {
             this.handleSeach(by, query);
          },500);
        }
        this.debouncedFn();
    }
    /*
    TODO: search inplace. memo.

        async componentDidMount() {
            this.setState({ loading: true })
            await this.props.loadMovies()
            this.setState({ loading: false })}
    */

    handleSeach = (by, query) => {
        if (query) {
            this.setState({ [by]: query, loading: true, message: '' }, () => {
                this.loadMoviesByQuery()
            })
        }
    }

    loadMoviesByQuery() {
        const { title, year, type } = this.state
        const queryVals = [title, year, type].filter(v => v)
        this.props.loadMovies(queryVals.join('&'))
    }

    onChecked = (e, onlyWithImg) => {
        // return this.props.movies.filter((m) => onlyWithImg ? (m.Poster !== "N/A") : m)
        if (onlyWithImg)
            this.props.toggleDisplayMoviesWithPoster(onlyWithImg)
        else
            this.loadMoviesByQuery()
    }

    render() {
        const { movies, errorMsg } = this.props
        const { loading } = this.state
        let filteredMovies = movies
        const currentYear = new Date().getFullYear()
        return (
            filteredMovies ? (
                <div>
                    <h1>Movie Database Search</h1>
                    <input
                        className="search-control"
                        type="text"
                        name="query"
                        id="search-by-title"
                        placeholder=" Text / Title... "
                        onKeyDown={filterInput('name')}
                        onChange={(e) => this.onChange(e, 'title', `s=${event.target.value}`)} />
                    <select className="search-control"
                        onChange={(e) => this.onChange(e, 'type', `type=${event.target.value}`)}>
                        <option value="">All Types</option>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                        <option value="episode">Episode</option>
                    </select>
                    <input type="number"
                        onKeyDown={filterInput('integer')}
                        min="1900" max={currentYear}
                        className="search-control"
                        name="year"
                        id="search-by-year"
                        placeholder=" Year... "
                        onChange={(e) => {
                            if (event.target.value.length === 4)
                                this.onChange(e, 'year', `y=${event.target.value}`)
                        }} />
                    {
                        !errorMsg && <label className="search-control">
                            <input type="checkbox"
                                onChange={(e) => this.onChecked(e, e.target.checked)
                                }
                            />
                        Show only results with picture
                    </label>}
                    {
                        errorMsg ? <p className="error-msg">{errorMsg} (try again)</p> :
                            <h3>{`Total result found: ${filteredMovies.length}`}</h3>
                    }
                    {filteredMovies.map((movie) => <MovieDetails className="list" key={movie.imdbID} data={movie} />)}
                </div>
            ) : <Spinner />
        )
    }
}

/* Redux - attached to update to/from store */
const stateToProps = state => ({
    movies: state.movies.collection,
    errorMsg: state.movies.errorMsg,
})

const dispatchToProps = dispatch => ({
    loadMovies: (q) => dispatch(loadMovies(q)),
    toggleDisplayMoviesWithPoster: (onlyWithImg) => dispatch(toggleDisplayMoviesWithPoster(onlyWithImg)),
})

/* Connect to redux store */
export default connect(stateToProps, dispatchToProps)(SearchOMDB)
