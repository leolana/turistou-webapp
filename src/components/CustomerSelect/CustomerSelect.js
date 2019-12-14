import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select, Divider } from 'antd'
import actions from 'redux/customerList/actions'

export class CustomerSelect extends Component {
  componentDidMount() {
    const { customers, getCustomers } = this.props
    if (!customers || !customers.length) getCustomers()
  }

  render() {
    const { customers } = this.props
    return (
      <Select
        size="default"
        // TODO: max options show
        showSearch
        filterOption={(q, option) =>
          q.split(' ').every(x => option.props.children.toLowerCase().includes(x))
        }
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ padding: '8px', cursor: 'pointer' }}>
              <i className="fa fa-plus" /> Novo cliente
            </div>
          </div>
        )}
      >
        {customers.map(x => (
          <Select.Option key={x.id} value={x.id}>
            {`${x.name} - ${x.document} - ${x.address.city}`}
          </Select.Option>
        ))}
      </Select>
    )
  }
}

const mapStateToProps = ({ customerList }) => ({
  customers: customerList.payload,
})

const mapDispatchToProps = dispatch => ({
  getCustomers: () => dispatch({ type: actions.GET_CUSTOMERS }),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSelect)
