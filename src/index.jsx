import React from 'react';
import ReactDOM from 'react-dom';
import Container  from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; // makes the store accessible to any component
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

import  MainView  from './Components/main-view/main-view';

// will only have one job, which is to bootstrap the React code and nothing else
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView /> {/*has now access to the store*/}
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);