import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import PassengerForm from './PassengerForm'
import PassengerSteps from './PassengerSteps'

import 'costom.scss'

const pageTitle = 'Novo passageiro'

class ExcursionPassengers extends Component {
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
          <div className="card-header">
            <PassengerSteps {...this.props} />
          </div>
          <div className="card-body">
            <PassengerForm {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

export default ExcursionPassengers
