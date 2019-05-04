import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import PassengerList from './PassengerList'
import PassengerFilter from './PassengerFilter'

const pageTitle = 'Passageiros da excursão'

class Passenger extends Component {
  render() {
    const { match } = this.props
    const { id } = match.params

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
            <PassengerFilter id={id} />
            <PassengerList />
          </div>
        </div>
      </div>
    )
  }
}
export default Passenger
