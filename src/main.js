import React from 'react';
import { render } from 'react-dom';
import IndexPage from './components/IndexPage.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <IndexPage />
      </div>
    )
  }
}

render(<App/>, document.querySelector("#app"));
