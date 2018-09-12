import * as React from 'react';

import CATEGORIES from '../constants/categories';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        {CATEGORIES.map((category, idx) => {
          return (
            <div className="home__category" key={idx}>
              {category.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Home;
