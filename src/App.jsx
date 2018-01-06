import React, {Component} from 'react';

import Search from './containers/Search.jsx';
import Display from './containers/Display.jsx';
import Banner from './containers/Banner.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Banner />
        <div className='contentContainer'>
          <Search />
          <Display />
        </div>
      </div>
    );
  }
}

export default App;
