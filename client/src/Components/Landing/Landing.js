/*jshint esversion: 6*/
import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import { Result } from '../Result/Result';
import './Landing.css';

// function for handling server requests
import fib from '../../fib.js';

export class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: '' };
    this.search = this.search.bind(this);
    this.renderResult = this.renderResult.bind(this);
  }

  // making request to the server
  search(number) {
    fib.search(number).then(result => {
      if (result) this.setState({ result: result.result });
    })
  }

  // render fibonacci number result section
  renderResult() {
    if (this.state.result || this.state.result === 0)
      return <Result result={this.state.result} />
  }

  render() {
    return(
      <div className="landing">
        <SearchBar onSearch={this.search} />
        {this.renderResult()}
        <Link to="/history">My requests</Link>
      </div>
    )
  }
}
