/*jshint esversion: 6*/
import React from 'react';
import './Result.css';

export class Result extends React.Component {

  render() {
    return(
      <div className="Result">
        <p>Your Fibonacci number is</p>
        <h2>{this.props.result}</h2>
      </div>
    )
  }
}
