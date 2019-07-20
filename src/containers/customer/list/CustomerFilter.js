import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Icon, Form } from 'antd'
import actions from 'redux/customer/actions'

class CustomerFilter extends Component {
  constructor() {
    super()

    this.handleChangeQuery = this.handleChangeQuery.bind(this)
  }

  handleChangeQuery(e) {
    const query = e.target.value
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { query },
    })
  }

  render() {
    return (
      <Form layout="inline" className="mb-1">
        <Input type="text" addonBefore={<Icon type="search" />} onChange={this.handleChangeQuery} />
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  queryFilter: state.excursion.query,
})

export default connect(mapStateToProps)(CustomerFilter)
