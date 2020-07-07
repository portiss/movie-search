import { getData } from '../app/api'

/* reducer init */
const initialState = {
    collection: [],
    errorMsg: '',
    onlyWithImg: false,
}

/* When toggle onlyWithImg checkbox */
export const toggleDisplayMoviesWithPoster = (onlyWithImg) => async (dispatch, getState) => {
    if (!onlyWithImg) {
        loadMovies()
    }
    else {
        const state = getState().movies
        const collection = Array.from(state.collection)
        const result = collection.filter(element => onlyWithImg ? (element.Poster !== "N/A") : element)
        dispatch({
            type: 'UPDATE_MOVIES',
            result,
        })
    }
}

/* Pure function reducer, return new state with updated data */
export default function productsReducer(state = initialState, action) {

    switch (action.type) {
        case 'UPDATE_MOVIES':
            return Object.assign({}, state, { collection: action.result, errorMsg: '' })
        case 'LOAD_MOVIES':
            if (!action.result.data.Response || action.result.data.Response === "False")
                return Object.assign({}, state, { errorMsg: action.result.data.Error, collection: [] })
            const sortedByYear = action.result.data.Search.sort((a, b) => a.Year - b.Year)
            return Object.assign({}, state, { collection: sortedByYear, errorMsg: '' })
    }
    return state
}

/* Action - load */
export const loadMovies = (query) => async dispatch => {
    const result = await getData(query)
    dispatch({
        type: 'LOAD_MOVIES',
        result,
    })
}
