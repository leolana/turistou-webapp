import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import PassagerForm from './PassagerForm'
import PassagerSteps from './PassagerSteps'

import 'costom.scss'

const pageTitle = 'Novo passageiro'

class ExcursionPassagers extends Component {
  constructor() {
    super()

    this.state = { step: 1 }
  }

  render() {
    const { step } = this.state

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
            <PassagerSteps step={step} {...this.props} />
          </div>
          <div className="card-body">
            <PassagerForm step={step} {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

export default ExcursionPassagers
