import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import types from './actions/types';
import { getUser } from './actions';

import App from './components/app/app';
import ScrollToTop from './components/shared/scroll_to_top/scroll_to_top';

const { getCookieValue } = require('./helper');
const store = createStore(rootReducer, applyMiddleware(thunk));

if (getCookieValue('session')) {
  store.dispatch({
    type: types.SIGN_IN,
  });

  getUser()(store.dispatch);
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('root')
);
