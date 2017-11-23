import React, {Component} from 'react';

import Search from './containers/Search.jsx';
import Display from './containers/Display.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <Display />
      </div>
    );
  }
}

export default App;
