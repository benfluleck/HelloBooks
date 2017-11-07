import React from 'react';
import {Row, Preloader} from 'react-materialize';
import PropTypes from 'prop-types';


class MainPage extends React.Component{
	constructor(props) {
    super(props);

  }
render() {
    return (
  <div>
        <div className ='main-wrapper'>
          <Row>
          <div className= 'main-text'>
                <h1>Main Page</h1>

          </div>
          </Row>
        </div>
    <Row>

      </Row>
</div>

    );
  }
}

export default MainPage;
