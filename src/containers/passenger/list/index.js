import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import PassengerList from './PassengerList'

const pageTitle = 'Passageiros da excursão'

export default class Passenger extends Component {
  render() {
    return (
      <div>
        <Helmet title={pageTitle} />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>{pageTitle}</strong>
            </div>
          </div>
          <div className="card-body">
            <PassengerList />
          </div>
        </div>
      </div>
    )
  }
}
