import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import store from './store';

import theme from './styles/theme';
import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
