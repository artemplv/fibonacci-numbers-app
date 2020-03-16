/*jshint esversion: 6*/
import React from 'react';

export class Record extends React.Component {
  render() {
    return(
      <tr>
        <td>{this.props.request}</td>
        <td>{this.props.result}</td>
        <td>{this.props.dateAndTime}</td>
      </tr>
    )
  }
}
