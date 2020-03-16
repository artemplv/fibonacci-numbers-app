/*jshint esversion: 6*/
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Record } from '../Record/Record';
import './DbHistory.css';

import fib from '../../fib.js';

class DbHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      ip: ''
    }
    this.renderRows = this.renderRows.bind(this);
  }

  UNSAFE_componentWillMount() {
    fib.history().then(result => {
      if (result) {
        this.setState({
          results: result.result,
          ip: result.ip
        });
      }
    });
  }

  //render rows of request history
  renderRows() {
    return this.state.results.map( row => {
      return <Record key={row.id} request={row.request} result={row.result}
        dateAndTime={row.dateAndTime} />
    })
  }

  render() {
    return(
      <div className="DbHistory">
        <h3>Request history for ip: {this.state.ip}</h3>
        <table className="table table-dark">
          <thead>
            <tr>
              <td>Request</td>
              <td>Result</td>
              <td>Date and time</td>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    )
  }
}

export default withRouter(DbHistory);
