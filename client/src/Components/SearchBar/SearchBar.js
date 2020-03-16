/*jshint esversion: 6*/
import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleInputChange(e) {
    this.setState({ number: e.target.value });
  }

  search() {
    this.props.onSearch(this.state.number);
  }

  render() {
    return(
      <div className="SearchBar" >
        <input placeholder="Enter fibonacci sequence number" onChange={this.handleInputChange} />
        <button type="button" className="btn btn-light btn-lg" onClick={this.search}>Calculate</button>
      </div>
    );
  }
}
