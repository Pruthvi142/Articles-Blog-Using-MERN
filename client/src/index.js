import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';

import consfigureStore from './Store/ConfigureStore';
import {startGetUser,} from './Actions/userAction'
import {startGetArticle} from './Actions/ArticlActions'
import { startGetMyArticle } from './Actions/MyAricleAction';


const store=consfigureStore()
const jsx=(
    <Provider store={store}>
      <App/>
    </Provider>
  ) 
  if(localStorage.getItem('authToken'))
    {
      store.dispatch(startGetUser())
       store.dispatch(startGetArticle())
      // store.dispatch(startGetMyArticle())
    }


ReactDOM.render(jsx,document.getElementById('root')
);


