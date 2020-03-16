/*jshint esversion: 6*/
import React from 'react';
import PropTypes from 'prop-types';

export const Record = (props) => {
  return(
    <tr>
      <td>{props.request}</td>
      <td>{props.result}</td>
      <td>{props.dateAndTime}</td>
    </tr>
  )
}

Record.propTypes = {
  request: PropTypes.number.isRequired,
  result: PropTypes.number.isRequired,
  dateAndTime: PropTypes.string.isRequired
};
