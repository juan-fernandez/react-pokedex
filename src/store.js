import { applyMiddleware, createStore } from "redux"
import {createLogger} from "redux-logger"
import thunk from 'redux-thunk'
import reducer from "./reducers"
import {loadPokemon} from './utils/localStorage'

const middleware = applyMiddleware(thunk, createLogger())

export default createStore(reducer, {pokemons: {pokemons: loadPokemon()}}, middleware)
