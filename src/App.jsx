import React, {Component} from 'react';

import Search from './containers/Search.jsx';
import Display from './containers/Display.jsx';
import Banner from './components/Banner.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Banner />
        <Search />
        <Display />
      </div>
    );
  }
}

export default App;
