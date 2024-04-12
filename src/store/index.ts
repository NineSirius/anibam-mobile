import { createStore, combineReducers } from 'redux'
import homeReducer from './reducers/home.reducer'

const rootReducer = combineReducers({
    home: homeReducer,
})

export const store = createStore(rootReducer)
