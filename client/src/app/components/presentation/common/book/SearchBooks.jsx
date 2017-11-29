import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Icon,Autocomplete } from 'react-materialize';
import { searchAllBooks } from '../../../../actions/searchbooks';
import { fetchAllBooks } from '../../../../actions/fetchbooks';


/**
 * 
 * 
 * @class SearchBooks
 * @extends {React.Component}
 */
class SearchBooks extends React.Component {
  /**
   * Creates an instance of SearchBooks.
   * @param {any} props 
   * 
   * @memberOf SearchBooks
   */
  constructor(props) {
    super(props);

    this.state = {
      searchTerm:'',
      offset: 0,
      limit:8,
      dataSource: {}
    };
    this.onChange = this.onChange.bind(this)
  }

  onChange = (event, value ) => {
    event.preventDefault();
    this.setState({
      searchTerm: value
    });
    if(value.length> 1){
    this.props.searchAllBooks(value)
    }
    else{
    this.props.fetchAllBooks(this.state.offset, this.state.limit);
    }

  };

  render() {
    return (
      <Col s={12} m={3} l={3}>
      <div className='autocomplete'>
        <Col s={2}>
       <div className='autocomplete-icon'>
        <Icon medium>search
        </Icon>
      </div>
        </Col>
        <Col s={10}>
        <Autocomplete
        placeholder='Search.....'
        data ={this.state.dataSource}
        onChange= {this.onChange}
        />
        </Col>
        
      </div>
      </Col>
     
    );
  }
}


export default connect(null, { fetchAllBooks, searchAllBooks })(SearchBooks);
