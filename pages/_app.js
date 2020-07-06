import { combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { appWithRedux } from 'next-redux'
import movies from '../reducers/movies'
const reducer = combineReducers({movies})

/* Redux connection to movies reducer and thunk usage*/
const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export default appWithRedux(reducer, enhancer)
