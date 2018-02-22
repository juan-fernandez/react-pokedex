import React from 'react';
import ReactDOM from 'react-dom';
import Pokedex from './containers/Pokedex'
import { Provider } from "react-redux"
import store from "./store"
import {setBaseUrl} from './utils/api'

setBaseUrl('https://pokeapi.co/api/v2/')

ReactDOM.render(
    <Provider store={store}>
        <Pokedex/>
    </Provider>
,document.getElementById('root'))
