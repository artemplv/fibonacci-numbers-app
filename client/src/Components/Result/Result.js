/*jshint esversion: 6*/
import React from 'react';
import PropTypes from 'prop-types';
import './Result.css';

export const Result = (props) => {
  return(
    <div className="Result">
      <p>Your Fibonacci number is</p>
      <h2>{props.result}</h2>
    </div>
  )
}

Result.propTypes = {
  result: PropTypes.number.isRequired
};
